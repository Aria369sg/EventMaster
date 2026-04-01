import { StyleSheet, Text, View } from "react-native";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useRegisterViewModel from "../viewmodels/useRegisterViewModel";

export default function RegisterScreen({ navigation , route}) {
  const isAdmin = route?.params?.isAdmin || false;
  
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
      <View>
        <SectionHeader
          title={isAdmin ? 'Register Admin' : 'Register'}
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

        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}
      
        
      </View>
      <View style={styles.wrapperBottom}>
        <PrimaryButton
          title="Register"
          onPress={handleRegister}
          loading={loading}
        />

        {!isAdmin && (
          <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>
          Already have an account? Login
        </Text>
        )}

        
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
   card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
    marginBottom: 14,
  },
  wrapperBottom:{
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 25
  },
});
