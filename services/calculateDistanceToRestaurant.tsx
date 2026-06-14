import type { Restaurant } from "@/types/restaurantTypes";

const calculateDistance = (
  userLocation: { lat: number; lng: number },
  restaurant: Restaurant,
): number | null => {
  const { latitude, longitude } = restaurant.address;
  if (latitude === null || longitude === null) return null;

  const R = 6371; // Earth's radius in km

  const dLat = toRad(latitude - userLocation.lat);
  const dLng = toRad(longitude - userLocation.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(userLocation.lat)) *
      Math.cos(toRad(latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

const toRad = (value: number): number => (value * Math.PI) / 180;

export { calculateDistance, toRad };
