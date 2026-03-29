import { StyleSheet, Text, View } from "react-native";

export default function StatCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 86,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
    justifyContent: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: "#163020",
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: "#4A5C4D",
  },
});
