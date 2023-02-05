import { db } from "/assets/js/modules/_variabled.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const header_prev = document.querySelector(".header-prev");
const footer_submit = document.querySelector(".footer-submit");
var content_locate = document.querySelector(".content-locate");

var mapOption = {
    center: new kakao.maps.LatLng(37.56629, 126.97855), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
}; 

/* AddEventListener */
// Header
header_prev.addEventListener("click", function () {
    history.back();
});

// Content
var map = new kakao.maps.Map(content_locate, mapOption);

// 마우스 드래그와 모바일 터치를 이용한 지도 이동을 막는다
map.setDraggable(false);

// 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막는다
map.setZoomable(false);

// 지도에 마커를 생성하고 표시한다
var marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.56629, 126.97855), // 마커의 좌표
    map: map // 마커를 표시할 지도 객체
});
navigator.geolocation.getCurrentPosition(LocationLoadSuccess, LocationLoadError);

// Footer
footer_submit.addEventListener("click", function () {

});

/* Function */
function LocationLoadSuccess(pos) {
    // 현재 위치 받아오기
    var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);

    // 마커 생성
    var marker = new kakao.maps.Marker({
        position: currentPos
    });

    // 기존에 마커가 있다면 제거
    marker.setMap(null);
    marker.setMap(map);
};

function LocationLoadError(pos) {
    alert('위치 정보를 가져오는데 실패했습니다.');
};

function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}