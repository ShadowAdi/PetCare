import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "../config/FirebaseConfig";
import PetListItem from "./PetListItem";

const PetListByCategory = () => {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    GetPetList("Dog");
  }, []);

  const GetPetList = async (category) => {
    setLoader(true)
    setPetList([])
    const q = query(collection(DB, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false)
  };
  return (
    <View>
      <Category categoryVar={(value) => GetPetList(value)} />
      <FlatList
      refreshing={loader}
      onRefresh={()=>GetPetList("Dogs")}
      style={{marginTop:10}}
      horizontal={true}
        data={petList}
        renderItem={({ item, index }) => {
          return <PetListItem key={index} pet={item} />;
        }}
      />
    </View>
  );
};

export default PetListByCategory;
