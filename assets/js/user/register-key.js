const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
const content_key = document.querySelectorAll(".content-key");
var key = "374521";
var client_key = "";

header_prev.addEventListener("click", function () {
    history.back();
})

footer_submit.addEventListener("click", function () {
    client_key = "";
    content_key.forEach((element, index) => {
        client_key += element.value;
    });

    if (key === client_key) {
        alert("인증번호 확인!")
    } else {
        alert("인증번호 오류!")
    }

});

function NoKorean(event, index) {
    const regExp = /[^0-9a-zA-Z]/g;
    const element = event.target;
    if (regExp.test(element.value)) {
        element.value = element.value.replace(regExp, "");
    } else {
        if (index < 6) {
            content_key[index].focus();
        } else {
            element.blur();
        }
    }
}