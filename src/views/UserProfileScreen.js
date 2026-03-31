import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import ProfileField from "../components/ProfileField";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import TextInformative from "../components/TextInformative";


const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Eventos", route: "UserEvents" },
  { key: "tickets", label: "Tickets", route: "UserTickets" },
  { key: "profile", label: "Perfil", route: "UserProfile" },
];

export default function UserProfileScreen({ navigation }) {
  const { user, loading, logout } = useSessionViewModel();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          

          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#2D6A4F" />
            </View>
          ) : (
            
            <View style={styles.card}>
              <Image
                source={{ uri: user?.photo || "https://via.placeholder.com/100" }}
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <TextInformative
                  text={user?.name || "Usuario"}
                />
                <TextInformative
                  text={user?.email || "Email"}
                />
              </View>
              <ProfileField label="Settings" value={'Settings'} />
              <ProfileField label="My Information" value={'My Information '} />
              
              
            </View>
            
          )}
        </View>
        <View style={styles.wrapperBottom}>
              <PrimaryButton title="Cerrar sesion" onPress={handleLogout} />
        </View>
        <BottomNavBar
          items={navItems}
          activeKey="profile"
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
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  wrapperBottom:{
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 25
  }
});
