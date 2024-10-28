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

type SortByCreatedAt = {
  data: Diary[];
};

export const sortByCreatedAtDesc = ({ data }: SortByCreatedAt) => {
  if (data !== null && data !== undefined) {
    if (!data) {
      return null;
    }

    return data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  return null;
};

export const filterStatus = ({ data }: SortByCreatedAt, status: string) => {
  return data?.filter((diary) => diary.status === status.toUpperCase());
};
