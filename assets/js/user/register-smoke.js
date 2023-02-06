import { db } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_smoke = document.querySelectorAll(".content-smoke");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var temp, smoke;
    content_smoke.forEach((element, index) => {
        if (element.checked) {
            // temp = index;
            temp = element.innerHTML;
        }
    });
    // switch (temp) {
    //     case 0:
    //         smoke = "전혀 안함";
    //         break;
    //     case 1:
    //         smoke = "술 마실 때만";
    //         break;
    //     case 2:
    //         smoke = "주 1~2회";
    //         break;
    //     case 3:
    //         smoke = "주 3~4회";
    //         break;
    //     case 4:
    //         smoke = "주 5~7회";
    //         break;
    //     case 5:
    //         smoke = "전자담배";
    //         break;
    // }
    if (temp >= 0) {
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
