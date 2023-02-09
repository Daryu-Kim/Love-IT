import { db } from "/assets/js/modules/_variabled.js"
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { Toast } from "../modules/toast.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_nick = document.querySelector(".content-nick");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    if (content_nick.value != "") {
        updateDoc(doc(db, "user", GetCookie("id")), {
            "nick": content_nick.value
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-height.html";
        }, 1500);
    } else {
        Toast("닉네임을 입력해주세요");
        content_nick.focus();
    }
});

/* Function */
function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}
