import { useState } from "react";
import StorageService from "../helpers/StorageService";
import { saveItem } from "../helpers/storage";
import { useForm } from "../hooks/useForm";
import { saveToken } from "../helpers/tokenStorage";
import { APP_CONFIG } from "../models/appConfig";
import { STORAGE_KEYS } from "../models/storageKeys";
import { loginUser, loginAdmin } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const loginInitialValues = {
  email: "",
  password: "",
};

const loginValidations = {
  email: {
    regex: StorageService.patterns.email,
    message: "Ingresa un correo valido.",
  },
  password: {
    regex: StorageService.patterns.password,
    message: "La contrasena debe tener al menos 6 caracteres.",
  },
};

const getErrorMessage = (error) => {
  const status = error?.response?.status;

  if (status === 400) {
    return "Revisa los datos enviados.";
  }

  if (status === 401) {
    return "Credenciales incorrectas.";
  }

  if (status === 500) {
    return "El servidor tuvo un problema. Intenta de nuevo.";
  }

  return "No fue posible iniciar sesion.";
};

export default function useLoginViewModel() {
  // El ViewModel concentra la logica y deja la vista enfocada solo en renderizar.
  const { form, errors, handleChange, validateForm, resetForm } = useForm(
    loginInitialValues,
    loginValidations,
  );
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitLogin = async () => {
  setSubmitError("");
  setSuccessMessage("");

  if (!validateForm()) {
    return false;
  }

  try {
    setLoading(true);

    const isMock = APP_CONFIG.useMockAuth;
    let response = null;
    let roleDetected = null;

    try {
      response = await loginUser(form);
      roleDetected = "user";
    } catch (errorUser) {
      try {
        response = await loginAdmin(form);
        roleDetected = "admin";
      } catch (errorAdmin) {
        throw errorAdmin;
      }
    }

    if (response?.token) {
      await saveToken(response.token);

      const decoded = jwtDecode(response.token);

      const user = {
        id: decoded.id,
        email: decoded.email,
        role: roleDetected || decoded.role,
        name: decoded.email.split("@")[0],
      };

      await saveItem(STORAGE_KEYS.userProfile, user);

      return { ...response, user };
    }

    await saveItem(STORAGE_KEYS.authMode, isMock ? "mock" : "api");

    setSuccessMessage(response?.message || "Login exitoso.");
    resetForm();

    return response;

  } catch (error) {
      console.log("ERROR COMPLETO:", error);
      console.log("ERROR RESPONSE:", error?.response);
      console.log("ERROR DATA:", error?.response?.data);

      setSubmitError(getErrorMessage(error));

      return false;
    } finally {
    setLoading(false);
  }
};

  return {
    form,
    errors,
    loading,
    submitError,
    successMessage,
    handleChange,
    submitLogin,
  };
}
