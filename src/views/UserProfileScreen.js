import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import BottomNavBar from "../components/BottomNavBar";
import ProfileField from "../components/ProfileField";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import TextInformative from "../components/TextInformative";
import { COLORS } from "../models/theme";


const navItems = [
  { key: "home", label: "Home", route: "UserHome" },
  { key: "events", label: "Events", route: "UserEvents" },
  { key: "tickets", label: "My tickets", route: "UserTickets" },
  { key: "profile", label: "Profile", route: "UserProfile" },
];

export default function UserProfileScreen({ navigation }) {
  const { user, loading, logout } = useSessionViewModel();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    setShowLogoutDialog(true);
  };

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          

          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={COLORS.accent} />
            </View>
          ) : (
            
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarFace}>◡</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.profileName}>{user?.name || "Usuario"}</Text>
                <Text style={styles.profileMail}>{user?.email || "Email"}</Text>
              </View>
              <ProfileField label="Name:" value={user?.name || "No disponible"} />
              <ProfileField label="Account status:" value="Active" />
              
              
            </View>
            
          )}
        </View>
        <View style={styles.wrapperBottom}>
              <PrimaryButton title="Logout" onPress={handleLogout} />
        </View>
        <AppDialog
          visible={showLogoutDialog}
          message="¿Está seguro que desea salir de su cuenta?"
          confirmLabel="Aceptar"
          onConfirm={async () => {
            setShowLogoutDialog(false);
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
          onCancel={() => setShowLogoutDialog(false)}
          cancelLabel="Cancelar"
        />
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
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#FF1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarFace: {
    color: COLORS.text,
    fontSize: 36,
    marginTop: -8,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileMail: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  wrapperBottom:{
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 25
  }
});
