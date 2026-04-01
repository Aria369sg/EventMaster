import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useEventsViewModel from "../viewmodels/useEventsViewModel";

const navItems = [
  { key: "dashboard", label: "Dashboard", route: "AdminDashboard" },
  { key: "create", label: "Crear", route: "AdminCreateEvent" },
  { key: "events", label: "Eventos", route: "AdminEvents" },
  { key: "profile", label: "Perfil", route: "AdminProfile" },
];

export default function AdminEventsScreen({ navigation }) {
  const { events, loading, editEvent, deleteEvent } = useEventsViewModel();

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <SectionHeader
            title="Eventos creados"
            subtitle="Listado mock de eventos administrados."
          />

          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#2D6A4F" />
            </View>
          ) : (
            <FlatList
              data={events}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => 
              <EventCard 
                event={item}
                mode='admin'
                onEdit={() => navigation.navigate("AdminCreateEvent", { event: item })}
                onDelete={() => deleteEvent(item.id)}
                />}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <BottomNavBar
          items={navItems}
          activeKey="events"
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
});
