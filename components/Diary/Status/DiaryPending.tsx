import CardEmpty from "@/components/CardEmpty";
import ItemReport from "@/components/ItemReport";
import { formatHourAndMinutes, formatMonthAndDay } from "@/func/typeDate";
import { capitalizeWords } from "@/func/typeString";
import React from "react";
import DiaryUpdate from "../Update/DiaryUpdate";
import TagList from "@/components/TagList";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import DiaryHistory from "../DiaryHistory";

type Diary = {
  id: number;
  price: number;
  status: string;
  intervention?: string | null;
  interconsultation?: string | null;
  weight?: number | null;
  nextTime?: any | null;
  startTime: any;
  endTime?: any | null;
  createdAt: any;
  updatedAt: any;
  service: {
    id: number;
    title: string;
    description: string;
  };
  patient: {
    id: number;
    dni: string;
    name: string;
    lastname: string;
    phone?: string | null;
  };
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

type Props = {
  diaryId: number | null;
  setDiary: (id: number) => void;
  // onDelete: (id: number) => void;
  data: Diary[];
};

interface ExtendedJsPDF extends jsPDF {
  lastAutoTable?: { finalY: number };
}

const DiaryPending = ({ data, setDiary, diaryId }: Props) => {
  const download = (d: Diary) => {
    const doc = new jsPDF() as ExtendedJsPDF;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const addHeader = () => {
      // Add logo
      const imageHeight = 30;
      const imageWidth = 40;
      const x = 10;
      doc.addImage("/assets/logo.png", "PNG", x, 10, imageWidth, imageHeight);

      // Add title
      doc.setFontSize(18);
      doc.setTextColor(72, 61, 139);
      doc.text("HISTORIA CLÍNICA", pageWidth - 15, 25, { align: "right" });

      // Add medical center name
      doc.setFontSize(14);

      // Add patient information header
      doc.setFontSize(10);
      doc.text(`N° Historia: ${d.id.toString().padStart(4, "0")}`, 10, 45);
      doc.text(
        `Fecha de atención: ${formatMonthAndDay({ createdAt: d.startTime })}`,
        pageWidth - 10,
        45,
        { align: "right" }
      );
    };

    // First page
    addHeader();

    // Patient information (FILIACIÓN)
    autoTable(doc, {
      startY: 50,
      head: [["FILIACIÓN"]],
      body: [
        [`Nombres y Apellidos: ${d.patient.name} ${d.patient.lastname}`],
        [`Celular: ${d.patient.phone ?? "Sin datos"}`],
        [`DNI: ${d.patient.dni}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    // Current illness (ENFERMEDAD ACTUAL)
    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : 90,
      head: [["ENFERMEDAD ACTUAL"]],
      body: [
        [`INICIO: ${d.disease[0]?.isStart ? "BRUSCO" : "INSIDIOSO"}`],
        [`CURSO: ${d.disease[0]?.isCourse ? "PROGRESIVO" : "ESTACIONARIO"}`],
        [`TIEMPO DE ENFERMEDAD: ${d.disease[0]?.sickTime || ""} días`],
        [`RELATO: ${d.disease[0]?.comment || ""}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    // Medical history (ANTECEDENTES)
    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : 130,
      head: [["ANTECEDENTES"]],
      body: [
        [
          `Reacción adversa a medicamentos: ${
            d.history[0]?.disease ?? "Sin datos"
          }`,
        ],
        [`Personajes: ${d.history[0]?.person ?? "Sin datos"}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    // Vital signs (EXAMEN CLÍNICO: FUNCIONES VITALES)
    const vitalSigns: RowInput[] = d.vital[0]
      ? [
          [`PESO: ${d.vital[0]?.weight || ""} kg`],
          [`TALLA: ${d.vital[0]?.height || ""} cm`],
          [`TEMP.: ${d.vital[0]?.temp || ""} °C`],
          [`PRESIÓN ARTERIAL: ${d.vital[0]?.arterial || ""} mmHg`],
          [`FREC. CARDIACA: ${d.vital[0]?.cardiac || ""} lpm`],
          [`FREC. RESPIRATORIA: ${d.vital[0]?.respiratory || ""} rpm`],
          [`SAT. DE OXÍGENO: ${d.vital[0]?.oxygen || ""} %`],
        ]
      : [["No hay datos de signos vitales"]];

    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : 170,
      head: [["EXAMEN CLÍNICO: FUNCIONES VITALES"]],
      body: vitalSigns,
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    const auxiliaryRows = d.auxiliary.map((t) => [
      `- ${t.service?.title || ""}\n- ${t.comment ?? "Sin datos"}`,
    ]);

    // General examination (EXAMEN GENERAL)
    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : 200,
      head: [["EXAMEN GENERAL"]],
      body: auxiliaryRows,
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    // Diagnostic impression (IMPRESIÓN DIAGNÓSTICA)
    const diagnostics: RowInput[] = d.diagnostic.map((diag) => [
      `CIE-10: ${diag.cie}`,
      `DESCRIPCIÓN DEL DIAGNÓSTICO: ${diag.description}`,
      `PRESUNTIVO: ${diag.presumptive ?? "Sin datos"}`,
      `DEFINITIVO: ${diag.definitive ?? "Sin datos"}`,
      `REPETITIVO: ${diag.repetitive ?? "Sin datos"}`,
    ]);

    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : 230,
      head: [["IMPRESIÓN DIAGNÓSTICA"]],
      body: [...diagnostics],
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    // Second page
    doc.addPage();
    addHeader();

    // Procedures and interventions (PROCEDIMIENTOS - INTERVENCIONES)
    autoTable(doc, {
      startY: 50,
      head: [["PROCEDIMIENTOS - INTERVENCIONES"]],
      body: [[d.intervention || ""]],
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    const treatmentRows = d.treatment.map((t) => [
      `DÍAS: ${t.days?.toString() || ""}\nDOSIS: ${
        t.dose?.toString() || ""
      }\nCANTIDAD: ${t.quantity?.toString() || ""}\nMEDICAMENTO: \n${
        t.medicine?.replace(/\n/g, "\n") || ""
      } \nPRESENTACIÓN: \n${t.presentation || ""} `,
    ]);

    // Treatment (TRATAMIENTO)
    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : 80,
      head: [["TRATAMIENTO"]],
      body: treatmentRows,
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    // Observations (OBSERVACIONES)
    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : 160,
      head: [["OBSERVACIONES"]],
      body: [
        [`Próxima Cita: ${formatMonthAndDay({ createdAt: d.nextTime })}`],
        [`Interconsulta: ${d.interconsultation ?? "Sin datos"}`],
        [`Referencia de Emergencia: ${d.service.title}`],
        ["Establecimiento de Salud: EL VALENTINO"],
      ],
      theme: "grid",
      headStyles: { fillColor: [58, 157, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    // Add signature and stamp area
    doc.setFontSize(8);
    doc.text("Firma y Sello", pageWidth - 40, pageHeight - 20, {
      align: "center",
    });
    doc.line(pageWidth - 70, pageHeight - 25, pageWidth - 10, pageHeight - 25);

    // Save the PDF
    doc.save(`historia_clinica_${d.id.toString().padStart(4, "0")}.pdf`);
  };

  return data?.length === 0 ? (
    <CardEmpty title="Contenido de informes vacíos" />
  ) : (
    <div id="articles" className="flush-left bc-black-075 mx:ml0">
      {data?.map((d) => (
        <div key={d.id} className={"s-post-summary"}>
          <div className="s-post-summary--stats w48">
            <div className="s-post-summary--stats-item has-bounty">
              <div className="d-flex ai-center">
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
                <div className="flex__item ml4">{d.id}</div>
              </div>
            </div>
          </div>
          <div className="s-post-summary--content w100">
            <div className="s-post-summary--content-title mb2 d-flex">
              <div className="s-link">{d.service.title}</div>
              <div
                className="flex--item fl1 s-link ml8"
                style={{ fontSize: "12px" }}
              ></div>
              <div className="d-flex">
                <div
                  onClick={() =>
                    d.status !== "ATTENDED" ? setDiary(d.id) : download(d)
                  }
                  className="s-link s-user-card--link d-flex gs4"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    className="mr6"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    {d.status !== "ATTENDED" ? (
                      <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path>
                    ) : (
                      <>
                        <path d="m4.927 5.427 2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 5H8.75V.75a.75.75 0 1 0-1.5 0V5H5.104a.25.25 0 0 0-.177.427Z"></path>
                        <path d="M1.573 2.573a.25.25 0 0 0-.073.177v7.5a.25.25 0 0 0 .25.25h12.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-3a.75.75 0 1 1 0-1.5h3A1.75 1.75 0 0 1 16 2.75v7.5A1.75 1.75 0 0 1 14.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.75.75 0 0 1 11.25 16h-6.5a.75.75 0 0 1-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 0 1 0 10.25v-7.5A1.75 1.75 0 0 1 1.75 1h3a.75.75 0 0 1 0 1.5h-3a.25.25 0 0 0-.177.073ZM6.982 12a5.72 5.72 0 0 1-.765 2.5h3.566a5.72 5.72 0 0 1-.765-2.5H6.982Z"></path>
                      </>
                    )}
                  </svg>
                  <div className="flex--item -link">
                    {d.status !== "ATTENDED" ? "Reprogramación" : "Descargar"}
                  </div>
                </div>
              </div>
            </div>
            <div className="my2">
              <div className="fs-caption fc-black-600">
                {d.patient.name} {d.patient.lastname}
                <br />
                <TagList
                  tags={[
                    d.intervention?.length ? d.intervention : "Intervención",
                    d.interconsultation?.length
                      ? d.interconsultation
                      : "Interconsulta",
                  ]}
                />
              </div>
            </div>
            <ItemReport
              items={[
                {
                  icon: (
                    <svg
                      aria-hidden="true"
                      className="svg-icon iconTack  d-block mx-auto"
                      width="15"
                      height="15"
                      viewBox="0 0 18 18"
                    >
                      <path d="M9.25 8.13c-1.76-.46-2.33-.93-2.33-1.67 0-.85.79-1.44 2.1-1.44 1.38 0 1.95.99 2 1.96h1.71a3.74 3.74 0 0 0-2.72-3.32L10 2H8v1.6c-1.5.32-2.98 1.38-2.98 2.87 0 1.8 1.6 2.69 3.76 3.2 1.94.47 2.33 1.15 2.33 1.87 0 .54-.38 1.4-2.1 1.4-1.6 0-2.22-1.03-2.3-1.94H5c.1 1.7 1.53 2.96 3.01 3.27L8 16h2v-1.71c1.51-.29 3-1.2 3-2.79 0-2.2-2-2.92-3.75-3.37Z"></path>
                    </svg>
                  ),
                  label:
                    d.price > 0 ? `${d.price.toString()} Soles` : "Sin precio",
                },
                {
                  icon: (
                    <svg
                      aria-hidden="true"
                      className="svg-icon iconTack  d-block mx-auto"
                      width="15"
                      height="15"
                      viewBox="0 0 18 18"
                    >
                      <path d="M14 2h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h1V0h2v2h6V0h2zM3 6v9h12V6zm2 2h2v2H5zm0 3h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zm0-3h2v2h-2zM8 8h2v2H8z"></path>
                    </svg>
                  ),
                  label: capitalizeWords(
                    formatMonthAndDay({ createdAt: d.startTime })
                  ),
                },
                {
                  icon: (
                    <svg
                      aria-hidden="true"
                      className="svg-icon iconTack  d-block mx-auto"
                      width="15"
                      height="15"
                      viewBox="0 0 18 18"
                    >
                      <path d="M9 17c-4.36 0-8-3.64-8-8s3.64-8 8-8 8 3.64 8 8-3.64 8-8 8m0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6M8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10z"></path>
                    </svg>
                  ),
                  label: capitalizeWords(
                    formatHourAndMinutes({ createdAt: d.startTime })
                  ),
                },
              ]}
            />
            <DiaryUpdate
              data={{
                id: d.id,
                status: d.status,
                startTime: d.startTime,
                service: d.service.title,
                patient: `${d.patient.name} ${d.patient.lastname}`,
                price: d.price,
                weight: d.weight,
                intervention: d.intervention,
                interconsultation: d.interconsultation,
              }}
              handleClose={() => setDiary(0)}
              isOpen={diaryId === d.id}
            />
            {d.status === "PROCESSED" && (
              <DiaryHistory
                diaryId={d.id}
                auxiliary={d.auxiliary}
                diagnostic={d.diagnostic}
                disease={d.disease}
                history={d.history}
                treatment={d.treatment}
                vital={d.vital}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiaryPending;
