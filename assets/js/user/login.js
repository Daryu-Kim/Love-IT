import { SetCookie, db, user_data_list } from '/assets/js/modules/_variabled.js'
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const start_btn = document.querySelector(".video-control-btn");
const install_app_container = document.querySelector(".install-app-btn-container");
const install_app = document.querySelector(".install-app-btn-container > i");

let defferred_prompt;

Kakao.init('dd9b7e29165717aef0f1dd5530bc7213');
Kakao.Auth.logout();

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    defferred_prompt = e;
    // Update UI to notify the user they can add to home screen
    install_app_container.style.display = "flex";
  
    install_app.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button

      // Show the prompt
      defferred_prompt.prompt();
      // Wait for the user to respond to the prompt
      defferred_prompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          defferred_prompt = null;
        });
    });
  });

  install_app_container.style.display = "flex";

// PC, Android, iOS ?? Compatable.
install_app.addEventListener("click", async () => {
    if (defferred_prompt !== null) {
        defferred_prompt.prompt();
        const { outcome } = await defferred_prompt.userChoice;
        if (outcome === 'accepted') {
            defferred_prompt = null;
        }
        defferred_prompt = null;
    }
})

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