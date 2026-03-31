import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const TOKEN_FALLBACK_KEY = "auth_token_fallback";
const TOKEN_SERVICE = "greenmarket_auth_token";

class StorageService {
  static patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/,
  };

  static validate(type, value) {
    return this.patterns[type] ? this.patterns[type].test(value) : false;
  }

  static isSecureStoreAvailable() {
    return (
      SecureStore &&
      typeof SecureStore.isAvailableAsync === "function" &&
      typeof SecureStore.setItemAsync === "function" &&
      typeof SecureStore.getItemAsync === "function" &&
      typeof SecureStore.deleteItemAsync === "function"
    );
  }

  // Datos no sensibles: perfiles, modo de autenticacion, flags locales, etc.
  static async setItem(key, value) {
    try {
      const stringValue =
        typeof value === "object" ? JSON.stringify(value) : String(value);
      await AsyncStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.log("Error guardando en AsyncStorage:", error);
      return false;
    }
  }

  static async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value === null) {
        return null;
      }

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.log("Error leyendo en AsyncStorage:", error);
      return null;
    }
  }

  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log("Error eliminando en AsyncStorage:", error);
      return false;
    }
  }

  // Datos sensibles: JWT o credenciales. SecureStore es el camino principal.
  static async saveToken(key, token) {
    try {
      if (this.isSecureStoreAvailable() && (await SecureStore.isAvailableAsync())) {
        try {
          await SecureStore.setItemAsync(key || TOKEN_SERVICE, String(token));
          return { ok: true, backend: "secureStore" };
        } catch (error) {
          console.log("SecureStore no disponible en este entorno, usando fallback.");
        }
      }

      await AsyncStorage.setItem(key || TOKEN_FALLBACK_KEY, String(token));
      return { ok: true, backend: "asyncStorageFallback" };
    } catch (error) {
      console.log("Error guardando token:", error);
      return { ok: false, backend: null };
    }
  }

  static async getToken(key) {
    try {
      if (this.isSecureStoreAvailable() && (await SecureStore.isAvailableAsync())) {
        try {
          const token = await SecureStore.getItemAsync(key || TOKEN_SERVICE);
          if (token) {
            return token;
          }
        } catch (error) {
          console.log("SecureStore no respondio, leyendo fallback local.");
        }
      }

      return await AsyncStorage.getItem(key || TOKEN_FALLBACK_KEY);
    } catch (error) {
      console.log("Error obteniendo token:", error);
      return null;
    }
  }

  static async resetToken(key) {
    try {
      if (this.isSecureStoreAvailable() && (await SecureStore.isAvailableAsync())) {
        try {
          await SecureStore.deleteItemAsync(key || TOKEN_SERVICE);
        } catch (error) {
          console.log("No fue posible borrar en SecureStore, limpiando fallback.");
        }
      }

      await AsyncStorage.removeItem(key || TOKEN_FALLBACK_KEY);
      return true;
    } catch (error) {
      console.log("Error borrando token:", error);
      return false;
    }
  }

  // Util para comprobar durante pruebas de clase en donde se guardo el token.
  static async getTokenDebugInfo(key) {
    const serviceKey = key || TOKEN_SERVICE;
    const fallbackKey = key || TOKEN_FALLBACK_KEY;

    try {
      let secureStoreValue = null;
      const secureStoreAvailable =
        this.isSecureStoreAvailable() && (await SecureStore.isAvailableAsync());

      if (secureStoreAvailable) {
        try {
          secureStoreValue = await SecureStore.getItemAsync(serviceKey);
        } catch (error) {
          secureStoreValue = null;
        }
      }

      const fallbackValue = await AsyncStorage.getItem(fallbackKey);

      return {
        secureStoreAvailable,
        secureStoreHasToken: Boolean(secureStoreValue),
        asyncStorageFallbackHasToken: Boolean(fallbackValue),
        activeBackend: secureStoreValue
          ? "secureStore"
          : fallbackValue
            ? "asyncStorageFallback"
            : "none",
      };
    } catch (error) {
      console.log("Error leyendo estado del storage:", error);
      return {
        secureStoreAvailable: false,
        secureStoreHasToken: false,
        asyncStorageFallbackHasToken: false,
        activeBackend: "unknown",
      };
    }
  }
}

export { TOKEN_FALLBACK_KEY, TOKEN_SERVICE };
export default StorageService;
