import { Header } from "@/components/header";
import React from "react";
import { View } from "react-native";

export default function Cart() {
  return (
    <View className="flex-1 pt-12">
      <Header title="Seu carrinho" />
    </View>
  );
}
