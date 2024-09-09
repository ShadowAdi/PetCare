import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from "../constants/Colors";

export default function PetSubInfoCard({icon,title,value}) {
  return (
    <View
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.WHITE,
      padding: 10,
      borderRadius: 8,
      gap: 10,
      flex: 1,
    }}
  >
    <Image
      style={{ width: 40, height: 40 }}
      source={icon}
    />
    <View style={{flex:1}}>
      <Text style={{ fontSize: 14, color: Colors.GRAY }}>{title}</Text>
      <Text style={{ fontSize: 16, fontWeight: 500 }}>{value}</Text>
    </View>
  </View>
  )
}