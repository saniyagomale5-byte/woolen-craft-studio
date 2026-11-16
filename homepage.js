// ==========================
// Mobile Menu
// ==========================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if(menuBtn){
menuBtn.addEventListener("click",()=>{

navMenu.classList.toggle("active");

});
}

// ==========================
// Header Image Slider
// ==========================

const slides=document.querySelectorAll(".header-slider img");

let currentSlide=0;

function showSlide(index){

slides.forEach((slide)=>{

slide.style.display="none";

});

slides[index].style.display="block";

}

if(slides.length>0){

showSlide(currentSlide);

setInterval(()=>{

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

showSlide(currentSlide);

},3000);

}

// ==========================
// Product Search
// ==========================

const searchInput=document.querySelector("#search");

const cards=document.querySelectorAll(".product-card");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

let value=searchInput.value.toLowerCase();

cards.forEach((card)=>{

let title=card.querySelector("h3").textContent.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// ==========================
// Smooth Scroll
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

// ==========================
// Scroll To Top
// ==========================

const topBtn=document.getElementById("topBtn");

window.onscroll=function(){

if(topBtn){

if(document.body.scrollTop>200 || document.documentElement.scrollTop>200){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

}

};

function topFunction(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}