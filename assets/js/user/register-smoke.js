import { db, smoke_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_smoke_box = document.querySelector(".content-smoke-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < smoke_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "radio");
    create_checkbox.setAttribute("name", "smoke");
    create_checkbox.classList.add("content-smoke");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = smoke_list[i];
    create_label.classList.add("content-smoke-label");

    content_smoke_box.appendChild(create_checkbox);
    content_smoke_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    const content_smoke = document.querySelectorAll(".content-smoke");
    const content_smoke_label = document.querySelectorAll(".content-smoke-label");
    var smoke;
    content_smoke.forEach((element, index) => {
        if (element.checked) {
            smoke = content_smoke_label[index].innerHTML;
        }
    });
    if (smoke != undefined) {
        updateDoc(doc(db, "user", GetCookie("id")), {
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
