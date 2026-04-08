import api from "./api";

export const createReservation = async (payload) => {
  const { data } = await api.post(
    "/users/reservations/create-reservation",
    payload,
  );
  return data;
};

export const cancelReservation = async (ticketId) => {
  console.log("ID QUE SE ENVIA:", ticketId);
  const { data } = await api.delete(
    `/users/reservations/cancel-reservation/${ticketId}`
  );
  return data;
};

export const reservations = async () => {
  const { data } = await api.get(
    "/users/reservations/my-reservations",
  );
  return data;
};
