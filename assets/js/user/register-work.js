import { db, work_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_work_box = document.querySelector(".content-work-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < work_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "radio");
    create_checkbox.setAttribute("name", "work");
    create_checkbox.classList.add("content-work");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = work_list[i];
    create_label.classList.add("content-work-label");

    content_work_box.appendChild(create_checkbox);
    content_work_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    const content_work = document.querySelectorAll(".content-work");
    const content_work_label = document.querySelectorAll(".content-work-label");

    var work;
    content_work.forEach((element, index) => {
        if (element.checked) {
            work = content_work_label[index].innerHTML;
        }
    });
    if (work != undefined) {
        updateDoc(doc(db, "user", GetCookie("id")), {
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
