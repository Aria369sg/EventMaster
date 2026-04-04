import { StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../models/theme";

function InfoIcon({ type }) {
  switch (type) {
    case "date":
      return <Ionicons name="calendar-outline" size={15} color={COLORS.text} />;
    case "location":
      return <Ionicons name="location-outline" size={15} color={COLORS.text} />;
    case "capacity":
      return <Ionicons name="people-outline" size={15} color={COLORS.text} />;
    case "ticket":
      return (
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={15}
          color={COLORS.text}
        />
      );
    default:
      return <Ionicons name="ellipse-outline" size={13} color={COLORS.text} />;
  }
}

export default function EventInfoRow({ type, text }) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <InfoIcon type={type} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  iconWrap: {
    width: 18,
    alignItems: "center",
    marginRight: 6,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textMuted,
  },
});
