import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import InboxChat from "../../components/InboxChat";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  const GetUserList = async () => {
    setLoader(true)
    setUserList([]);
    const q = query(
      collection(DB, "Chat"),
      where("userIds", "array-contains", user.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserList((prevList) => [...prevList, doc.data()]);
    });

    setLoader(false)
  };

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (user) => user?.email !== user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: 500 }}>Inbox</Text>
      <FlatList
      refreshing={loader}
      onRefresh={GetUserList}
        style={{ marginTop: 20 }}
        data={MapOtherUserList}
        renderItem={({ item, index }) => (
          <InboxChat key={index} userInfo={item} />
        )}
      />
    </View>
  );
}
