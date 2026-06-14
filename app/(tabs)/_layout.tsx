import Home from "@/assets/icon/home.svg";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import HomeSelected from "@/assets/icon/home_selected.svg";
import Map from "@/assets/icon/map.svg";
import MapSelected from "@/assets/icon/map_selected.svg";
import Profil from "@/assets/icon/profil.svg";
import ProfilSelected from "@/assets/icon/profil_selected.svg";
import Resa from "@/assets/icon/reservation.svg";
import ResaSelected from "@/assets/icon/reservation_selected.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: Colors.primary,
        // },
        // headerShadowVisible: false,
        // headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: Colors.primary,
          height: 80,
          paddingTop: 15,
        },
        tabBarIconStyle: {
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
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Home style={styles.image} />
            ) : (
              <HomeSelected style={styles.image} />
            ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Map style={styles.image} />
            ) : (
              <MapSelected style={styles.image} />
            ),
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: "Réservation",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Resa style={styles.image} />
            ) : (
              <ResaSelected style={styles.image} />
            ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Profil style={styles.image} />
            ) : (
              <ProfilSelected style={styles.image} />
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
