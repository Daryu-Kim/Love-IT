import { db, drink_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { Toast } from "../modules/toast.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_drink_box = document.querySelector(".content-drink-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < drink_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "radio");
    create_checkbox.setAttribute("name", "drink");
    create_checkbox.classList.add("content-drink");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = drink_list[i];
    create_label.classList.add("content-drink-label");

    content_drink_box.appendChild(create_checkbox);
    content_drink_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    const content_drink = document.querySelectorAll(".content-drink");
    const content_drink_label = document.querySelectorAll(".content-drink-label");
    var drink;
    content_drink.forEach((element, index) => {
        if (element.checked) {
            drink = content_drink_label[index].innerHTML;
        }
    });
    if (drink != undefined) {
        updateDoc(doc(db, "user", GetCookie("id")), {
            "drink": drink
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-smoke.html";
        }, 1500);
    } else {
        Toast("주량을 선택해주세요!");
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
