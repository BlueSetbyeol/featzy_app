export type CuisineType = {
  id: number;
  name: string;
  is_active: boolean;
  restaurants_count?: number;
};

export type Allergen = {
  id: number;
  name: string;
  icon: string | null;
  position: number;
};

export type DietaryPreferenceOption = {
  value: string;
  label: string;
};

export type RestaurantAddress = {
  street: string | null;
  postal_code: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
};

/** day_of_week : 0 = dimanche … 6 = samedi (même convention que Date.getDay()) */
export type OpeningHour = {
  day_of_week: number;
  day_name: string;
  opens_at: string;
  last_seating_at: string;
  closes_at: string;
  crosses_midnight: boolean;
  service_name: string;
};

export type RestaurantMedia = {
  logo: string | null;
  cover: string | null;
  gallery: string[];
};

export type Restaurant = {
  id: number;
  owner_id: number;
  name: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  address: RestaurantAddress;
  price_level: 1 | 2 | 3 | null;
  accepts_preorders: boolean;
  accepts_online_payment: boolean;
  cancellation_deadline_hours: number;
  booking_horizon_days: number;
  status: string;
  average_rating: number | null;
  reviews_count: number;
  is_favorited?: boolean;
  cuisine_types?: CuisineType[];
  opening_hours?: OpeningHour[];
  media: RestaurantMedia;
  created_at: string;
  updated_at: string;
};

export type MenuItemPhoto = {
  id: number;
  url: string;
  thumb: string;
  card: string;
};

/** Prix en centimes (price, price_delta, *_total…) — utiliser formatPrice() pour l'affichage */
export type MenuItemOption = {
  id: number;
  option_group_id: number;
  name: string;
  price_delta: number;
  stock_quantity: number | null;
  is_sold_out: boolean;
  is_available: boolean;
  position: number;
};

export type MenuItemOptionGroup = {
  id: number;
  menu_item_id: number;
  name: string;
  min_select: number;
  max_select: number;
  is_required: boolean;
  position: number;
  options?: MenuItemOption[];
};

export type MenuItem = {
  id: number;
  restaurant_id: number;
  menu_category_id: number;
  name: string;
  description: string | null;
  price: number;
  is_available: boolean;
  position: number;
  stock_quantity: number | null;
  is_sold_out: boolean;
  preparation_minutes: number | null;
  option_groups?: MenuItemOptionGroup[];
  allergens?: Allergen[];
  photos: MenuItemPhoto[];
  created_at: string;
  updated_at: string;
};

export type MenuCategory = {
  id: number;
  restaurant_id: number;
  name: string;
  description: string | null;
  position: number;
  is_active: boolean;
  menu_items?: MenuItem[];
  created_at: string;
  updated_at: string;
};
