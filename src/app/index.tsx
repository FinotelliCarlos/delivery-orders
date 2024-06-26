import { FlatList, SectionList, StatusBar, Text, View } from "react-native";

import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { ProductItemList } from "@/components/product-item-list";
import { useCartStore } from "@/stores/cart-store";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { Link } from "expo-router";
import { useRef, useState } from "react";

export default function Home() {
  const cartQuantityItems = useCartStore((state) =>
    state.products.reduce((total, product) => total + product.quantity, 0)
  );

  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  function handleSelectCategory(currCategory: string) {
    setCategory(currCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === currCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1 pt-12">
      <StatusBar translucent barStyle={"light-content"} />
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

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

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-slate-200 text-xl font-semibold mt-8 mb-3">
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <ProductItemList data={item} />
          </Link>
        )}
        className="flex-1 p-5 pt-0 mt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
