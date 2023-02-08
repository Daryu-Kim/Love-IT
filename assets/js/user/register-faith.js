import { db, GetCookie, faith_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_faith_box = document.querySelector(".content-faith-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < faith_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "radio");
    create_checkbox.setAttribute("name", "faith");
    create_checkbox.classList.add("content-faith");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = faith_list[i];
    create_label.classList.add("content-faith-label");

    content_faith_box.appendChild(create_checkbox);
    content_faith_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    const content_faith = document.querySelectorAll(".content-faith");
    const content_faith_label = document.querySelectorAll(".content-faith-label");
    var faith;
    content_faith.forEach((element, index) => {
        if (element.checked) {
            faith = content_faith_label[index].innerHTML;
        }
    });

    if (faith != undefined) {
        updateDoc(doc(db, "user", GetCookie("id")), {
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
