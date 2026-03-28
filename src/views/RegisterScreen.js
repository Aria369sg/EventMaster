import { StyleSheet, Text, View } from "react-native";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useRegisterViewModel from "../viewmodels/useRegisterViewModel";

export default function RegisterScreen({ navigation }) {
  const { form, errors, loading, successMessage, handleChange, submitRegister } =
    useRegisterViewModel();

  const handleRegister = async () => {
    const ok = await submitRegister();

    if (ok) {
      navigation.navigate("Login");
    }
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.wrapper}>
        <SectionHeader
          title="Registro"
          subtitle="Pantalla mock para validar el flujo de alta mientras llega la API."
        />

        <FormInput
          label="Nombre"
          placeholder="Tu nombre completo"
          value={form.name}
          onChangeText={(value) => handleChange("name", value)}
          error={errors.name}
        />

        <FormInput
          label="Correo"
          placeholder="correo@ejemplo.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          error={errors.email}
        />

        <FormInput
          label="Contrasena"
          placeholder="Minimo 6 caracteres"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          error={errors.password}
        />

        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <PrimaryButton
          title="Crear cuenta"
          onPress={handleRegister}
          loading={loading}
        />

        <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>
          Ya tengo cuenta
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  successText: {
    marginBottom: 16,
    fontSize: 14,
    color: "#2D6A4F",
  },
  linkText: {
    marginTop: 18,
    textAlign: "center",
    color: "#2D6A4F",
    fontWeight: "600",
  },
});
