document.addEventListener('DOMContentLoaded',()=>{

    const carouselContainers = document.querySelectorAll('.carousel-container');
    const rightArrow=document.querySelector('.right-arrow');
    const leftArrow=document.querySelector('.left-arrow');
    let currentIndex=0;
    const cardWidth = document.querySelector('.card').offsetWidth + 15; // Ancho de la card + margen

    
    carouselContainers.forEach(container=>{
        const carousel = container.querySelector('.carousel');
   rightArrow.addEventListener('click', () => {
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

            if (carousel.scrollLeft >= maxScrollLeft) {
                // Si llegamos al final, volvemos al inicio
                carousel.scrollLeft = 0;
            } else {
                // Desplazamos a la derecha
                carousel.scrollLeft += cardWidth;
            }
        });

        leftArrow.addEventListener('click', () => {
            if (carousel.scrollLeft <= 0) {
                // Si llegamos al inicio, volvemos al final
                carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
            } else {
                // Desplazamos a la izquierda
                carousel.scrollLeft -= cardWidth;
            }
        });

    })




















})