import { db, storage } from "../modules/_variabled.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const footer_submit = document.querySelector(".footer-submit");
const content_validate = document.querySelector('.content-validate-box');

/* AddEventListener */
// Header

// Content
var storageRef = ref(storage, `user/${GetCookie("id")}/profile/wait/0.png`);

updateDoc(doc(db, "user", GetCookie("id")), {
    "validate": false
});
getDownloadURL(storageRef)
    .then((url) => {
        content_validate.style.backgroundImage = `url(${url})`;
    })
    .catch((error) => {
        console.log(error);
    });

// Footer

/* Function */
function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}
