import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase'; // Firebase setup

// Function to register for push notifications and store token in Firebase
export async function registerForPushNotificationsAsync(userId) {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    // Get the Expo push token
    token = (await Notifications.getExpoPushTokenAsync()).data;

    // Store the token in Firestore under the same userId but keep all tokens in an array
    const userRef = doc(db, 'expoPushTokens', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Update the document to add the new token to the array
      await updateDoc(userRef, {
        tokens: arrayUnion(token),
      });
    } else {
      // Create a new document with an array of tokens
      await setDoc(userRef, {
        tokens: [token],
      });
    }

    console.log('Expo Push Token stored in DB:', token);
  } else {
    alert('Must use a physical device for Push Notifications');
  }

  return token;
}
