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

navbar_munu.addEventListener("click", (event)=>{
    const target = event.target.dataset.link;
    if(target == null){
        return;
    }
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

function scrollintoViews(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
}