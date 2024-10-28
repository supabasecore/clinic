import React, { useState } from "react";
import { Reference, StoreObject } from "@apollo/client";
import { useDeleteDiaryMutation } from "@/gen/gql";
import { filterStatus } from "@/func/diary/diaryType";
import DiaryPending from "./Status/DiaryPending";

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
  pathname: string;
  data: Diary[];
};

const DiaryCard = ({ pathname, data }: Props) => {
  const [deleteDiary] = useDeleteDiaryMutation();
  const [diaryId, setDiary] = useState<number | null>(null);

  const onDelete = (id: number) => {
    deleteDiary({
      variables: { id },
      update: (cache) => {
        cache.modify({
          fields: {
            diary(ctx = [], { readField }) {
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

  const pathMap: Record<string, JSX.Element | JSX.Element[]> = {
    pending: (
      <DiaryPending
        diaryId={diaryId}
        setDiary={setDiary}
        data={filterStatus({ data }, "pending")}
      />
    ),
    processed: (
      <DiaryPending
        diaryId={diaryId}
        setDiary={setDiary}
        data={filterStatus({ data }, "processed")}
      />
    ),
    attended: (
      <DiaryPending
        diaryId={diaryId}
        setDiary={setDiary}
        data={filterStatus({ data }, "attended")}
      />
    ),
    cancel: (
      <DiaryPending
        diaryId={diaryId}
        setDiary={setDiary}
        data={filterStatus({ data }, "cancel")}
      />
    ),
  };

  return pathMap[pathname] || pathMap.pending;
};

export default DiaryCard;
