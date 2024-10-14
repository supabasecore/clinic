import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import {
  DiaryDocument,
  DiaryQuery,
  useComprehensivesQuery,
  useCreateDiaryMutation,
  useServicesQuery,
} from "@/gen/gql";
import Loading from "../Loading";
import EnableForcedLight from "../EnableForcedLight";
import { InputField } from "../InputField";
import { format, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { Button } from "@chakra-ui/react";
import { toErrorMap } from "@/utils/toErrorMap";

type CreateProps = {
  serviceId: number;
  patientId: string;
  price?: number | null;
  status: string;
  intervention?: string | null;
  interconsultation?: string | null;
  weight?: number | null;
  nextTime?: any | null;
  startTime: any;
};

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const DiaryCreate = ({ isOpen, handleClose }: Props) => {
  const peruvianTimeZone = "America/Lima";

  const [createDiary] = useCreateDiaryMutation();

  const { data, loading } = useServicesQuery({
    variables: { isSurgery: false },
  });

  if (!loading && !data) {
    return <div>Servidor caído</div>;
  }

  const [serviceId, setServiceId] = useState<number>(Number);
  const handleToggleChange = (id: number) => {
    setServiceId(id);
  };

  const serviceIdResponse = serviceId ?? 0;

  const [price, setPrice] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);

  const priceResponse = price !== null ? price : 0;
  const weightResponse = weight !== null ? price : 0;

  const [selectedOption, setSelectedOption] = useState("PENDING");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws8 p12">
      <Formik
        initialValues={{
          serviceId,
          patientId: "",
          price,
          status: "",
          intervention: "",
          interconsultation: "",
          weight,
          nextTime: new Date().toISOString(),
          startTime: new Date().toISOString(),
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await createDiary({
            variables: {
              input: {
                serviceId: serviceIdResponse,
                patientId: values.patientId,
                interconsultation: values.interconsultation,
                intervention: values.intervention,
                status: selectedOption,
                price: priceResponse,
                weight: weightResponse,
                startTime: new Date(values.startTime).toISOString(),
                nextTime: new Date(values.nextTime).toISOString(),
                endTime: null,
              },
            },
            update: (cache, { data }) => {
              if (data?.createDiary.diary) {
                const newDiary = data.createDiary.diary;

                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  cache.writeQuery<DiaryQuery>({
                    query: DiaryDocument,
                    data: {
                      diary: [newDiary, ...existingData.diary],
                    },
                  });
                } else {
                  cache.writeQuery<DiaryQuery>({
                    query: DiaryDocument,
                    data: {
                      diary: [newDiary],
                    },
                  });
                }
              }
            },
          });
          if (response.data?.createDiary.errors) {
            setErrors(toErrorMap(response.data.createDiary.errors));
          } else if (response.data?.createDiary.diary) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">
              Crear cita en la clínica
            </div>
            <div className="fc-black-400">
              Por favor, completa la información requerida para agendar tu cita.
              <br/>Selecciona el tipo de servicio,
              ingresa los detalles del paciente y programa la fecha y hora de la
              consulta.
            </div>
            <div className="d-flex fd-column mt24">
              <div className="d-flex gs24 md:fd-column">
                <div className="flex--item5 fl-shrink0 md:order-last mt0">
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
                  <InputField label="Paciente" name="patientId" />
                  <aside className="flex--item flex--item2 s-card bar-md c-auto fl-grow1 mt8">
                    <div className="d-flex as-end fd-column h100 js-highlight-box-badges">
                      <div className="flex--item fs-category fs-fine fc-black-400 mb8">
                        Servicios Generales
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

                          {selectedOption !== "PENDING" && (
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
                          )}
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default DiaryCreate;
