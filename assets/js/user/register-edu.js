import { db, edu_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { Toast } from "../modules/toast.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_edu_box = document.querySelector(".content-edu-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < edu_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "radio");
    create_checkbox.setAttribute("name", "edu");
    create_checkbox.classList.add("content-edu");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = edu_list[i];
    create_label.classList.add("content-edu-label");

    content_edu_box.appendChild(create_checkbox);
    content_edu_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    const content_edu = document.querySelectorAll(".content-edu");
    const content_edu_label = document.querySelectorAll(".content-edu-label");
    var edu;
    content_edu.forEach((element, index) => {
        if (element.checked) {
            edu = content_edu_label[index].innerHTML;
        }
    });
    if (edu != undefined) {
        updateDoc(doc(db, "user", GetCookie("id")), {
            "edu": edu
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-work.html";
        }, 1500);
    } else {
        Toast("학력을 선택해주세요!");
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
