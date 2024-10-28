import { AllServicesQuery } from "@/gen/gql";
import { useActiveTab } from "@/hook/useActiveTab";
import React, { ChangeEvent, useMemo, useState } from "react";
import Loading from "../Loading";
import Link from "next/link";
import ServiceCard from "./ServiceCard";

type Props = {
  data: AllServicesQuery;
  loading: boolean;
};

const ServiceSearch = ({ data, loading }: Props) => {
  const [activeTab, handleTabChange] = useActiveTab(`/exams`, "all");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterProperties = ["title"];

  const filtered = useMemo(() => {
    if (!data || !data.allServices) return [];

    return data.allServices.filter((service: any) => {
      if (!searchTerm) return true;

      const lowerCasedSearchTerm = searchTerm.toLowerCase();

      return filterProperties.some((prop) => {
        const propValue = service[prop];

        if (propValue == null) {
          return false;
        }

        if (prop === "title") {
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
            placeholder="Buscar Servicio"
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
        <div id="tabs-interval" className="subtabs">
          <Link
            href={"/exams?tab=all"}
            onClick={() => handleTabChange("all")}
            className={
              activeTab !== "general" && activeTab !== "surgery"
                ? "youarehere is-selected"
                : ""
            }
          >
            Todo
          </Link>
        </div>
      </div>

      <div
        id="tags-browser"
        className={`d-grid grid__4 lg:grid__1 md:grid__1 sm:grid__1 g16`}
      >
        {!data && loading ? (
          <Loading />
        ) : (
          <ServiceCard pathname={activeTab} allServices={filtered} />
        )}
      </div>
    </div>
  );
};

export default ServiceSearch;
