import React, { useState } from "react";
import CreateAuxiliary from "../Report/CreateAuxiliary";
import CreateDiagnostic from "../Report/CreateDiagnostic";
import CreateTreatment from "../Report/CreateTreatment";
import CreateVital from "../Report/CreateVital";
import CreateDisease from "../Report/CreateDisease";
import CreateHistory from "../Report/CreateHistory";

type Props = {
  diaryId: number;
  vital: Array<{
    __typename?: "Vital";
    id: number;
    diaryId: number;
    height?: number | null;
    weight?: number | null;
    temp?: number | null;
    arterial?: number | null;
    cardiac?: number | null;
    respiratory?: number | null;
    oxygen?: number | null;
    comment: string;
  }>;
  auxiliary: Array<{
    __typename?: "Auxiliary";
    id: number;
    diaryId: number;
    comment?: string | null;
    service?: { __typename?: "Service"; id: number; title: string } | null;
  }>;
  diagnostic: Array<{
    __typename?: "Diagnostic";
    id: number;
    diaryId: number;
    cie: string;
    description: string;
    presumptive?: string | null;
    definitive?: string | null;
    repetitive?: string | null;
  }>;
  treatment: Array<{
    __typename?: "Treatment";
    id: number;
    diaryId: number;
    medicine?: string | null;
    presentation?: string | null;
    quantity?: number | null;
    dose?: number | null;
    days?: number | null;
  }>;
  history: Array<{
    __typename?: "History";
    id: number;
    diaryId: number;
    person: string;
    disease: string;
  }>;
  disease: Array<{
    __typename?: "Disease";
    id: number;
    diaryId: number;
    isStart: boolean;
    isCourse: boolean;
    sickTime?: number | null;
    comment?: string | null;
  }>;
};

const DiaryHistory = ({
  diaryId,
  diagnostic,
  disease,
  history,
  treatment,
  auxiliary,
  vital,
}: Props) => {
  const [openVital, setOpenVital] = useState(false);
  const [openAuxiliary, setOpenAuxiliary] = useState(false);
  const [openDiagnostic, setOpenDiagnostic] = useState(false);
  const [openDisease, setOpenDisease] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openTreatment, setOpenTreatment] = useState(false);

  const renderCheckStatus = (isComplete: boolean) =>
    isComplete ? (
      <div className="flex--item ml-auto s-badge s-badge__bounty s-badge__bounty s-badge__sm lh-xs mr4 px4">
        <svg
          aria-hidden="true"
          className="svg-icon iconCheckmarkSm"
          width="14"
          height="14"
          viewBox="0 0 14 14"
        >
          <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4z"></path>
        </svg>
        <div className="ml6">Completado</div>
      </div>
    ) : (
      <div className="flex--item ml-auto s-badge s-badge__bounty s-badge__bounty s-badge__sm lh-xs mr4 px4">
        <svg
          aria-hidden="true"
          className="svg-icon iconClearSm"
          width="14"
          height="14"
          viewBox="0 0 14 14"
        >
          <path d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"></path>
        </svg>
        <div className="ml12">Incompleto</div>
      </div>
    );

  return (
    <div className="fl-grow1 ba bc-black-300 bar-md mt12">
      <div
        onClick={() => setOpenVital(true)}
        className="p12 bb bc-black-200 s-link"
      >
        <div className="d-flex gs12 gsx ai-center">
          <div className="d-flex fl-grow1 pr12">
            <div className="answer-hyperlink m0 v-truncate1 break-word">
              Vital
            </div>
          </div>
          {renderCheckStatus(vital.length > 0)}
        </div>
      </div>
      <CreateVital
        diaryId={diaryId}
        handleClose={() => setOpenVital(false)}
        isOpen={openVital}
      />

      <div
        onClick={() => setOpenAuxiliary(true)}
        className="p12 bb bc-black-200 s-link"
      >
        <div className="d-flex gs12 gsx ai-center">
          <div className="d-flex fl-grow1 pr12">
            <div className="answer-hyperlink m0 v-truncate1 break-word">
              Auxiliar
            </div>
          </div>
          {renderCheckStatus(auxiliary.length > 0)}
        </div>
      </div>
      <CreateAuxiliary
        diaryId={diaryId}
        handleClose={() => setOpenAuxiliary(false)}
        isOpen={openAuxiliary}
      />

      <div
        onClick={() => setOpenDiagnostic(true)}
        className="p12 bb bc-black-200 s-link"
      >
        <div className="d-flex gs12 gsx ai-center">
          <div className="d-flex fl-grow1 pr12">
            <div className="answer-hyperlink m0 v-truncate1 break-word">
              Diagnóstico
            </div>
          </div>
          {renderCheckStatus(diagnostic.length > 0)}
        </div>
      </div>
      <CreateDiagnostic
        diaryId={diaryId}
        handleClose={() => setOpenDiagnostic(false)}
        isOpen={openDiagnostic}
      />

      <div
        onClick={() => setOpenTreatment(true)}
        className="p12 bb bc-black-200 s-link"
      >
        <div className="d-flex gs12 gsx ai-center">
          <div className="d-flex fl-grow1 pr12">
            <div className="answer-hyperlink m0 v-truncate1 break-word">
              Tratamiento
            </div>
          </div>
          {renderCheckStatus(treatment.length > 0)}
        </div>
      </div>
      <CreateTreatment
        diaryId={diaryId}
        handleClose={() => setOpenTreatment(false)}
        isOpen={openTreatment}
      />

      <div
        onClick={() => setOpenDisease(true)}
        className="p12 bb bc-black-200 s-link"
      >
        <div className="d-flex gs12 gsx ai-center">
          <div className="d-flex fl-grow1 pr12">
            <div className="answer-hyperlink m0 v-truncate1 break-word">
              Enfermedad
            </div>
          </div>
          {renderCheckStatus(disease.length > 0)}
        </div>
      </div>
      <CreateDisease
        diaryId={diaryId}
        handleClose={() => setOpenDisease(false)}
        isOpen={openDisease}
      />

      <div onClick={() => setOpenHistory(true)} className="p12 s-link">
        <div className="d-flex gs12 gsx ai-center">
          <div className="d-flex fl-grow1 pr12">
            <div className="answer-hyperlink m0 v-truncate1 break-word">
              Antecedentes
            </div>
          </div>
          {renderCheckStatus(history.length > 0)}
        </div>
      </div>
      <CreateHistory
        diaryId={diaryId}
        handleClose={() => setOpenHistory(false)}
        isOpen={openHistory}
      />
    </div>
  );
};

export default DiaryHistory;
