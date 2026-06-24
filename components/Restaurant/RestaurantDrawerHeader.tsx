// RestaurantDrawerHeader.tsx

import { userApi } from "@/api/userApi";
import Badge from "@/components/ui/Badge";
import { Colors } from "@/constants/Colors";
import AuthContext from "@/contexts/AuthContext";
import GeoContext from "@/contexts/GeoContext";
import { extractApiError } from "@/lib/axios";
import { priceLevelLabel } from "@/lib/format";
import { calculateDistance } from "@/services/calculateDistanceToRestaurant";
import type { Restaurant } from "@/types/restaurantTypes";
import { useRouter } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import Placeholder from "@/assets/images/dish.svg";

interface RestaurantDrawerHeaderProps {
  restaurant: Restaurant;
  profileList: boolean;
}

export default function RestaurantDrawerHeader({
  restaurant,
  profileList,
}: RestaurantDrawerHeaderProps) {
  const { userCenter } = useContext(GeoContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState<boolean>(
    restaurant.is_favorited ?? false,
  );
  const [favoritePending, setFavoritePending] = useState(false);

  const getDistanceLabel = (): string => {
    if (!userCenter) return "";

    const distance: number | null = calculateDistance(userCenter, restaurant);
    if (distance == null) return "";

    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  async function handleFavoritePress() {
    if (!user) {
      router.push("/login");
      return;
    }
    if (favoritePending) return;

    const next = !isFavorited;
    setIsFavorited(next);
    setFavoritePending(true);
    try {
      if (next) {
        await userApi.addFavorite(restaurant.id);
      } else {
        await userApi.removeFavorite(restaurant.id);
      }
    } catch (error) {
      setIsFavorited(!next);
      Toast.show({ type: "error", text1: extractApiError(error).message });
    } finally {
      setFavoritePending(false);
    }
  }

  const cuisineNames = restaurant.cuisine_types
    ?.map((cuisine) => cuisine.name)
    .join(", ");

  return (
    <View style={styles.header}>
      <Text style={styles.srOnly}>
        Informations sur le Restaurant : menu, avis, à propos
      </Text>

      {restaurant.average_rating !== null && (
        <Badge variant="secondary" style={styles.ratingBadge}>
          <Star size={12} color={Colors.accent} fill={Colors.accent} />
          <Text style={styles.ratingText}>
            {restaurant.average_rating.toFixed(1)}
          </Text>
        </Badge>
      )}

      {restaurant.media.cover ? (
        <Image
          source={{ uri: restaurant.media.cover }}
          style={styles.cover}
          resizeMode="cover"
        />
      ) : (
        <Placeholder style={styles.cover} />
      )}

      <View style={styles.infoSection}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Pressable onPress={handleFavoritePress} hitSlop={8}>
            <Heart
              size={profileList ? 16 : 20}
              color={profileList ? Colors.primary : Colors.secondaryForeground}
              fill={
                profileList
                  ? Colors.primary
                  : isFavorited
                    ? Colors.secondaryForeground
                    : "none"
              }
            />
          </Pressable>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.cuisineRow}>
            {cuisineNames && (
              <Text style={styles.metaText}>Cuisine {cuisineNames}</Text>
            )}
            {restaurant.price_level !== null && (
              <Text style={styles.metaText}>
                {priceLevelLabel(restaurant.price_level)}
              </Text>
            )}
            {restaurant.address.city && (
              <Text style={styles.metaText}>{restaurant.address.city}</Text>
            )}
          </View>
          {userCenter && (
            <Text style={styles.metaText}>{getDistanceLabel()}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  ratingBadge: {
    position: "absolute",
    zIndex: 21,
    top: 28,
    right: 12,
    backgroundColor: Colors.background,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.foreground,
  },
  cover: {
    width: 362,
    height: 225,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  infoSection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    gap: 8,
  },
  titleRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  metaRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cuisineRow: {
    flexDirection: "row",
    gap: 8,
  },
  metaText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: Colors.foreground,
  },
});
