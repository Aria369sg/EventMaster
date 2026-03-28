import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isDisabled ? styles.buttonDisabled : null,
        pressed && !isDisabled ? styles.buttonPressed : null,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.label}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: "#2D6A4F",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
