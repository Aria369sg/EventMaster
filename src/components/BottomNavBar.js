import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../models/theme";

const renderIcon = (key, color) => {
  switch (key) {
    case "home":
    case "dashboard":
      return <Ionicons name="home-outline" size={24} color={color} />;
    case "events":
      return <Ionicons name="calendar-outline" size={24} color={color} />;
    case "tickets":
      return (
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={24}
          color={color}
        />
      );
    case "profile":
      return <Ionicons name="person-outline" size={24} color={color} />;
    case "create":
      return <Ionicons name="add-outline" size={24} color={color} />;
    default:
      return <Ionicons name="ellipse-outline" size={20} color={color} />;
  }
};

export default function BottomNavBar({ items, activeKey, onChange }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const iconColor = isActive ? COLORS.text : COLORS.textMuted;

          return (
            <Pressable
              key={item.key}
              onPress={() => onChange(item)}
              style={[styles.item, isActive ? styles.activeItem : null]}
            >
              <View style={styles.iconWrap}>{renderIcon(item.key, iconColor)}</View>
              <Text style={[styles.label, isActive ? styles.activeLabel : null]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 14,
    backgroundColor: COLORS.screen,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    backgroundColor: "#202020",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 64,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  activeItem: {
    backgroundColor: "#2A2A2A",
  },
  iconWrap: {
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: "center",
  },
  activeLabel: {
    fontWeight: "700",
    color: COLORS.text,
  },
});
