import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { ProductItemList } from "@/components/product-item-list";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/helpers/format-currency";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Cart() {
  const cartProductsList = useCartStore((state) => state.products);
  const removeProductAction = useCartStore((state) => state.remove);

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

            <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento." />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button className="al">
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
