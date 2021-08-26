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
    selected.classList.remove("selected");
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







function scrollintoViews(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
}