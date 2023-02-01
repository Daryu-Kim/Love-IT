const x_box = document.querySelector(".content-phone-x-box");
const phone = document.querySelector(".content-phone");
const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");

header_prev.addEventListener("click", function() {
    history.back();
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
        location.href = "/assets/views/user/register-key.html";
    }
});

function MaxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }

    if (object.value.length > 0) {
        x_box.style.display = "flex";
    }

    if (object.value.length == 11) {
        footer_submit.style.backgroundColor = "var(--accent-color)";
        footer_submit.style.color = "white";
        footer_submit.style.cursor = "pointer";
    } else {
        footer_submit.style.backgroundColor = "var(--sub-light-color";
        footer_submit.style.color = "var(--sub-dark-color)";
        footer_submit.style.cursor = "default";
    }
}

function Focus(object) {
    if (object.value.length == 0) {
        object.value = "010";
        x_box.style.display = "flex";
    }
}

function KeyUP(object) {
    this.value = this.value.replace(/[^0-9]/g, "");
}