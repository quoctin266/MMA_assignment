import Feedback from "@/components/feedback/Feedback";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem, removeItem } from "@/redux/slices/perfume.slice";
import { getPerfumeDetail } from "@/service/perfume.service";
import { IPerfume } from "@/types/data.dt";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { favoriteList } = useAppSelector((state) => state.perfume);

  const { isLoading, data } = useQuery({
    queryKey: ["fetchPerfumeDetail", id],
    queryFn: () => {
      return getPerfumeDetail(id as string);
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <ActivityIndicator size={50} style={styles.loading} color={"#ff6000"} />
    );

  const handlePressIcon = () => {
    let foundItem = favoriteList.find((item) => item.id === data?.id);
    if (foundItem) {
      dispatch(removeItem(data as IPerfume));
      Toast.show({
        type: "success",
        text1: "Removed from favorite",
        topOffset: 60,
      });
    } else {
      dispatch(addItem(data as IPerfume));
      Toast.show({
        type: "success",
        text1: "Added to favorite",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={{
            uri: data?.image,
          }}
        />
        <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{data?.perfumeName}</Text>
            </View>

            <IconButton
              icon={
                favoriteList.find((item) => item.id === data?.id)
                  ? "heart"
                  : "heart-outline"
              }
              iconColor="#FA7070"
              size={28}
              onPress={handlePressIcon}
            />
          </View>
          <Text style={styles.company}>{data?.company}</Text>
          <Text style={styles.price}>${data?.price.toFixed(2)}</Text>
          <Text style={styles.des}>{data?.perfumeDescription}</Text>
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 24, flex: 1 }}>
          <Text style={styles.title}>Customer Feedback</Text>

          <View style={{ marginBottom: 20 }}>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                scrollEnabled={false}
                numColumns={Math.ceil(5 / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={[0, 5, 4, 3, 2, 1]}
                renderItem={({ item, index }) => {
                  if (item === 0)
                    return (
                      <TouchableOpacity
                        key={item}
                        style={{ marginRight: 12, marginBottom: 12 }}
                      >
                        <Button mode="outlined">
                          <Text style={{ color: "gray" }}>All</Text>
                        </Button>
                      </TouchableOpacity>
                    );

                  return (
                    <TouchableOpacity
                      key={item}
                      style={{ marginRight: 12, marginBottom: 12 }}
                    >
                      <Button
                        mode="outlined"
                        icon={"star"}
                        contentStyle={{ flexDirection: "row-reverse" }}
                        textColor="#faaf00"
                      >
                        <Text style={{ color: "gray" }}>{item}</Text>
                      </Button>
                    </TouchableOpacity>
                  );
                }}
              />
            </ScrollView>
          </View>

          {data?.feedbacks.map((item, index) => {
            return <Feedback key={index} feedback={item} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: 320,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
  },
  company: {
    marginVertical: 8,
    color: "gray",
  },
  price: {
    color: "#FF7754",
    fontWeight: "600",
    fontSize: 18,
  },
  des: {
    marginTop: 12,
    color: "gray",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Detail;
