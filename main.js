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

    const scrollTo = document.querySelector(target);
    scrollTo.scrollIntoView({behavior:"smooth"});
});


