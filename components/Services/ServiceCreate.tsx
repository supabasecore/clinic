import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { InputField } from "../InputField";
import { toErrorMap } from "@/utils/toErrorMap";
import {
  AllServicesDocument,
  AllServicesQuery,
  useComprehensivesQuery,
  useCreateServiceMutation,
} from "@/gen/gql";
import Loading from "../Loading";
import EnableForcedService from "../EnableForcedService";

type CreateProps = {
  title: string;
  description: string;
};

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const ServiceCreate = ({ isOpen, handleClose }: Props) => {
  const [create] = useCreateServiceMutation();

  const { data, loading } = useComprehensivesQuery();

  if (!loading && !data) {
    return <div>Servidor caído</div>;
  }

  const [comprehensiveId, setComprehensiveId] = useState<number>(Number);

  const handleToggleChange = (id: number) => {
    setComprehensiveId(id);
  };

  const comprehensiveIdResponse = comprehensiveId ?? 0;

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} className="ws8 p12">
      <Formik
        initialValues={{
          comprehensiveId,
          title: "",
          description: "",
        }}
        onSubmit={async (values: CreateProps, { setErrors }) => {
          const response = await create({
            variables: {
              input: {
                comprehensiveId: comprehensiveIdResponse,
                title: values.title,
                description: values.description,
              },
            },
            update: (cache, { data }) => {
              if (data?.createService.service) {
                const existingComprehensives =
                  cache.readQuery<AllServicesQuery>({
                    query: AllServicesDocument,
                  });

                const newComprehensive = data.createService.service;

                cache.writeQuery<AllServicesQuery>({
                  query: AllServicesDocument,
                  data: {
                    allServices: existingComprehensives?.allServices
                      ? [
                          newComprehensive,
                          ...existingComprehensives.allServices,
                        ]
                      : [newComprehensive],
                  },
                });
              }
            },
          });

          if (response.data?.createService.errors) {
            setErrors(toErrorMap(response.data.createService.errors));
          } else if (response.data?.createService.service) {
            handleClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fs-headline1 mb8 fc-black-700">
              Crear Exámen Auxiliar
            </div>
            <div className="d-flex fd-column mt24">
              <div className="d-flex gs24 md:fd-column">
                <div className="flex--item6 fl-shrink0 md:order-last mt0">
                  <aside className="flex--item flex--item2 s-card bar-md c-auto fl-grow1 mt8">
                    <div className="d-flex as-end fd-column h100 js-highlight-box-badges">
                      <div className="flex--item fs-category fs-fine fc-black-400 mb8">
                        Servicios Generales
                      </div>
                      {!data && loading ? (
                        <Loading />
                      ) : (
                        <div className="d-grid grid__1 g4 md:g8 sm:d-flex sm:fw-wrap">
                          <EnableForcedService
                            onChange={handleToggleChange}
                            attachments={data?.comprehensives!}
                            defaultValue
                          />
                        </div>
                      )}
                    </div>
                  </aside>
                </div>
                <div className="flex--item6 fl-shrink0 md:order-last mt0">
                  <InputField label="Título" name="title" />
                  <InputField textarea label="Descripción" name="description" />
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

export default ServiceCreate;
