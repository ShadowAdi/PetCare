import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import GetFavList from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "../../config/FirebaseConfig";
import PetListItem from "../../components/PetListItem";
import Colors from "../../constants/Colors";

export default function Favourite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  const GetFavPetIds = useCallback(async () => {
    setLoader(true);
    try {
      const result = await GetFavList(user);
      console.log(result);
      setFavIds(result?.favourites || []);
    } catch (error) {
      console.error("Error fetching favourite IDs:", error);
    } finally {
      setLoader(false);
    }
  }, [user]);

  const GetFavPetList = useCallback(async () => {
    setLoader(true);
    try {
      if (favIds.length > 0) {
        const q = query(collection(DB, "Pets"), where("id", "in", favIds));
        const querySnapShot = await getDocs(q);

        const petList = querySnapShot.docs.map((doc) => doc.data());
        setFavPetList(petList);
      } else {
        setFavPetList([]);
      }
    } catch (error) {
      console.error("Error fetching favourite pets:", error);
    } finally {
      setLoader(false);
    }
  }, [favIds]);

  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user, GetFavPetIds]);

  useEffect(() => {
    if (favIds.length > 0) {
      GetFavPetList();
    }
  }, [favIds, GetFavPetList]);

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "500" }}>Favourites</Text>

      {favPetList.length > 0 ? (
        <FlatList
          onRefresh={GetFavPetIds}
          refreshing={loader}
          data={favPetList}
          numColumns={2}
          renderItem={({ item }) => (
            <View>
              <PetListItem pet={item} />
            </View>
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
        />
      ) : (
        <Text style={{ fontSize: 24, color: Colors.GRAY }}>
          No Pets In Favourite
        </Text>
      )}
    </View>
  );
}
