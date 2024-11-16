document.addEventListener("DOMContentLoaded",()=>{



    window.addEventListener('scroll',()=>{
        let logo=document.querySelector('.logo-img');
        let header=document.querySelector('.nav-header');
        let scrollPosition= window.scrollY;
    
        let scaleFactor=Math.max(0.5,1 - scrollPosition/500);

        if(scrollPosition==0){
            logo.style.transform=`translate(0,0) scale(1)`
            header.style.background= 'transparent';
        }
        else{
         
            logo.style.transform=`translate(0,-50%) scale(${scaleFactor})`
            header.style.background='linear-gradient(180deg, #00D1D5 0%, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0) 100%)';
        }

        let seccion6 = document.querySelector('.container-section-6');
        let personaje3 = document.querySelector('.img-personaje3Video');
        let video = document.querySelector('.video');

        let inicioScrollSeccion6 = seccion6.offsetTop;
        let scrollY = window.scrollY;

        if (scrollY >= inicioScrollSeccion6) {
            let desplazamiento = (scrollY - inicioScrollSeccion6) * 0.4;
            let desplazamientovideo = (scrollY - inicioScrollSeccion6) * 0.1;
            personaje3.style.transform = `translateY(-${desplazamiento}px)`;
            video.style.transform = `translateY(${desplazamientovideo}px)`; 
        }
    });
    

    (function() {
        document.addEventListener("mousemove", moveCharacter);
        const elem = document.querySelector(".img-conjuntoPersonajes");
    
        function moveCharacter(e) {
            let w = window.innerWidth /2
            let h = window.innerHeight / 2;
            let mouseX = e.clientX;
            let mouseY = e.clientY;
    
            
            let depth1 = -(mouseX - w) * 0.10;
            let depth2 = -(mouseY - h) * 0.10;
            

            elem.style.transform = `translate3d(${depth1}px, ${depth2}px, 0) scale(1.2)`;
        }
    })();
   
    
    
})