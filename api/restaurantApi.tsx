import api from "../lib/axios";
import { Availability, Review } from "../types/reservationTypes";
import { CursorPaginated, Paginated } from "../types/responsesTypes";
import { MenuCategory, Restaurant } from "../types/restaurantTypes";

export type RestaurantFilters = {
  city?: string;
  price_level?: 1 | 2 | 3;
  accepts_preorders?: boolean;
  /** Un seul id de type de cuisine */
  cuisine?: number;
  min_rating?: number;
  search?: string;
};

export type RestaurantQuery = {
  filter?: RestaurantFilters;
  /** name | average_rating | created_at | distance (préfixe "-" pour desc) */
  sort?: string;
  page?: number;
  latitude?: number;
  longitude?: number;
  /** Rayon en km, nécessite latitude/longitude */
  radius?: number;
};

function buildParams(query: RestaurantQuery): Record<string, string> {
  const params: Record<string, string> = {};
  if (query.filter) {
    for (const [key, value] of Object.entries(query.filter)) {
      if (value !== undefined && value !== "") {
        params[`filter[${key}]`] = String(value);
      }
    }
  }
  if (query.sort) params.sort = query.sort;
  if (query.page) params.page = String(query.page);
  if (query.latitude !== undefined) params.latitude = String(query.latitude);
  if (query.longitude !== undefined) params.longitude = String(query.longitude);
  if (query.radius !== undefined) params.radius = String(query.radius);
  return params;
}

export const RestaurantApi = {
  getAll: async (
    query: RestaurantQuery = {},
  ): Promise<Paginated<Restaurant>> => {
    const { data } = await api.get<Paginated<Restaurant>>(
      "/discovery/restaurants",
      { params: buildParams(query) },
    );
    return data;
  },

  /** Agrège toutes les pages (carte, listes complètes) — pagination back fixe à 15 */
  getAllPages: async (query: RestaurantQuery = {}): Promise<Restaurant[]> => {
    const restaurants: Restaurant[] = [];
    let page = 1;
    let lastPage = 1;
    do {
      const result = await RestaurantApi.getAll({ ...query, page });
      restaurants.push(...result.data);
      lastPage = result.meta.last_page;
      page += 1;
    } while (page <= lastPage);
    return restaurants;
  },

  getOne: async (id: number | string): Promise<Restaurant> => {
    const { data } = await api.get<{ data: Restaurant }>(
      `/discovery/restaurants/${id}`,
    );
    return data.data;
  },

  getMenu: async (id: number | string): Promise<MenuCategory[]> => {
    const { data } = await api.get<{ data: MenuCategory[] }>(
      `/discovery/restaurants/${id}/menu`,
    );
    return data.data;
  },

  getReviews: async (
    id: number | string,
    cursor?: string,
  ): Promise<CursorPaginated<Review>> => {
    const { data } = await api.get<CursorPaginated<Review>>(
      `/discovery/restaurants/${id}/reviews`,
      { params: cursor ? { cursor } : {} },
    );
    return data;
  },

  getAvailability: async (
    id: number | string,
    params: { date: string; party_size: number; service_id?: number },
  ): Promise<Availability[]> => {
    const { data } = await api.get<{ data: Availability[] }>(
      `/restaurants/${id}/availability`,
      { params },
    );
    return data.data;
  },
};
