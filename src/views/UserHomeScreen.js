import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import TextInformative from "../components/TextInformative";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import FormInput from "../components/FormInput";
import { useSearchEventViewModel } from "../viewmodels/useSearchEventViewModel";
import { COLORS } from "../models/theme";

const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Events", route: "UserEvents" },
  { key: "tickets", label: "My tickets", route: "UserTickets" },
  { key: "profile", label: "Profile", route: "UserProfile" },
];

export default function UserHomeScreen({ navigation }) {
  const { loading: sessionLoading } = useSessionViewModel();
  const { events, loading, reserveEvent, reserved } = useEventsViewModel();
  const {search, setSearch, filter} = useSearchEventViewModel(events);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleReserve = async (event) => {
    const ok = await reserveEvent(event.id);

    if (ok) {
      setDialogMessage("La reservación se ha hecho con éxito");
    }
  };

  return (
    <ScreenContainer>
      
      <FormInput
        placeholder= 'Buscador'
        value={search}
        onChangeText={setSearch}
      />
      <TextInformative
        text={'Upcoming Events'}
      />
      {sessionLoading || loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      ) : (
        
        <FlatList
          data={search ? filter : events.slice(0, 3)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              mode='user'
              isReserved={reserved.includes(item.id)}
              isDisabled={(item.seatsLeft ?? 1) <= 0}
              onReserve={() => handleReserve(item)}

            />
          )}
          ListHeaderComponent={
            <View>
              <View style={styles.heroCard}>
                <Text style={styles.heroTitle}>Upcoming events</Text>
                <Text style={styles.heroText}>
                  {events[0]?.name || "Sin eventos"} 
                </Text>
                <Text style={styles.heroMeta}>{events[0]?.date || "Pendiente"}</Text>
              </View>

              <TextInformative
                text={'Other events'}
              />
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <AppDialog
        visible={Boolean(dialogMessage)}
        message={dialogMessage}
        tone="success"
        onConfirm={() => setDialogMessage("")}
      />

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
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroTitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  heroText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  heroMeta: {
    fontSize: 14,
    color: COLORS.accent,
  },
});
