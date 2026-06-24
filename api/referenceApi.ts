import api from "@/lib/axios";
import type {
  Allergen,
  CuisineType,
  DietaryPreferenceOption,
} from "@/types/restaurantTypes";

export const referenceApi = {
  getCuisineTypes: async (): Promise<CuisineType[]> => {
    const { data } = await api.get<{ data: CuisineType[] }>("/cuisine-types");
    return data.data;
  },

  getAllergens: async (): Promise<Allergen[]> => {
    const { data } = await api.get<{ data: Allergen[] }>("/allergens");
    return data.data;
  },

  getDietaryPreferences: async (): Promise<DietaryPreferenceOption[]> => {
    const { data } = await api.get<{ data: DietaryPreferenceOption[] }>(
      "/dietary-preferences",
    );
    return data.data;
  },
};
