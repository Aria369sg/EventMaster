import { StyleSheet, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import { useForm } from "../hooks/useForm";

const navItems = [
  { key: "dashboard", label: "Dashboard", route: "AdminDashboard" },
  { key: "create", label: "Crear", route: "AdminCreateEvent" },
  { key: "events", label: "Eventos", route: "AdminEvents" },
  { key: "profile", label: "Perfil", route: "AdminProfile" },
];

const initialValues = {
  name: "",
  date: "",
  capacity: "",
  location: "",
};

export default function AdminCreateEventScreen({ navigation }) {
  const { form, handleChange } = useForm(initialValues);

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <SectionHeader
            title="Crear evento"
            subtitle="Formulario mock para representar el flujo de alta del administrador."
          />

          <View style={styles.formCard}>
            <FormInput
              label="Nombre del evento"
              placeholder="Ej. Feria verde"
              value={form.name}
              onChangeText={(value) => handleChange("name", value)}
            />
            <FormInput
              label="Fecha"
              placeholder="2026-04-08 10:00"
              value={form.date}
              onChangeText={(value) => handleChange("date", value)}
            />
            <FormInput
              label="Capacidad"
              placeholder="120"
              value={form.capacity}
              onChangeText={(value) => handleChange("capacity", value)}
            />
            <FormInput
              label="Lugar"
              placeholder="Centro Verde"
              value={form.location}
              onChangeText={(value) => handleChange("location", value)}
            />
            <PrimaryButton title="Guardar mock" onPress={() => {}} />
          </View>
        </View>

        <BottomNavBar
          items={navItems}
          activeKey="create"
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
  formCard: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E4D6",
  },
});
