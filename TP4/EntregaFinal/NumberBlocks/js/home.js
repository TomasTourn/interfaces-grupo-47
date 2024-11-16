document.addEventListener("DOMContentLoaded",()=>{



    window.addEventListener('scroll',()=>{
        let logo=document.querySelector('.logo-img');
        let header=document.querySelector('.nav-header');
        let scrollPosition= window.scrollY;
    
        let scaleFactor=Math.max(0.5,1 - scrollPosition/100);

        if(scrollPosition==0){
            logo.style.transform=`translate(0,0) scale(1)`
            header.style.background= 'transparent';
        }
        else{
         
            logo.style.transform=`translate(0,-50%) scale(${scaleFactor})`
            header.style.background='linear-gradient(180deg, #00D1D5 0%, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0) 100%)';
        }
    })

    let hamburguesa=document.querySelector('.hamburguesa');
        hamburguesa.addEventListener('click',()=>{
            hamburguesa.classList.toggle('active');
            document.querySelector('.opciones-hamburguesa').classList.toggle("activa");
        })

        /*parallax*/

        const arbol1 = document.querySelector('.arbol-1');
        const arbol2 = document.querySelector('.arbol-2');
        const arbol3 = document.querySelector('.arbol-3');

        const number1 = document.querySelector('.number-1-home');
        const number2 = document.querySelector('.number-2-home');
        const number3 = document.querySelector('.number-3-home');

        const bush1 = document.querySelector('.arbusto-1');
        const bush2 = document.querySelector('.arbusto-2');
        const bush3 = document.querySelector('.arbusto-3');
        const bush4 = document.querySelector('.arbusto-4');

        const rock1 = document.querySelector('.piedra-1');
        const rock2 = document.querySelector('.piedra-2');
        const rock3 = document.querySelector('.piedra-3');
        const rock4 = document.querySelector('.piedra-4');

        window.addEventListener('scroll',()=>{
            const scrollY=window.scrollY;

            arbol1.style.transform=`translateX(${scrollY * 0.2}px)`
            arbol2.style.transform=`translateX(${-scrollY * 0.15}px)`
       
            arbol3.style.transform=`translateX(${-scrollY * 0.09}px)`

            number1.style.transform=`translateX(${-scrollY * 0.2}px) translateY(${-scrollY * 0.35}px`//translateX(${-scrollY * 0.13}px)
            number2.style.transform=`translateX(${scrollY * 0}px) translateY(${-scrollY * 0.28}px)`//translateX(${-scrollY * 0.13}px)
            number3.style.transform=`translateX(${scrollY * 0.15}px) translateY(${-scrollY * 0.15}px) `//translateX(${scrollY * 0.07}px)

            bush1.style.transform=`translateX(${scrollY * 0.1}px)`
            bush2.style.transform=`translateX(${scrollY * 0.23}px)`
            bush3.style.transform=`translateX(${-scrollY * 0.15}px)`
            bush4.style.transform=`translateX(${-scrollY * 0.05}px)`

            rock1.style.transform=`translateX(${scrollY * 0.215}px)`
            rock2.style.transform=`translateX(${-scrollY * 0.21}px)`
            rock3.style.transform=`translateX(${-scrollY * 0.17}px)`
            rock4.style.transform=`translateX(${-scrollY * 0.19}px)`

        });
        window.addEventListener('scroll',()=>{
            let seccion6 = document.querySelector('.container-section-6');
            let personaje3 = document.querySelector('.img-personaje3Video');
            let video = document.querySelector('.video');
    
            let inicioScrollSeccion6 = seccion6.offsetTop;
            let scrollY = window.scrollY;
    
            if (scrollY >= inicioScrollSeccion6) {
                let desplazamiento = (scrollY - inicioScrollSeccion6-300) * 0.4;
                let desplazamientovideo = (scrollY - inicioScrollSeccion6-300) * 0.1;
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
        window.addEventListener('scroll',()=>{
            let seccion5 = document.querySelector('.container-section-5');
            let characterImage = document.querySelector('.character-image');
            
            let parrafos = document.querySelectorAll('.container-parrafo');
    
            let inicioScrollSeccion5 = seccion5.offsetTop;
            let scrollY = window.scrollY;
    
            if (scrollY >= inicioScrollSeccion5) {
                let activeImage = '';
                parrafos.forEach((parrafo) => {
                    //El getBoundingClientRect(); te da las dimensiones y la posicion de un elemento en relaciopn al viewport

                    const rect = parrafo.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        activeImage = parrafo.dataset.image; 
                    }
                });
            
            if (activeImage) {
                characterImage.src = `./images/${activeImage}`;
                characterImage.classList.add('active');
            } else {
                characterImage.classList.remove('active');
            }
            }
        });



})