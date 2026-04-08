import StorageService from "./StorageService";

// Guarda informacion no sensible en almacenamiento local persistente.
export const saveItem = async (key, value) => {
  await StorageService.setItem(key, value);
};

// Recupera el valor y lo convierte de JSON a objeto de JavaScript.
export const getItem = async (key) => {
  return await StorageService.getItem(key);
};

// Elimina un dato local cuando ya no se necesita.
export const removeItem = async (key) => {
  await StorageService.removeItem(key);
};
