import { Image, Text, View } from "react-native";
import Colors from "../constants/Colors";
import MarkFavourite from "./MarkFavourite";
const PetProfile = ({ pet }) => {
  return (
    <View>
      <Image
        source={{ uri: pet.imageUrl }}
        style={{ width: "100%", height: 300, objectFit: "cover" }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={{ fontWeight: "600", fontSize: 27 }}>{pet?.name}</Text>
          <Text style={{ fontWeight: "400", fontSize: 16, color: Colors.GRAY }}>
            {pet?.address}
          </Text>
        </View>
        <MarkFavourite pet={pet}/>
      </View>
    </View>
  );
};

export default PetProfile;
