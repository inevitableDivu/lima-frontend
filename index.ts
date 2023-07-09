import firebase from "@react-native-firebase/app";
import "expo-router/entry";
import { config } from "./config";

const firebaseConfig = {
    apiKey: config.REACT_APP_API_KEY,
    authDomain: config.REACT_APP_AUTH_DOMAIN,
    projectId: config.REACT_APP_PROJECT_ID,
    storageBucket: config.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: config.REACT_APP_MESSAGING_SENDER_ID,
    appId: config.REACT_APP_APP_ID,
};

if (firebase.apps.length < 1) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
