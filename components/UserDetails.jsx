import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function UserDetails({ pet }) {
  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent:"space-between",gap:20 }}
      >
        <Image
          source={{ uri: pet.userImage }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />
        <View>
          <Text style={{ fontWeight: 600, fontSize: 17 }}>{pet.username}</Text>
          <Text style={{ fontSize: 13, color: Colors.GRAY }}>Pet Owner</Text>
        </View>
      </View>
      <Ionicons name="send-outline" size={24} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.WHITE,
    justifyContent:"space-between",
    borderColor:Colors.PRIMARY
  },
});
