import { View, Text, Image, Button } from "react-native";
import React from "react";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ fontSize: 18 }}>Welcome,</Text>
        <Text style={{ fontSize: 25, fontWeight: "600" }}>
          {user?.firstName}
        </Text>
      </View>
      {/* <UserProfile/> */}
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 40, height: 40, borderRadius: 99 }}
      />

      <TouchableOpacity onPress={() => signOut({ redirectUrl: "/Login" })}>
        <Text>Signout</Text>
      </TouchableOpacity>
    </View>
  );
}
