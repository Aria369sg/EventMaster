import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import EventCard from "../components/EventCard";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import { COLORS } from "../models/theme";

export default function EventsScreen({ navigation }) {
  const { events, loading, error } = useEventsViewModel();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  return (
    <ScreenContainer>
      <SectionHeader
        title="Events"
        subtitle="Para reservar necesitas iniciar sesión o registrarte."
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.accent} />
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
              mode="user"
              isReserved={false}
              isDisabled={(item.seatsLeft ?? 1) <= 0}
              onReserve={() => setShowAuthDialog(true)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : null}

      <AppDialog
        visible={showAuthDialog}
        message="Para reservar un evento necesitas registrarte o iniciar sesión."
        confirmLabel="Login"
        onConfirm={() => {
          setShowAuthDialog(false);
          navigation.navigate("Login");
        }}
        cancelLabel="Register"
        onCancel={() => {
          setShowAuthDialog(false);
          navigation.navigate("Login");
        }}
      />
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
    color: COLORS.danger,
  },
});
