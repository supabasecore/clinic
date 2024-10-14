import { useDeletePatientMutation } from "@/gen/gql";
import { Reference, StoreObject } from "@apollo/client";
import Link from "next/link";
import React from "react";

type Patient = {
  id: number;
  dni: string;
  name: string;
  lastname: string;
  phone?: string | null;
  diaryCount?: number | null;
  createdAt: any;
  updatedAt: any;
};

type Props = {
  patient: Patient[];
};

function PatientCard({ patient }: Props) {
  const [deletePatient] = useDeletePatientMutation();
  const handleDelete = (id: number) => {
    deletePatient({
      variables: { id },
      update: (cache) => {
        cache.modify({
          fields: {
            patients(ctx = [], { readField }) {
              return ctx.filter(
                (ref: Reference | StoreObject | undefined) =>
                  id !== readField("id", ref)
              );
            },
          },
        });
      },
    });
  };

  return patient.length === 0 ? (
    <div className="grid--item p8">
      <p>No se encontraron resultados.</p>
    </div>
  ) : (
    patient.map((c) => (
      <div
        key={c.id}
        className="grid--item s-card bs-sm h:bs-md d-block mb8 p0 bg-black-050 h:bs-lg"
      >
        <div className="s-card h100 ps-relative b4 l4">
          <div className="grid--item ps-relative d-flex">
            <div className="s-post-summary--stats">
              <div className="s-post-summary--stats-item has-bounty">
                <div className="d-flex">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconDocumentAlt"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M5 3a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm2 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 4.5c0-.28.22-.5.5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm.5 1.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1ZM5 14.5c0-.28.22-.5.5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Z"></path>
                    <path
                      d="M5.9 2h6.35A2.75 2.75 0 0 1 15 4.75v9.35c.62-.6 1-1.43 1-2.35v-7.5C16 2.45 14.54 1 12.75 1h-4.5c-.92 0-1.75.38-2.35 1Z"
                      opacity=".4"
                    ></path>
                  </svg>
                  <div className="flex__item">{c.diaryCount}</div>
                </div>
              </div>
            </div>
            <div className="s-post-summary--content w100">
              <h4 className="flex--item v-truncate-companie">
                <div className="s-link mb4">{c.dni}</div>
                <Link
                  passHref
                  legacyBehavior
                  href={`/patient/[patientId]`}
                  as={`/patient/${c.id}`}
                >
                  <a className="s-link s-post-summary--content-excerpt">
                    {c.name.toUpperCase()}
                  </a>
                </Link>
              </h4>

              <div className="s-post-summary--meta mt4">
                <div
                  className="s-user-card s-user-card__minimal"
                  aria-live="polite"
                >
                  {(c.diaryCount ?? 0) > 0 ? (
                    <>
                      <div className="s-user-card--info">
                        <ul className="s-user-card--awards">
                          <li className="s-user-card--rep">
                            <span
                              className="todo-no-class-here"
                              title="reputation score "
                              dir="ltr"
                            >
                              {c.diaryCount}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <time className="s-user-card--time">
                        <div className="s-link s-link__muted">
                          Historia Medica
                        </div>
                      </time>
                    </>
                  ) : (
                    <div className="s-user-card--link d-flex gs4">
                      <div
                        className="flex--item s-link d-flex"
                        onClick={() => handleDelete(c.id)}
                      >
                        <svg
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          className="svg-icon iconTack d-block mx-auto"
                        >
                          <path d="M2.343 13.657A8 8 0 1 1 13.658 2.343 8 8 0 0 1 2.343 13.657ZM6.03 4.97a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L6.94 8 4.97 9.97a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L8 9.06l1.97 1.97a.749.749 0 0 0 1.275-.326.749.749 0 0 0-.215-.734L9.06 8l1.97-1.97a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L8 6.94Z"></path>
                        </svg>
                        <div className="flex--item ml2 -link ta-center jc-center ai-center d-flex">
                          Eliminar
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}

export default PatientCard;
