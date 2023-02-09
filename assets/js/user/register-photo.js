import { db, storage } from "../modules/_variabled.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { Toast } from "../modules/toast.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_photo_label = document.querySelectorAll(".content-photo-label");
const content_photo_upload = document.querySelectorAll(".content-photo-upload");
const content_photo_i = document.querySelectorAll('.content-photo-label > i');
const content_photo_p = document.querySelectorAll('.content-photo-label > p');

var photos = [];

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
content_photo_upload.forEach((element, index) => {
    element.addEventListener("change", function (e) {
        const selected_file = element.files[0];
        const file_reader = new FileReader();

        file_reader.readAsDataURL(selected_file);
        file_reader.onload = function () {
            content_photo_label[index].style.backgroundColor = 'none'
            content_photo_label[index].style.backgroundImage = `url(${file_reader.result})`;
            content_photo_i[index].style.display = "none";
            content_photo_p[index].style.display = "none";
            element.setAttribute("disabled", true);
            photos.push(`${index}.png`);
        };
    });
})

// Footer
footer_submit.addEventListener("click", function () {
    if (content_photo_upload[0].files[0] != undefined) {
        content_photo_upload.forEach((element, index) => {
            if (element.files[0] != undefined) {
                var storageRef = ref(storage, `user/${GetCookie("id")}/profile/wait/${index}.png`);
                const selected_file = element.files[0];
                uploadBytes(storageRef, selected_file).then((snapshot) => {
                    console.log('Uploaded an array!');
                });
                updateDoc(doc(db, "user", GetCookie("id")), {
                    "photo": photos
                });
            }
        });
        setTimeout(() => {
            location.href = "/assets/views/user/register-validate.html";
        }, 3000);
    } else {
        Toast("필수 사진을 업로드해주세요!");
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
