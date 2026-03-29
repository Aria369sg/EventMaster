import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";

const TOKEN_KEY = "auth_token_fallback";

/*
  Justificacion del cambio:
  - Keychain es la opcion correcta para guardar JWT porque usa almacenamiento seguro del dispositivo.
  - En Expo Go, algunos modulos nativos externos pueden no estar disponibles y el objeto Keychain llega incompleto o nulo.
  - Para no bloquear la demo y el desarrollo del sprint, agregamos un fallback temporal con AsyncStorage.
  - Este fallback solo se usa cuando Keychain no esta disponible; no reemplaza la estrategia de seguridad final.
  - En una build de desarrollo o version de produccion, lo esperado es volver a usar Keychain como primer camino.
*/
const isKeychainAvailable = () => {
  return (
    Keychain &&
    typeof Keychain.setGenericPassword === "function" &&
    typeof Keychain.getGenericPassword === "function" &&
    typeof Keychain.resetGenericPassword === "function"
  );
};

// Guarda el JWT de forma segura. Si Expo Go no soporta Keychain, cae a un fallback temporal.
export const saveToken = async (token) => {
  try {
    if (isKeychainAvailable()) {
      try {
        await Keychain.setGenericPassword("token", token);
        return true;
      } catch (error) {
        // Si el puente nativo de Keychain falla en Expo Go, usamos el fallback local.
      }
    }

    // Fallback de desarrollo: util para demo, pero menos seguro que Keychain.
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.log("Error guardando token:", error);
    return false;
  }
};

// Lee el token desde Keychain y, si no existe el modulo, desde el almacenamiento temporal.
export const getToken = async () => {
  try {
    if (isKeychainAvailable()) {
      try {
        const credentials = await Keychain.getGenericPassword();
        return credentials ? credentials.password : null;
      } catch (error) {
        // Si Keychain no responde en este entorno, leemos desde el fallback local.
      }
    }

    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.log("Error obteniendo token:", error);
    return null;
  }
};

// Elimina el token guardado sin importar si se uso Keychain o el fallback local.
export const deleteToken = async () => {
  try {
    if (isKeychainAvailable()) {
      try {
        await Keychain.resetGenericPassword();
        return;
      } catch (error) {
        // Si la eliminacion segura falla en Expo Go, borramos el token del fallback.
      }
    }

    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log("Error eliminando token:", error);
  }
};
