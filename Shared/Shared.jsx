import { doc,  getDoc, setDoc, updateDoc } from "firebase/firestore";
import { DB } from "../config/FirebaseConfig";

export default async function GetFavList(user) {
  const docSnap = await getDoc(
    doc(DB, "UserFavouritePet", user?.primaryEmailAddress?.emailAddress)
  );

  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(
      doc(DB, "UserFavouritePet", user?.primaryEmailAddress?.emailAddress),
      {
        email: user?.primaryEmailAddress?.emailAddress,
        favourites: [],
      }
    );
  }
}

export const UpdateFav = async (user, favourites) => {
    const docRef = doc(
      DB,
      "UserFavouritePet",
      user?.primaryEmailAddress?.emailAddress
    );
  
    try {
      // Ensure that 'favourites' is always an array
      await updateDoc(docRef, {
        favourites: favourites || [], // Default to an empty array if undefined
      });
    } catch (error) {
      console.log("Error updating favourites:", error);
    }
  };
  