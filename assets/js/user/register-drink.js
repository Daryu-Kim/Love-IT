import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_drink = document.querySelectorAll(".content-drink");
const content_drink_label = document.querySelectorAll(".content-drink-label");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var drink;
    content_drink.forEach((element, index) => {
        if (element.checked) {
            drink = content_drink_label[index].innerHTML;
        }
    });
    if (drink != undefined) {
        updateDoc(doc(db, "user", GetCookie("phone")), {
            "drink": drink
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-smoke.html";
        }, 1500);
    } else {
        alert("음주량을 선택해주세요");
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
