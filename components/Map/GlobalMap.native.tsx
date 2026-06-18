import { Colors } from "@/constants/Colors";
import GeoContext from "@/contexts/GeoContext";
import type { Restaurant } from "@/types/restaurantTypes";
import { useContext, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import RestaurantDrawer from "../Restaurant/RestaurantDrawer";
import Badge from "../ui/Badge";

interface MapGlobalProps {
  restaurants: Restaurant[];
}

const DEFAULT_REGION: Region = {
  latitude: 46.413512,
  longitude: 2.558082,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

export default function MapGlobal({ restaurants }: MapGlobalProps) {
  const { mapRegion, setMapRegion, userCenter } = useContext(GeoContext);
  const mapRef = useRef<MapView>(null);

  const initialRegion: Region = mapRegion
    ? {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        latitudeDelta: mapRegion.latitudeDelta,
        longitudeDelta: mapRegion.longitudeDelta,
      }
    : DEFAULT_REGION;

  useEffect(() => {
    if (!userCenter || !mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: userCenter.latitude,
        longitude: userCenter.longitude,
        latitudeDelta: mapRegion?.latitudeDelta ?? 0.05,
        longitudeDelta: mapRegion?.longitudeDelta ?? 0.05,
      },
      800,
    );
  }, [userCenter]);

  const [previewRestaurant, setPreviewRestaurant] = useState<Restaurant | null>(
    null,
  );
  const [drawerRestaurant, setDrawerRestaurant] = useState<Restaurant | null>(
    null,
  );

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={(region) => {
          setMapRegion({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          });
        }}
        showsUserLocation
      >
        {restaurants.map((restaurant) => {
          const { latitude, longitude } = restaurant.address;
          if (latitude === null || longitude === null) return null;

          return (
            <Marker
              key={restaurant.id}
              coordinate={{ latitude, longitude }}
              title={restaurant.name}
              onPress={() => {
                mapRef.current?.animateToRegion(
                  {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  },
                  300,
                );
                setPreviewRestaurant(restaurant);
              }}
            />
          );
        })}
      </MapView>
      {previewRestaurant && (
        <Pressable
          style={styles.previewCard}
          onPress={() => {
            setDrawerRestaurant(previewRestaurant);
            setPreviewRestaurant(null);
            setOpen(true);
          }}
        >
          <Text style={styles.previewTitle}>{previewRestaurant.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {previewRestaurant.cuisine_types !== undefined &&
              previewRestaurant.cuisine_types.map((cuisine) => (
                <Text style={styles.previewText} key={cuisine.id}>
                  {cuisine.name}
                </Text>
              ))}
            {previewRestaurant.average_rating !== null && (
              <Badge variant="secondary">
                <Text style={styles.previewRating}>
                  ★ {previewRestaurant.average_rating.toFixed(1)}
                </Text>
              </Badge>
            )}
          </View>
          <Text style={styles.previewText}>
            {previewRestaurant.description}
          </Text>
        </Pressable>
      )}

      {drawerRestaurant && (
        <RestaurantDrawer
          open={open}
          setOpen={setOpen}
          restaurant={drawerRestaurant}
          profileList={false}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: { width: "100%", height: "100%" },
  previewCard: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: Colors.card,
    padding: 10,
    borderRadius: 12,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  previewText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: Colors.foreground,
  },
  previewRating: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: Colors.foreground,
  },
});
