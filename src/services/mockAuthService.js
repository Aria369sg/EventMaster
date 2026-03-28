import { mockUsers } from "../models/mockData";

const wait = (time = 500) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const loginWithMock = async ({ email, password }) => {
  await wait();

  const user = mockUsers.find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!user || user.password !== password) {
    const error = new Error("Credenciales incorrectas.");
    error.response = { status: 401 };
    throw error;
  }

  return {
    message: "Login successful",
    token: `mock-token-${user.role}-${user.id}`,
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
  };
};
