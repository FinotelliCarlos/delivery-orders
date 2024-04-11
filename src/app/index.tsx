import { FlatList, StatusBar, View } from "react-native";

import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { CATEGORIES } from "@/utils/products";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  function handleSelectCategory(currCategory: string) {
    setCategory(currCategory);
  }

  return (
    <View className="flex-1 pt-12">
      <StatusBar translucent barStyle={"light-content"} />
      <Header title="Faça seu pedido" cartQuantityItems={99} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleSelectCategory(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
