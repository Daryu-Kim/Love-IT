import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { db } from "/assets/js/modules/_variabled.js";

var isLogined = false;

window.onload = function () {
  var i = setTimeout(() => {
    LoginCheck();
    if (isLogined) {
      location.replace("/assets/views/main.html");
    } else {
      location.replace("/assets/views/user/login.html");
    }
  }, 3500);
}

function LoginCheck() {
  var token = GetCookie("phone");
  getDoc(doc(db, "user", `${token}`)).then(docSnap => {
    if (docSnap.exists()) {
      isLogined = true;
    } else {
      isLogined = false;
    }
  })
}

function GetCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}