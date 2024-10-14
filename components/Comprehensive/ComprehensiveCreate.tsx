import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { toErrorMap } from "@/utils/toErrorMap";
import {
  ComprehensivesDocument,
  ComprehensivesQuery,
  useCreateComprehensiveMutation,
} from "@/gen/gql";
import { InputField } from "../InputField";
import HighContrastToggle from "../HighContrastToggle";
import { Button } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

type CreateProps = {
  name: string;
  isSurgery: boolean | null;
};

const ServiceCreate = ({ isOpen, handleClose }: Props) => {
  const [createComprehensive] = useCreateComprehensiveMutation();

  const [isSurgery, setIsSurgery] = useState<boolean>(Boolean);
  const handleToggleChange = (isChecked: boolean) => {
    setIsSurgery(isChecked);
  };

  const isSurgeryResponse = isSurgery ?? false;

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws4 p12">
      <Formik
        initialValues={{
          name: "",
          isSurgery,
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await createComprehensive({
            variables: {
              input: {
                ...values,
                isSurgery: isSurgeryResponse,
              },
            },
            update: (cache, { data }) => {
              if (data?.createComprehensive.comprehensive) {
                const existingComprehensives =
                  cache.readQuery<ComprehensivesQuery>({
                    query: ComprehensivesDocument,
                  });

                const newComprehensive = data.createComprehensive.comprehensive;

                cache.writeQuery<ComprehensivesQuery>({
                  query: ComprehensivesDocument,
                  data: {
                    comprehensives: existingComprehensives?.comprehensives
                      ? [
                          newComprehensive,
                          ...existingComprehensives.comprehensives,
                        ]
                      : [newComprehensive],
                  },
                });
              }
            },
          });

          if (response.data?.createComprehensive.errors) {
            setErrors(toErrorMap(response.data.createComprehensive.errors));
          } else if (response.data?.createComprehensive.comprehensive) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">Crear Servicio</div>
            <span className="fs-caption fc-black-400 ta-left">....</span>
            <div className="d-flex fd-column gs4 gsy mt8">
              <InputField label="Título" name="name" />
              <div className="flex--item3 fl-shrink0 md:order-last mb12">
                <div className="grid--item grid--col-start1 grid--col-end3 lg:grid--col-end2">
                  <div id="top-cards" className="d-grid gs8 md:fd-column">
                    <aside className="flex--item s-card bar-md c-auto fl-grow1">
                      <div className="d-flex ai-center jc-space-between gs16 js-setting">
                        <label className="flex--item">
                          <div className="d-flex fc-black-350 fs-fine fs-category ai-center">
                            Opción sugerida
                          </div>
                          <p className="flex--item py4">
                            Nuestro producto, tu elección cuenta
                          </p>
                        </label>
                        <HighContrastToggle
                          onChange={handleToggleChange}
                          name="isSurgery"
                        />
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
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

export default ServiceCreate;
