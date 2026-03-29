import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import useSessionViewModel from "../viewmodels/useSessionViewModel";

const navItems = [
  { key: "dashboard", label: "Dashboard", route: "AdminDashboard" },
  { key: "create", label: "Crear", route: "AdminCreateEvent" },
  { key: "events", label: "Eventos", route: "AdminEvents" },
  { key: "profile", label: "Perfil", route: "AdminProfile" },
];

export default function AdminDashboardScreen({ navigation }) {
  const { user, loading: sessionLoading } = useSessionViewModel();
  const { events, loading } = useEventsViewModel();

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <SectionHeader
            title={`Dashboard, ${user?.name || "admin"}`}
            subtitle="Vista general del administrador con tarjetas de resumen y eventos."
          />

          {sessionLoading || loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#2D6A4F" />
            </View>
          ) : (
            <FlatList
              data={events}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <EventCard event={item} />}
              ListHeaderComponent={
                <View style={styles.statsRow}>
                  <StatCard label="Eventos" value={events.length.toString()} />
                  <View style={styles.gap} />
                  <StatCard label="Usuarios" value="24" />
                  <View style={styles.gap} />
                  <StatCard label="Tickets" value="61" />
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <BottomNavBar
          items={navItems}
          activeKey="dashboard"
          onChange={(item) => navigation.navigate(item.route)}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  gap: {
    width: 10,
  },
});
