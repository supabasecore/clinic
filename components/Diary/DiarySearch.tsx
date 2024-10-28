import { useActiveTab } from "@/hook/useActiveTab";
import Link from "next/link";
import React, { ChangeEvent, useMemo, useState } from "react";
import Loading from "../Loading";
import { DiaryQuery } from "@/gen/gql";
import { filterStatus, sortByCreatedAtDesc } from "@/func/diary/diaryType";
import DiaryCard from "./DiaryCard";
import DiaryCreate from "./DiaryCreate";

type Props = {
  loading: boolean;
  data: DiaryQuery;
};

function ProductSearch({ data, loading }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, handleTabChange] = useActiveTab(`/`, "pending");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const filtered = useMemo(() => {
    if (!data || !data.diary) return [];

    return data.diary.filter((diary) => {
      if (!searchTerm) return true;

      const lowerCasedSearchTerm = searchTerm.toLowerCase();

      // Buscar en el ID del diario
      if (diary.id.toString().includes(lowerCasedSearchTerm)) {
        return true;
      }

      // Buscar en el servicio
      if (
        diary.service.title.toLowerCase().includes(lowerCasedSearchTerm) ||
        diary.service.id.toString().includes(lowerCasedSearchTerm)
      ) {
        return true;
      }

      // Buscar en el paciente
      const patientFullName =
        `${diary.patient.name} ${diary.patient.lastname}`.toLowerCase();
      if (
        patientFullName.includes(lowerCasedSearchTerm) ||
        diary.patient.dni.toLowerCase().includes(lowerCasedSearchTerm) ||
        diary.patient.id.toString().includes(lowerCasedSearchTerm)
      ) {
        return true;
      }

      return false;
    });
  }, [data, searchTerm]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="ps-relative mb16">
        <div className="flex--item mb12 fs-title2 lh-xs">
          Centro Médico El Valentino
        </div>
        <p className="fs-body1 fc-black-500">
          Aquí puedes ver, gestionar y reprogramar tus citas médicas. <br />
          Usa el buscador o explora la lista para encontrar la información de
          tus consultas.
        </p>
        <div className="ps-absolute t0 r0 d-flex gs6 fw-wrap">
          <div
            onClick={() => setOpenModal(true)}
            className="d-flex s-btn s-btn__primary p4"
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
            <div className="flex__item">Crear</div>
          </div>
        </div>
      </div>
      <DiaryCreate handleClose={() => setOpenModal(false)} isOpen={openModal} />
      <div className="d-flex ai-end jc-space-between fw-wrap gs8 mb16">
        <div className="flex--item ps-relative">
          <input
            className="s-input s-input__search h100 wmx3"
            placeholder="Buscar citas"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg
            aria-hidden="true"
            className="s-input-icon s-input-icon__search svg-icon iconSearch"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
          </svg>
        </div>
        <div className="d-flex jc-end gs8">
          <div className="s-btn-group flex--item ff-row-nowrap">
            <Link
              href={`/?tab=pending`}
              onClick={() => handleTabChange("pending")}
              className={
                activeTab === "pending"
                  ? "youarehere is-selected s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
                  : "s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
              }
            >
              <span className="s-badge s-badge__bounty s-badge__bounty s-badge__sm lh-xs mr4 px4 flex--item">
                {filterStatus({ data: filtered }, "pending").length}
              </span>
              <div className="flex--item">En espera</div>
            </Link>
            <Link
              href={`/?tab=processed`}
              onClick={() => handleTabChange("processed")}
              className={
                activeTab === "processed"
                  ? "youarehere is-selected s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
                  : "s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
              }
            >
              <span className="s-badge s-badge__bounty s-badge__bounty s-badge__sm lh-xs mr4 px4 flex--item">
                {filterStatus({ data: filtered }, "processed").length}
              </span>
              <div className="flex--item">En curso</div>
            </Link>
            <Link
              href={`/?tab=attended`}
              onClick={() => handleTabChange("attended")}
              className={
                activeTab === "attended"
                  ? "youarehere is-selected s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
                  : "s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
              }
            >
              <span className="s-badge s-badge__bounty s-badge__bounty s-badge__sm lh-xs mr4 px4 flex--item">
                {filterStatus({ data: filtered }, "attended").length}
              </span>
              <div className="flex--item">Finalizada</div>
            </Link>
            <Link
              href={`/?tab=cancel`}
              onClick={() => handleTabChange("cancel")}
              className={
                activeTab === "cancel"
                  ? "youarehere is-selected s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
                  : "s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex uql-nav--expanded-item"
              }
            >
              <span className="s-badge s-badge__bounty s-badge__bounty s-badge__sm lh-xs mr4 px4 flex--item">
                {filterStatus({ data: filtered }, "cancel").length}
              </span>
              <div className="flex--item">Suspendida</div>
            </Link>
          </div>
        </div>
      </div>
      <DiaryCard
        data={sortByCreatedAtDesc({ data: filtered! })!}
        pathname={activeTab}
      />
    </>
  );
}

export default ProductSearch;
