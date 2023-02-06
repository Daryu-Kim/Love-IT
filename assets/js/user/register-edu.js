import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_edu = document.querySelectorAll(".content-edu");
const content_edu_label = document.querySelectorAll(".content-edu-label");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var edu;
    content_edu.forEach((element, index) => {
        if (element.checked) {
            edu = content_edu_label[index].innerHTML;
        }
    });
    if (edu != undefined) {
        updateDoc(doc(db, "user", GetCookie("phone")), {
            "edu": edu
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-work.html";
        }, 1500);
    } else {
        alert("학력을 선택해주세요");
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
