import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { ProductItemList } from "@/components/product-item-list";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/helpers/format-currency";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const phone_number = 5511970707070;

export default function Cart() {
  const [address, setAddress] = useState<string>("");
  const cartProductsList = useCartStore((state) => state.products);
  const removeProductAction = useCartStore((state) => state.remove);
  const clearCartAction = useCartStore((state) => state.clear);

  const total = formatCurrency(
    cartProductsList.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleRemoveProduct(product: ProductCartProps) {
    Alert.alert(
      "Remover do carrinho:",
      `Deseja remover o ${product.title} do seu carrinho?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Remover",
          onPress: () => removeProductAction(product.id),
        },
      ]
    );
  }

  function handleOrder() {
    if (cartProductsList.length >= 1) {
      if (address.trim().length === 0) {
        return Alert.alert("Pedido", "Informe os dados da entrega!");
      } else {
        const products = cartProductsList
          .map((product) => `\n ${product.quantity}x ${product.title}`)
          .join("");

        const message = `
      🍔 NOVO PEDIDO
      \n Engregar em: ${address}
      ${products}
      \n Valor total: ${total}
      `;

        clearCartAction();
        router.push("/success");
        Linking.openURL(
          `http://api.whatsapp.com/send?phone=${phone_number}&text=${message}`
        );
      }
    } else {
      Alert.alert("Pedido", "Selecione produtos para seu carrinho!");
    }
  }

  return (
    <View className="flex-1 pt-12">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartProductsList.length > 0 && (
              <View className="border-b border-slate-700">
                {cartProductsList.map((product) => (
                  <ProductItemList
                    onPress={() => handleRemoveProduct(product)}
                    key={product.id}
                    data={product}
                  />
                ))}
              </View>
            )}

            {cartProductsList.length === 0 && (
              <Text className="font-semibold text-slate-400 text-center my-8">
                Seu carrinho está vazio!
              </Text>
            )}

            <View className="flex-row gap-2 items-centerm mt-5 mb-4">
              <Text className="text-slate-200 text-xl font-semibold">
                Total:
              </Text>
              <Text className="text-lime-400 text-2xl font-semibold">
                {total}
              </Text>
            </View>

            <Input
              onChangeText={setAddress}
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento."
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
