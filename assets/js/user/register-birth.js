import { db } from "/assets/js/modules/_variabled.js"
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_birth = document.querySelectorAll(".content-birth");
const content_birth_change = document.querySelectorAll(".change");

var start_year = "1900";
var today = new Date();
var today_year = today.getFullYear();
var index = 0;

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
content_birth_change.forEach((element) => {
    element.addEventListener("change", function () {
        Lastday();
    });
});

for(var y=today_year; y>=start_year; y--){
	document.getElementById('select-year').options[index] = new Option(y, y);
	index++;
}
index=0;
for(var m=1; m<=12; m++){
	document.getElementById('select-month').options[index] = new Option(m, m);
	index++;
}

Lastday();

// Footer
footer_submit.addEventListener("click", function () {
    updateDoc(doc(db, "user", GetCookie("id")), {
        "birth": `${content_birth[0].value}-${content_birth[1].value}-${content_birth[2].value}`
    });
    setTimeout(() => {
        location.href = "/assets/views/user/register-locate.html";
    }, 1500);
});

/* Function */
function Lastday() { //년과 월에 따라 마지막 일 구하기 
    var year = document.getElementById('select-year').value;
    var month = document.getElementById('select-month').value;
    var day = new Date(new Date(year, month, 1) - 86400000).getDate();
    /* = new Date(new Date(Year,Month,0)).getDate(); */

    var dayindex_len = document.getElementById('select-day').length;
    if (day > dayindex_len) {
        for (var i = (dayindex_len + 1); i <= day; i++) {
            document.getElementById('select-day').options[i - 1] = new Option(i, i);
        }
    }
    else if (day < dayindex_len) {
        for (var i = dayindex_len; i >= day; i--) {
            document.getElementById('select-day').options[i] = null;
        }
    }
}

function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}