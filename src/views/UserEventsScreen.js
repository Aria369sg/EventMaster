import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useEventsViewModel from "../viewmodels/useEventsViewModel";

const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Eventos", route: "UserEvents" },
  { key: "tickets", label: "Tickets", route: "UserTickets" },
  { key: "profile", label: "Perfil", route: "UserProfile" },
];

export default function UserEventsScreen({ navigation }) {
  const { events, loading, error } = useEventsViewModel();

  return (
    <ScreenContainer>
      <SectionHeader
        title="Mis eventos"
        subtitle="Listado mock de eventos para el flujo del usuario."
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2D6A4F" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => navigation.navigate("EventDetail", { event: item })}
            />
          )}
          ListEmptyComponent={error ? <Text style={styles.error}>{error}</Text> : null}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomNavBar
        items={navItems}
        activeKey="events"
        onChange={(item) => navigation.navigate(item.route)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 14,
    color: "#B3261E",
  },
});
