import type { ReservationStatus } from "@/types/reservationTypes";

export const reservationStatusLabels: Record<ReservationStatus, string> = {
  confirmed: "Confirmée",
  seated: "À table",
  completed: "Terminée",
  cancelled: "Annulée",
  no_show: "Absence",
};

export function formatReservedAt(reservedAt: string): string {
  const date = new Date(reservedAt);
  const day = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(date);
  const time = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return `${day} à ${time}`;
}
