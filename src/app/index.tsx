import { StatusBar, View } from "react-native";

import { Header } from "@/components/header";
import Loading from "@/components/loading";
import {
  FragmentMono_400Regular,
  FragmentMono_400Regular_Italic,
  useFonts,
} from "@expo-google-fonts/fragment-mono";

export default function Home() {
  const [fontsLoaded] = useFonts({
    FragmentMono_400Regular,
    FragmentMono_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View className="flex-1 pt-12">
      <StatusBar translucent barStyle={"light-content"} />
      <Header title="Faça seu pedido" cartQuantityItems={99} />
    </View>
  );
}
