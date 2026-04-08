import api from "./api";

export const generateGenericToken = async () => {
  const { data } = await api.get("/users/token/generic");
  return data;
};

export const registerUser = async (payload) => {
  console.log("REGISTER PAYLOAD:", payload);
  const { data } = await api.post("/users/register", payload);
  console.log("REGISTER RESPONSE:", data);
  return data;
};

export const loginUser = async (payload) => {
  console.log("LOGIN PAYLOAD:", payload);
  const { data } = await api.post("/users/login", payload);
  console.log("API RESPONSE:", data);
  return data;
};

export const registerAdmin = async (payload) => {
  const { data } = await api.post("/admin/register", payload);
  return data;
};

export const loginAdmin = async (payload) => {
  const { data } = await api.post("/admin/login", payload);
  return data;
};
