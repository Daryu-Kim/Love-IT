import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { GetCookie, db } from "../modules/_variabled.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_radio = document.querySelectorAll(".content-gender-radio");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content

// Footer
footer_submit.addEventListener("click", function () {
    if (content_radio[0].checked || content_radio[1].checked) {
        if (content_radio[0].checked) {
            updateDoc(doc(db, "user", GetCookie("phone")), {
                "gender": "W"
            });
            // SetCookie("gender", "여자");
        } else {
            updateDoc(doc(db, "user", GetCookie("phone")), {
                "gender": "M"
            });
            // SetCookie("gender", "남자");
        }
        setTimeout(() => {
            location.href = "/assets/views/user/register-birth.html";
        }, 1500);
    } else {
        alert("성별을 선택해주세요.");
    }
});

/* Function */