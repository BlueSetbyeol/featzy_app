import { createContext, useState } from "react";
import { Geolocation } from "../types/mapTypes";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Region extends Coordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

interface GeoProps {
  Geo?: Geolocation;
  setGeo: React.Dispatch<React.SetStateAction<Geolocation | undefined>>;
  mapRegion?: Region;
  setMapRegion: (region: Region) => void;
  userCenter?: Coordinates;
  setUserCenter: (userCenter: Coordinates) => void;
  userLocation?: string;
  setUserLocation: (userLocation: string) => void;
}

const GeoContext = createContext<GeoProps>({
  setGeo: () => {},
  setMapRegion: () => {},
  setUserCenter: () => {},
  setUserLocation: () => {},
});

export const GeoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Geo, setGeo] = useState<Geolocation | undefined>();
  const [mapRegion, setMapRegion] = useState<Region | undefined>();
  const [userCenter, setUserCenter] = useState<Coordinates | undefined>();
  const [userLocation, setUserLocation] = useState<string>("");

  return (
    <GeoContext.Provider
      value={{
        Geo,
        setGeo,
        mapRegion,
        setMapRegion,
        userCenter,
        setUserCenter,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
};

export default GeoContext;
