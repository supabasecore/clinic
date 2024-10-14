"use client";
import { withApollo } from "@/apollo/withApollo";
import { InputField } from "@/components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "@/gen/gql";
import { toErrorMap } from "@/utils/toErrorMap";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <div className="d-flex jc-center ai-center mt64">
      <div className="d-flex ai-center jc-center sm:fd-column-reverse">
        <div className="flex--item fs-body2  sm:mb0 ">
          <img src="assets/logo.png" width={400} height={250} />
        </div>
        <div className="flex--item flex--item5 fl-shrink0">
          <div className="mx-auto mb24 p48 sm:p32 bg-white bar-lg bs-xl">
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: values,
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.login.user,
                      },
                    });
                  },
                });
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                }
                if (response.data?.login.user) {
                  router.push("/");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="d-flex fd-column gs12 gsy">
                  <h1 className="flex--item fs-headline1 fw-bold lh-xs mb8 ws-nowrap">
                    Iniciar Sesión
                  </h1>
                  <div className="flex--item js-terms fs-caption fc-black-400 ta-left">
                    La seguridad de los datos es vital en una clínica para
                    proteger la privacidad del paciente y garantizar una
                    atención segura y confiable.
                  </div>
                  <InputField
                    name="usernameOrEmail"
                    placeholder="Usuario"
                    label="Usuario"
                  />

                  <InputField
                    name="password"
                    placeholder="Contraseña"
                    label="Contraseña"
                    type="password"
                  />

                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    className="flex--item s-btn s-btn__primary p6"
                  >
                    Iniciar Sesión
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(page);
