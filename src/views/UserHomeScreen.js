import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import FormInput from "../components/FormInput";
import { useSearchEventViewModel } from "../viewmodels/useSearchEventViewModel";

const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Eventos", route: "UserEvents" },
  { key: "tickets", label: "Tickets", route: "UserTickets" },
  { key: "profile", label: "Perfil", route: "UserProfile" },
];

export default function UserHomeScreen({ navigation }) {
  const { user, loading: sessionLoading } = useSessionViewModel();
  const { events, loading } = useEventsViewModel();
  const {search, setSearch, filter} = useSearchEventViewModel(events);

  return (
    <ScreenContainer>
      <SectionHeader
        title={`Home, ${user?.name || "usuario"}`}
        subtitle="Pantalla principal del flujo de usuario basada en el low fidelity."
      />
      <FormInput
        placeholder= 'Buscar Evento'
        value={search}
        onChangeText={setSearch}
      />
      {sessionLoading || loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2D6A4F" />
        </View>
      ) : (

        <FlatList
          data={search ? filter : events.slice(0, 3)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => navigation.navigate("EventDetail", { event: item })}
            />
          )}
          ListHeaderComponent={
            <View style={styles.heroCard}>
              <Text style={styles.heroTitle}>Proximo evento destacado</Text>
              <Text style={styles.heroText}>
                {events[0]?.name || "Sin eventos"} 
              </Text>
              <Text style={styles.heroMeta}>{events[0]?.date || "Pendiente"}</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomNavBar
        items={navItems}
        activeKey="home"
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
  heroCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#E7F1E8",
    borderWidth: 1,
    borderColor: "#CFE0CF",
  },
  heroTitle: {
    fontSize: 14,
    color: "#4A5C4D",
    marginBottom: 8,
  },
  heroText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#163020",
    marginBottom: 6,
  },
  heroMeta: {
    fontSize: 14,
    color: "#2D6A4F",
  },
});
