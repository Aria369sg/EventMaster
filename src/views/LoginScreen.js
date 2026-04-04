import { StyleSheet, Text, View } from "react-native";
import AppAlert from "../components/AppAlert";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useLoginViewModel from "../viewmodels/useLoginViewModel";
import { COLORS } from "../models/theme";

export default function LoginScreen({ navigation }) {
  const {
    form,
    errors,
    loading,
    submitError,
    successMessage,
    handleChange,
    submitLogin,
  } = useLoginViewModel();

  const handleLogin = async () => {
    const response = await submitLogin();

    if (response) {
      const homeRoute =
        response.user?.role === "admin" ? "AdminDashboard" : "UserHome";

      navigation.reset({
        index: 0,
        routes: [{ name: homeRoute }],
      });
    }
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.page}>
        <View style={styles.contentBlock}>
          <View style={styles.headerWrapper}>
            <SectionHeader title="Inicia sesión aquí" />
          </View>

          <View style={styles.card}>
            <FormInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              label="Email"
              onChangeText={(value) => handleChange("email", value)}
              placeholder="email@example.com"
              value={form.email}
              error={errors.email}
            />

            <FormInput
              label="Password"
              onChangeText={(value) => handleChange("password", value)}
              placeholder="Password"
              secureTextEntry
              value={form.password}
              error={errors.password}
            />

            <AppAlert message={submitError} />
            <AppAlert message={successMessage} tone="success" />
          </View>
        </View>

        <View style={styles.wrapperBottom}>
          <View style={styles.buttonWrap}>
            <PrimaryButton title="Login" onPress={handleLogin} loading={loading} />
          </View>

          <Text style={styles.accountText}>
            Don't have an account?{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
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
