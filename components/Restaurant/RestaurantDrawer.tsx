import Separator from "@/components/ui/Separator";
import type { Restaurant } from "@/types/restaurantTypes";
import { ScrollView, StyleSheet, View } from "react-native";
import Button from "../ui/Button";
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
    <Drawer open={open} setOpen={setOpen} key={restaurant.id} height="80%">
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
          <Button label={"Reserver"} theme={"primary"} disabled={false} />
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
  },
  scrollContent: {
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
