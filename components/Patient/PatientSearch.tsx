import React, { ChangeEvent, useMemo, useState } from "react";
import Loading from "../Loading";
import { PatientsQuery } from "@/gen/gql";
import PatientCard from "./PatientCard";

type Props = { data: PatientsQuery; loading: boolean };

const PatientSearch = ({ data, loading }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterProperties = ["name", "lastname", "email", "phone"];

  const filtered = useMemo(() => {
    if (!data || !data.patients) return [];

    return data.patients.filter((patient: any) => {
      if (!searchTerm) return true;

      const lowerCasedSearchTerm = searchTerm.toLowerCase();

      return filterProperties.some((prop) => {
        const propValue = patient[prop];

        if (propValue == null) {
          return false;
        }

        if (prop === "district") {
          return propValue.toLowerCase().includes(lowerCasedSearchTerm);
        } else {
          return propValue
            .toLowerCase()
            .split(" ")
            .some((word: string) => word.startsWith(lowerCasedSearchTerm));
        }
      });
    });
  }, [data, searchTerm]);

  return (
    <div id="tags_list">
      <div className="d-flex jc-space-between sm:fd-column mb24 gs12">
        <div className="flex--item ps-relative">
          <input
            className="s-input s-input__search h100 wmx3"
            placeholder="Buscar paciente"
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
      </div>

      <div
        id="tags-browser"
        className={`d-grid grid__3 lg:grid__1 md:grid__1 sm:grid__1 g12`}
      >
        {!data && loading ? <Loading /> : <PatientCard patient={filtered} />}
      </div>
    </div>
  );
};

export default PatientSearch;
