import { db } from "/assets/js/modules/_variabled.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_des = document.querySelector(".content-des");
const content_key = document.querySelectorAll(".content-key");
const content_retry = document.querySelector(".content-key-control-re");
const content_empty = document.querySelector(".content-key-control-empty");

const user_phone_num = GetCookie("phone");

var key;
var client_key = "";
var timer = null;
var isRunning = false;
var retry_time = 180;
var current_time = 0;

MakeRequestCode();

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
        MakeRequestCode();
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
            CheckAccount();
        } else {
            alert("인증번호 오류!");
        }
    }
});

/* Function */
function MakeRequestCode() {
    key = Math.floor((Math.random() * 999999)).toString();
    alert(`인증 번호는 ${key} 입니다.`);
    StartTimer(retry_time, content_des);
}

function CheckAccount() {
    getDoc(doc(db, "user", `${user_phone_num}`)).then(docSnap => {
        if (docSnap.exists()) {
            alert("가입되어 있는 사용자입니다");
            location.href = "/assets/views/main.html";
        } else {
            alert("가입되어 있지 않은 사용자입니다");
            location.href = "/assets/views/user/register-gender.html";
        }
    });
}

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

function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}