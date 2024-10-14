import { formatMonthAndDay } from "@/func/typeDate";
import { capitalizeWords, truncateText } from "@/func/typeString";
import React from "react";

type Supplier = {
  id: number;
  name: string;
  ruc?: string | null;
  address?: string | null;
  district?: string | null;
  province?: string | null;
  department?: string | null;
  productCount: number;
  createdAt: any;
};

type Props = {
  supplier: Supplier;
};

function IntegralHeader({ supplier }: Props) {
  const truncateCtx = (ctx: string | null | undefined) => {
    if (!(ctx !== null && ctx !== undefined)) {
      return "-";
    }

    return ctx;
  };

  const integralName = `${supplier?.name}`;

  const integralIdentifier = truncateCtx(supplier?.ruc);

  const integralInfo = `${capitalizeWords(
    truncateCtx(supplier?.district)
  )}, ${capitalizeWords(truncateCtx(supplier?.province))}, ${capitalizeWords(
    truncateCtx(supplier?.department)
  )}`;

  const integralAddress = capitalizeWords(
    truncateText(truncateCtx(supplier?.address), 20)
  );

  const integralCreatedAt = capitalizeWords(
    formatMonthAndDay({
      createdAt: supplier?.createdAt,
    })
  );

  return (
    <div className="d-flex ai-center fw-wrap gs16 md:fd-column md:ai-start mb6">
      <div className="flex--item">
        <div className="d-flex ai-center fw-wrap gs8 wmx6">
          <div className="flex--item mb12 fs-title2 lh-xs">
            {integralName.toUpperCase()}
          </div>
        </div>

        <ul className="list-reset s-anchors s-anchors__inherit d-flex fc-light gs8 mln4 fw-unsed">
          {integralIdentifier.length > 1 && (
            <li className="flex--item">
              <div className="d-flex gs4 gsx ai-center">
                <div className="flex--item ">
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    version="1.1"
                    className="svg-icon iconTack d-block mx-auto"
                  >
                    <path d="M10.5 0a5.499 5.499 0 1 1-1.288 10.848l-.932.932a.749.749 0 0 1-.53.22H7v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22H5v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22h-2A1.75 1.75 0 0 1 0 14.25v-2c0-.199.079-.389.22-.53l4.932-4.932A5.5 5.5 0 0 1 10.5 0Zm-4 5.5c-.001.431.069.86.205 1.269a.75.75 0 0 1-.181.768L1.5 12.56v1.69c0 .138.112.25.25.25h1.69l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l1.023-1.025a.75.75 0 0 1 .768-.18A4 4 0 1 0 6.5 5.5ZM11 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
                  </svg>
                </div>

                <div className="flex--item">
                  <div className="gs4 gsx ai-center">{integralIdentifier}</div>
                </div>
              </div>
            </li>
          )}

          {integralInfo.length > 7 && (
            <li className="flex--item">
              <div className="d-flex gs4 gsx ai-center">
                <div className="flex--item ">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconTack d-block mx-auto"
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
                  </svg>
                </div>

                <div className="flex--item">
                  <div className="gs4 gsx ai-center">{integralInfo}</div>
                </div>
              </div>
            </li>
          )}

          {integralAddress.length > 1 && (
            <li className="flex--item">
              <div className="d-flex gs4 gsx ai-center">
                <div className="flex--item ">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconTack d-block mx-auto"
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.75 0a.75.75 0 0 1 .75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 0 1 0 2.672l-2.07 1.75a1.75 1.75 0 0 1-1.13.414H8.5v5.25a.75.75 0 0 1-1.5 0V10H2.75A1.75 1.75 0 0 1 1 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 0 1 7.75 0Zm4.384 8.5a.25.25 0 0 0 .161-.06l2.07-1.75a.248.248 0 0 0 0-.38l-2.07-1.75a.25.25 0 0 0-.161-.06H2.75a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h9.384Z"></path>
                  </svg>
                </div>

                <div className="flex--item">
                  <div className="gs4 gsx ai-center">{integralAddress}</div>
                </div>
              </div>
            </li>
          )}

          {!(
            integralIdentifier.length > 1 &&
            integralInfo.length > 7 &&
            integralAddress.length > 1
          ) && (
            <li className="flex--item">
              <div className="d-flex gs4 gsx ai-center">
                <div className="flex--item ">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconTack d-block mx-auto"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path>
                  </svg>
                </div>

                <div className="flex--item">
                  <div className="gs4 gsx ai-center">
                    Se unio en {integralCreatedAt}
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default IntegralHeader;
