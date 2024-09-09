import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Link } from "expo-router";

const InboxChat = ({ userInfo }) => {
  return (
    <Link href={`/chat?id=${userInfo?.docId}`}>
      <View
        style={{
          marginVertical: 7,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: userInfo?.imageUrl }}
          style={{ height: 40, width: 40, objectFit: "cover" }}
        />
        <Text style={{ fontSize: 20 }}>{userInfo?.name}</Text>
      </View>
      <View
        style={{
          borderWidth: 0.2,
          marginVertical: 7,
          borderColor: Colors.GRAY,
        }}
      ></View>
    </Link>
  );
};

export default InboxChat;

const styles = StyleSheet.create({});
