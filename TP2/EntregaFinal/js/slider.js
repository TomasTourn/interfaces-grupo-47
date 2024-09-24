document.getElementById('prev').onclick=function(event){
    event.preventDefault();
    plusSlides(-1);
}
document.getElementById('next').onclick=function(event){
    event.preventDefault();
    plusSlides(1);
}
for (let i = 1; i <= 3; i++) {
    document.getElementById(`dot${i}`).onclick = function(event) {
        event.preventDefault();
        currentSlides(i);
    };
}

let slideIndex=1;
showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex+=n);
}

function currentSlide(n){
    showSlides(slideIndex = n)
}

function showSlides(n){
    let i;
    let slides=document.querySelectorAll('.slides');
    let dots=document.querySelectorAll('.dot');
    
    if(n > slides.length){
        slideIndex =1
    }
    if(n < 1){
        slideIndex=slides.length;
    }
    for(i=0;i < slides.length; i++){
        slides[i].style.display="none";
    }
    for(i=0;i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex -1].style.display="block";
    dots[slideIndex -1].className+=" active";
}