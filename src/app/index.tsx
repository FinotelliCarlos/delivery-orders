import { FlatList, SectionList, StatusBar, Text, View } from "react-native";

import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { ProductItemList } from "@/components/product-item-list";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { Link } from "expo-router";
import { useRef, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList>(null);

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
      <Header title="Faça seu pedido" cartQuantityItems={12} />

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
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <ProductItemList data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-slate-200 text-xl font-semibold mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5 pt-0 mt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
