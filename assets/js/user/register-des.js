import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { Toast } from "../modules/toast.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_des_area = document.querySelector(".content-des-area");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    console.log(content_des_area.value)
    if (content_des_area.value != "") {
        var des_replace = content_des_area.value.split(`\n`);
        updateDoc(doc(db, "user", GetCookie("id")), {
            "des": des_replace
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-photo.html";
        }, 1500);
    } else {
        Toast("자기소개를 입력해주세요!");
        content_des_area.focus();
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