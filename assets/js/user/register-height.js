import { min_height, max_height, db } from "../modules/_variabled.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_title = document.querySelector(".content-title");
const content_height = document.querySelector(".content-height");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
getDoc(doc(db, "user", GetCookie("phone"))).then(docSnap => {
    if (docSnap.exists()) {
        const name = docSnap.data().name;
        content_title.innerHTML = `
            거의 다 왔습니다
            <br>
            <span>${name}</span>
            님의 키를 입력해주세요
        `
    }

});

SelectInit();
for (let i = min_height; i <= max_height; i++) {
    content_height.insertAdjacentHTML("beforeend", `<option value=${i}cm>${i}cm</option>`);
}

// Footer
footer_submit.addEventListener("click", function () {
    if (content_height.value != "") {
        updateDoc(doc(db, "user", GetCookie("id")), {
            "height": content_height.value
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-faith.html";
        }, 1500);
    } else {
        alert("'키'를 선택해주세요");
        content_height.focus();
    }
});

/* Function */
function SelectInit() {
    content_height.innerHTML = "<option value =''>키</option>";
}

function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}
