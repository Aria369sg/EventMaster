import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../models/theme";

export default function SectionHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textMuted,
  },
});
