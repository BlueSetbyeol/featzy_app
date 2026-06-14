import GeoContext from "@/contexts/GeoContext";
import type { Restaurant } from "@/types/restaurantTypes";
import { useContext, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

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
    console.log("userCenter changed:", userCenter, "mapRef:", !!mapRef.current);
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

  return (
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
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { width: "100%", height: "100%" },
});
