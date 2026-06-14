import api from "@/lib/axios";
import type {
  AddOrderItemPayload,
  Order,
  OrderItem,
  Reservation,
  ReservationParticipant,
  StoreReservationPayload,
} from "@/types/reservationTypes";
import type { Paginated } from "@/types/responsesTypes";

export const reservationApi = {
  create: async (
    restaurantId: number | string,
    payload: StoreReservationPayload,
  ): Promise<Reservation> => {
    const { data } = await api.post<{ data: Reservation }>(
      `/restaurants/${restaurantId}/reservations`,
      payload,
    );
    return data.data;
  },

  getMine: async (page = 1): Promise<Paginated<Reservation>> => {
    const { data } = await api.get<Paginated<Reservation>>("/me/reservations", {
      params: { page },
    });
    return data;
  },

  getOne: async (id: number | string): Promise<Reservation> => {
    const { data } = await api.get<{ data: Reservation }>(`/reservations/${id}`);
    return data.data;
  },

  cancel: async (
    id: number | string,
    cancellationReason?: string,
  ): Promise<Reservation> => {
    const { data } = await api.post<{ data: Reservation }>(
      `/reservations/${id}/cancel`,
      { cancellation_reason: cancellationReason ?? null },
    );
    return data.data;
  },

  /** Invitation par liste d'utilisateurs et/ou groupe d'amis (organisateur uniquement) */
  inviteParticipants: async (
    id: number | string,
    payload: { user_ids?: number[]; friend_group_id?: number },
  ): Promise<ReservationParticipant[]> => {
    const { data } = await api.post<{ data: ReservationParticipant[] }>(
      `/reservations/${id}/participants`,
      payload,
    );
    return data.data;
  },

  removeParticipant: async (
    reservationId: number | string,
    participantId: number,
  ): Promise<void> => {
    await api.delete(
      `/reservations/${reservationId}/participants/${participantId}`,
    );
  },

  rsvp: async (
    id: number | string,
    status: "accepted" | "declined",
  ): Promise<ReservationParticipant> => {
    const { data } = await api.post<{ data: ReservationParticipant }>(
      `/reservations/${id}/rsvp`,
      { status },
    );
    return data.data;
  },

  getMyInvitations: async (
    page = 1,
  ): Promise<Paginated<ReservationParticipant>> => {
    const { data } = await api.get<Paginated<ReservationParticipant>>(
      "/me/invitations",
      { params: { page } },
    );
    return data;
  },
};

export const orderApi = {
  /** Ouvre (ou récupère) la commande unique de la réservation — exige is_preorder + confirmed */
  open: async (reservationId: number | string): Promise<Order> => {
    const { data } = await api.post<{ data: Order }>(
      `/reservations/${reservationId}/order`,
    );
    return data.data;
  },

  getOne: async (id: number | string): Promise<Order> => {
    const { data } = await api.get<{ data: Order }>(`/orders/${id}`);
    return data.data;
  },

  addItem: async (
    orderId: number | string,
    payload: AddOrderItemPayload,
  ): Promise<OrderItem> => {
    const { data } = await api.post<{ data: OrderItem }>(
      `/orders/${orderId}/items`,
      payload,
    );
    return data.data;
  },

  updateItem: async (
    itemId: number | string,
    payload: { quantity?: number; notes?: string | null },
  ): Promise<OrderItem> => {
    const { data } = await api.patch<{ data: OrderItem }>(
      `/order-items/${itemId}`,
      payload,
    );
    return data.data;
  },

  removeItem: async (itemId: number | string): Promise<void> => {
    await api.delete(`/order-items/${itemId}`);
  },

  /** Place la commande (organisateur uniquement) — décrémente le stock, 409 INSUFFICIENT_STOCK possible */
  place: async (orderId: number | string): Promise<Order> => {
    const { data } = await api.post<{ data: Order }>(`/orders/${orderId}/place`);
    return data.data;
  },
};
