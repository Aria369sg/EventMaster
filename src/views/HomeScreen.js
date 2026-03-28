import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useHomeViewModel from "../viewmodels/useHomeViewModel";

export default function HomeScreen({ navigation }) {
  const { user, eventsCount, loading, logout } = useHomeViewModel();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <ScreenContainer>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2D6A4F" />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <SectionHeader
            title={`Hola, ${user?.name || "usuario"}`}
            subtitle="Este home funciona como hub principal para el low fidelity del sprint."
          />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resumen rapido</Text>
            <Text style={styles.cardText}>Rol: {user?.role || "user"}</Text>
            <Text style={styles.cardText}>Correo: {user?.email || "sin correo"}</Text>
            <Text style={styles.cardText}>Eventos mock disponibles: {eventsCount}</Text>
          </View>

          <PrimaryButton
            title="Ver eventos"
            onPress={() => navigation.navigate("Events")}
          />

          <View style={styles.spacer} />

          <PrimaryButton
            title="Ir a registro"
            onPress={() => navigation.navigate("Register")}
          />

          <Text style={styles.logoutText} onPress={handleLogout}>
            Cerrar sesion mock
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    marginBottom: 20,
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#163020",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: "#4A5C4D",
    marginBottom: 8,
  },
  spacer: {
    height: 12,
  },
  logoutText: {
    marginTop: 18,
    textAlign: "center",
    color: "#2D6A4F",
    fontWeight: "600",
  },
});
