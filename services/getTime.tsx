import type { Restaurant } from "@/types/restaurantTypes";

function currentFrenchDayAndTime(): { day: number; time: string } {
  const now = new Date();
  const day = new Date(
    now.toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
  ).getDay();
  const time = now.toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return { day, time };
}

const toHHMM = (time: string): string => time.slice(0, 5);

function isOpenNow(restaurant: Restaurant): boolean {
  const openingHours = restaurant.opening_hours;
  if (!openingHours || openingHours.length === 0) return false;

  const { day, time } = currentFrenchDayAndTime();
  const previousDay = (day + 6) % 7;

  return openingHours.some((schedule) => {
    const opensAt = toHHMM(schedule.opens_at);
    const closesAt = toHHMM(schedule.closes_at);

    if (schedule.crosses_midnight) {
      return (
        (schedule.day_of_week === day && time >= opensAt) ||
        (schedule.day_of_week === previousDay && time <= closesAt)
      );
    }
    return schedule.day_of_week === day && time >= opensAt && time <= closesAt;
  });
}

export { isOpenNow };
