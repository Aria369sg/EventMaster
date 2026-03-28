import * as Keychain from "react-native-keychain";

// Guardar token
export const saveToken = async (token) => {
  try {
    await Keychain.setGenericPassword("token", token);
    return true;
  } catch (error) {
    console.log("Error guardando token:", error);
    return false;
  }
};

// Obtener token
export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.log("Error obteniendo token:", error);
    return null;
  }
};

// Eliminar token
export const deleteToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.log("Error eliminando token:", error);
  }
};