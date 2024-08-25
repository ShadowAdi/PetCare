import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DB } from "../config/FirebaseConfig";
import Colors from "../constants/Colors";
import { collection, getDocs } from "firebase/firestore";
export default function Category() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    setCategory([]);
    const snapshot = await getDocs(collection(DB, "Category"));
    snapshot.forEach((doc) => {
      setCategory((category) => [...category, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 600 }}>Category</Text>
      <FlatList
        numColumns={4}
        data={category}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.name)}
              key={index}
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <View
                style={[
                  styles.container,
                  selectedCategory == item.name && styles.selectedCategory,
                ]}
              >
                <Image
                  source={{ uri: item.ImageUrl }}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <Text style={{ textAlign: "center" }}>{item?.Name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    alignItems: "center",
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.PRIMARY,
  },
});
