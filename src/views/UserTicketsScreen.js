import { FlatList, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import ProfileField from "../components/ProfileField";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useTicketsViewModel from "../viewmodels/useTicketsViewModel";

const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Eventos", route: "UserEvents" },
  { key: "tickets", label: "Tickets", route: "UserTickets" },
  { key: "profile", label: "Perfil", route: "UserProfile" },
];

function TicketCard({ ticket }) {
  return (
    <View style={styles.ticketCard}>
      <Text style={styles.ticketTitle}>{ticket.title}</Text>
      <ProfileField label="Fecha" value={ticket.date} />
      <ProfileField label="Lugar" value={ticket.location} />
      <ProfileField label="Asientos" value={ticket.seats.toString()} />
    </View>
  );
}

export default function UserTicketsScreen({ navigation }) {
  const { tickets } = useTicketsViewModel();

  return (
    <ScreenContainer>
      <SectionHeader
        title="Mis tickets"
        subtitle="Reservaciones mock para simular el historial del usuario."
      />

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TicketCard ticket={item} />}
        showsVerticalScrollIndicator={false}
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
  ticketCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
  },
  ticketTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#163020",
    marginBottom: 12,
  },
});
