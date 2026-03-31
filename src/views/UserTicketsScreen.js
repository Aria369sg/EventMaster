import { FlatList, StyleSheet, Text, View, Image, Pressable } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import ProfileField from "../components/ProfileField";
import ScreenContainer from "../components/ScreenContainer";
import useTicketsViewModel from "../viewmodels/useTicketsViewModel";
import TextInformative from "../components/TextInformative";


const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Eventos", route: "UserEvents" },
  { key: "tickets", label: "Tickets", route: "UserTickets" },
  { key: "profile", label: "Perfil", route: "UserProfile" },
];

function TicketCard({ ticket, onPress }) {
  return (

    
    <View style={styles.ticketCard}>
      <View style={styles.row}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.ticketTitle}>{ticket.title}</Text>
          <ProfileField label="Fecha" value={ticket.date} />
          <ProfileField label="Lugar" value={ticket.location} />
          <ProfileField label="Asientos" value={ticket.seats.toString()} />
        </View>
      </View>
      <View style={styles.footerRow}>
        <Pressable onPress={onPress} style={styles.button}>
          <Text>Cancel</Text>
        </Pressable>
      </View>      
    </View>
  );
}

export default function UserTicketsScreen({ navigation }) {
  const { tickets } = useTicketsViewModel();

  return (
    <ScreenContainer>
      <TextInformative
        text="My reservations"
        
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
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#EDEDED",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-end",
  },
  meta: {
    fontSize: 14,
    color: "#4A5C4D",
    marginBottom: 4,
    padding: 4
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
  },
});
