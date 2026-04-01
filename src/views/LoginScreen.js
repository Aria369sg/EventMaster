import { StyleSheet, Text, View } from "react-native";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useLoginViewModel from "../viewmodels/useLoginViewModel";

export default function LoginScreen({ navigation }) {
  // La vista solo consume el estado y acciones expuestas por el ViewModel.
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
    // Si el login fue exitoso, se reemplaza la pila para que Login no quede atras.
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
      <View>
        <SectionHeader
          title="Login"
          
        />
      </View>
      <View style={styles.card}>
        

        <FormInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          label="email"
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

        {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}
        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}
        
        
      </View>
      <View style={styles.wrapperBottom}>
        <PrimaryButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
        />

        <Text style={styles.linkText} onPress={() => navigation.navigate("Register")}>
          Register
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  errorText: {
    marginBottom: 16,
    fontSize: 14,
    color: "#B3261E",
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
  wrapperBottom:{
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 25
  },
   card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
    marginBottom: 14,
  }
});
