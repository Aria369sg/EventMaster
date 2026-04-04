import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import StatCard from "../components/StatCard";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import TextInformative from "../components/TextInformative";
import { COLORS } from "../models/theme";

const navItems = [
  { key: "dashboard", label: "Dashboard", route: "AdminDashboard" },
  { key: "create", label: "Add event", route: "AdminCreateEvent" },
  { key: "events", label: "Events", route: "AdminEvents" },
  { key: "profile", label: "Profile", route: "AdminProfile" },
];

export default function AdminDashboardScreen({ navigation }) {
  const { user, loading: sessionLoading } = useSessionViewModel();
  const { events, loading, editEvent, deleteEvent } = useEventsViewModel();
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDelete = (event) => {
    setEventToDelete(event);
  };

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <TextInformative
            text="About"
          />

          {sessionLoading || loading ? (
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
                ListHeaderComponent={
                  <View>
                    <View style={styles.statsRow}>
                      <StatCard label="Upcoming Events" value={events.length.toString()} />
                      <View style={styles.gap} />
                      <StatCard label="Canceled Events" value="24" />
                      <View style={styles.gap} />
                      <StatCard label="Edited Events" value="61" />
                      
                    </View>
                    <TextInformative
                        text="Recently added"
                    />
                  </View>
                  
                }
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
  statsColumn: {
    flexDirection: 'column',
    marginBottom: 16,
  },
});
