import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import EventInfoRow from "./EventInfoRow";
import { COLORS } from "../models/theme";

export default function EventCard({
  event,
  mode,
  onReserve,
  isReserved,
  isDisabled,
  onEdit,
  onDelete,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{event.name}</Text>
          <EventInfoRow type="date" text={event.date} />
          <EventInfoRow type="location" text={event.location} />
          <EventInfoRow type="capacity" text={`${event.capacity}`} />
        </View>
      </View>

      <View style={styles.footerRow}>
        {mode === "user" ? (
          <View style={styles.userActions}>
            <EventInfoRow type="ticket" text={`Seats: [${event.seatsLeft ?? 1}]`} />
            <Pressable
              onPress={onReserve}
              disabled={isReserved || isDisabled}
              style={[
                styles.button,
                isReserved || isDisabled ? styles.buttonDisabled : styles.reserveButton,
              ]}
            >
              <Text style={styles.buttonLabel}>
                {isReserved ? "Reserved" : isDisabled ? "Full" : "Reserve"}
              </Text>
            </Pressable>
          </View>
        ) : null}

        {mode === "admin" ? (
          <View style={styles.adminActions}>
            <Pressable onPress={onEdit} style={[styles.button, styles.editButton]}>
              <Text style={styles.buttonLabel}>Edit</Text>
            </Pressable>

            <Pressable onPress={onDelete} style={[styles.button, styles.deleteButton]}>
              <Text style={styles.buttonLabel}>Delete</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  image: {
    width: 62,
    height: 62,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: COLORS.surfaceSoft,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  footerRow: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
  userActions: {
    alignItems: "flex-end",
  },
  adminActions: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    minWidth: 72,
    alignItems: "center",
  },
  reserveButton: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  editButton: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  deleteButton: {
    backgroundColor: COLORS.dangerSoft,
    borderColor: COLORS.danger,
  },
  buttonDisabled: {
    backgroundColor: COLORS.surfaceRaised,
    borderColor: COLORS.border,
    opacity: 0.7,
  },
  buttonLabel: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "600",
  },
});
