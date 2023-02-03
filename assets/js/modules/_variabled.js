// FireBase Variables
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyDDwS9uL1vjmW6xPTZlv1o6mIA_45Eyd44",
    authDomain: "love-it-ac725.firebaseapp.com",
    databaseURL: "https://love-it-ac725-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "love-it-ac725",
    storageBucket: "love-it-ac725.appspot.com",
    messagingSenderId: "458212396464",
    appId: "1:458212396464:web:58de188491861ae2eb5a75",
    measurementId: "G-PR985564BG"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);