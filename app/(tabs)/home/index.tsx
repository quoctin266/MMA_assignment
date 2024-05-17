import Perfume from "@/components/perfume/Perfume";
import PerfumeHorizontal from "@/components/perfume/PerfumeHorizontal";
import { getPerfumes } from "@/service/perfume.service";
import { useQuery } from "@tanstack/react-query";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function HomeScreen() {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchPerfumes"],
    queryFn: () => {
      return getPerfumes();
    },
  });

  if (isLoading)
    return (
      <ActivityIndicator size={50} style={styles.loading} color={"#ff6000"} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.horizontalList}>
          <Text style={styles.title}>Most Popular</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              return <Perfume key={item.id} perfume={item} />;
            }}
          />
        </View>

        <View style={{ marginTop: 16, flex: 1 }}>
          <Text style={styles.title}>Top Seller</Text>

          {data?.map((item) => {
            return <PerfumeHorizontal key={item.id} perfume={item} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#FAFAFC",
  },
  horizontalList: {
    paddingVertical: 24,
  },
  title: {
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "500",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});
