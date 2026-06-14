import type { Restaurant } from "./restaurantTypes";

export type ServiceType =
  | "lunch"
  | "dinner"
  | "brunch"
  | "continuous"
  | "other";

export type Service = {
  id: number;
  restaurant_id: number;
  name: string;
  type: ServiceType;
  type_label: string;
  capacity_pool_key: string | null;
  max_simultaneous_covers: number;
  max_covers_per_slot: number | null;
  seating_duration_minutes: number;
  slot_interval_minutes: number;
  min_party_size: number;
  max_party_size: number;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AvailabilitySlot = {
  /** À renvoyer tel quel dans reserved_at lors du POST réservation */
  reserved_at: string;
  time: string;
};

export type Availability = {
  service: Service;
  date: string;
  slots: AvailabilitySlot[];
};

export type ReservationStatus =
  | "confirmed"
  | "seated"
  | "completed"
  | "cancelled"
  | "no_show";

export type FriendMember = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
};

export type InvitationStatus = "pending" | "accepted" | "declined";

export type ReservationParticipant = {
  id: number;
  reservation_id: number;
  user_id: number;
  role: "organizer" | "guest";
  invitation_status: InvitationStatus;
  is_attending: boolean;
  responded_at: string | null;
  user?: FriendMember;
  reservation?: Reservation;
  created_at: string;
  updated_at: string;
};

export type Reservation = {
  id: number;
  public_uuid: string;
  restaurant_id: number;
  service_id: number;
  organizer_id: number;
  party_size: number;
  reserved_at: string;
  slot_at: string;
  ends_at: string;
  seating_duration_minutes: number;
  capacity_pool_key: string | null;
  status: ReservationStatus;
  is_preorder: boolean;
  special_requests: string | null;
  seated_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancelled_by_id: number | null;
  cancellation_reason: string | null;
  restaurant?: Restaurant;
  service?: Service;
  participants?: ReservationParticipant[];
  created_at: string;
  updated_at: string;
};

export type StoreReservationPayload = {
  service_id: number;
  date: string;
  reserved_at: string;
  party_size: number;
  is_preorder?: boolean;
  special_requests?: string | null;
};

export type Review = {
  id: number;
  restaurant_id: number;
  user_id: number;
  reservation_id: number;
  rating: number;
  comment: string | null;
  status: "pending" | "published" | "hidden";
  reviewer?: { id: number; first_name: string; last_name: string };
  created_at: string;
  updated_at: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "served"
  | "cancelled";

export type OrderItemOption = {
  id: number;
  order_item_id: number;
  menu_item_option_id: number;
  label_snapshot: string;
  price_delta_snapshot: number;
  quantity: number;
};

/** Montants en centimes — utiliser formatPrice() pour l'affichage */
export type OrderItem = {
  id: number;
  order_id: number;
  reservation_participant_id: number;
  menu_item_id: number;
  name_snapshot: string;
  quantity: number;
  unit_price_snapshot: number;
  options_total_snapshot: number;
  line_total: number;
  status: string;
  notes: string | null;
  options?: OrderItemOption[];
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: number;
  reservation_id: number;
  restaurant_id: number;
  status: OrderStatus;
  items_total: number;
  placed_at: string | null;
  stock_restored_at: string | null;
  notes: string | null;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
};

export type AddOrderItemPayload = {
  menu_item_id: number;
  reservation_participant_id: number;
  quantity: number;
  options?: { id: number; quantity?: number }[];
  notes?: string | null;
};
