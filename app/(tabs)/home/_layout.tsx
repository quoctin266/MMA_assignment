import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerTintColor: "white" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="detail"
        options={{ title: "", headerStyle: { backgroundColor: "#FA7070" } }}
      />
    </Stack>
  );
}
