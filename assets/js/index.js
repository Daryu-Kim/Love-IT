var isLogined = false;

window.onload = function () {
  var i = setTimeout(() => {
    if (isLogined) {
      location.replace("/assets/views/main.html");
    } else {
      location.replace("/assets/views/user/login.html");
    }
  }, 3500);
}