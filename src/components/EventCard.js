import { Pressable, StyleSheet, Text, View, Image } from "react-native";


export default function EventCard({ event, mode, onReserve, isReserved, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.meta}>° Fecha: {event.date}</Text>
          <Text style={styles.meta}>° Lugar: {event.location}</Text>
          <Text style={styles.meta}>° Capacidad: {event.capacity}</Text>
        </View>
      </View>
      <View style={styles.footerRow}>

        {mode === 'user' && (
          <View>
            <Text style={styles.meta}>° Seats [1]</Text>

            <Pressable
              onPress={onReserve}
              disabled={isReserved}
              style={[
                styles.button,
                isReserved && { backgroundColor: "#95d5b2" }
              ]}
              >
                <Text>
                  {isReserved ? "Reservado" : "Reserve"}
                </Text>
            </Pressable>

          </View>
        )}

        {mode === 'admin' && (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable onPress={onEdit} style={styles.button}>
              <Text>Edit</Text>
            </Pressable>

            <Pressable
              onPress={onDelete}
              style={[styles.button, { backgroundColor: "#ffccd5" }]}
            >
              <Text>Delete</Text>
            </Pressable>
          </View>
        )}
        
      </View>
      
    </View>
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
    padding: 4
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#EDEDED",
  },
  content: {
    flex: 1,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-end",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // hace el círculo
    alignSelf: "center", // 👈 centra horizontalmente
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    flexDirection: "row",
  }
});
