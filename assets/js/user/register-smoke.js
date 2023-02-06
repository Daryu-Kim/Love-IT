import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_smoke = document.querySelectorAll(".content-smoke");
const content_smoke_label = document.querySelectorAll(".content-smoke-label");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var smoke;
    content_smoke.forEach((element, index) => {
        if (element.checked) {
            smoke = content_smoke_label[index].innerHTML;
        }
    });
    if (smoke != undefined) {
        updateDoc(doc(db, "user", GetCookie("phone")), {
            "smoke": smoke
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-edu.html";
        }, 1500);
    } else {
        alert("흡연 스타일을 선택해주세요");
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
