import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { toErrorMap } from "@/utils/toErrorMap";
import { DiaryDocument, DiaryQuery, useCreateDiseaseMutation } from "@/gen/gql";
import { InputField } from "../InputField";
import HighContrastToggle from "../HighContrastToggle";

type CreateProps = {
  comment?: string | null;
  isCourse: boolean;
  isStart: boolean;
  sickTime?: number | null;
};

type Props = {
  diaryId: number;
  isOpen: boolean;
  handleClose: () => void;
};

function CreateDisease({ diaryId, isOpen, handleClose }: Props) {
  const [create] = useCreateDiseaseMutation();

  const [sickTime, setSickTime] = useState<number | null>(null);
  const sickTimeResponse = sickTime !== null ? sickTime : 0;

  const [isCourse, setIsCourse] = useState<boolean>(Boolean);
  const handleToggleChangeCourse = (isChecked: boolean) => {
    setIsCourse(isChecked);
  };

  const [isStart, setIsStart] = useState<boolean>(Boolean);
  const handleToggleChangeStart = (isChecked: boolean) => {
    setIsStart(isChecked);
  };

  const isCourseResponse = isCourse ?? false;
  const isStartResponse = isStart ?? false;

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws8 p12">
      <Formik
        initialValues={{
          diaryId,
          comment: "",
          isCourse,
          isStart,
          sickTime,
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await create({
            variables: {
              input: {
                diaryId,
                comment: values.comment,
                isCourse: isCourseResponse,
                isStart: isStartResponse,
                sickTime: sickTimeResponse,
              },
            },
            update: (cache, { data }) => {
              if (data?.createDisease.disease) {
                const newDisease = data.createDisease.disease;
                const existingData = cache.readQuery<DiaryQuery>({
                  query: DiaryDocument,
                });

                if (existingData && existingData.diary) {
                  const updatedDiary = existingData.diary.map((diary) => {
                    if (diary.id === diaryId) {
                      return {
                        ...diary,
                        disease: [...(diary.disease || []), newDisease],
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

          if (response.data?.createDisease.errors) {
            setErrors(toErrorMap(response.data.createDisease.errors));
          } else if (response.data?.createDisease.disease) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">
              Enfermedad Actual
            </div>
            <div className="d-flex fd-column mt24">
              <div className="d-flex gs24 md:fd-column">
                <div className="flex--item5 fl-shrink0 md:order-last mt0">
                  <div className="grid--item grid--col-start1 grid--col-end3 lg:grid--col-end2">
                    <div id="top-cards" className="d-grid gs8 md:fd-column">
                      <aside className="flex--item s-card bar-md c-auto fl-grow1">
                        <div className="d-flex ai-center jc-space-between gs16 js-setting">
                          <label className="flex--item">
                            <div className="d-flex fc-black-350 fs-fine fs-category ai-center">
                              Incio
                            </div>
                            <div className="flex--item py4">Brusco</div>
                            <div className="flex--item py4">Insidioso</div>
                          </label>
                          <HighContrastToggle
                            onChange={handleToggleChangeCourse}
                            name="isStart"
                          />
                        </div>
                      </aside>
                      <aside className="flex--item s-card bar-md c-auto fl-grow1">
                        <div className="d-flex ai-center jc-space-between gs16 js-setting">
                          <label className="flex--item">
                            <div className="d-flex fc-black-350 fs-fine fs-category ai-center">
                              Curso
                            </div>
                            <div className="flex--item py4">Progresivo</div>
                            <div className="flex--item py4">Estacionario</div>
                          </label>
                          <HighContrastToggle
                            onChange={handleToggleChangeStart}
                            name="isCourse"
                          />
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
                <div className="flex--item7 fl-shrink0 md:order-last mt0">
                  <InputField
                    type="number"
                    onInput={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const value = parseInt(inputElement.value);
                      setSickTime(isNaN(value) ? null : value);
                    }}
                    value={sickTime !== null ? sickTime.toString() : ""}
                    label="Tiempo de Enfermedad"
                    name="sickTime"
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
}

export default CreateDisease;
