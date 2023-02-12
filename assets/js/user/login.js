import { SetCookie, db, user_data_list, app_title } from '/assets/js/modules/_variabled.js'
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const start_btn = document.querySelector(".video-control-btn");
const install_app_container = document.querySelector(".install-app-btn-container");
const install_app = document.querySelector(".install-app-btn-container > i");

let defferred_prompt;
var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
var device_inf = navigator.userAgent.toLowerCase();

document.title = app_title["login"];
Kakao.init('dd9b7e29165717aef0f1dd5530bc7213');
// Kakao.Auth.logout();
console.log(`${mobile}\n${device_inf}`);
if (mobile) {
    console.log(device_inf);
    if (device_inf.indexOf("android") > -1) {
        console.log("Android")
        if (isRunningStandalone()) { console.log("Standalone"); }
        else {
            console.log("Not Standalone")
            if (device_inf.indexOf("chrome") > -1 && !!window.chrome) {
                console.log("Verified");
            } else if (
                device_inf.indexOf("edg/") > -1 ||
                device_inf.indexOf("firefox") > -1 ||
                device_inf.indexOf("opr") > -1 && !!window.opr ||
                device_inf.indexOf("SamsungBrowser") > -1
            ) {
                console.log("Compatible");
            } else {
                console.log("Not Compatible")
            }
        }
    } else if (
        device_inf.indexOf("iphone") > -1 ||
        device_inf.indexOf("ipad") > -1 ||
        device_inf.indexOf("ipod") > -1
    ) {
        console.log("iOS")
        if (isRunningStandalone()) { console.log("Standalone"); }
        else {
            console.log("Not Standalone");
            if (device_inf.indexOf("safari") > -1) {
                console.log("Compatible");
            } else {
                console.log("Not Compatible");
            }
        }
    } else {
        console.log("Other OS");
        console.log("Not Compatible");
    }
} else {
    console.log("Desktop")
    if (isRunningStandalone()) { console.log("Standalone"); }
    else {
        console.log("Not Standalone")
        if (
            device_inf.indexOf("chrome") > -1 && !!window.chrome ||
            device_inf.indexOf("edg/") > -1 ||
            device_inf.indexOf("firefox") > -1 ||
            device_inf.indexOf("opr") > -1 && !!window.opr
        ) {
            console.log("Verified");
        } else {
            console.log("Not Compatible")
        }
    }
}

window.addEventListener('beforeinstallprompt', (e) => { beforeInstallPrompt(e) });

start_btn.addEventListener("click", function () {
    kakaoLogin();
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
            if (data[user_data_list.length - 1] == false) {
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

function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches);
}

function beforeInstallPrompt(e) {
    e.preventDefault();

    defferred_prompt = e;
    install_app_container.style.display = "flex";

    install_app.addEventListener('click', () => { installApp() });
}

function installApp() {
    defferred_prompt.prompt();
    defferred_prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        defferred_prompt = null;
    });
}