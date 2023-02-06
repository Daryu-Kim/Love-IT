import { db, GetCookie } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_faith = document.querySelectorAll(".content-faith");
const content_faith_label = document.querySelectorAll(".content-faith-label");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var faith;
    content_faith.forEach((element, index) => {
        if (element.checked) {
            faith = content_faith_label[index].innerHTML;
        }
    });

    if (faith != undefined) {
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
