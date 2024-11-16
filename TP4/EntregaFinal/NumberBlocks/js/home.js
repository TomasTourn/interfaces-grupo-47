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


        
    })
    const parrafos = document.querySelectorAll('.container-parrafo');
    const characterImage = document.querySelector('.character-image');
    
    window.addEventListener('scroll', () => {
        let activeImage = '';
    
        // Recorre los bloques de texto para detectar cuál está en viewport
        parrafos.forEach((parrafo) => {
            const rect = parrafo.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                activeImage = parrafo.dataset.image; // Obtiene la imagen asociada
            }
        });
    
        // Si cambia la imagen, actualiza la fuente
        if (activeImage) {
            if (characterImage.src.includes(activeImage)) return; // No repite si es la misma
            characterImage.src = `./images/${activeImage}`;
            characterImage.classList.add('active');
        }
    });
    
   
})