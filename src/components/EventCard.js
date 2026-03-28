import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EventCard({ event, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.meta}>Fecha: {event.date}</Text>
      <Text style={styles.meta}>Lugar: {event.location}</Text>
      <Text style={styles.meta}>Capacidad: {event.capacity}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
    marginBottom: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#163020",
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: "#4A5C4D",
    marginBottom: 4,
  },
});
