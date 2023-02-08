import { db, style_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_style_box = document.querySelector(".content-style-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < style_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "checkbox");
    create_checkbox.classList.add("content-style-check");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = style_list[i];
    create_label.classList.add("content-style-label");

    content_style_box.appendChild(create_checkbox);
    content_style_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    var style = [], final_style;
    const content_style = document.querySelectorAll(".content-style-check");
    const content_style_label = document.querySelectorAll(".content-style-label");

    content_style.forEach((element, index) => {
        if (element.checked) {
            style.push(content_style_label[index].innerHTML);
        }
    });
    if (style != undefined) {
        for (let i = 0; i < style.length; i++) {
            final_style += style[i]+",";
        }
        final_style = style.filter((element) =>
            element !== undefined && element !== null && element !== ''
        );
        updateDoc(doc(db, "user", GetCookie("id")), {
            "style": final_style
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-des.html";
        }, 1500);
    } else {
        alert("선호하는 스타일을 선택해주세요");
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
