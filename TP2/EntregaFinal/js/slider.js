let currentSlide=0;
const slides= document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
const buttons=document.querySelectorAll('.slider-button');


document.querySelector('.next').addEventListener('click', () => {
    changeSlide(currentSlide+1);
  });
  
  document.querySelector('.prev').addEventListener('click', () => {
    changeSlide(currentSlide-1);
  });

dots.forEach((dot,index)=>{
    dot.addEventListener('click',()=>{
        changeSlide(index);
    })
})

buttons.forEach(button=>{
    button.addEventListener('click',function(){
        const disabled = this.getAttribute('data-disabled');
        if(disabled===null){
            const url= this.getAttribute('data-url');
            window.location.href=url;
        }
    })
})

function changeSlide(index){
    if(index>=totalSlides){
        currentSlide=0;
    }
    else if(index<0){
        currentSlide=totalSlides-1;
    }
    else{
        currentSlide=index;
    }
    document.querySelector('.slides').style.transform=`translateX(-${currentSlide*100}%)`;

    slides.forEach((slide,i)=>{
        slide.classList.toggle('active',i===currentSlide);
    })

    dots.forEach((dot,i)=>{
        dot.classList.toggle('active',i===currentSlide);
})
}






