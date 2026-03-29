import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BottomNavBar({ items, activeKey, onChange }) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item)}
            style={styles.item}
          >
            <View style={[styles.dot, isActive ? styles.activeDot : null]} />
            <Text style={[styles.label, isActive ? styles.activeLabel : null]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#D9E4D6",
    backgroundColor: "#FFFFFF",
  },
  item: {
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#4A5C4D",
  },
  activeDot: {
    backgroundColor: "#2D6A4F",
    borderColor: "#2D6A4F",
  },
  label: {
    fontSize: 12,
    color: "#4A5C4D",
  },
  activeLabel: {
    fontWeight: "700",
    color: "#163020",
  },
});
