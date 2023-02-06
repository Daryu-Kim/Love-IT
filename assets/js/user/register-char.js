import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_work = document.querySelectorAll(".content-work");
const content_work_label = document.querySelectorAll(".content-work-label");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var work;
    content_work.forEach((element, index) => {
        if (element.checked) {
            work = content_work_label[index].innerHTML;
        }
    });
    if (work != undefined) {
        updateDoc(doc(db, "user", GetCookie("phone")), {
            "work": work
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-char.html";
        }, 1500);
    } else {
        alert("직업을 선택해주세요");
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
