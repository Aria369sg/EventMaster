import AsyncStorage from "@react-native-async-storage/async-storage";

// Guarda informacion no sensible en almacenamiento local persistente.
export const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error guardando item:", error);
  }
};

// Recupera el valor y lo convierte de JSON a objeto de JavaScript.
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log("Error obteniendo item:", error);
    return null;
  }
};

// Elimina un dato local cuando ya no se necesita.
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error eliminando item:", error);
  }
};
