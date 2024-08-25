import React, { useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b !== undefined ? b : a,
    paddingBottom: c !== undefined ? c : a,
    paddingLeft: d !== undefined ? d : b !== undefined ? b : a,
  };
}

const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL('/(tabs)/Home', { scheme: "myapp" }),
        });

      if (createdSessionId) {
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ backgroundColor: Colors.WHITE, height: "100%" }}>
      <Image
        style={{ width: "100%", height: "70%" }}
        source={require("../../assets/images/Designer.jpeg")}
      />
      <View
        style={{
          height:"30%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...padding(20, 12, 12, 10),
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            color: Colors.TEXTSECONDARY,
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Are You Lonely?
        </Text>
        <Text
          style={{
            fontWeight: "600",
            color: Colors.BLACK,
            fontSize: 24,
            textAlign: "center",
          }}
        >
          Ready to Meet New friends
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 6,
            fontWeight: 400,
            color: Colors.GRAY,
            textAlign: "center",
          }}
        >
          Let's Adopt the pets which needs a friend Like You
        </Text>
        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 20,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            borderRadius: 14,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
