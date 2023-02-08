import { db, char_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_char_box = document.querySelector(".content-char-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < char_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "checkbox");
    create_checkbox.classList.add("content-char-check");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = char_list[i];
    create_label.classList.add("content-char-label");

    content_char_box.appendChild(create_checkbox);
    content_char_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    const content_char = document.querySelectorAll(".content-char-check");
    const content_char_label = document.querySelectorAll(".content-char-label");

    var char = [], final_char;
    content_char.forEach((element, index) => {
        if (element.checked) {
            char.push(content_char_label[index].innerHTML);
        }
    });
    if (char != undefined) {
        for (let i = 0; i < char.length; i++) {
            final_char += char[i]+",";
        }
        final_char = char.filter((element) =>
            element !== undefined && element !== null && element !== ''
        );
        console.log(char, final_char)
        updateDoc(doc(db, "user", GetCookie("id")), {
            "char": final_char
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-hobby.html";
        }, 1500);
    } else {
        alert("성격을 선택해주세요");
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
