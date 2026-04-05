import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import AppAlert from "../components/AppAlert";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import useRegisterViewModel from "../viewmodels/useRegisterViewModel";
import { COLORS } from "../models/theme";

export default function RegisterScreen({ navigation , route}) {
  const isAdmin = route?.params?.isAdmin || false;
  const { user, loading: sessionLoading } = useSessionViewModel();
  
  const {
    form,
    errors,
    loading,
    submitError,
    successMessage,
    handleChange,
    submitRegister,
  } = useRegisterViewModel(isAdmin);

  useEffect(() => {
    if (!isAdmin || sessionLoading) {
      return;
    }

    if (user?.role !== "admin") {
      navigation.replace("Login");
    }
  }, [isAdmin, navigation, sessionLoading, user]);

  const handleRegister = async () => {
    const ok = await submitRegister();

    if (ok) {
      navigation.navigate("Login");
    }
  };

  if (isAdmin && sessionLoading) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      </ScreenContainer>
    );
  }

  if (isAdmin && user?.role !== "admin") {
    return null;
  }

  return (
    <ScreenContainer scrollable>
      <View style={styles.page}>
        <View style={styles.contentBlock}>
          <View style={styles.headerWrapper}>
            <SectionHeader
              title={isAdmin ? "Registrar admin" : "Regístrate aquí"}
            />
          </View>

          <View style={styles.card}>
            <FormInput
              label="Name"
              placeholder="Full Name"
              value={form.name}
              onChangeText={(value) => handleChange("name", value)}
              error={errors.name}
            />

            <FormInput
              label="Email"
              placeholder="email@example.com"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
              error={errors.email}
            />

            <FormInput
              label="Password"
              placeholder="At least 6 characters"
              secureTextEntry
              value={form.password}
              onChangeText={(value) => handleChange("password", value)}
              error={errors.password}
            />

            <AppAlert message={submitError} tone="error" />
            <AppAlert message={successMessage} tone="success" />
          </View>
        </View>

        <View style={styles.wrapperBottom}>
          <View style={styles.buttonWrap}>
            <PrimaryButton
              title="Register"
              onPress={handleRegister}
              loading={loading}
            />
          </View>

          {!isAdmin && (
            <Text style={styles.accountText}>
              Already have an account?{" "}
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </Text>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentBlock: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
  },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  accountText: {
    marginTop: 18,
    textAlign: "center",
    color: COLORS.text,
    fontSize: 15,
  },
  linkText: {
    color: COLORS.accent,
    fontWeight: "600",
  },
  card: {
    padding: 22,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  wrapperBottom: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    marginTop: 28,
    marginBottom: 12,
  },
  buttonWrap: {
    width: 120,
    alignSelf: "center",
  },
});
