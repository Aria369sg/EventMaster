import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import { COLORS } from "../models/theme";

const navItems = [
  { key: "dashboard", label: "Dashboard", route: "AdminDashboard" },
  { key: "create", label: "Add event", route: "AdminCreateEvent" },
  { key: "events", label: "Events", route: "AdminEvents" },
  { key: "profile", label: "Profile", route: "AdminProfile" },
];

export default function AdminEventsScreen({ navigation }) {
  const { events, loading, editEvent, deleteEvent } = useEventsViewModel();
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDelete = (event) => {
    setEventToDelete(event);
  };

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
              <ActivityIndicator size="large" color={COLORS.accent} />
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
                onDelete={() => handleDelete(item)}
                />}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <AppDialog
          visible={Boolean(eventToDelete)}
          message="¿Está seguro que desea borrar un evento?"
          confirmLabel="Aceptar"
          cancelLabel="Cancelar"
          onConfirm={() => {
            if (eventToDelete) {
              deleteEvent(eventToDelete.id);
            }
            setEventToDelete(null);
          }}
          onCancel={() => setEventToDelete(null)}
          tone="error"
        />

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
