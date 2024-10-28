import { Reference, StoreObject } from "@apollo/client";
import Link from "next/link";
import React from "react";

type AllServices = {
  id: number;
  title: string;
  comprehensive?: {
    name: string;
  } | null;
};

type Props = {
  pathname: string;
  allServices: AllServices[];
};

function ServiceCard({ pathname, allServices }: Props) {
  const render = (data: AllServices[]) => {
    return data.length === 0 ? (
      <div className="grid--item p8">
        <p>No se encontraron resultados.</p>
      </div>
    ) : (
      data.map((c) => (
        <div
          key={c.id}
          className="grid--item s-card bs-sm h:bs-md d-block mb8 p0 bg-black-050 h:bs-lg"
        >
          <div className="s-card h100 ps-relative b4 l4">
            <div className="grid--item ps-relative d-flex">
              <div className="s-post-summary--content w100">
                <h4 className="flex--item v-truncate-companie">
                  <div className="s-link mb4">
                    {c.id.toString().padStart(4, "0")}
                  </div>

                  <div className="s-link s-post-summary--content-excerpt mb0">
                    {c.title.toUpperCase()}
                  </div>
                </h4>

                <div className="s-post-summary--meta mt4">
                  <div
                    className="s-user-card s-user-card__minimal"
                    aria-live="polite"
                  >
                    <div className="s-user-card--link d-flex gs4">
                      <div className="flex--item s-link d-flex">
                        <div className="flex--item ml2 -link ta-center jc-center ai-center d-flex">
                          {c.comprehensive?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    );
  };

  const pathMap: Record<string, JSX.Element | JSX.Element[]> = {
    all: render(allServices),
  };

  return pathMap[pathname] || pathMap.default;
}

export default ServiceCard;
