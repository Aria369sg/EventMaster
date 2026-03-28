import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useEventDetailViewModel from "../viewmodels/useEventDetailViewModel";

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;
  const { loading, message, error, reserveSpot } = useEventDetailViewModel(event);

  const handleReservation = async () => {
    const ok = await reserveSpot();

    if (ok) {
      navigation.navigate("ReservationSuccess", { event });
    }
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.wrapper}>
        <SectionHeader title={event.name} subtitle={event.description} />

        <View style={styles.card}>
          <Text style={styles.meta}>Fecha: {event.date}</Text>
          <Text style={styles.meta}>Lugar: {event.location}</Text>
          <Text style={styles.meta}>Capacidad: {event.capacity}</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {message ? <Text style={styles.successText}>{message}</Text> : null}

        <PrimaryButton
          title="Reservar lugar"
          onPress={handleReservation}
          loading={loading}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
    marginBottom: 20,
  },
  meta: {
    fontSize: 15,
    color: "#4A5C4D",
    marginBottom: 8,
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
});
