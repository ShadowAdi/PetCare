import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { DB } from "../config/FirebaseConfig";
import { FlatList } from "react-native-gesture-handler";

export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSliders();
  }, []);
  const getSliders = async () => {
    setSlider([])
    const snapshot = await getDocs(collection(DB, "sliders"));
    snapshot.forEach((doc) => {
      setSlider((slider) => [...slider, doc.data()]);
    });
  };

  return (
    <View style={{marginTop:20}}>
      <FlatList
      horizontal={true}
        data={slider}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width*0.9,
    height: 160,
    borderRadius:15,
    marginHorizontal:"auto",
    objectFit:"cover"
  },
});
