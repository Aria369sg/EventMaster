import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { useCallback, useState } from "react";
import AppDialog from "../components/AppDialog";
import BottomNavBar from "../components/BottomNavBar";
import EventInfoRow from "../components/EventInfoRow";
import ScreenContainer from "../components/ScreenContainer";
import useTicketsViewModel from "../viewmodels/useTicketsViewModel";
import TextInformative from "../components/TextInformative";
import { COLORS } from "../models/theme";
import { useFocusEffect } from "@react-navigation/native";


const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Events", route: "UserEvents" },
  { key: "tickets", label: "My tickets", route: "UserTickets" },
  { key: "profile", label: "Profile", route: "UserProfile" },
];

function TicketCard({ ticket, onPress }) {
  return (
    <View style={styles.ticketCard}>
      <View style={styles.content}>
        <Text style={styles.ticketTitle}>{ticket.title}</Text>
        <EventInfoRow type="date" text={ticket.date} />
        <EventInfoRow type="location" text={ticket.location} />
        <EventInfoRow type="ticket" text={`${ticket.seats.toString()} people`} />
      </View>
      <View style={styles.footerRow}>
        <Pressable onPress={onPress} style={styles.button}>
          <Text style={styles.buttonLabel}>Cancel</Text>
        </Pressable>
      </View>      
    </View>
  );
}

export default function UserTicketsScreen({ navigation }) {
  const { tickets, cancelTicket, loading, reload } = useTicketsViewModel();
  const [ticketToCancel, setTicketToCancel] = useState(null);

  const handleCancel = (ticket) => {
    setTicketToCancel(ticket);
  };

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );
  if (loading) {
    return (
      <ScreenContainer>
        <Text>Cargando reservaciones...</Text>
      </ScreenContainer>
    );
  }
  return (
    
    <ScreenContainer>
      <TextInformative text="My reservations" />
      

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TicketCard
            ticket={item}
            onPress={() => handleCancel(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <AppDialog
        visible={Boolean(ticketToCancel)}
        message="¿Está seguro que desea cancelar su reservación?"
        confirmLabel="Aceptar"
        onConfirm={async () => {
          if (ticketToCancel) {
            await cancelTicket(ticketToCancel.id);
          }
          setTicketToCancel(null);
        }}
        onCancel={() => setTicketToCancel(null)}
        cancelLabel="Cancelar"
      />

      <BottomNavBar
        items={navItems}
        activeKey="tickets"
        onChange={(item) => navigation.navigate(item.route)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 6,
  },
  ticketCard: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ticketTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  content: {
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  buttonLabel: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 11,
  },
});
