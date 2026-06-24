import { RestaurantQuery } from "@/api/RestaurantApi";
import { referenceApi } from "@/api/referenceApi";
import FiltersIcon from "@/assets/icon/filters_red.svg";
import { Colors } from "@/constants/Colors";
import { extractApiError } from "@/lib/axios";
import { priceLevelLabel } from "@/lib/format";
import type { CuisineType } from "@/types/restaurantTypes";
import { Star, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Label from "../Label";
import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup";
import Drawer from "../ui/Drawer";
import Separator from "../ui/Separator";
import ToggleChip from "../ui/ToggleChip";

interface RestaurantFiltersProps {
  onApply?: (query: RestaurantQuery) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const PRICE_LEVELS = [1, 2, 3] as const;
const MIN_RATINGS = [null, 3.5, 4, 4.5, 5] as const;

export default function RestaurantFilters({
  onApply,
  visible,
  setVisible,
}: RestaurantFiltersProps) {
  const [priceLevel, setPriceLevel] = useState<1 | 2 | 3 | undefined>();
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<number | undefined>();
  const [cuisines, setCuisines] = useState<CuisineType[]>([]);
  const [selectedAvis, setSelectedAvis] = useState<number | null>(null);
  const [selectedHoraire, setSelectedHoraire] = useState<string>("Tous");
  const [selectedPersonnes, setSelectedPersonnes] = useState<number | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    referenceApi
      .getCuisineTypes()
      .then((list) => {
        if (!cancelled) setCuisines(list);
      })
      .catch((error) => {
        if (!cancelled)
          Toast.show({ type: "error", text1: extractApiError(error).message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleFilterSubmit() {
    onApply?.({
      filter: {
        ...(priceLevel && { price_level: priceLevel }),
        ...(minRating && { min_rating: minRating }),
        ...(selectedCuisine && { cuisine: selectedCuisine }),
      },
    });
    setVisible(false);
  }

  function handleClear() {
    setPriceLevel(undefined);
    setMinRating(null);
    setSelectedCuisine(undefined);
    setSelectedAvis(null);
    setSelectedHoraire("Tous");
    setSelectedPersonnes(null);
    onApply?.({});
    setVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setVisible(true)}
      >
        <FiltersIcon width={20} height={20} />
      </TouchableOpacity>

      <Drawer open={visible} setOpen={setVisible}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Filtres</Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <X size={24} color={Colors.foreground} />
          </TouchableOpacity>
        </View>
        <Separator />

        <View style={styles.section}>
          <Label>Prix par personne (moyenne)</Label>
          <ButtonGroup style={{ marginTop: 8 }}>
            <ToggleChip
              label="Tous"
              selected={priceLevel === undefined}
              onPress={() => setPriceLevel(undefined)}
            />
            {PRICE_LEVELS.map((level) => (
              <ToggleChip
                key={level}
                label={priceLevelLabel(level)}
                selected={priceLevel === level}
                onPress={() => setPriceLevel(level)}
              />
            ))}
          </ButtonGroup>
        </View>

        <View style={styles.section}>
          <Label>Notes</Label>
          <ButtonGroup style={{ marginTop: 8 }}>
            {MIN_RATINGS.map((rating) => (
              <ToggleChip
                key={rating ?? "Toutes"}
                label={rating === null ? "Toutes" : rating.toFixed(1)}
                selected={minRating === rating}
                onPress={() => setMinRating(rating)}
                icon={
                  rating !== null ? (
                    <Star
                      size={14}
                      color={Colors.accent}
                      fill={Colors.accent}
                    />
                  ) : undefined
                }
              />
            ))}
          </ButtonGroup>
        </View>

        <View style={styles.section}>
          <Label>Nombre d`&apos;`avis (soon)</Label>
          <ButtonGroup style={{ marginTop: 8 }}>
            {[null, 100, 200, 300].map((avis) => (
              <ToggleChip
                key={avis ?? "Tout"}
                label={avis === null ? "Tout" : `+ de ${avis}`}
                selected={selectedAvis === avis}
                onPress={() => setSelectedAvis(avis)}
              />
            ))}
          </ButtonGroup>
        </View>

        <View style={styles.section}>
          <Label>Horaire (soon)</Label>
          <ButtonGroup style={{ marginTop: 8 }}>
            {["Tous", "Ouvert", "Perso"].map((horaire) => (
              <ToggleChip
                key={horaire}
                label={horaire}
                selected={selectedHoraire === horaire}
                onPress={() => setSelectedHoraire(horaire)}
              />
            ))}
          </ButtonGroup>
        </View>

        <View style={styles.section}>
          <Label>Nombre de personne (soon)</Label>
          <ButtonGroup style={{ marginTop: 8 }}>
            {[null, 3, 8, 10].map((nb) => (
              <ToggleChip
                key={nb ?? "Tout"}
                label={nb === null ? "Tout" : `+ de ${nb}`}
                selected={selectedPersonnes === nb}
                onPress={() => setSelectedPersonnes(nb)}
              />
            ))}
          </ButtonGroup>
        </View>

        <View style={styles.section}>
          <Label>Cuisine</Label>
          <View style={styles.cuisineGrid}>
            <ToggleChip
              label="Tout"
              selected={selectedCuisine === undefined}
              onPress={() => setSelectedCuisine(undefined)}
            />
            {cuisines.map((cuisine) => (
              <ToggleChip
                key={cuisine.id}
                label={cuisine.name}
                selected={selectedCuisine === cuisine.id}
                onPress={() =>
                  setSelectedCuisine(
                    selectedCuisine === cuisine.id ? undefined : cuisine.id,
                  )
                }
              />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={{ flex: 1 }}>
            <Button label="Effacer" theme="secondary" onPress={handleClear} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              label="Appliquer"
              theme="primary"
              onPress={handleFilterSubmit}
            />
          </View>
        </View>
      </Drawer>
    </>
  );
}

const styles = StyleSheet.create({
  triggerButton: {
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "600" },
  section: { marginVertical: 8 },
  cuisineGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
});
