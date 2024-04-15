import { LinkButton } from "@/components/link-button";
import React from "react";
import { Text, View } from "react-native";

export default function Success() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mx-5 p-5 rounded-lg bg-slate-800">
        <Text className="text-xl font-semibold text-slate-200">
          Pedido realizado com sucesso! 🍔
        </Text>

        <LinkButton className="mt-3" href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
