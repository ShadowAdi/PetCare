import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"; // Correct import from react-native, not react-native-web
import PetProfile from "../../components/PetProfile";
import PetSubInfo from "../../components/PetSubInfo";
import AboutPet from "../../components/AboutPet";
import UserDetails from "../../components/UserDetails";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { DB } from "../../config/FirebaseConfig";

const PetDetails = () => {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const router = useRouter();

  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + "_" + pet?.email;
    const docId2 = pet?.email + "_" + user?.primaryEmailAddress?.emailAddress;

    const q = query(
      collection(DB, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });

    if (querySnapshot.docs.length === 0) {
      await setDoc(doc(DB, "Chat", docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.username,
          },
        ],
        userIds:[user?.primaryEmailAddress?.emailAddress,pet?.email]
      });
      router.push({
        pathname: "/chat",
        params: { id: docId1 },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PetProfile pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <UserDetails pet={pet} />
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={InitiateChat} style={styles.adoptBtn}>
          <Text style={styles.adoptText}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for the button
  },
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
  },
  adoptText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 20,
    backgroundColor: Colors.WHITE, // Background to make the button visible
  },
});

export default PetDetails;
