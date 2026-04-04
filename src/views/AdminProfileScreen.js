import { ActivityIndicator, StyleSheet, View, Image, Text } from "react-native";
import { useState } from "react";
import AppDialog from "../components/AppDialog";
import BottomNavBar from "../components/BottomNavBar";
import ProfileField from "../components/ProfileField";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import useSessionViewModel from "../viewmodels/useSessionViewModel";
import TextInformative from "../components/TextInformative";
import { COLORS } from "../models/theme";

const navItems = [
  { key: "dashboard", label: "Dashboard", route: "AdminDashboard" },
  { key: "create", label: "Add event", route: "AdminCreateEvent" },
  { key: "events", label: "Events", route: "AdminEvents" },
  { key: "profile", label: "Profile", route: "AdminProfile" },
];

export default function AdminProfileScreen({ navigation }) {
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
                  <ProfileField label="Nombre" value={user?.name || "No disponible"} />
                  <ProfileField label="Account Status" value={user?.role || "user"} />
                  
                  
                </View>
                
              )}
            </View>
            <View style={styles.wrapperBottom}>
              <Text style={styles.linkText} onPress={() => navigation.navigate("Register", { isAdmin: true })}>
                Register a new admin
              </Text>
                  <PrimaryButton title="Logout" onPress={handleLogout} />
            </View>

            <AppDialog
              visible={showLogoutDialog}
              message="¿Está seguro que desea salir de su cuenta?"
              confirmLabel="Aceptar"
              cancelLabel="Cancelar"
              onConfirm={async () => {
                setShowLogoutDialog(false);
                await logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
              onCancel={() => setShowLogoutDialog(false)}
              tone="error"
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
  },
  linkText: {
    marginTop: 18,
    textAlign: "center",
    color: COLORS.accent,
    fontWeight: "600",
    bottom:20
  },
});
