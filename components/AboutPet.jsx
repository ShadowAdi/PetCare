import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);
  return (

    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 600, fontSize: 18 }}>About {pet.name}</Text>
      <Text
        numberOfLines={readMore ? 3 : 200}
        style={{ fontSize: 14, color: Colors.GRAY }}
      >
        {pet.about}
      </Text>
      <Pressable onPress={()=>setReadMore(false)}>

      <Text style={{ fontSize: 14, fontWeight: 800, color: Colors.SECONDARY }}>
        {readMore && "Read More"}
      </Text>
      </Pressable>
    </View>
  );
}
