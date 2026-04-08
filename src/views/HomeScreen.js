import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import EventCard from "../components/EventCard";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import TextInformative from "../components/TextInformative";
import { COLORS } from "../models/theme";
import { useSearchEventViewModel } from "../viewmodels/useSearchEventViewModel";
import useEventsViewModel from "../viewmodels/useEventsViewModel";

export default function HomeScreen({ navigation }) {
  const { events, loading, error } = useEventsViewModel();
  const { search, setSearch, filter } = useSearchEventViewModel(events);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const visibleEvents = search ? filter : events;

  return (
    <ScreenContainer>
      <View style={styles.topActionRow}>
        <View style={styles.primaryAction}>
          <PrimaryButton
            title="Register / Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>

      <FormInput
        placeholder="Buscador"
        value={search}
        onChangeText={setSearch}
      />

      <TextInformative text="Upcoming events" />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      ) : (
        <FlatList
          data={visibleEvents}
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
          ListEmptyComponent={error ? <Text style={styles.error}>{error}</Text> : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topActionRow: {
    marginBottom: 18,
    alignItems: "flex-end",
  },
  primaryAction: {
    width: 160,
  },
  listContent: {
    paddingBottom: 8,
  },
  error: {
    fontSize: 14,
    color: COLORS.danger,
  },
});
