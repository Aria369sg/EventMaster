import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsScreen from "../views/EventsScreen";
import EventDetailScreen from "../views/EventDetailScreen";
import HomeScreen from "../views/HomeScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import ReservationSuccessScreen from "../views/ReservationSuccessScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
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
