import { useState } from "react";
import { saveItem } from "../helpers/storage";
import { useForm } from "../hooks/useForm";
import { saveToken } from "../helpers/tokenStorage";
import { STORAGE_KEYS } from "../models/storageKeys";
import { loginWithMock } from "../services/mockAuthService";

const loginInitialValues = {
  email: "",
  password: "",
};

const loginValidations = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Ingresa un correo valido.",
  },
  password: {
    regex: /^.{6,}$/,
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
      const response = await loginWithMock(form);

      if (response?.token) {
        await saveToken(response.token);
      }

      if (response?.user) {
        await saveItem(STORAGE_KEYS.userProfile, response.user);
      }

      await saveItem(STORAGE_KEYS.authMode, "mock");

      setSuccessMessage(response?.message || "Login exitoso.");
      resetForm();
      return response;
    } catch (error) {
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
