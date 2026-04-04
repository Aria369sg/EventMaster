import { useState } from "react";
import { APP_CONFIG } from "../models/appConfig";
import { useForm } from "../hooks/useForm";
import { registerAdmin, registerUser } from "../services/authService";

const getErrorMessage = (error) => {
  const status = error?.response?.status;

  if (status === 400) {
    return "Revisa los datos enviados.";
  }

  if (status === 409) {
    return "Ese correo ya esta registrado.";
  }

  if (status === 500) {
    return "El servidor tuvo un problema. Intenta de nuevo.";
  }

  return "No fue posible registrar la cuenta.";
};

const registerInitialValues = {
  name: "",
  email: "",
  password: "",
};

const registerValidations = {
  name: {
    regex: /^[A-Za-zÀ-ÿ\s]{3,}$/,
    message: "Ingresa un nombre valido.",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Ingresa un correo valido.",
  },
  password: {
    regex: /^.{6,}$/,
    message: "La contrasena debe tener al menos 6 caracteres.",
  },
};

export default function useRegisterViewModel(isAdmin = false) {
  const { form, errors, handleChange, validateForm, resetForm } = useForm(
    registerInitialValues,
    registerValidations,
  );
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitRegister = async () => {
    setSubmitError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return false;
    }

    try {
      setLoading(true);

      if (APP_CONFIG.useMockAuth) {
        await new Promise((resolve) => {
          setTimeout(resolve, 500);
        });

        setSuccessMessage("Usuario registrado con mock data.");
        resetForm();
        return true;
      }

      const registerService = isAdmin ? registerAdmin : registerUser;
      const response = await registerService(form);

      setSuccessMessage(response?.message || "Usuario registrado correctamente.");
      resetForm();
      return true;
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
    submitRegister,
  };
}
