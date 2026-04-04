import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { COLORS } from "../models/theme";

export default function AppAlert({ message, tone = "error" }) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    setVisible(Boolean(message));
  }, [message]);

  if (!message || !visible) {
    return null;
  }

  const isSuccess = tone === "success";

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text
          style={[styles.text, isSuccess ? styles.successText : styles.errorText]}
        >
        {message}
        </Text>

        <Pressable style={styles.button} onPress={() => setVisible(false)}>
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  container: {
    width: "92%",
    maxWidth: 300,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#161616",
    borderColor: COLORS.surfaceSoft,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.danger,
  },
  successText: {
    color: COLORS.success,
  },
  button: {
    minWidth: 72,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 15,
  },
});
