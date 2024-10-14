"use client";
import { withApollo } from "@/apollo/withApollo";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import PatientCreate from "@/components/Patient/PatientCreate";
import PatientSearch from "@/components/Patient/PatientSearch";
import { usePatientsQuery } from "@/gen/gql";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type SuppliersPageProps = {};

const SuppliersPage: React.FC<SuppliersPageProps> = () => {
  const { data, error, loading, refetch } = usePatientsQuery();

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [loading, error, router, refetch]);

  const [openModal, setOpenModal] = useState(false);

  if (!loading && !data) {
    return (
      <Container className="d-flex jc-center ai-center">
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <div id="mainbar-full">
        <div className="d-flex mb24">
          <div className="flex--item fl1">
            <h1 className="fs-headline mb0">Departamento de Pacientes</h1>
            <p className="fs-body1 fc-light fl-grow1 mb0">
              Todos los Pacientes
            </p>
          </div>
          <div className="ml12 aside-cta flex--item print:d-none">
            <button
              onClick={() => setOpenModal(true)}
              className="ws-nowrap s-btn s-btn__primary s-btn__sm d-flex p6"
            >
              <svg
                aria-hidden="true"
                className="svg-icon iconPencil mr2"
                width="14"
                height="14"
                viewBox="0 0 15 15"
              >
                <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
              </svg>
              <div className="flex__item">Crear Paciente</div>
            </button>
          </div>
        </div>

        <PatientCreate
          handleClose={() => setOpenModal(false)}
          isOpen={openModal}
        />

        <PatientSearch data={data!} loading={loading} />
      </div>
    </Container>
  );
};
export default withApollo({ ssr: false })(SuppliersPage);
