import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { DiaryDocument, DiaryQuery, useCreateVitalMutation } from "@/gen/gql";
import { toErrorMap } from "@/utils/toErrorMap";
import { Button } from "@chakra-ui/react";
import { InputField } from "../InputField";

type CreateProps = {
  comment: string;
  arterial?: number | null;
  cardiac?: number | null;
  height?: number | null;
  oxygen?: number | null;
  respiratory?: number | null;
  temp?: number | null;
  weight?: number | null;
};

type Props = {
  diaryId: number;
  isOpen: boolean;
  handleClose: () => void;
};

const CreateVital = ({ diaryId, isOpen, handleClose }: Props) => {
  const [create] = useCreateVitalMutation();

  const [arterial, setArterial] = useState<number | null>(null);
  const arterialResponse = arterial !== null ? arterial : 0;

  const [cardiac, setCardiac] = useState<number | null>(null);
  const cardiacResponse = cardiac !== null ? cardiac : 0;

  const [height, setHeight] = useState<number | null>(null);
  const heightResponse = height !== null ? height : 0;

  const [oxygen, setOxygen] = useState<number | null>(null);
  const oxygenResponse = oxygen !== null ? oxygen : 0;

  const [respiratory, setRespiratory] = useState<number | null>(null);
  const respiratoryResponse = respiratory !== null ? respiratory : 0;

  const [temp, setTemp] = useState<number | null>(null);
  const tempResponse = temp !== null ? temp : 0;

  const [weight, setWeight] = useState<number | null>(null);
  const weightResponse = weight !== null ? weight : 0;

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws8 p12">
      <Formik
        initialValues={{
          diaryId,
          arterial,
          cardiac,
          height,
          oxygen,
          respiratory,
          temp,
          weight,
          comment: "",
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await create({
            variables: {
              input: {
                diaryId,
                arterial: arterialResponse,
                cardiac: cardiacResponse,
                height: heightResponse,
                oxygen: oxygenResponse,
                respiratory: respiratoryResponse,
                temp: tempResponse,
                weight: weightResponse,
                ...values,
              },
            },
            update: (cache, { data }) => {
              if (data?.createVital.vital) {
                const news = data.createVital.vital;
                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  const updatedDiary = existingData.diary.map((diary) => {
                    if (diary.id === diaryId) {
                      return {
                        ...diary,
                        vital: [...(diary.vital || []), news],
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

          if (response.data?.createVital.errors) {
            setErrors(toErrorMap(response.data.createVital.errors));
          } else if (response.data?.createVital.vital) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">Vital</div>
            <div className="d-flex fd-column mt24">
              <div className="d-flex gs24 md:fd-column">
                <div className="flex--item5 fl-shrink0 md:order-last mt0">
                  <InputField
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setArterial(isNaN(value) ? null : value);
                    }}
                    value={arterial !== null ? arterial.toString() : ""}
                    label="Arterial"
                    name="arterial"
                  />
                  <InputField
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setOxygen(isNaN(value) ? null : value);
                    }}
                    value={oxygen !== null ? oxygen.toString() : ""}
                    label="Oxígeno"
                    name="oxygen"
                  />
                  <InputField
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setRespiratory(isNaN(value) ? null : value);
                    }}
                    value={respiratory !== null ? respiratory.toString() : ""}
                    label="Sistema respiratorio"
                    name="respiratory"
                  />
                  <InputField
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setCardiac(isNaN(value) ? null : value);
                    }}
                    value={cardiac !== null ? cardiac.toString() : ""}
                    label="Frecuencia cardiaca"
                    name="cardiac"
                  />
                </div>
                <div className="flex--item7 fl-shrink0 md:order-last mt0">
                  <InputField
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setTemp(isNaN(value) ? null : value);
                    }}
                    value={temp !== null ? temp.toString() : ""}
                    label="Temperatura"
                    name="temp"
                  />
                  <InputField
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setHeight(isNaN(value) ? null : value);
                    }}
                    value={height !== null ? height.toString() : ""}
                    label="Estatura"
                    name="height"
                  />
                  <InputField
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setWeight(isNaN(value) ? null : value);
                    }}
                    value={weight !== null ? weight.toString() : ""}
                    label="Peso promedio"
                    name="weight"
                  />
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
};

export default CreateVital;
