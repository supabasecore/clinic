import React, { useState } from "react";
import Link from "next/link";
import CardEmpty from "@/components/CardEmpty";
import TagList from "../TagList";
import { Reference, StoreObject } from "@apollo/client";
import { useDeleteDiaryMutation } from "@/gen/gql";
import { filterStatus } from "@/func/diary/diaryType";
import DiaryPending from "./Status/DiaryPending";
import DiaryCancel from "./Status/DiaryCancel";
import DiaryAttended from "./Status/DiaryAttended";
import DiaryProcessed from "./Status/DiaryProcessed";

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
