import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_faith = document.querySelectorAll(".content-faith");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var temp, faith;
    content_faith.forEach((element, index) => {
        if (element.checked) {
            temp = index;
        }
    });
    switch (temp) {
        case 0:
            faith = "무교";
            break;
        case 1:
            faith = "기독교";
            break;
        case 2:
            faith = "불교";
            break;
        case 3:
            faith = "천주교";
            break;
        case 4:
            faith = "원불교";
            break;
        case 5:
            faith = "기타";
            break;
    }
    if (temp >= 0) {
        updateDoc(doc(db, "user", GetCookie("phone")), {
            "faith": faith
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-drink.html";
        }, 1500);
    } else {
        alert("종교를 선택해주세요");
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
