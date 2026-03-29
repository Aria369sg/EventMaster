import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrandHeaderTitle from "../components/BrandHeaderTitle";
import EventsScreen from "../views/EventsScreen";
import EventDetailScreen from "../views/EventDetailScreen";
import HomeScreen from "../views/HomeScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import ReservationSuccessScreen from "../views/ReservationSuccessScreen";
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
          headerShown: true,
          headerTitle: () => <BrandHeaderTitle />,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: "#F4F7F2",
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
        <Stack.Screen name="UserEvents" component={UserEventsScreen} />
        <Stack.Screen name="UserTickets" component={UserTicketsScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminCreateEvent" component={AdminCreateEventScreen} />
        <Stack.Screen name="AdminEvents" component={AdminEventsScreen} />
        <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ title: "Detalle del evento" }}
        />
        <Stack.Screen
          name="ReservationSuccess"
          component={ReservationSuccessScreen}
          options={{ title: "Reservacion" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
