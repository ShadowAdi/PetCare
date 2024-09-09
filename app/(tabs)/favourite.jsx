import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import GetFavList from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "../../config/FirebaseConfig";
import PetListItem from "../../components/PetListItem";
import Colors from "../../constants/Colors";

export default async function Favourite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  const GetFavPetIds = async () => {
    setLoader(true)
    const result = await GetFavList(user);
    console.log(result);
    setFavIds(result?.favourites);
    setLoader(false)

    GetFavPetList();
  };

  const GetFavPetList = async () => {
    setLoader(true)
    setFavPetList([]);
    if (favIds.length > 0) {
      const q = query(collection(DB, "Pets"), where("id", "in", favIds));
      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) => {
        setFavPetList((prev) => [...prev, doc.data()]);
      });
    }
    setLoader(false)

  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: 500 }}>Favourites</Text>

      {favPetList.length > 0 ? (
        <FlatList
        onRefresh={GetFavPetIds}
        refreshing={loader}
          data={favPetList}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View key={index}>
              <PetListItem pet={item} />
            </View>
          )}
        ></FlatList>
      ) : (
        <Text style={{ fontSize: 24, color: Colors.GRAY }}>
          No Pets In Favourite
        </Text>
      )}
    </View>
  );
}
