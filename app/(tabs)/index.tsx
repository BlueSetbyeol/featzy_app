import { RestaurantApi, RestaurantQuery } from "@/api/RestaurantApi";
import RestaurantDrawer from "@/components/Restaurant/RestaurantDrawer";
import Badge from "@/components/ui/Badge";
import { Colors } from "@/constants/Colors";
import { extractApiError } from "@/lib/axios";
import { Restaurant } from "@/types/restaurantTypes";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Placeholder from "@/assets/images/dish.svg";
import SearchingLoc from "@/components/Map/SearchingLoc";
import { Typography } from "@/constants/Typography";
import AuthContext from "@/contexts/AuthContext";
import GeoContext from "@/contexts/GeoContext";
import { calculateDistance } from "@/services/calculateDistanceToRestaurant";

interface ItemProps {
  restaurant: Restaurant;
}

export default function Index() {
  const { user } = useContext(AuthContext);
  const { userCenter } = useContext(GeoContext);

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

  useEffect(() => {
    if (userCenter) {
      const sorted = restaurants
        .map((restaurant) => ({
          ...restaurant,
          distance: getDistanceLabel(
            { latitude: userCenter.latitude, longitude: userCenter.longitude },
            restaurant,
          ),
        }))
        .sort(
          (a, b) =>
            Number(a.distance.slice(0, -2)) - Number(b.distance.slice(0, -2)),
        );
      setRestaurants(sorted);
    }
  }, [userCenter]);

  const [drawerRestaurant, setDrawerRestaurant] = useState<Restaurant | null>(
    null,
  );

  const [open, setOpen] = useState<boolean>(false);

  function getDistanceLabel(
    userCenter: { latitude: number; longitude: number },
    restaurant: Restaurant,
  ): string {
    if (!userCenter) return "";

    const distance = calculateDistance(userCenter, restaurant);
    if (distance === null) return "";

    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  }

  const Item = ({ restaurant }: ItemProps) => (
    <Pressable
      style={styles.card}
      onPress={() => {
        setDrawerRestaurant(restaurant);
        setOpen(true);
      }}
    >
      {restaurant.media.cover ? (
        <Image
          source={{ uri: restaurant.media.cover }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <Placeholder style={styles.cardImage} />
      )}
      <Text style={styles.cardTitle}>{restaurant.name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingBottom: 6,
        }}
      >
        <View>
          {restaurant.cuisine_types !== undefined &&
            restaurant.cuisine_types.map((cuisine) => (
              <Text style={styles.cardText} key={cuisine.id}>
                {cuisine.name}
              </Text>
            ))}
        </View>
        <View>
          {restaurant.average_rating !== null && (
            <Badge variant="secondary">
              <Text style={styles.cardRating}>
                ★ {restaurant.average_rating.toFixed(1)}
              </Text>
            </Badge>
          )}
          <Text style={styles.cardText}>
            {userCenter && getDistanceLabel(userCenter, restaurant)}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <>
      <View style={styles.hero}>
        <Text style={styles.heroText}>Bienvenue {user?.user.name} !</Text>
        <Text style={styles.heroUnderText}>
          Qu’est-ce qu’on mange aujourd’hui ?
        </Text>
        <SearchingLoc />
      </View>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={restaurants}
              keyExtractor={(restaurant) => restaurant.id.toString()}
              contentContainerStyle={{
                gap: 12,
                paddingVertical: 12,
              }}
              style={{ flex: 1 }}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 16,
  },
  hero: {
    width: "100%",
    height: "24%",
    backgroundColor: Colors.primary,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heroText: {
    fontSize: 22,
    color: Colors.primaryForeground,
    fontFamily: Typography.Lexend_400Regular,
  },
  heroUnderText: {
    fontSize: 18,
    color: Colors.primaryForeground,
    fontFamily: Typography.Lexend_400Regular,
    marginBottom: 8,
  },
  card: {
    backgroundColor: Colors.card,
    width: "85%",
    boxShadow: "1px 1px 6px 1px #00000028",
    borderRadius: 12,
    marginVertical: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 155,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.2,
    paddingHorizontal: 10,
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
});
