import { db } from "/assets/js/modules/_variabled.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { locate } from "../modules/_variabled.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
var content_locate = document.querySelectorAll(".content-locate");

const content_si = document.querySelector("#select-si");
const content_gu = document.querySelector("#select-gu");

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
SelectInit(true);
var si = Object.keys(locate);
si.forEach((element) => {
    content_si.insertAdjacentHTML("beforeend", `<option value=${element}>${element}</option>`);
});

content_si.addEventListener("change", function () {
    SelectInit();
    var region = content_si.value;
    var gu = Object.keys(locate[region]);
    gu.forEach((element) => {
        content_gu.insertAdjacentHTML("beforeend", `<option value=${locate[region][element]}>${locate[region][element]}</option>`);
    })
});

// Footer
footer_submit.addEventListener("click", function () {
    if (content_si.value != "") {
        if (content_gu.value != "") {
            SetCookie("locate", `${content_si.value} ${content_gu.value}`);
            location.href = "/assets/views/user/register-locate.html";
        } else {
            alert("'시 · 군 · 구'를 선택해주세요");
            content_gu.focus();
        }
    } else {
        alert("'시 · 도'를 선택해주세요");
        content_si.focus();
    }
});

/* Function */
function SelectInit(si) {
    si ? content_si.innerHTML = "<option value =''>시·도</option>" : "";
    content_gu.innerHTML = "<option value =''>시·군·구</option>";
}

function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}
