window.onload = function () {
    // Variable Define.
    /// Recommend Slide Size
    const recommend_list = document.querySelector(".home-recommend-list");
    let recommend_list_width = recommend_list.clientWidth;

    for (let i = 0; i < 10; i++) {
        RecommendItemAdd();
    }

    /// Recommend Item
    let recommend_item = document.querySelectorAll(".home-recommend-item");
    const max_slide = recommend_item.length;
    let current_slide = 1;

    /// Infinite Slide as start, end Slide Duplicate
    const start_slide = recommend_item[0];
    const end_slide = recommend_item[recommend_item.length - 1];
    const start_elem = document.createElement("div");
    const end_elem = document.createElement("div");

    end_slide.classList.forEach((c) => end_elem.classList.add(c));
    end_elem.innerHTML = end_slide.innerHTML;

    start_slide.classList.forEach((c) => start_elem.classList.add(c));
    start_elem.innerHTML = start_slide.innerHTML;

    /// Duplicate Element Add
    recommend_item[0].before(end_elem);
    recommend_item[recommend_item.length - 1].after(start_elem);

    /// Slide All Select
    recommend_item = document.querySelectorAll(".home-recommend-item");

    let offset = recommend_list_width + current_slide;
    recommend_item.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
    });

    let start_point = 0; // eslint-disable-line no-unused-vars
    let end_point = 0; // eslint-disable-line no-unused-vars

    /* AddEventListener */
    /// Recommend List Slide
    //// 브라우저 크기 조정
    window.addEventListener("resize", () => {
        recommend_list_width = recommend_list.clientWidth;
    });

    //// PC 클릭 이벤트 (드래그)
    recommend_list.addEventListener("mousedown", (e) => {
        start_point = e.pageX;
    });

    recommend_list.addEventListener("mouseup", (e) => {
        end_point = e.pageX;
        if (start_point < end_point) {
            RecommendPrevMove();
        } else if (start_point > end_point) {
            RecommendNextMove();
        }
    });

    //// 모바일 터치 이벤트 (스와이프)
    recommend_list.addEventListener("touchstart", (e) => {
        start_point = e.touches[0].pageX;
    });

    recommend_list.addEventListener("touchend", (e) => {
        end_point = e.pageX;
        if (start_point < end_point) {
            RecommendPrevMove();
        } else if (start_point > end_point) {
            RecommendNextMove();
        }
    });

    //// 슬라이드에 마우스가 올라간 경우 루프 멈추기
    recommend_list.addEventListener("mouseover", () => {
        clearInterval(recommend_loop);
    });

    //// 슬라이드에 마우스가 나온 경우 루프 재시작하기
    recommend_list.addEventListener("mouseout", () => {
        recommend_loop = setInterval(() => {
            RecommendNextMove();
        }, 7500);
    });

    /* Function Call. */
    /// Recommend List Slide
    let recommend_loop = setInterval(() => {
        RecommendNextMove();
    }, 7500);

    /* Function Define. */
    /// Recommend Item Add Function
    function RecommendItemAdd() {
        recommend_list.innerHTML += `
    <div class="home-recommend-item">
        <div class="home-recommend-item-overlay"></div>
            <div class="home-recommend-item-textbox">
                <div class="home-recommend-item-text-top">
                    <p class="home-recommend-item-text-name">김원재</p>
                    <p class="home-recommend-item-text-age">22</p>
                </div>
            <p class="home-recommend-item-text-address">대전광역시 중구 은행동</p>
        </div>
    </div>
    `;
    }

    /// Recommend List Slide Function
    function RecommendNextMove() {
        current_slide++;
        if (current_slide <= max_slide) {
            const offset = recommend_list_width * current_slide;
            recommend_item.forEach((i) => {
                i.setAttribute("style", `left: ${-offset}px`);
            });
        } else {
            current_slide = 0;
            offset = recommend_list_width * current_slide;
            recommend_item.forEach((i) => {
                i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
            });
            current_slide++;
            offset = recommend_list_width * current_slide;
            setTimeout(() => {
                recommend_item.forEach((i) => {
                    i.setAttribute("style", `transition: all ${0.75}s ease-in-out; left: ${-offset}px`);
                });
            }, 0);
        }
    }

    function RecommendPrevMove() {
        current_slide--;
        if (current_slide > 0) {
            const offset = recommend_list_width * current_slide;
            recommend_item.forEach((i) => {
                i.setAttribute("style", `left: ${-offset}px`);
            });
        } else {
            current_slide = max_slide + 1;
            offset = recommend_list_width * current_slide;
            recommend_item.forEach((i) => {
                i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
            });
            current_slide--;
            offset = recommend_list_width * current_slide;
            setTimeout(() => {
                recommend_item.forEach((i) => {
                    i.setAttribute("style", `transition: all ${0.75}s ease-in-out; left: ${-offset}px`);
                });
            }, 0);
        }
    }
};