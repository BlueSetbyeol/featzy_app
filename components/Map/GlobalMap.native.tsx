import GeoContext from "@/contexts/GeoContext";
import type { Restaurant } from "@/types/restaurantTypes";
import { useContext } from "react";
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
  const { mapRegion, setMapRegion } = useContext(GeoContext);

  const initialRegion: Region = mapRegion
    ? {
        latitude: mapRegion.lat,
        longitude: mapRegion.lng,
        latitudeDelta: mapRegion.latitudeDelta,
        longitudeDelta: mapRegion.longitudeDelta,
      }
    : DEFAULT_REGION;

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      onRegionChangeComplete={(region) => {
        setMapRegion({
          lat: region.latitude,
          lng: region.longitude,
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
