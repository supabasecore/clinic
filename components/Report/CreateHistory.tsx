import { DiaryDocument, DiaryQuery, useCreateHistoryMutation } from "@/gen/gql";
import React from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { toErrorMap } from "@/utils/toErrorMap";
import { InputField } from "../InputField";

type CreateProps = {
  disease: string;
  person: string;
};

type Props = {
  diaryId: number;
  isOpen: boolean;
  handleClose: () => void;
};

const CreateHistory = ({ diaryId, isOpen, handleClose }: Props) => {
  const [create] = useCreateHistoryMutation();
  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws4 p12">
      <Formik
        initialValues={{
          diaryId,
          disease: "",
          person: "",
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
              if (data?.createHistory.history) {
                const newHistory = data.createHistory.history;
                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  const updatedDiary = existingData.diary.map((diary) => {
                    if (diary.id === diaryId) {
                      return {
                        ...diary,
                        history: [...(diary.history || []), newHistory],
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

          if (response.data?.createHistory.errors) {
            setErrors(toErrorMap(response.data.createHistory.errors));
          } else if (response.data?.createHistory.history) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">Antecedentes</div>
            <InputField
              textarea
              label="Redacción adversa a medicamentos"
              name="disease"
            />
            <InputField textarea label="Persona" name="person" />
            <Button
              isLoading={isSubmitting}
              type="submit"
              className="flex--item s-btn s-btn__primary p6"
            >
              Continuar
            </Button>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default CreateHistory;
