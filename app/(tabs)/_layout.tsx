import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const Home = require("@/assets/images/icon/home.svg");
const HomeSelected = require("@/assets/images/icon/home_selected.svg");
const Map = require("@/assets/images/icon/map.svg");
const MapSelected = require("@/assets/images/icon/map_selected.svg");
const Resa = require("@/assets/images/icon/reservation.svg");
const ResaSelected = require("@/assets/images/icon/reservation_selected.svg");
const Profil = require("@/assets/images/icon/profil.svg");
const ProfilSelected = require("@/assets/images/icon/profil_selected.svg");

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: "#860909",
        // },
        // headerShadowVisible: false,
        // headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#860909",
          height: 80,
          paddingTop: 5,
        },
        tabBarIconStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? Home : HomeSelected}
              style={styles.image}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? Map : MapSelected}
              style={styles.image}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: "Réservation",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? Resa : ResaSelected}
              style={styles.image}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? Profil : ProfilSelected}
              style={styles.image}
              contentFit="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});
