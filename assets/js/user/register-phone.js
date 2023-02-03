const x_box = document.querySelector(".content-phone-x-box");
const phone = document.querySelector(".content-phone");
const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");

header_prev.addEventListener("click", function() {
    history.back();
})

phone.addEventListener("input", function() {
    OnlyNumber(phone);
})

phone.addEventListener("focusin", function() {
    Focus(phone);
})

x_box.addEventListener("click", function() {
    phone.value = "";
    x_box.style.display = "none";
    footer_submit.style.backgroundColor = "var(--sub-light-color";
    footer_submit.style.color = "var(--sub-dark-color)";
    footer_submit.style.cursor = "default";
});

footer_submit.addEventListener("click", function() {
    if (footer_submit.style.cursor == "pointer") {
        SetCookie("phone", phone.value);
        location.href = "/assets/views/user/register-key.html";
    }
});

function Focus(element) {
    if (element.value.length == 0) {
        element.value = "010";
        x_box.style.display = "flex";
    }
}

function OnlyNumber(element) {
    const regExp = /[^0-9]/g;
    if (regExp.test(element.value)) {
        element.value = element.value.replace(regExp, "");
    }

    if (element.value.length > 0) {
        x_box.style.display = "flex";
    }

    if (element.value.length == 11) {
        footer_submit.style.backgroundColor = "var(--accent-color)";
        footer_submit.style.color = "white";
        footer_submit.style.cursor = "pointer";
    } else {
        footer_submit.style.backgroundColor = "var(--sub-light-color";
        footer_submit.style.color = "var(--sub-dark-color)";
        footer_submit.style.cursor = "default";
    }
}

function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}