import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../models/theme";

export default function TextInformative({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  }
});
