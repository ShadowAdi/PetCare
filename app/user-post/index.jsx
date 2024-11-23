import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { collection, query } from "firebase/firestore/lite";
import { DB } from "../../config/FirebaseConfig";
import { deleteDoc, doc, getDocs, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import PetListItem from "../../components/PetListItem";
import Colors from "../../constants/Colors";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerTitle: "User Post" });
    if (user) {
      GetUserPost();
    }
  }, [user]);

  const GetUserPost = async () => {
    setLoader(true);
    const q = query(
      collection(DB, "Pets"),
      where("email", "==", user.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    setUserPostList([]); // Reset the list
    querySnapshot.forEach((doc) => {
      setUserPostList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoader(false);
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(DB, "Pets", docId));
    GetUserPost();
  };

  const onDeletePost = (docId) => {
    Alert.alert(
      "Do you want to delete?",
      "Do You Really Want to delete this Post",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel clicked"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
        },
      ]
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "600", fontSize: 30 }}>UserPost</Text>
      <FlatList
        numColumns={2}
        data={userPostList}
        refreshing={loader}
        onRefresh={GetUserPost}
        renderItem={({ item }) => {
          if (!item) return null; // Handle undefined item
          return (
            <View>
              <PetListItem pet={item} />
              <Pressable
                onPress={() => onDeletePost(item.id)}
                style={styles.deleteButton}
              >
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Delete
                </Text>
              </Pressable>
            </View>
          );
        }}
      />

      {userPostList.length === 0 && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: Colors.GRAY,
            textAlign: "center",
          }}
        >
          No Post Found
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 7,
    marginTop: 5,
    marginRight: 10,
  },
});
