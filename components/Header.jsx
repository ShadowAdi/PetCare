import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();

  return (
    <View style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
      <View>
        <Text style={{ fontSize: 18 }}>Welcome,</Text>
        <Text style={{ fontSize: 25,fontWeight:"600" }}>{user?.firstName}</Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 40, height: 40, borderRadius: 99 }}
      />
    </View>
  );
}
