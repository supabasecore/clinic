import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatMonthAndDay({ createdAt }: { createdAt: string }) {
  return format(new Date(createdAt), "MMMM d, yyyy", { locale: es });
}

export function formatHourAndMinutes({ createdAt }: { createdAt: string }) {
  return format(new Date(createdAt), "hh:mm a", { locale: es });
}
