import { StyleSheet, SafeAreaView, FlatList, Text } from "react-native";
import { router } from "expo-router";
import PerfumeHorizontal from "@/components/perfume/PerfumeHorizontal";
import { useAppSelector } from "@/redux/hooks";

export default function Favorite() {
  const { favoriteList } = useAppSelector((state) => state.perfume);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListEmptyComponent={() => (
          <Text style={{ paddingHorizontal: 12 }}>
            You have not added any item
          </Text>
        )}
        ListHeaderComponent={() => <Text></Text>}
        showsVerticalScrollIndicator={false}
        data={favoriteList}
        renderItem={({ item }) => {
          return <PerfumeHorizontal key={item.id} perfume={item} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
  },
});
