import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import TextInformative from "../components/TextInformative";
import FormInput from "../components/FormInput";
import { useSearchEventViewModel } from "../viewmodels/useSearchEventViewModel";


const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Eventos", route: "UserEvents" },
  { key: "tickets", label: "Tickets", route: "UserTickets" },
  { key: "profile", label: "Perfil", route: "UserProfile" },
];

export default function UserEventsScreen({ navigation }) {
  const { events, loading, error } = useEventsViewModel();
  const {search, setSearch, filter} = useSearchEventViewModel(events);

  return (
    <ScreenContainer>

      <FormInput
        placeholder= 'Buscar Evento'
        value={search}
        onChangeText={setSearch}
      />
      <TextInformative
        text="All the Events"
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2D6A4F" />
        </View>
      ) : (
        <FlatList
          data={search ? filter : events}
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
