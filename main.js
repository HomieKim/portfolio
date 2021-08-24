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

