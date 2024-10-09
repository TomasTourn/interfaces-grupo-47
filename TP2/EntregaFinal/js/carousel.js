document.addEventListener('DOMContentLoaded', () => {
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
        const cards = container.querySelectorAll('.card');
        const totalCards = cards.length;
        const visibleCards = 5; 
        let currentIndex = 0; 

        container.querySelector('.right-arrow').addEventListener('click', () => {
            scrollR();
        });

        container.querySelector('.left-arrow').addEventListener('click', () => {
            scrollL();
        });

        function scrollR() {
            console.log(currentIndex)
            if (currentIndex < totalCards - visibleCards) {
                currentIndex++;
            } else if (currentIndex === totalCards - visibleCards) {
                updateCarouselPosition(currentIndex, true);
                currentIndex++
                return;
            } else {
                currentIndex = 0;
            }
            updateCarouselPosition(currentIndex);
        }

        function scrollL() {
            console.log(currentIndex)
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalCards - visibleCards+1;
            }
            updateCarouselPosition(currentIndex);
        }

        function updateCarouselPosition(index, atEnd = false) {
            let offSetPercentage = -104 * index;

            if (atEnd) {
                console.log("Desplazando al final");
                offSetPercentage = -137 * index;
            }

            cards.forEach(card => {
                card.style.transform = `translateX(${offSetPercentage}%) skew(15deg)`;
                setTimeout(() => {
                    card.style.transform = `translateX(${offSetPercentage}%) skew(0deg)`;
                }, 500);
            });
        }
    });
    
});
