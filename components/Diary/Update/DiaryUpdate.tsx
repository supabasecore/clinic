import { InputField } from "@/components/InputField";
import ModalWrapper from "@/components/ModalWrapper";
import {
  DiaryDocument,
  DiaryQuery,
  useUpdateDiaryStatusMutation,
} from "@/gen/gql";
import { toErrorMap } from "@/utils/toErrorMap";
import { Button } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { Form, Formik } from "formik";
import React, { useState } from "react";

type CreateProps = {
  interconsultation?: string | null;
  intervention?: string | null;
  price?: number | null;
  startTime: any;
  nextTime?: any | null;
  status: string;
  weight?: number | null;
};

type Diary = {
  id: number;
  status: string;
  patient: string;
  service: string;
  startTime: any;
  price: number;
  weight?: number | null;
  intervention?: string | null;
  interconsultation?: string | null;
};

type Props = {
  data: Diary;
  isOpen: boolean;
  handleClose: () => void;
};

const DiaryUpdate = ({ data, isOpen, handleClose }: Props) => {
  const peruvianTimeZone = "America/Lima";

  const [updateDiary] = useUpdateDiaryStatusMutation();

  const [price, setPrice] = useState<number | null>(data.price ?? null);
  const [weight, setWeight] = useState<number | null>(data.weight ?? null);

  const priceResponse = price !== null ? price : 0;
  const weightResponse = weight !== null ? price : 0;

  const [selectedOption, setSelectedOption] = useState(data.status);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws4 p12">
      <Formik
        initialValues={{
          status: selectedOption,
          intervention: data.intervention,
          interconsultation: data.interconsultation,
          price: price,
          weight: weight,
          nextTime: new Date().toISOString(),
          startTime: new Date(data.startTime).toISOString(),
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await updateDiary({
            variables: {
              id: data.id,
              input: {
                interconsultation: values.interconsultation,
                intervention: values.intervention,
                status: selectedOption,
                price: priceResponse,
                weight: weightResponse,
                startTime: new Date(values.startTime).toISOString(),
                nextTime: new Date(values.nextTime).toISOString(),
              },
            },
            update: (cache, { data: mutationData }) => {
              if (mutationData?.updateDiaryStatus.diary) {
                const updatedDiary = mutationData.updateDiaryStatus.diary;

                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  const updatedDiaries = existingData.diary.map((diary) =>
                    diary.id === updatedDiary.id
                      ? {
                          ...diary,
                          ...updatedDiary,
                          status: selectedOption,
                          price: values.price,
                          weight: values.weight,
                          intervention: values.intervention,
                          interconsultation: values.interconsultation,
                          nextTime: new Date(values.nextTime).toISOString(),
                          startTime: new Date(values.startTime).toISOString(),
                          updatedAt: new Date().toISOString(),
                        }
                      : diary
                  );

                  cache.writeQuery({
                    query: DiaryDocument,
                    data: { diary: updatedDiaries },
                  });
                }
              }
            },
          });
          if (response.data?.updateDiaryStatus.errors) {
            setErrors(toErrorMap(response.data.updateDiaryStatus.errors));
          } else if (response.data?.updateDiaryStatus.diary) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">{data.service}</div>
            <span className="fs-caption fc-black-400 ta-left">
              {data.patient}
            </span>
            <div className="d-flex fd-column gs4 gsy mt12">
              <div className="mb8">
                <label className="flex--item s-label">Estado</label>
                <select
                  className="s-input s-btn__dropdown mt6"
                  value={selectedOption}
                  onChange={handleChange}
                >
                  <option value="PENDING">En espera</option>
                  <option value="PROCESSED">En Curso</option>
                  <option value="ATTENDED">Finalizado</option>
                  <option value="CANCEL">Suspendida</option>
                </select>
              </div>

              {selectedOption !== "CANCEL" && (
                <div>
                  {selectedOption !== "ATTENDED" && (
                    <div>
                      <InputField
                        label="Cita"
                        name="startTime"
                        type="datetime-local"
                        value={format(
                          toZonedTime(
                            parseISO(values.startTime),
                            peruvianTimeZone
                          ),
                          "yyyy-MM-dd'T'HH:mm"
                        )}
                        onChange={(e) => {
                          const localDate = parseISO(e.target.value);
                          const zonedDate = toZonedTime(
                            localDate,
                            peruvianTimeZone
                          );
                          const isoString = formatInTimeZone(
                            zonedDate,
                            peruvianTimeZone,
                            "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
                          );
                          setFieldValue("startTime", isoString);
                        }}
                      />

                      <InputField
                        label="Programación"
                        name="nextTime"
                        type="datetime-local"
                        value={format(
                          toZonedTime(
                            parseISO(values.nextTime),
                            peruvianTimeZone
                          ),
                          "yyyy-MM-dd'T'HH:mm"
                        )}
                        onChange={(e) => {
                          const localDate = parseISO(e.target.value);
                          const zonedDate = toZonedTime(
                            localDate,
                            peruvianTimeZone
                          );
                          const isoString = formatInTimeZone(
                            zonedDate,
                            peruvianTimeZone,
                            "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
                          );
                          setFieldValue("nextTime", isoString);
                        }}
                      />
                    </div>
                  )}

                  <InputField
                    textarea
                    label="Intervención"
                    name="intervention"
                  />

                  <InputField
                    textarea
                    label="Interconsulta"
                    name="interconsultation"
                  />

                  {selectedOption !== "ATTENDED" && (
                    <InputField
                      label="Peso"
                      name="weight"
                      type="number"
                      step="0.01"
                      onInput={(e) => {
                        const inputElement = e.target as HTMLInputElement;
                        const value = parseFloat(inputElement.value);
                        setWeight(isNaN(value) ? null : value);
                      }}
                      value={weight !== null ? weight.toString() : ""}
                    />
                  )}

                  <InputField
                    label="Precio"
                    name="price"
                    type="number"
                    step="0.01"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseFloat(inputElement.value);
                      setPrice(isNaN(value) ? null : value);
                    }}
                    value={price !== null ? price.toString() : ""}
                  />
                </div>
              )}
              <Button
                isLoading={isSubmitting}
                type="submit"
                className="flex--item s-btn s-btn__primary p6"
              >
                Continuar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default DiaryUpdate;
