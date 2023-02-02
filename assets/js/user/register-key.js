import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDDwS9uL1vjmW6xPTZlv1o6mIA_45Eyd44",
    authDomain: "love-it-ac725.firebaseapp.com",
    databaseURL: "https://love-it-ac725-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "love-it-ac725",
    storageBucket: "love-it-ac725.appspot.com",
    messagingSenderId: "458212396464",
    appId: "1:458212396464:web:58de188491861ae2eb5a75",
    measurementId: "G-PR985564BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const user_db = await getDocs(collection(db, "user"));

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_des = document.querySelector(".content-des");
const content_key = document.querySelectorAll(".content-key");
const content_retry = document.querySelector(".content-key-control-re");
const content_empty = document.querySelector(".content-key-control-empty");

var key = "374521";
var client_key = "";
var timer = null;
var isRunning = false;
var retry_time = 180;
var current_time = 0;

StartTimer(retry_time, content_des);

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
content_key.forEach((element, index) => {
    element.addEventListener("input", function () {
        NoKorean(element, index + 1);
    });
});

content_retry.addEventListener("click", function () {
    if (isRunning) {
        alert(`${current_time}초 뒤에 다시 시도해주세요.`)
    } else {
        StartTimer(retry_time, content_des);
    }
});

content_empty.addEventListener("click", function () {
    content_key.forEach((element) => {
        element.value = "";
    });
    content_key[0].focus();
});

// Footer
footer_submit.addEventListener("click", function () {
    if (current_time < 0) {
        alert("유효시간이 지났습니다. 다시 요청해주세요.")
    } else {
        client_key = "";
        content_key.forEach((element, index) => {
            client_key += element.value;
        });

        if (key === client_key) {
            alert("인증번호 확인!");
            user_db.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        } else {
            alert("인증번호 오류!");
        }
    }
});

/* Function */
function NoKorean(element, index) {
    const regExp = /[^0-9a-zA-Z]/g;
    if (regExp.test(element.value)) {
        element.value = element.value.replace(regExp, "");
    } else {
        if (index < 6) {
            content_key[index].focus();
        } else {
            element.blur();
        }
    }
}

function StartTimer(count, display) {
    current_time = count;
    timer = setInterval(function () {
        display.innerHTML = `${current_time}초 내에 입력해주세요.`;

        if (--current_time < 0) {
            clearInterval(timer);
            display.innerHTML = "유효시간이 지났습니다. 다시 요청해주세요.";
            isRunning = false;
        }
    }, 1000);
    isRunning = true;
}