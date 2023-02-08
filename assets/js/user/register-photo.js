import { db, storage } from "../modules/_variabled.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_photo = document.querySelectorAll(".content-photo");
const content_photo_upload = document.querySelectorAll(".content-photo-upload");



/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
content_photo_upload.forEach((element, index) => {
    element.addEventListener("change", function(e, file) {
        var files = e.currentTarget.files;
        console.log(typeof files, files);

        const img = document.createElement('img');
        img.setAttribute('src', e.target.result)
        img.setAttribute('data-file', file.name)
        content_photo[index].appendChild(img);
    })
})

// Footer
footer_submit.addEventListener("click", function () {
    if (content_des_area.value != "") {
        var des_replace = content_des_area.value.split(`\n`);
        updateDoc(doc(db, "user", GetCookie("id")), {
            "des": des_replace
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-photo.html";
        }, 1500);
    } else {
        alert("자기소개를 입력해주세요");
        content_des_area.focus();
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