import { StyleSheet, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionHeader from "../components/SectionHeader";
import { useForm } from "../hooks/useForm";
import useEventsViewModel from "../viewmodels/useEventsViewModel";
import { useEffect } from "react";

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

export default function AdminCreateEventScreen({ navigation, route }) {
  const event = route?.params?.event;
  const isEdit = !!event;
  const { editEvent, createEvent } = useEventsViewModel();
  

  const { form, handleChange, setForm } = useForm(initialValues);



  useEffect(() => {
    if(event) {
      setForm({
        name: event.name,
        date: event.date,
        capacity: event.capacity.toString(),
        location: event.location,
      })
    }
  }, [event]);

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <SectionHeader
            title={isEdit ? 'Update event' : "Create a new event"}
          />

          <View style={styles.formCard}>
            <FormInput
              label="Name"
              placeholder="Event name E.g. Feria verde"
              value={form.name}
              onChangeText={(value) => handleChange("name", value)}
            />
            <FormInput
              label="Date and hour"
              placeholder="2026-04-08 10:00"
              value={form.date}
              onChangeText={(value) => handleChange("date", value)}
            />
            <FormInput
              label="Place"
              placeholder="Centro Verde"
              value={form.location}
              onChangeText={(value) => handleChange("location", value)}
            />
            <FormInput
              label="Capacity"
              placeholder="120"
              value={form.capacity}
              onChangeText={(value) => handleChange("capacity", value)}
            />
            
            <PrimaryButton title={isEdit ? 'UPDATE' : 'CREATE'} onPress={() => {
              const payload = {
                ...form,
                capacity: Number(form.capacity),
              };

              if (isEdit) {
                editEvent(event.id, payload);
              } else {
                createEvent(payload);
              }

              navigation.goBack();
            }} />
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
