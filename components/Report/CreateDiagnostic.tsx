import React from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import {
  DiaryDocument,
  DiaryQuery,
  useCreateDiagnosticMutation,
} from "@/gen/gql";
import { toErrorMap } from "@/utils/toErrorMap";
import { InputField } from "../InputField";

type CreateProps = {
  cie: string;
  description: string;
  presumptive?: string | null;
  definitive?: string | null;
  repetitive?: string | null;
};
type Props = {
  diaryId: number;
  isOpen: boolean;
  handleClose: () => void;
};

const CreateDiagnostic = ({ diaryId, isOpen, handleClose }: Props) => {
  const [create] = useCreateDiagnosticMutation();
  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws8 p12">
      <Formik
        initialValues={{
          diaryId,
          cie: "",
          description: "",
          presumptive: "",
          definitive: "",
          repetitive: "",
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await create({
            variables: {
              input: {
                diaryId,
                ...values,
              },
            },
            update: (cache, { data }) => {
              if (data?.createDiagnostic.diagnostic) {
                const newDiagnostic = data.createDiagnostic.diagnostic;
                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  const updatedDiary = existingData.diary.map((diary) => {
                    if (diary.id === diaryId) {
                      return {
                        ...diary,
                        diagnostic: [
                          ...(diary.diagnostic || []),
                          newDiagnostic,
                        ],
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

          if (response.data?.createDiagnostic.errors) {
            setErrors(toErrorMap(response.data.createDiagnostic.errors));
          } else if (response.data?.createDiagnostic.diagnostic) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">Diagnostico</div>
            <div className="d-flex fd-column mt24">
              <div className="d-flex gs24 md:fd-column">
                <div className="flex--item5 fl-shrink0 md:order-last mt0">
                  <InputField textarea label="Cie" name="cie" />
                  <InputField textarea label="Descripción" name="description" />
                </div>
                <div className="flex--item7 fl-shrink0 md:order-last mt0">
                  <InputField textarea label="Presuntivo" name="presumptive" />
                  <InputField textarea label="Definitivo" name="definitive" />
                  <InputField textarea label="Repetitivo" name="repetitive" />
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
};

export default CreateDiagnostic;
