import { RestaurantQuery } from "@/api/RestaurantApi";
import PinIcon from "@/assets/icon/pin.svg";
import SearchIcon from "@/assets/icon/search.svg";
import GeoContext from "@/contexts/GeoContext";
import type { AddressComponent } from "@/types/mapTypes";
import * as Location from "expo-location";
import { usePathname } from "expo-router";
import { AlertTriangle, MapPin } from "lucide-react-native";
import { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RestaurantFilters from "../Restaurant/RestaurantFilter";
import Button from "../ui/Button";
import Drawer from "../ui/Drawer";

const GMKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

type LocationStatus = "idle" | "error" | "success";

interface SearchingLocProps {
  onFiltersApply?: (query: RestaurantQuery) => void;
}

export default function SearchingLoc({ onFiltersApply }: SearchingLocProps) {
  const pathname = usePathname();
  const { setMapRegion, setUserCenter, userLocation, setUserLocation } =
    useContext(GeoContext);

  const [userLocationError, setUserLocationError] = useState<string[]>([]);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [dialogVisible, setDialogVisible] = useState(false);

  async function handleAddressSubmit() {
    if (userLocation) {
      if (!userLocation.trim()) {
        setUserLocationError(["Veuillez entrer une adresse"]);
        setLocationStatus("error");
        return;
      }

      try {
        const googleResp = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            userLocation,
          )}&key=${GMKey}`,
        );
        const newGeocode = await googleResp.json();
        console.log(
          "geocode status:",
          newGeocode.status,
          "results:",
          newGeocode.results?.[0],
        );

        if (newGeocode.status !== "OK" || !newGeocode.results?.length) {
          setUserLocationError([
            "This address cannot be geolocated. Please avoid using symbols, apartment / suite numbers, city names or zip codes",
          ]);
          setLocationStatus("error");
          return;
        }

        setUserLocationError([]);
        setLocationStatus("success");
        const { lat: latitude, lng: longitude } =
          newGeocode.results[0].geometry.location;
        console.log("geocoded coords:", latitude, longitude);
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setUserCenter({ latitude, longitude });
      } catch (err) {
        console.error("Geocoding failed:", err);
        setUserLocationError(["Une erreur est survenue, veuillez réessayer"]);
        setLocationStatus("error");
      }
    }
  }

  async function handleUseCurrentLocation() {
    setDialogVisible(false);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setUserLocationError(["Permission de géolocalisation refusée"]);
      setLocationStatus("error");
      return;
    }

    const position = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = position.coords;

    setMapRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setUserCenter({ latitude: latitude, longitude: longitude });

    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GMKey}`,
      );
      const data = await resp.json();

      if (data.status === "OK" && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const street = addressComponents.find((c: AddressComponent) =>
          c.types.includes("route"),
        )?.long_name;
        const neighborhood = addressComponents.find(
          (c: AddressComponent) =>
            c.types.includes("neighborhood") || c.types.includes("sublocality"),
        )?.long_name;

        setUserLocation(
          street ?? neighborhood ?? data.results[0].formatted_address,
        );
      }
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      setUserLocation("");
    }
  }

  const isMapScreen = pathname === "/map";

  const [visible, setVisible] = useState(false);

  return (
    <View style={isMapScreen ? styles.containerMap : styles.container}>
      <View style={isMapScreen ? styles.hidden : styles.locationRow}>
        <MapPin color="#fff" size={20} />
        <Text style={styles.locationText}>
          {userLocation && userLocation.length > 1
            ? userLocation
            : "Position actuelle"}
        </Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.inputGroup}>
          <SearchIcon width={20} height={20} />
          <TextInput
            placeholder="Recherche..."
            style={styles.input}
            value={userLocation}
            onChangeText={(text) => setUserLocation(text)}
            onSubmitEditing={handleAddressSubmit}
          />
        </View>

        {locationStatus[0] === "error" && userLocationError.length > 0 ? (
          <AlertTriangle size={20} color="red" />
        ) : (
          <TouchableOpacity
            style={styles.pinButton}
            onPress={() => setDialogVisible(true)}
          >
            <PinIcon width={28} height={28} />
          </TouchableOpacity>
        )}

        <RestaurantFilters
          onApply={onFiltersApply}
          visible={visible}
          setVisible={setVisible}
        />
      </View>

      <Modal
        visible={dialogVisible}
        onRequestClose={() => setDialogVisible(false)}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        <Drawer open={dialogVisible} setOpen={setDialogVisible} height="35%">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lieu choisi</Text>
            <Text style={styles.modalDescription}>
              Autorisation de géolocalisation
            </Text>
            <Text style={styles.modalBody}>
              Pour que nous puissions trouver les restaurants à proximité, nous
              avons besoin de votre autorisation de géolocalisation. Ces
              informations ne seront pas mémorisées et ne serviront que le temps
              de votre session.
            </Text>
            <View style={styles.modalFooter}>
              <Button
                label={"Saisir une adresse manuellement"}
                theme={"outline"}
                onPress={() => setDialogVisible(false)}
              />
              <Button
                label={"Accepter"}
                theme={"primary"}
                onPress={handleUseCurrentLocation}
              />
            </View>
          </View>
        </Drawer>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  containerMap: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    top: 16,
    zIndex: 9999,
  },
  hidden: { display: "none" },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 4,
  },
  locationText: { color: "#fff" },
  searchRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 20,
    alignItems: "center",
  },
  inputGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 45,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 8,
  },
  input: { flex: 1, height: 38, paddingLeft: 4 },
  pinButton: {
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  modalDescription: { color: "#666", marginBottom: 12 },
  modalBody: { marginBottom: 20, lineHeight: 20 },
  modalFooter: { flexDirection: "column", gap: 8 },
});
