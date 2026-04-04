import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsScreen from "../views/EventsScreen";
import HomeScreen from "../views/HomeScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import UserHomeScreen from "../views/UserHomeScreen";
import UserEventsScreen from "../views/UserEventsScreen";
import UserTicketsScreen from "../views/UserTicketsScreen";
import UserProfileScreen from "../views/UserProfileScreen";
import AdminDashboardScreen from "../views/AdminDashboardScreen";
import AdminCreateEventScreen from "../views/AdminCreateEventScreen";
import AdminEventsScreen from "../views/AdminEventsScreen";
import AdminProfileScreen from "../views/AdminProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    // NavigationContainer administra el estado global de navegacion.
    <NavigationContainer>
      {/* Stack.Navigator define el flujo de pantallas tipo pila. */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
        <Stack.Screen name="UserEvents" component={UserEventsScreen} />
        <Stack.Screen name="UserTickets" component={UserTicketsScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminCreateEvent" component={AdminCreateEventScreen} />
        <Stack.Screen name="AdminEvents" component={AdminEventsScreen} />
        <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
