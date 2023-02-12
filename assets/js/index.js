import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { db, user_data_list } from "/assets/js/modules/_variabled.js";

var isLogined = false;

window.onload = function () {
  var i = setTimeout(() => {
    LoginCheck();
    if (isLogined) {
    } else {
      // location.replace("/assets/views/user/login.html");
      location.href = "/assets/views/user/login.html";
    }
  }, 3500);
}

function LoginCheck() {
  var token = GetCookie("id");
  getDoc(doc(db, "user", `${token}`)).then(docSnap => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      for (let i = 0; i < user_data_list.length; i++) {
        if (data[user_data_list[i]]) {
          chk++;
          console.log(chk);
        } else {
          console.log(`404: ${user_data_list[i]}`)
          location.href = `/assets/views/user/login.html`;
          break;
        }
      }
      if (data[user_data_list.length - 1] == false) {
        chk--;
      }
      if (chk == user_data_list.length) {
        console.log(chk);
        location.href = "/assets/views/main.html";
      }
    } else {
      location.href = `/assets/views/user/login.html`;
    }
  })
}

function GetCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}