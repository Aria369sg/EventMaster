import { StyleSheet, Text, TextInput, View } from "react-native";

export default function FormInput({
  label,
  error,
  containerStyle,
  ...props
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#7D8B80"
        style={[styles.input, error ? styles.inputError : null]}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#163020",
  },
  input: {
    borderWidth: 1,
    borderColor: "#B6C4B6",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#163020",
  },
  inputError: {
    borderColor: "#B3261E",
  },
  errorText: {
    marginTop: 6,
    fontSize: 13,
    color: "#B3261E",
  },
});
