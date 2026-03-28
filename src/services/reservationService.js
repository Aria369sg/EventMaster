import api from "./api";

export const createReservation = async (payload) => {
  const { data } = await api.post(
    "/users/reservations/createreservation",
    payload,
  );
  return data;
};

export const cancelReservation = async (id) => {
  const { data } = await api.delete(
    `/users/reservations/cancelreservation/${id}`,
  );
  return data;
};
