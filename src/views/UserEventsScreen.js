import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import TextInformative from "../components/TextInformative";
import FormInput from "../components/FormInput";
import { useSearchEventViewModel } from "../viewmodels/useSearchEventViewModel";
import { COLORS } from "../models/theme";


const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Events", route: "UserEvents" },
  { key: "tickets", label: "My tickets", route: "UserTickets" },
  { key: "profile", label: "Profile", route: "UserProfile" },
];

export default function UserEventsScreen({ navigation }) {
  const { events, loading, error, reserveEvent, reserved } = useEventsViewModel();
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
        text="Upcoming events"
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      ) : (
        <FlatList
          data={search ? filter : events}
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
          ListEmptyComponent={error ? <Text style={styles.error}>{error}</Text> : null}
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
    color: COLORS.danger,
  },
});
