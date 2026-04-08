import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../models/theme";

export default function ScreenContainer({ children, scrollable = false }) {
  const Wrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Wrapper
        style={styles.content}
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.screen,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: COLORS.screen,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.screen,
  },
});
