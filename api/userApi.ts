import api, { initCsrf } from "@/lib/axios";
import type { Restaurant } from "@/types/restaurantTypes";
import type { FriendMember } from "@/types/reservationTypes";
import type { Paginated } from "@/types/responsesTypes";

export const userApi = {
  /** Restaurants favoris (RestaurantResource complet, is_favorited=true) */
  getFavorites: async (page = 1): Promise<Paginated<Restaurant>> => {
    const { data } = await api.get<Paginated<Restaurant>>("/me/favorites", {
      params: { page },
    });
    return data;
  },

  addFavorite: async (restaurantId: number): Promise<void> => {
    await initCsrf();
    await api.put(`/restaurants/${restaurantId}/favorite`);
  },

  removeFavorite: async (restaurantId: number): Promise<void> => {
    await initCsrf();
    await api.delete(`/restaurants/${restaurantId}/favorite`);
  },

  /** Recherche d'utilisateurs à inviter (max 10 résultats, throttle 30/min) */
  searchUsers: async (q: string): Promise<FriendMember[]> => {
    const { data } = await api.get<{ data: FriendMember[] }>("/users/search", {
      params: { q },
    });
    return data.data;
  },
};
