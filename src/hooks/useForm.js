import { useState } from "react";

export const useForm = (initialValues, validations = {}) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    if (!validations[field]) {
      return null;
    }

    const { regex, message } = validations[field];
    return regex.test(value) ? null : message;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

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

  const resetForm = () => {
    setForm(initialValues);
    setErrors({});
  };

  return { form, errors, handleChange, validateForm, isValid, resetForm };
};
