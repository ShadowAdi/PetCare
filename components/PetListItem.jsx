import { Image, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import MarkFavourite from "./MarkFavourite";

const PetListItem = ({ pet }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        position:"relative"
      }}
    >

      <View style={{position:"absolute",right:6,right:4,zIndex:10}}>
        <MarkFavourite pet={pet} color={"white"}/>
      </View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text style={{ fontSize: 18 }}>{pet.Name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.GRAY,
            textTransform: "capitalize",
          }}
        >
          {pet.breed}
        </Text>
        <Text
          style={{
            textTransform: "capitalize",
            color: Colors.BLACK,
            backgroundColor: Colors.LIGHT_PRIMARY,
            paddingHorizontal: 7,
            borderRadius: 99,
            fontSize: 12,
            paddingVertical: 6,
          }}
        >
          {pet.age} Years
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;
