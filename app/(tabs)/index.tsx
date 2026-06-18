import { RestaurantApi, RestaurantQuery } from "@/api/RestaurantApi";
import RestaurantDrawer from "@/components/Restaurant/RestaurantDrawer";
import Badge from "@/components/ui/Badge";
import { Colors } from "@/constants/Colors";
import { extractApiError } from "@/lib/axios";
import { Restaurant } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// const PlaceholderImage = require("@/assets/images/background-image.png");

interface ItemProps {
  restaurant: Restaurant;
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

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

  const [drawerRestaurant, setDrawerRestaurant] = useState<Restaurant | null>(
    null,
  );

  const [open, setOpen] = useState<boolean>(false);

  const Item = ({ restaurant }: ItemProps) => (
    <Pressable
      style={styles.card}
      onPress={() => {
        setDrawerRestaurant(restaurant);
        setOpen(true);
      }}
    >
      <Text style={styles.cardTitle}>{restaurant.name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {restaurant.cuisine_types !== undefined &&
          restaurant.cuisine_types.map((cuisine) => (
            <Text style={styles.cardText} key={cuisine.id}>
              {cuisine.name}
            </Text>
          ))}
        {restaurant.average_rating !== null && (
          <Badge variant="secondary">
            <Text style={styles.cardRating}>
              ★ {restaurant.average_rating.toFixed(1)}
            </Text>
          </Badge>
        )}
      </View>
      <Text style={styles.cardText}>{restaurant.description}</Text>
    </Pressable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={restaurants}
            keyExtractor={(restaurant) => restaurant.id.toString()}
            renderItem={({ item: restaurant }) => (
              <Item restaurant={restaurant} />
            )}
          />
        </SafeAreaView>
      </SafeAreaProvider>
      {drawerRestaurant && (
        <RestaurantDrawer
          open={open}
          setOpen={setOpen}
          restaurant={drawerRestaurant}
          profileList={false}
        />
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  card: {
    backgroundColor: Colors.card,
    width: "90%",
    boxShadow: "0px 2px 3px #00000028",
    padding: 10,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  cardText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: Colors.foreground,
  },
  cardRating: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: Colors.foreground,
  },
  text: {
    color: Colors.foreground,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
