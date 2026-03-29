import { StyleSheet, Text, View } from "react-native";

export default function ProfileField({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F0F3EE",
  },
  label: {
    fontSize: 12,
    color: "#4A5C4D",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: "#163020",
    fontWeight: "600",
  },
});
