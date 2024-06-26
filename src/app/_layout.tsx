import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <Slot />
    </SafeAreaView>
  );
}
