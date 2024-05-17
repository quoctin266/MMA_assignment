import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { IconButton } from "react-native-paper";
import { router, usePathname } from "expo-router";
import { IPerfumeProps } from "@/types/props.dt";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem, removeItem } from "@/redux/slices/perfume.slice";
import Toast from "react-native-toast-message";

function PerfumeHorizontal(props: IPerfumeProps) {
  const { perfume } = props;

  const path = usePathname();
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
        if (path === "/home")
          router.navigate({
            pathname: "home/detail",
            params: { id: perfume.id },
          });
        if (path === "/favorite")
          router.navigate({
            pathname: "favorite/detail",
            params: { id: perfume.id },
          });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: perfume.image,
          }}
          resizeMode="cover"
          style={styles.img}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={styles.name}>
          {perfume.perfumeName}
        </Text>
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
    padding: 8,
    borderRadius: 6,
    shadowColor: "#83829A",
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    gap: 16,
    flex: 1,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "80%",
    height: "80%",
    borderRadius: 12,
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
  },
  company: {
    marginVertical: 4,
    color: "gray",
  },
  price: {
    color: "#FF7754",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default PerfumeHorizontal;
