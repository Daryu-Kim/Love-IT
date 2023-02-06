// FireBase Variables
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

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

export const locate = {
    "서울특별시": [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구"
    ],
    "인천광역시": [
        
    ],
    "경기도": [
        
    ],
    "강원도": [
        
    ],
    "대전광역시": [
        "동구",
        "중구",
        "서구",
        "유성구",
        "대덕구"
    ],

}