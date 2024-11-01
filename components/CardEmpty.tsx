import React from "react";

type CardEmptyProps = {
  title: string;
};

const CardEmpty: React.FC<CardEmptyProps> = ({ title }) => {
  return (
    <div className="d-flex fd-column s-empty-state ba baw2 bas-dashed bg-powder-050 bc-blue-200 bar-sm jc-center ai-center">
      <div className="d-flex mb8 fw-wrap">
        <svg
          className="mb16 mt24 fc-blue-300 svg-spot spotEmpty"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <path
            d="M5 7c0-1.1.9-2 2-2h38a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Zm0 16c0-1.1.9-2 2-2h38a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8ZM3 39.2a1 1 0 1 1-2 0V38a3 3 0 0 1 3-3h1.9a1 1 0 1 1 0 2H4a1 1 0 0 0-1 1v1.2Zm7.6-3.2a1 1 0 0 1 1-1h3.8a1 1 0 1 1 0 2h-3.8a1 1 0 0 1-1-1Zm9.5 0a1 1 0 0 1 1-1h3.8a1 1 0 1 1 0 2h-3.8a1 1 0 0 1-1-1Zm9.5 0a1 1 0 0 1 1-1h3.8a1 1 0 1 1 0 2h-3.8a1 1 0 0 1-1-1Zm9.5 0a1 1 0 0 1 1-1H42a3 3 0 0 1 3 3v1.2a1 1 0 1 1-2 0V38a1 1 0 0 0-1-1h-1.9a1 1 0 0 1-1-1ZM2 41.8a1 1 0 0 1 1 1v1.22A1 1 0 0 0 4 45h1.9a1 1 0 1 1 0 2H3.94A3 3 0 0 1 1 44v-1.2a1 1 0 0 1 1-1Zm42 0a1 1 0 0 1 1 1V44a3 3 0 0 1-3 3h-1.9a1 1 0 1 1 0-2h1.94a1 1 0 0 0 .96-1v-1.2a1 1 0 0 1 1-1ZM10.6 46a1 1 0 0 1 1-1h3.8a1 1 0 1 1 0 2h-3.8a1 1 0 0 1-1-1Zm9.5 0a1 1 0 0 1 1-1h3.8a1 1 0 1 1 0 2h-3.8a1 1 0 0 1-1-1Zm9.5 0a1 1 0 0 1 1-1h3.8a1 1 0 1 1 0 2h-3.8a1 1 0 0 1-1-1Z"
            opacity=".2"
          ></path>
          <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a1 1 0 0 1 1-1h26a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1ZM4 1a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h38a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H4ZM3 4a1 1 0 0 1 1-1h38a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm5 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm5-3a1 1 0 1 0 0 2h26a1 1 0 1 0 0-2H13Zm-9-6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h38a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3H4Zm-1 3a1 1 0 0 1 1-1h38a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8Z"></path>
        </svg>
      </div>
      <p className="fl-grow1 fc-black-500 fw-bold fs-body2">{title}</p>
    </div>
  );
};
export default CardEmpty;
