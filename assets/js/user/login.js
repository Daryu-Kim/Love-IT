import { SetCookie, db, user_data_list } from '/assets/js/modules/_variabled.js'
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const start_btn = document.querySelector(".video-control-btn");

Kakao.init('dd9b7e29165717aef0f1dd5530bc7213');

Kakao.Auth.logout();

start_btn.addEventListener("click", function () {
    kakaoLogin();
    // location.href = "/assets/views/user/register-phone.html";
});

function kakaoLogin() {
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
            })
                .then(function (response) {
                    var id = response['id'].toString();
                    SetCookie("id", id);
                    CheckAccount(id);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        fail: function (error) {
            console.log(error)
        },
    })
}

function CheckAccount(id) {
    let chk = 0;
    getDoc(doc(db, "user", id)).then(docSnap => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            for (let i = 0; i < user_data_list.length; i++) {
                if (data[user_data_list[i]]) {
                    chk++;
                    console.log(chk);
                } else {
                    console.log(`404: ${user_data_list[i]}`)
                    location.href = `/assets/views/user/register-${user_data_list[i]}.html`;
                    break;
                }
            }
            if(data[user_data_list.length-1] == false) {
                chk--; 
            }
            if (chk == user_data_list.length) {
                console.log(chk);
                location.href = "/assets/views/main.html";
            }
        } else {
            setDoc(doc(db, "user", id), {});
            setTimeout(() =>
                location.href = "/assets/views/user/register-phone.html"
                , 3000);
        }
    });
}