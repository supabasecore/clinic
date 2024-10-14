import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { InputField } from "../InputField";
import { Button } from "@chakra-ui/react";
import { toErrorMap } from "@/utils/toErrorMap";
import { useCreatePatientMutation } from "@/gen/gql";

type PatientCreateProps = {
  dni: string;
};

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

function PatientCreate({ isOpen, handleClose }: Props) {
  const router = useRouter();

  const [createPatient] = useCreatePatientMutation();

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws4 p12">
      <div className="d-flex jc-space-between">
        <div className="flex--item mx-auto">
          <div id="tabs-interval" className="subtabs">
            <a className={"youarehere is-selected"}>
              <h3 className="fs-headline m0">Paciente</h3>
            </a>
          </div>
        </div>
      </div>

      <Formik
        initialValues={{
          dni: "",
        }}
        onSubmit={async (values: PatientCreateProps, { setErrors }) => {
          const response = await createPatient({
            variables: {
              dni: values.dni,
            },
          });

          if (response.data?.createPatient.errors) {
            const errors = response.data.createPatient.errors
              .filter((error) => error.field === "duplicate")
              .map((error) => error.message)[0];
            if (errors) {
              handleClose();

              router.push(
                `/patients/${
                  response.data.createPatient.errors.map((e) => e.message)[0]
                }`
              );
            } else {
              setErrors(toErrorMap(response.data.createPatient.errors));
            }
          } else if (response.data?.createPatient.patient) {
            handleClose();
            router.push(`/patients/${response.data.createPatient.patient.id}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="d-flex fd-column gs4 gsy mt8">
              <InputField label="Dni" name="dni" />
              <span className="fc-black-500 mx4 mb12">
                Nosotros nos encargaremos de autocompletar los datos
              </span>
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
}

export default PatientCreate;
