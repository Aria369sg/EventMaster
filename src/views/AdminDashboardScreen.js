import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import StatCard from "../components/StatCard";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import TextInformative from "../components/TextInformative";

const navItems = [
  { key: "dashboard", label: "Dashboard", route: "AdminDashboard" },
  { key: "create", label: "Crear", route: "AdminCreateEvent" },
  { key: "events", label: "Eventos", route: "AdminEvents" },
  { key: "profile", label: "Perfil", route: "AdminProfile" },
];

export default function AdminDashboardScreen({ navigation }) {
  const { user, loading: sessionLoading } = useSessionViewModel();
  const { events, loading, editEvent, deleteEvent } = useEventsViewModel();

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <TextInformative
            text="About"
          />

          {sessionLoading || loading ? (
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
