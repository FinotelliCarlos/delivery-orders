import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

import Loading from "@/components/loading";
import {
  FragmentMono_400Regular,
  FragmentMono_400Regular_Italic,
  useFonts,
} from "@expo-google-fonts/fragment-mono";

const [fontsLoaded] = useFonts({
  FragmentMono_400Regular,
  FragmentMono_400Regular_Italic,
});

export default function Layout() {
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Slot />
    </SafeAreaView>
  );
}
