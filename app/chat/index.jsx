import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { DB } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

const Chat = () => {
  const params = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(
      collection(DB, "Chat", params?.id, "Messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );

    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const documentRef = doc(DB, "Chat", params?.id);
    const docSnap = await getDoc(documentRef);

    const result = docSnap.data();
    console.log(result);
    const otherUser = result?.users.filter(
      (item) => item.email !== user.primaryEmailAddress?.emailAddress
    );
    console.log(otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };

  const onSend = async (newMessage) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    newMessage[0].createdAt=moment().format("MM-DD-YYYY HH::mm:ss")
    await addDoc(collection(DB, "Chat", params.id, "Messages"), newMessage[0]);
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
