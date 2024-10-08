document.addEventListener('DOMContentLoaded',()=>{

    const carouselContainers = document.querySelectorAll('.carousel-container');
    let currentIndex=0;
    const cardWidth = document.querySelector('.card').offsetWidth + 15; // Ancho de la card + margen

    
    
    carouselContainers.forEach(container=>{
        const carousel = container.querySelector('.carousel');
        container.querySelector('.right-arrow').addEventListener('click', () => {
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

            if (carousel.scrollLeft >= maxScrollLeft) {
                carousel.scrollLeft = 0;
            } else {
                carousel.scrollLeft += cardWidth;
            }
        });

        container.querySelector('.left-arrow').addEventListener('click', () => {
            if (carousel.scrollLeft <= 0) {
                carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
            } else {
                carousel.scrollLeft -= cardWidth;
            }
        });

    })




















})