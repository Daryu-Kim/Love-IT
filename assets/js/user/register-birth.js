import { db } from "/assets/js/modules/_variabled.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_birth = document.querySelectorAll(".content-birth");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
content_birth.forEach((element) => {
    element.addEventListener("input", function () {
        NoKorean(element);
    });
});

// Footer
footer_submit.addEventListener("click", function () {
    if (content_birth[0].value != "") {
        if (content_birth[1].value != "") {
            if (content_birth[2].value != "") {
                SetCookie("birth", `${content_birth[0].value}-${content_birth[1].value}-${content_birth[2].value}`);
                location.href = "/assets/views/user/register-locate.html";
            } else {
                alert("일을 입력해주세요");
                content_birth[2].focus();
            }
        } else {
            alert("월을 입력해주세요");
            content_birth[1].focus();
        }
    } else {
        alert("연도를 입력해주세요");
        content_birth[0].focus();
    }
});

/* Function */
function NoKorean(element) {
    const regExp = /[^0-9]/g;
    if (regExp.test(element.value)) {
        element.value = element.value.replace(regExp, "");
    }
}

function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}