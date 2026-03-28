import { useState } from "react";
import { useForm } from "../hooks/useForm";

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

export default function useRegisterViewModel() {
  const { form, errors, handleChange, validateForm, resetForm } = useForm(
    registerInitialValues,
    registerValidations,
  );
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const submitRegister = async () => {
    setSuccessMessage("");

    if (!validateForm()) {
      return false;
    }

    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    setSuccessMessage("Usuario registrado con mock data.");
    resetForm();
    setLoading(false);
    return true;
  };

  return {
    form,
    errors,
    loading,
    successMessage,
    handleChange,
    submitRegister,
  };
}
