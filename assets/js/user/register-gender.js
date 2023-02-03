import { db } from "/assets/js/modules/_variabled.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_radio = document.querySelectorAll(".content-gender-radio");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    if (content_radio[0].checked || content_radio[1].checked) {
        if (content_radio[0].checked) {
            SetCookie("gender", "여자");
        } else {
            SetCookie("gender", "남자");
        }
        location.href = "/assets/views/user/register-birth.html";
    } else {
        alert("성별을 선택해주세요!");
    }
});

/* Function */
function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}