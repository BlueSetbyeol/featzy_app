// RestaurantAvailableTime.tsx
import { RestaurantApi } from "@/api/RestaurantApi";
import Badge from "@/components/ui/Badge";
import { Colors } from "@/constants/Colors";
import { extractApiError } from "@/lib/axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";

interface RestaurantAvailableTimeProps {
  aboutOrReservation: string;
  restaurantId?: number;
}

function todayLocalDate(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export default function RestaurantAvailableTime({
  aboutOrReservation,
  restaurantId,
}: RestaurantAvailableTimeProps) {
  const [times, setTimes] = useState<string[]>();

  useEffect(() => {
    if (!restaurantId) return;

    let cancelled = false;
    RestaurantApi.getAvailability(restaurantId, {
      date: todayLocalDate(),
      party_size: 2,
    })
      .then((availabilities) => {
        if (cancelled) return;
        const slotTimes = availabilities.flatMap((availability) =>
          availability.slots.map((slot) => slot.time.slice(0, 5)),
        );
        setTimes([...new Set(slotTimes)].slice(0, 6));
      })
      .catch((error) => {
        if (cancelled) return;
        setTimes([]);
        Toast.show({ type: "error", text1: extractApiError(error).message });
      });

    return () => {
      cancelled = true;
    };
  }, [restaurantId]);

  if (!restaurantId) return null;

  const isReservation = aboutOrReservation === "reservation";

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {times === undefined ? (
        <Text style={styles.placeholder}>Chargement des créneaux…</Text>
      ) : times.length === 0 ? (
        <Text style={styles.placeholder}>Aucun créneau aujourd`&apos;`hui</Text>
      ) : (
        times.map((time) => (
          <Badge
            key={time}
            variant={isReservation ? "outline" : "secondary"}
            style={isReservation ? styles.reservationBadge : styles.aboutBadge}
          >
            <Text style={styles.timeText}>{time}</Text>
          </Badge>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  placeholder: {
    fontSize: 13,
    color: Colors.mutedForeground,
  },
  aboutBadge: {
    backgroundColor: "#F7F3EE",
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  reservationBadge: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 8,
  },
  timeText: {
    fontSize: 13,
    color: Colors.foreground,
  },
});
