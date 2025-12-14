// Slideshow functionality for each dress collection

document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide');
        const prevBtn = container.querySelector('.slideshow-prev');
        const nextBtn = container.querySelector('.slideshow-next');
        const indicatorsContainer = container.querySelector('.slideshow-indicators');
        
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        
        // Create indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'slideshow-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = indicatorsContainer.querySelectorAll('.slideshow-indicator');
        
        // Update slides and indicators
        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.remove('active');
                if (index === currentSlide) {
                    indicator.classList.add('active');
                }
            });
            
            // Update wrapper height to match active slide
            const activeSlide = slides[currentSlide];
            if (activeSlide) {
                const img = activeSlide.querySelector('img');
                if (img && img.complete) {
                    const wrapper = container.querySelector('.slideshow-wrapper');
                    if (wrapper) {
                        wrapper.style.height = img.offsetHeight + 'px';
                    }
                }
            }
        }
        
        // Update height when images load
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('load', function() {
                    if (slide.classList.contains('active')) {
                        const wrapper = container.querySelector('.slideshow-wrapper');
                        if (wrapper) {
                            wrapper.style.height = img.offsetHeight + 'px';
                        }
                    }
                });
            }
        });
        
        // Go to specific slide
        function goToSlide(index) {
            currentSlide = index;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            if (currentSlide >= slides.length) currentSlide = 0;
            updateSlides();
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }
        
        // Button event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left - next
                } else {
                    prevSlide(); // Swipe right - previous
                }
            }
        }
        
        // Auto-play (optional - can be enabled)
        // let autoPlayInterval;
        // function startAutoPlay() {
        //     autoPlayInterval = setInterval(nextSlide, 5000);
        // }
        // function stopAutoPlay() {
        //     clearInterval(autoPlayInterval);
        // }
        // 
        // container.addEventListener('mouseenter', stopAutoPlay);
        // container.addEventListener('mouseleave', startAutoPlay);
        // startAutoPlay();
    });
});

