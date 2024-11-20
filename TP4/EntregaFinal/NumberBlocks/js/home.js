document.addEventListener("DOMContentLoaded",()=>{

        //aplico animacion de entrada a los elementos
        document.querySelectorAll('.entrada-a-1, .entrada-a-2, .entrada-a-3').forEach(tree => {
            tree.classList.add('fade-in-tree');
        });
        document.querySelectorAll('.img-rock-1, .img-rock-2, .img-rock-3, .img-rock-4').forEach(tree => {
            tree.classList.add('fade-in-rock');
        });

        document.querySelectorAll('.img-bush-1, .img-bush-2').forEach(tree => {
            tree.classList.add('fade-in-bush');
        });
        
        document.querySelectorAll('.img-bush-3, .img-bush-4').forEach(tree => {
            tree.classList.add('fade-in-bush-right');
        });

        document.querySelector('.img-1').classList.add('slide-in-left');
        document.querySelector('.img-2').classList.add('slide-in-top');
        document.querySelector('.img-3').classList.add('slide-in-right');
  
       
        


    window.addEventListener('scroll',()=>{
        let logo=document.querySelector('.logo-img');
        let header=document.querySelector('.nav-header');
        let scrollPosition= window.scrollY;
    
        let scaleFactor=Math.max(0.3,1 - scrollPosition/100);

        if(scrollPosition==0){
            logo.style.transform=`translate(0,0) scale(1)`
            header.style.background= 'transparent';
        }
        else{
         
            logo.style.transform=`translate(0,-55%) scale(${scaleFactor})`
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
    
        //la app mas divertida
        const number5=document.querySelector('.number5');
        const number4=document.querySelector('.number4');
        const carousel=document.querySelector('.carousel-card')
        const textoApp=document.querySelector('.text-app');
        

        window.addEventListener('scroll',()=>{
            const scrollY=window.scrollY;


            //home
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
            let imgVideo =document.querySelector('.video-overlay');
        
            let inicioScrollSeccion6 = seccion6.offsetTop;
            let scrollY = window.scrollY;
    
            if (scrollY >= inicioScrollSeccion6) {
                let desplazamiento = (scrollY - inicioScrollSeccion6-300) * 0.4;
                let desplazamientovideo = (scrollY - inicioScrollSeccion6-300) * 0.1;
                personaje3.style.transform = `translateY(-${desplazamiento}px)`;
                video.style.transform = `translateY(${desplazamientovideo}px)`; 
                imgVideo.style.transform = `translateY(${desplazamientovideo}px)`;
                

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


        let seccion5 = document.querySelector('.container-section-5');
        let images = document.querySelectorAll('.character-image');
        let parrafos = document.querySelectorAll('.container-parrafo');
        let imagenActual = 0;
        
        // Margen de umbral en píxeles
        const threshold = 10;
        let cambioEnProgreso = false; // Bandera para evitar superposiciones
        
        window.addEventListener('scroll', () => {
            let inicioScrollSeccion5 = seccion5.offsetTop - 1000;
            let scrollY = window.scrollY;
        
            if (scrollY >= inicioScrollSeccion5) {
                let nuevaImagenIndex = imagenActual;
        
                parrafos.forEach((parrafo, index) => {
                    const rect = parrafo.getBoundingClientRect();
        
                    // Ajuste con el umbral
                    const visibleTop = rect.top + threshold;
                    const visibleBottom = rect.bottom - threshold;
        
                    // Detectar si el párrafo está dentro del rango con el umbral
                    if (visibleTop >= 0 && visibleBottom <= window.innerHeight) {
                        nuevaImagenIndex = index; // Índice del párrafo visible
                    }
                });
        
                if (imagenActual !== nuevaImagenIndex && !cambioEnProgreso) {
                    cambioEnProgreso = true; // Indica que hay un cambio en proceso
        
                    images[imagenActual].classList.remove('visible'); // Oculta la imagen actual
                    setTimeout(() => {
                        imagenActual = nuevaImagenIndex; // Actualiza el índice actual

                // Muestra la nueva imagen con animación
                images[nuevaImagenIndex].classList.add('visible');
        
                        cambioEnProgreso = false; // Libera la bandera después de completar el cambio
                    }, 400); // Sincroniza con la animación de transición
                }
            }
        });


        window.addEventListener('scroll',()=>{
            const section = document.querySelector('.hero-2');
            const rect = section.getBoundingClientRect();
            const scrollY = window.scrollY;
            
            // rect.top gives position relative to viewport
            // adding scrollY gives us absolute position
            const sectionTop = rect.top + scrollY;
            
            const relativeScroll = scrollY - sectionTop;
            const maxTranslation = 200;
            const translation = Math.min(relativeScroll * 0.04, maxTranslation);
            
            textoApp.style.transform=`translateY(${-scrollY * 0.12}px)`
            carousel.style.transform=`translateY(${-scrollY * 0.08}px)`
            number4.style.transform=`translateY(${-scrollY * 0.2}px)`
            number5.style.transform=`translateY(${translation}px)`
        })

        const modelViewer = document.getElementById('reveal');

// Valores iniciales de órbita para el centro de la pantalla
const initialXOrbit = -80;
const initialYOrbit = 75; 

document.addEventListener('mousemove', (event) => {
    // Obtener dimensiones de la ventana
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    // Calcular ángulos según la posición del mouse
    const xOrbit = (
        ((clientX / innerWidth) * 360 - 180) + initialXOrbit
    ).toFixed(2);

    // Ajustar sensibilidad y rango para el movimiento vertical
    const maxVerticalAngle = 30; 
    const yOrbit = (
        (((clientY / innerHeight) * 2 - 1) * maxVerticalAngle) + initialYOrbit
    ).toFixed(2);

    // Actualizar la órbita de la cámara en tiempo real
    modelViewer.cameraOrbit = `${xOrbit}deg ${yOrbit}deg`;

    // Usar requestAnimationFrame para forzar el renderizado
    requestAnimationFrame(() => modelViewer.updateFraming());
});

 //cards
    let cards= document.querySelectorAll('.card');

    const observer = new IntersectionObserver(
        (entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    entry.target.classList.add("animate-card");
                }
            })
        },{
            threshold:0.2,
        }
    )

    cards.forEach((card)=>observer.observe(card));





    (function() {
        let playButton = document.querySelector('.btn-play');
        let videoIframe = document.querySelector('.video');
        let imgVideo = document.querySelector('.video-overlay');

        videoIframe.style.display='block';
        if (playButton && videoIframe) {

            playButton.addEventListener('click', function () {
                imgVideo.style.display='none';
                const videoSrc = videoIframe.src.split('?')[0]; 
                const autoplayUrl = `${videoSrc}?autoplay=1&${videoIframe.src.split('?')[1] || ''}`;

                videoIframe.src = autoplayUrl;
                playButton.style.display = 'none';
            });
        } else {
            console.error('No se encontró el botón de reproducción o el iframe.');
        }
    })();



})