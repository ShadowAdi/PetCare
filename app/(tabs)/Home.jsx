import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Header";
import Slider from "../../components/Slider";
import PetListByCategory from "../../components/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ padding: 20, marginTop: 20 }}>
        <Header />
        <Slider />
        <PetListByCategory />
        <Link
        href={"/add-new-pet"}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            padding: 20,
            backgroundColor: Colors.LIGHT_PRIMARY,
            marginTop: 20,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 15,
            borderStyle: "dashed",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="pets" size={24} color={Colors.SECONDARY} />
          <Text style={{ fontWeight: "medium", color: Colors.SECONDARY,textAlign:"center" }}>
            Add New Pet
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}
