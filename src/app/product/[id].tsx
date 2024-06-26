import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/helpers/format-currency";
import { Feather } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Product() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((item) => item.id === id);

  function handlencrementProductToCart() {
    if (product) {
      cartStore.add(product);
      navigation.goBack();
    }
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image source={product?.cover} className="w-full h-52" />
      <View className="p-5 mt-8 flex-1">
        <Text className="text-slate-200 text-xl font-semibold">
          {product.title}
        </Text>

        <Text className="text-indigo-400 text-2xl font-semibold my-2">
          {formatCurrency(product.price as number)}
        </Text>

        <Text className="text-slate-400 text-base font-medium leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredientes.map((ingredient) => (
          <Text
            className="text-slate-400 text-base font-medium leading-6"
            key={ingredient}
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handlencrementProductToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={16} />
          </Button.Icon>

          <Button.Text>Adicionar ao carrinho</Button.Text>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
