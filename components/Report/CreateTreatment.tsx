import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { toErrorMap } from "@/utils/toErrorMap";
import {
  DiaryDocument,
  DiaryQuery,
  useCreateTreatmentMutation,
} from "@/gen/gql";
import { InputField } from "../InputField";

type CreateProps = {
  days?: number | null;
  dose?: number | null;
  quantity?: number | null;
  medicine?: string | null;
  presentation?: string | null;
};

type Props = {
  diaryId: number;
  isOpen: boolean;
  handleClose: () => void;
};

const CreateTreatment = ({ diaryId, isOpen, handleClose }: Props) => {
  const [create] = useCreateTreatmentMutation();

  const [days, setDay] = useState<number | null>(null);
  const daysResponse = days !== null ? days : 0;

  const [dose, setDose] = useState<number | null>(null);
  const doseResponse = dose !== null ? dose : 0;

  const [quantity, setQuantity] = useState<number | null>(null);
  const quantityResponse = quantity !== null ? quantity : 0;

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws8 p12">
      <Formik
        initialValues={{
          diaryId,
          days,
          dose,
          quantity,
          medicine: "",
          presentation: "",
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await create({
            variables: {
              input: {
                diaryId,
                days: daysResponse,
                dose: doseResponse,
                quantity: quantityResponse,
                medicine: values.medicine,
                presentation: values.presentation,
              },
            },
            update: (cache, { data }) => {
              if (data?.createTreatment.treatment) {
                const news = data.createTreatment.treatment;
                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  const updatedDiary = existingData.diary.map((diary) => {
                    if (diary.id === diaryId) {
                      return {
                        ...diary,
                        treatment: [...(diary.treatment || []), news],
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

          if (response.data?.createTreatment.errors) {
            setErrors(toErrorMap(response.data.createTreatment.errors));
          } else if (response.data?.createTreatment.treatment) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">Tratamiento</div>
            <div className="d-flex fd-column mt24">
              <div className="d-flex gs24 md:fd-column">
                <div className="flex--item5 fl-shrink0 md:order-last mt0">
                  <InputField
                    type="number"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseInt(inputElement.value);
                      setDay(isNaN(value) ? null : value);
                    }}
                    value={days !== null ? days.toString() : ""}
                    label="Días"
                    name="days"
                  />
                  <InputField
                    type="number"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseInt(inputElement.value);
                      setDose(isNaN(value) ? null : value);
                    }}
                    value={dose !== null ? dose.toString() : ""}
                    label="Dosis"
                    name="dose"
                  />
                  <InputField
                    type="number"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseInt(inputElement.value);
                      setQuantity(isNaN(value) ? null : value);
                    }}
                    value={quantity !== null ? quantity.toString() : ""}
                    label="Cantidad"
                    name="quantity"
                  />
                </div>
                <div className="flex--item7 fl-shrink0 md:order-last mt0">
                  <InputField textarea label="Medicina" name="medicine" />
                  <InputField
                    textarea
                    label="Presentación"
                    name="presentation"
                  />
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

export default CreateTreatment;
