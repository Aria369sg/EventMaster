import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../models/theme";

export default function AppDialog({
  visible,
  message,
  confirmLabel = "OK",
  cancelLabel,
  onConfirm,
  onCancel,
  tone = "error",
}) {
  if (!visible || !message) {
    return null;
  }

  const isSuccess = tone === "success";

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={[styles.message, isSuccess ? styles.successText : styles.errorText]}>
          {message}
        </Text>

        <View style={styles.actions}>
          {cancelLabel ? (
            <Pressable style={[styles.button, styles.secondaryButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>{cancelLabel}</Text>
            </Pressable>
          ) : null}

          <Pressable style={[styles.button, styles.primaryButton]} onPress={onConfirm}>
            <Text style={styles.buttonText}>{confirmLabel}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.22)",
    zIndex: 20,
  },
  container: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: COLORS.surfaceSoft,
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  errorText: {
    color: COLORS.danger,
  },
  successText: {
    color: COLORS.success,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    minWidth: 86,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: "700",
  },
});
