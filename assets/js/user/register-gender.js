import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { GetCookie, db } from "../modules/_variabled.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_gender = document.querySelectorAll(".content-gender-radio");
const content_gender_label = document.querySelectorAll(".content-gender-label");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    var gender;
    content_gender.forEach((element, index) => {
        if (element.checked) {
            gender = content_gender_label[index].innerHTML;
        }
    });
    if (gender != undefined) {
        updateDoc(doc(db, "user", GetCookie("phone")), {
            "gender": gender
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-birth.html";
        }, 1500);
    } else {
        alert("성별을 선택해주세요");
    }
});

/* Function */