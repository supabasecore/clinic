import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import {
  DiaryDocument,
  DiaryQuery,
  useCreateAuxiliaryMutation,
  useServicesQuery,
} from "@/gen/gql";
import Loading from "../Loading";
import EnableForcedLight from "../EnableForcedLight";
import { InputField } from "../InputField";
import { Button } from "@chakra-ui/react";
import { toErrorMap } from "@/utils/toErrorMap";

type Props = {
  diaryId: number;
  isOpen: boolean;
  handleClose: () => void;
};

function CreateAuxiliary({ diaryId, isOpen, handleClose }: Props) {
  const [create] = useCreateAuxiliaryMutation();
  const { data, loading } = useServicesQuery({
    variables: { isSurgery: true },
  });

  if (!loading && !data) {
    return <div>Servidor caído</div>;
  }

  const [serviceId, setServiceId] = useState<number>(Number);
  const handleToggleChange = (id: number) => {
    setServiceId(id);
  };

  const serviceIdResponse = serviceId ?? 0;

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws8 p12">
      <Formik
        initialValues={{
          diaryId,
          serviceId,
          comment: "",
        }}
        onSubmit={async (
          values: { comment?: string | null },
          { setErrors }
        ) => {
          const response = await create({
            variables: {
              input: {
                diaryId,
                serviceId: serviceIdResponse,
                comment: values.comment,
              },
            },
            update: (cache, { data }) => {
              if (data?.createAuxiliary.auxiliary) {
                const news = data.createAuxiliary.auxiliary;
                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  const updatedDiary = existingData.diary.map((diary) => {
                    if (diary.id === diaryId) {
                      return {
                        ...diary,
                        auxiliary: [...(diary.auxiliary || []), news],
                      };
                    }
                    return diary;
                  });

                  cache.writeQuery<DiaryQuery>({
                    query: DiaryDocument,
                    data: {
                      diary: updatedDiary,
                    },
                  });
                }
              }
            },
          });

          if (response.data?.createAuxiliary.errors) {
            setErrors(toErrorMap(response.data.createAuxiliary.errors));
          } else if (response.data?.createAuxiliary.auxiliary) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">
              Reporte Auxiliar
            </div>
            <div className="d-flex fd-column mt24">
              <div className="d-flex gs24 md:fd-column">
                <div className="flex--item5 fl-shrink0 md:order-last mt0">
                  <aside className="flex--item flex--item2 s-card bar-md c-auto fl-grow1 mt8">
                    <div className="d-flex as-end fd-column h100 js-highlight-box-badges">
                      <div className="flex--item fs-category fs-fine fc-black-400 mb8">
                        Exámenes auxiliares
                      </div>
                      {!data && loading ? (
                        <Loading />
                      ) : (
                        <div className="d-grid grid__1 g4 md:g8 sm:d-flex sm:fw-wrap">
                          <EnableForcedLight
                            onChange={handleToggleChange}
                            attachments={data?.services!}
                            defaultValue
                          />
                        </div>
                      )}
                    </div>
                  </aside>
                </div>
                <div className="flex--item7 fl-shrink0 md:order-last mt0">
                  <InputField textarea label="Comentario" name="comment" />
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    className="flex--item s-btn s-btn__primary p6"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default CreateAuxiliary;
