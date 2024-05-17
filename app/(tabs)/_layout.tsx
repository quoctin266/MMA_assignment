import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "react-native";

export default function TabLayout() {
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FA7070",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarLabelStyle: { fontSize: 13 },
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorite",

            tabBarLabelStyle: { fontSize: 13 },
            tabBarIcon: ({ color }) => (
              <AntDesign name="heart" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
