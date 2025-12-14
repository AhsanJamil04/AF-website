// Horizontal scroll functionality for galleries

document.addEventListener('DOMContentLoaded', function() {
    const scrollContainers = document.querySelectorAll('.horizontal-scroll-container');
    
    scrollContainers.forEach(container => {
        const gallery = container.querySelector('.horizontal-gallery');
        const leftBtn = container.querySelector('.scroll-left');
        const rightBtn = container.querySelector('.scroll-right');
        
        if (!gallery) return;
        
        // Scroll function
        function scroll(direction) {
            const scrollAmount = gallery.clientWidth * 0.8;
            gallery.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Button event listeners
        if (leftBtn) {
            leftBtn.addEventListener('click', () => scroll('left'));
        }
        
        if (rightBtn) {
            rightBtn.addEventListener('click', () => scroll('right'));
        }
        
        // Update button visibility based on scroll position
        function updateButtons() {
            if (leftBtn && rightBtn) {
                const isAtStart = gallery.scrollLeft <= 10;
                const isAtEnd = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 10;
                
                leftBtn.style.opacity = isAtStart ? '0.3' : '1';
                leftBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
                
                rightBtn.style.opacity = isAtEnd ? '0.3' : '1';
                rightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
            }
        }
        
        // Initial button state
        updateButtons();
        
        // Update on scroll
        gallery.addEventListener('scroll', updateButtons);
        
        // Update on resize
        window.addEventListener('resize', updateButtons);
        
        // Touch/swipe support
        let isDown = false;
        let startX;
        let scrollLeft;
        
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        
        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });
        
        // Set initial cursor
        gallery.style.cursor = 'grab';
    });
});

