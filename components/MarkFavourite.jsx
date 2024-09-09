import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import GetFavList, { UpdateFav } from "../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFavourite({ pet,color="black" }) {
  const { user } = useUser();
  const [favList, setFavList] = useState();
  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    const result = await GetFavList(user);
    setFavList(result?.favourites ? result?.favourites : []);
  };

  const AddToFav = async () => {
    if (favList) {
      const favResult = [...favList, pet.Id]; // Create a new array with the pet ID
      await UpdateFav(user, favResult);
      GetFav(); // Refresh the list after updating
    }
  };

  const RemoveFromFav = async () => {
    if (favList) {
      const updatedFavList = favList?.filter((item) => item !== pet?.Id); // Filter out the pet ID
      await UpdateFav(user, updatedFavList);
      GetFav(); // Refresh the list after updating
    }
  };

  return (
    <View>
      {favList?.includes(pet?.Id) ? (
        <Pressable onPress={RemoveFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
