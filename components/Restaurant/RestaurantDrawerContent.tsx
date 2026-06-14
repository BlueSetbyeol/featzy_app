// RestaurantDrawerContent.tsx
import { RestaurantApi } from "@/api/RestaurantApi";
import Tab from "@/components/ui/Tab";
import { Colors } from "@/constants/Colors";
import { extractApiError } from "@/lib/axios";
import type { Restaurant } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Toast from "react-native-toast-message";

interface RestaurantDrawerContentProps {
  restaurantId: string;
}

type TabList = "menu" | "review" | "photos" | "a_propos";

export default function RestaurantDrawerContent({
  restaurantId,
}: RestaurantDrawerContentProps) {
  const { width, height } = useWindowDimensions();
  const [restaurant, setRestaurant] = useState<Restaurant>();

  const [tabToShow, setTabToShow] = useState<TabList>("menu");

  useEffect(() => {
    if (!restaurantId) return;

    let cancelled = false;
    RestaurantApi.getOne(restaurantId)
      .then((data) => {
        if (!cancelled) setRestaurant(data);
      })
      .catch((error) => {
        if (!cancelled)
          Toast.show({ type: "error", text1: extractApiError(error).message });
      });

    return () => {
      cancelled = true;
    };
  }, [restaurantId]);

  if (!restaurant) return null;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.tabsContainer,
          { width: width * 0.81, height: height * 0.06 },
        ]}
      >
        <Tab
          label="Menu"
          selected={tabToShow === "menu"}
          onPress={() => {
            setTabToShow("menu");
          }}
        />
        <Tab
          label="Avis"
          selected={tabToShow === "review"}
          onPress={() => {
            setTabToShow("review");
          }}
        />
        <Tab
          label="Photos"
          selected={tabToShow === "photos"}
          onPress={() => {
            setTabToShow("photos");
          }}
        />
        <Tab
          label="A propos"
          selected={tabToShow === "a_propos"}
          onPress={() => {
            setTabToShow("a_propos");
          }}
        />
      </View>

      {tabToShow === "menu" ? (
        <Text>Menu — à venir</Text>
      ) : tabToShow === "review" ? (
        <Text>Avis — à venir</Text>
      ) : tabToShow === "photos" ? (
        <Text>Photos — à venir</Text>
      ) : (
        <Text>A propos — à venir</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.muted,
    borderRadius: 6,
  },
  tab: {
    marginVertical: 8,
    width: "100%",
  },
  tabList: {
    width: "100%",
  },
  tabTrigger: {
    flex: 1,
  },
});
