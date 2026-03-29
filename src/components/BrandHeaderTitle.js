import { Image, StyleSheet, Text, View } from "react-native";

export default function BrandHeaderTitle() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title}>GreenMarket</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#163020",
  },
});
