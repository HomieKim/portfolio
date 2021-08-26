'use strict';
// 스크롤 시 navbar 진해지게함
const navbar = document.querySelector('#navbar');
const navbar_height = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if(window.scrollY > navbar_height){
        navbar.classList.add("nav--dark");
    }else{
        navbar.classList.remove("nav--dark");
    }
    
});

// handle scrolling when tapping on nav-munu
const navbar_munu = document.querySelector(".navbar__menu");
// navbar toggle button for samll screen
const navbar_toggle_btn = document.querySelector(".navbar__toggle__btn");
navbar_toggle_btn.addEventListener("click", ()=> {
    navbar_munu.classList.toggle('open');
});

navbar_munu.addEventListener("click", (event)=>{
    const target = event.target.dataset.link;
    if(target == null){
        return;
    }
    navbar_munu.classList.remove('open');
    scrollintoViews(target);
});

// scroll To contact
const contact_btn = document.querySelector(".home__button");
contact_btn.addEventListener("click", ()=>{
    scrollintoViews("#contact");
});

// 스크롤 내려갈 수록 home 투명도 적용
const home = document.querySelector("#Home");
const home_height = home.getBoundingClientRect().height;
const home_container = document.querySelector(".home_container");
document.addEventListener("scroll", ()=>{
    contact_btn.style.opacity = 1- window.scrollY / home_height;
    home_container.style.opacity = 1- window.scrollY / home_height;
});

// contact버튼 마우스 올리면 투명도 조정되는 이벤트
contact_btn.addEventListener("mouseenter",()=>{
    contact_btn.style.opacity = 1;
});

contact_btn.addEventListener("mouseleave",()=>{
    contact_btn.style.opacity = 1;
    contact_btn.style.opacity = 1- window.scrollY / home_height;
});

// show arrow-up button when scrolling

const arrowup_btn = document.querySelector(".arrow_up");
document.addEventListener("scroll", () => {
    if(window.scrollY > home_height /2 ){
        arrowup_btn.classList.add("visible");
    }else{
        arrowup_btn.classList.remove("visible");
    }
});
const handleArrowUp = () => {

    scrollintoViews('#Home');

    arrowup_btn.removeEventListener('click', handleArrowUp);

    setTimeout(() => {

    arrowup_btn.addEventListener('click', handleArrowUp);

    }, 1000);

};
arrowup_btn.addEventListener("click", handleArrowUp);

// project filtering
const work__btn__container = document.querySelector(".work__categories");
const work__projects__cotainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

work__btn__container.addEventListener("click", (event)=>{
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if(filter === null){
        return;
    }
    // project selected 
    const selected = document.querySelector(".categories__btn.selected");
    if(selected != null){
        selected.classList.remove("selected");
    }

    const target = event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
    target.classList.add("selected");
    work__projects__cotainer.classList.add("ani-out");

    setTimeout(()=>{
        projects.forEach((project)=>{
            if(filter === "*" || filter === project.dataset.type){
                project.classList.remove("invisible");
            }else{
                project.classList.add("invisible");
            }
        });
        work__projects__cotainer.classList.remove("ani-out");
    },300)
});


// 스크롤 시 active 활성화
/*
솔루션
1. 먼저 section배열과 navbar__menu의 배열이 필요
2. 배열 추출 했으면 intersectionObserver webAPI이용해서 관찰한다
관찰한다 = 구현로직 작성한다
3. 보여지는 섹션에 대해서 active클래스를 add하고 이전 섹션은 remove
함 이때 사용하는 솔루션은 들어올 때 아니라 나갈 때 다음 섹션에 active 해줄거임
스크롤이 내려갈때 올라갈 때 어떻게 구분하냐? -> 나가는 객체(!entry 이렇게 해서 사용할 거임)
에 boundingClientRect.y 이용해서 브라우저 기준으로 보면 스크롤 내려갈때는 y좌표가 -값이고
스크롤 올라갈 때는 +값이겠지? 그러니까 나가는 객체의 boundingClientRect.y < 0 일때는 현재 인덱스에 +1 반대는 -1해줌
4. 마지막으로 엣지케이스 처리(예외) 초깃값이랑 끝값은 윈도우 사이즈가 웬만큼 작지 않으면 나가고 들어가기가 힘들기 때문
*/

// 먼저 배열 세팅
const sectionIds = [
    "#Home",
    "#about",
    "#skills",
    "#work",
    "#testimonials",
    "#contact"
];
const sections = sectionIds.map(id=>document.querySelector(id));
const navItems = sectionIds.map(id=>document.querySelector(`[data-link="${id}"]`));
// 초기값 세팅
let selectedNavIdx = 0;
let selectedNavItem = navItems[0];
// 현재 객체의 active 클래스 지우고 selected 된 객체에 active 클래스 추가하는 함수 
function selectNavItem(selected){
    selectedNavItem.classList.remove("active");
    selectedNavItem = selected;
    selectedNavItem.classList.add("active");
}

function scrollintoViews(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);

}

// IntersectionObsever 구현
const observerOptions = {
    root:null,
    rootMargin:'0px',
    threshold:0.3,
};

function obseverCallback(entries, observer){
    entries.forEach(entry =>{
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const idx = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0){
                selectedNavIdx = idx + 1;
            }else{
                selectedNavIdx = idx - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(obseverCallback, observerOptions);

sections.forEach(section=>observer.observe(section));
// 초깃값 ,끝값 처리
window.addEventListener('wheel', ()=>{
    if(window.scrollY === 0 ){
        selectedNavIdx = 0;
    }else if(
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight){
        selectedNavIdx = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIdx]);
});