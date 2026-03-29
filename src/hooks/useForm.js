import { useState } from "react";

export const useForm = (initialValues, validations = {}) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Valida un solo campo usando la regla regex que se le pase al hook.
  const validateField = (field, value) => {
    if (!validations[field]) {
      return null;
    }

    const { regex, message } = validations[field];
    return regex.test(value) ? null : message;
  };

  // Actualiza el valor del campo y recalcula su error en tiempo real.
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  // Recorre todos los campos para validar el formulario completo antes de enviar.
  const validateForm = () => {
    const nextErrors = Object.keys(initialValues).reduce((acc, field) => {
      acc[field] = validateField(field, form[field]);
      return acc;
    }, {});

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const isValid = () => {
    return Object.values(errors).every((error) => !error);
  };

  // Devuelve el formulario a su estado inicial, util despues de un submit exitoso.
  const resetForm = () => {
    setForm(initialValues);
    setErrors({});
  };

  return { form, errors, handleChange, validateForm, isValid, resetForm };
};
