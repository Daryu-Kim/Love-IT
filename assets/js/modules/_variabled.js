// FireBase Variables
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";

export const firebaseConfig = {
    apiKey: "AIzaSyDDwS9uL1vjmW6xPTZlv1o6mIA_45Eyd44",
    authDomain: "love-it-ac725.firebaseapp.com",
    databaseURL: "https://love-it-ac725-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "love-it-ac725",
    storageBucket: "love-it-ac725.appspot.com",
    messagingSenderId: "458212396464",
    appId: "1:458212396464:web:58de188491861ae2eb5a75",
    measurementId: "G-PR985564BG"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const min_height = 140;
export const max_height = 200;

export function SetCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=/";
}

export function GetCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

export const app_title = {
    "index": [
        "러브잇"
    ],
    "login": [
        "러브잇 - 로그인"
    ]
}

export const user_data_list = [
    "phone", "gender", "birth", "locate",
    "nick", "height", "faith", "drink",
    "smoke", "char", "hobby", "style",
    "des", "photo", "validate"
]

export const faith_list = [
    "무교", "기독교", "불교", "천주교",
    "원불교", "기타"
]

export const smoke_list = [
    "전혀 안함", "술 마실 때만", "주 1~2회", "주 3~4회", "주 5~7회", "전자담배"
]

export const drink_list = [
    "전혀 안함", "주 1~2회", "주 3~4회", "주 5~7회"
]

export const edu_list = [
    "중학교 이하", "고등학교 이하", "전문대 이하", "대학교 이하",
    "대학원 이상"
]

export const work_list = [
    "학생", "아르바이트", "취업준비중", "프리랜서",
    "회사원", "자영업", "전문직", "의료직",
    "교육직", "금융직", "연구, 기술직", "공무원",
    "IT", "군인", "기타"
]

export const char_list = [
    "활발한", "조용한", "애교가 넘치는", "어른스러운",
    "열정적인", "침착한", "또라이 같은", "예의 바른",
    "유머러스한", "진지한", "자신감 넘치는", "허세 없는",
    "엉뚱한", "지적인", "성실한", "자유로운",
    "감성적인", "꼼꼼한", "논리적인", "즉흥적인",
    "소심한", "쿨한"
]

export const hobby_list = [
    "영화", "넷플릭스", "드라마 정주행", "TV 예능",
    "카페", "홈카페", "코인노래방", "맥주"
]

export const style_list = [
    "귀여운", "자상한", "옷 잘 입는"
]

// export function GetDocumentExists(collection, document) {
//     getDoc(doc(db, collection, document)).then(docSnap => {
//         if (docSnap.exists()) {
//             return true;
//         } else {
//             return false;
//         }
//     });
// }

// export function GetDocumentAllData(collection, document) {
//     getDoc(doc(db, collection, document)).then(docSnap => {
//         if (docSnap.exists()) {
//             return docSnap;
//         } else {
//             console.log("문서를 불러오지 못했습니다!");
//         }
//     });
// }

// export function CreateID(collection, document_name) {
//     setDoc(doc(db, collection, document_name), {
//         id: document_name
//     });
// }

export const locate = {
    "서울특별시": [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구"
    ],

    "부산광역시": [
        "중구",
        "서구",
        "동구",
        "영도구",
        "부산진구",
        "동래구",
        "남구",
        "북구",
        "해운대구",
        "사하구",
        "금정구",
        "강서구",
        "연제구",
        "수영구",
        "사상구",
        "기장군"
    ],

    "대구광역시": [
        "중구",
        "동구",
        "서구",
        "남구",
        "북구",
        "수성구",
        "달서구",
        "달성군"
    ],

    "인천광역시": [
        "중구",
        "동구",
        "미추홀구",
        "연수구",
        "남동구",
        "부평구",
        "계양구",
        "서구",
        "강화군",
        "옹진군"
    ],

    "광주광역시": [
        "동구",
        "서구",
        "남구",
        "북구",
        "광산"
    ],

    "대전광역시": [
        "동구",
        "중구",
        "서구",
        "유성구",
        "대덕구"
    ],

    "울산광역시": [
        "중구",
        "남구",
        "동구",
        "북구",
        "울주군"
    ],

    "세종특별자치시": [
        "조치원읍",
        "금남면",
        "부강면",
        "소정면",
        "연기면",
        "연동면",
        "연서면",
        "장군면",
        "전동면",
        "전의면"
    ],

    "경기도": [
        "수원시 장안구",
        "수원시 권선구",
        "수원시 팔달구",
        "수원시 영통구",
        "성남시 수정구",
        "성남시 중원구",
        "성남시 분당구",
        "의정부시",
        "안양시 만안구",
        "안양시 동안구",
        "부천시",
        "광명시",
        "평택시",
        "동두천시",
        "안산시 상록구",
        "안산시 단원구",
        "고양시 덕양구",
        "고양시 일산동구",
        "고양시 일산서구",
        "과천시",
        "구리시",
        "남양주시",
        "오산시",
        "시흥시",
        "군포시",
        "의왕시",
        "하남시",
        "용인시 처인구",
        "용인시 기흥구",
        "용인시 수지구",
        "파주시",
        "이천시",
        "안성시",
        "김포시",
        "화성시",
        "광주시",
        "양주시",
        "포천시",
        "여주시",
        "연천군",
        "가평군",
        "양평군"
    ],

    "강원도": [
        "춘천시",
        "원주시",
        "강릉시",
        "동해시",
        "태백시",
        "속초시",
        "삼척시",
        "홍천군",
        "횡성군",
        "영월군",
        "평창군",
        "정선군",
        "철원군",
        "화천군",
        "양구군",
        "인제군",
        "고성군",
        "양양군"
    ],

    "충청북도": [
        "청주시 상당구",
        "청주시 서원구",
        "청주시 흥덕구",
        "청주시 청원구",
        "충주시",
        "제천시",
        "보은군",
        "옥천군",
        "영동군",
        "증평군",
        "진천군",
        "괴산군",
        "음성군",
        "단양군"
    ],

    "충청남도": [
        "천안시 동남구",
        "천안시 서북구",
        "공주시",
        "보령시",
        "아산시",
        "서산시",
        "논산시",
        "계룡시",
        "당진시",
        "금산군",
        "부여군",
        "서천군",
        "청양군",
        "홍성군",
        "예산군",
        "태안군"
    ],

    "전라북도": [
        "전주시 완산구",
        "전주시 덕진구",
        "군산시",
        "익산시",
        "정읍시",
        "남원시",
        "김제시",
        "완주군",
        "진안군",
        "무주군",
        "장수군",
        "임실군",
        "순창군",
        "고창군",
        "부안군"
    ],

    "전라남도": [
        "목포시",
        "여수시",
        "순천시",
        "나주시",
        "광양시",
        "담양군",
        "곡성군",
        "구례군",
        "고흥군",
        "보성군",
        "화순군",
        "장흥군",
        "강진군",
        "해남군",
        "영암군",
        "무안군",
        "함평군",
        "영광군",
        "장성군",
        "완도군",
        "진도군",
        "신안군"
    ],

    "경상북도": [
        "포항시 남구",
        "포항시 북구",
        "경주시",
        "김천시",
        "안동시",
        "구미시",
        "영주시",
        "영천시",
        "상주시",
        "문경시",
        "경산시",
        "군위군",
        "의성군",
        "청송군",
        "영양군",
        "영덕군",
        "청도군",
        "고령군",
        "성주군",
        "칠곡군",
        "예천군",
        "봉화군",
        "울진군",
        "울릉군"
    ],

    "경상남도": [
        "창원시 의창구",
        "창원시 성산구",
        "창원시 마산합포구",
        "창원시 마산회원구",
        "창원시 진해구",
        "진주시",
        "통영시",
        "사천시",
        "김해시",
        "밀양시",
        "거제시",
        "양산시",
        "의령군",
        "함안군",
        "창녕군",
        "고성군",
        "남해군",
        "하동군",
        "산청군",
        "함양군",
        "거창군",
        "합천군"
    ],

    "제주특별자치도": [
        "서귀포시",
        "제주시"
    ]
}