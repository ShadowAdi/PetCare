import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor:Colors.PRIMARY}}>
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          headerShown: false,
          title: "Favourite",
          tabBarIcon: ({color}) => <Ionicons name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          headerShown: false,
          title: "Inbox",
          tabBarIcon: ({color}) => <Ionicons name="chatbox" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({color}) => <Ionicons name="people" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
