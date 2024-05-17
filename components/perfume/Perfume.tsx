import { IPerfumeProps } from "@/types/props.dt";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem, removeItem } from "@/redux/slices/perfume.slice";
import Toast from "react-native-toast-message";

function Perfume(props: IPerfumeProps) {
  const { perfume } = props;

  const dispatch = useAppDispatch();
  const { favoriteList } = useAppSelector((state) => state.perfume);

  const handlePressIcon = () => {
    let foundItem = favoriteList.find((item) => item.id === perfume.id);
    if (foundItem) {
      dispatch(removeItem(perfume));
      Toast.show({
        type: "success",
        text1: "Removed from favorite",
        topOffset: 60,
      });
    } else {
      dispatch(addItem(perfume));
      Toast.show({
        type: "success",
        text1: "Added to favorite",
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.navigate({
          pathname: "home/detail",
          params: { id: perfume.id },
        });
      }}
    >
      <Image
        resizeMode="contain"
        style={styles.img}
        source={{
          uri: perfume.image,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{perfume.perfumeName}</Text>
        <Text style={styles.company}>{perfume.company}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>${perfume.price.toFixed(2)}</Text>
          <IconButton
            icon={
              favoriteList.find((item) => item.id === perfume.id)
                ? "heart-circle"
                : "heart-circle-outline"
            }
            iconColor="#FA7070"
            size={35}
            onPress={handlePressIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: "#FFF",
    borderRadius: 6,
    shadowColor: "#83829A",
    marginHorizontal: 16,
  },
  img: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  info: {
    padding: 16,
    width: 300,
  },
  name: {
    fontSize: 18,
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
});

export default Perfume;
