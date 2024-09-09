import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
export default function Profile() {
  const { user } = useUser();
  const router=useRouter()
  const {signOut}=useAuth()
  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "My Post",
      icon: "bookmark",
      path: "/user-post",
    },
    {
      id: 3,
      name: "Favourites",
      icon: "heart",
      path: "/(tabs)/favourite",
    },
    {
      id: 4,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 5,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];

  const onPressMenu=(item)=>{
    if (item.name==="Logout") {
      signOut()
      return
    }
    router.push(item.path)
  }
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: 600 }}>Profile</Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        />
        <Text style={{ fontWeight: 700, fontSize: 20, marginTop: 6 }}>
          {user?.fullName}
        </Text>
        <Text style={{ fontSize: 16, color: Colors.GRAY }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        style={{}}
        renderItem={({ Item, index }) => (
          <TouchableOpacity onPress={()=>onPressMenu(Item)}
            key={index}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor:Colors.WHITE,
              padding:10,
              borderRadius:10
            }}
          >
            <Ionicons
              name={Item.icon}
              size={30}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontSize: 20 }}>{Item.name}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
