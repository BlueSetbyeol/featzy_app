import Separator from "@/components/ui/Separator";
import { Colors } from "@/constants/Colors";
import type { Restaurant } from "@/types/restaurantTypes";
import { Href, Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Drawer from "../ui/Drawer";
import RestaurantAvailableTime from "./RestaurantAvailableTime";
import RestaurantDrawerContent from "./RestaurantDrawerContent";
import RestaurantDrawerHeader from "./RestaurantDrawerHeader";

interface RestaurantDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  restaurant: Restaurant;
  profileList: boolean;
}

export default function RestaurantDrawer({
  open,
  setOpen,
  restaurant,
  profileList,
}: RestaurantDrawerProps) {
  return (
    <Drawer open={open} setOpen={setOpen} key={restaurant.id}>
      <View style={styles.content}>
        <RestaurantDrawerHeader
          restaurant={restaurant}
          profileList={profileList}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <Separator />
          <RestaurantAvailableTime
            aboutOrReservation="about"
            restaurantId={restaurant.id}
          />
          <RestaurantDrawerContent restaurantId={restaurant.id.toString()} />
        </ScrollView>

        <View style={styles.footer}>
          {/* <Link
            href={{
              pathname: "/restaurant/[id]/new-reservation",
              params: { id: restaurant.id },
            }}
            asChild
          > */}
          <Link
            href={`/restaurant/${restaurant.id}/new-reservation` as Href}
            asChild
          >
            <Pressable style={styles.reserveButton}>
              <Text style={styles.reserveButtonText}>Réserver</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  reserveButton: {
    borderRadius: 8,
    backgroundColor: Colors.primary,
    padding: 8,
    alignItems: "center",
  },
  reserveButtonText: {
    color: Colors.primaryForeground,
  },
});
