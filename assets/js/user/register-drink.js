import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_drink = document.querySelectorAll(".content-drink");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var temp, drink;
    content_drink.forEach((element, index) => {
        if (element.checked) {
            temp = index;
        }
    });
    switch (temp) {
        case 0:
            drink = "전혀 안함";
            break;
        case 1:
            drink = "주 1~2회";
            break;
        case 2:
            drink = "주 3~4회";
            break;
        case 3:
            drink = "주 5~7회";
            break;
    }
    if (temp >= 0) {
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
