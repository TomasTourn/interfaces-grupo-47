document.addEventListener('DOMContentLoaded',()=>{

    const carouselContainers = document.querySelectorAll('.carousel-container');
    const cardWidth = document.querySelector('.card').offsetWidth + 15; // Ancho de la card + margen

    
    
    carouselContainers.forEach(container=>{
        const carousel = container.querySelector('.carousel');
        container.querySelector('.right-arrow').addEventListener('click', () => {
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

            if (carousel.scrollLeft >= maxScrollLeft) {
                addSkew();
                carousel.scrollLeft = 0;
               
            } else {
                addSkew();
                  carousel.scrollLeft += cardWidth;

            }

            
        });

        container.querySelector('.left-arrow').addEventListener('click', () => {
            if (carousel.scrollLeft <= 0) {
                addSkew();
                carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
            } else {
               
                carousel.scrollLeft -= cardWidth;
                addSkew();
            }
        });


function addSkew(){
                carousel.querySelectorAll('.card').forEach(card=>{
                    card.classList.add("addSkew");
                })
                

                setTimeout(() => {
                    carousel.querySelectorAll('.card').forEach(card => {
                      card.classList.add("addSkewEnd");
                    });
                  }, 300);

                  setTimeout(() => {
                    carousel.querySelectorAll('.card').forEach(card => {
                      card.classList.remove("addSkewEnd");
                      card.classList.remove("addSkew");
                    });
                  }, 600);
            }


    })

})