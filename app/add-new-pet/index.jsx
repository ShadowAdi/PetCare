import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { DB, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const [formData, setFormData] = useState({ category: "Dog", sex: "Male" });
  const [sex, setSex] = useState("Male");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const router=useRouter()

  const onSubmit = () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      return;
    }
    uploadImage();
  };

  const uploadImage = async () => {
    setLoader(true);

    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, "/petadopt/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blobImage)
      .then((snapshot) => {
        console.log("File Upload");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          SaveFromData(downloadUrl);
        });
      });
    setLoader(false);
  };

  const SaveFromData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(DB, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user.fullName,
      userImage: user.imageUrl,
      id: docId,
      email: user?.primaryEmailAddress?.emailAddress,
    });

    router.replace("/(tabs)/home")
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    getCategory();
  }, []);

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const getCategory = async () => {
    setCategory([]);
    const snapshot = await getDocs(collection(DB, "Category"));
    snapshot.forEach((doc) => {
      setCategory((category) => [...category, doc.data()]);
    });
  };

  const imagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
      <Text style={{ fontWeight: 500, fontSize: 20 }}>
        Add New Pet for adoption
      </Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              objectFit: "contain",
            }}
            source={require("./../../assets/images/placeholder.png")}
          />
        ) : (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              objectFit: "contain",
            }}
            source={{ uri: image }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
          placeholder="Pet Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
          placeholder="Breed Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          style={styles.input}
          selectedValue={sex}
          onValueChange={(itemValue, itemIndex) => {
            setSex(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value={"Male"} />
          <Picker.Item label="Female" value={"Female"} />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {category?.map((c, i) => {
            return <Picker.Item label={c.Name} value={c.Name} key={i} />;
          })}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(value) => handleInputChange("weight", value)}
          placeholder="30Kg"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
          placeholder="512 Street"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
          numberOfLines={5}
        />
      </View>

      <TouchableOpacity
        disabled={loader}
        style={styles.button}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text style={{ textAlign: "center" }}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  label: {
    marginVertical: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 20,
  },
});
