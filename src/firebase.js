import firebase from 'firebase/app'
import 'firebase/firestore'

/* // Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyA7Byf6NqE7q4qeuRAMq8cPhA3IrG3youQ",
    authDomain: "fb-crud-react-ba779.firebaseapp.com",
    projectId: "fb-crud-react-ba779",
    storageBucket: "fb-crud-react-ba779.appspot.com",
    messagingSenderId: "523807141115",
    appId: "1:523807141115:web:3ba6340a9602ee3ad3545e"
};
 */

const APIKEY = "AIzaSyD_OxDz-eyyABa5Nr_Mc1kSuut75DcQIXQ"
const AUTH_DOMAIN = "virtualhockey.firebaseapp.com"
const PROJECT_ID = "virtualhockey"
const STORAGE_BUCKET = "virtualhockey.appspot.com"
const MESSAGING_SENDER_ID = "405449447383"
const APP_ID = "1:405449447383:web:a36b72395dfdaffd8d9d92"

export const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
}


// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);


export const db = fb.firestore();

