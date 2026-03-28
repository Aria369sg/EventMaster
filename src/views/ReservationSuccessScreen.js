import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";

export default function ReservationSuccessScreen({ route, navigation }) {
  const { event } = route.params;

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <SectionHeader
          title="Reservacion confirmada"
          subtitle="Este flujo usa datos mock para la demo del sprint."
        />

        <View style={styles.card}>
          <Text style={styles.text}>Evento: {event.name}</Text>
          <Text style={styles.text}>Fecha: {event.date}</Text>
          <Text style={styles.text}>Lugar: {event.location}</Text>
        </View>

        <PrimaryButton
          title="Volver a eventos"
          onPress={() => navigation.navigate("Events")}
        />

        <View style={styles.spacer} />

        <PrimaryButton
          title="Ir al inicio"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
  text: {
    fontSize: 15,
    color: "#4A5C4D",
    marginBottom: 8,
  },
  spacer: {
    height: 12,
  },
});
