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
