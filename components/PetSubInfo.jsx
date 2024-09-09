import { Image, Text, View } from "react-native";
import Colors from "../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

const PetSubInfo = ({ pet }) => {
  return (
    <View
      style={{ padding: 20, display: "flex", flexDirection: "column", gap: 4 }}
    >
      <View style={{ display: "flex", gap: 6, flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../assets/images/OneDrive-2024-09-08/calendar.png")}
          title={"Age"}
          value={pet?.age + " Years"}
        />
        <PetSubInfoCard
          icon={require("../assets/images/OneDrive-2024-09-08/bone.png")}
          title={"Breed"}
          value={pet?.breed}
        />
      </View>
      <View style={{ display: "flex", gap: 6, flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../assets/images/OneDrive-2024-09-08/sex.png")}
          title={"Sex"}
          value={pet?.sex}
        />
        <PetSubInfoCard
          icon={require("../assets/images/OneDrive-2024-09-08/weight.png")}
          title={"Weight"}
          value={pet?.weight}
        />
      </View>
    </View>
  );
};

export default PetSubInfo;
