import api from "./api";

export const createEvent = async (payload) => {
  const { data } = await api.post("/admin/events/create-event", payload);
  return data;
};

export const getAllEvents = async () => {
  const { data } = await api.get("/events/getall-events");
  return data;
};

export const updateEvent = async (id, payload) => {
  const { data } = await api.put(`/admin/events/updateevent/${id}`, payload);
  return data;
};

export const deleteEvent = async (id) => {
  const { data } = await api.delete(`/admin/events/delete-event/${id}`);
  return data;
};
