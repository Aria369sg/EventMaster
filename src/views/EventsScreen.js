import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useEventsViewModel from "../viewmodels/useEventsViewModel";

export default function EventsScreen({ navigation }) {
  const { events, loading, error } = useEventsViewModel();

  return (
    <ScreenContainer>
      <SectionHeader
        title="Eventos"
        subtitle="Pantalla con mock data para continuar el sprint mientras llega la API final."
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2D6A4F" />
        </View>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!loading ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => navigation.navigate("EventDetail", { event: item })}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    marginBottom: 16,
    fontSize: 14,
    color: "#B3261E",
  },
});
