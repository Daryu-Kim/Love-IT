import { db, hobby_list } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { Toast } from "../modules/toast.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_hobby_box = document.querySelector(".content-hobby-box");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
for (let i = 0; i < hobby_list.length; i++) {
    let create_checkbox = document.createElement("input");
    let create_label = document.createElement("label");

    // Checkbox Setting
    create_checkbox.setAttribute("id", `${i}`);
    create_checkbox.setAttribute("type", "checkbox");
    create_checkbox.classList.add("content-hobby-check");

    // Label Setting
    create_label.setAttribute("for", `${i}`);
    create_label.innerHTML = hobby_list[i];
    create_label.classList.add("content-hobby-label");

    content_hobby_box.appendChild(create_checkbox);
    content_hobby_box.appendChild(create_label);
}

// Footer
footer_submit.addEventListener("click", function () {
    var hobby = [], final_hobby;
    const content_hobby = document.querySelectorAll(".content-hobby-check");
    const content_hobby_label = document.querySelectorAll(".content-hobby-label");

    content_hobby.forEach((element, index) => {
        if (element.checked) {
            hobby.push(content_hobby_label[index].innerHTML);
        }
    });
    if (hobby != undefined && hobby != null && hobby != "") {
        for (let i = 0; i < hobby.length; i++) {
            final_hobby += hobby[i]+",";
        }
        final_hobby = hobby.filter((element) =>
            element !== undefined && element !== null && element !== ''
        );
        updateDoc(doc(db, "user", GetCookie("id")), {
            "hobby": final_hobby
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-style.html";
        }, 1500);
    } else {
        Toast("성격을 선택해주세요");
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
