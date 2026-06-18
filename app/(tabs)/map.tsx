import { RestaurantApi, RestaurantQuery } from "@/api/RestaurantApi";
import GlobalMap from "@/components/Map/GlobalMap";
import SearchingLoc from "@/components/Map/SearchingLoc";
import { Colors } from "@/constants/Colors";
import { extractApiError } from "@/lib/axios";
import { Restaurant } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function MapScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [query, setQuery] = useState<RestaurantQuery>({});

  useEffect(() => {
    let cancelled = false;
    RestaurantApi.getAllPages(query)
      .then((list) => {
        if (!cancelled) {
          setRestaurants(
            list.filter(
              (restaurant) =>
                restaurant.address.latitude !== null &&
                restaurant.address.longitude !== null,
            ),
          );
        }
      })
      .catch((error) => {
        if (!cancelled)
          Toast.show({
            type: "error",
            text1: `${extractApiError(error).message}`,
          });
      });
    return () => {
      cancelled = true;
    };
  }, [query]);
  return (
    <View style={styles.container}>
      <SearchingLoc />
      <GlobalMap restaurants={restaurants} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
