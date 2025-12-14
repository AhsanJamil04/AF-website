// Gallery functionality for Collections page

document.addEventListener('DOMContentLoaded', function() {
    // Collection filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        const itemCategory = item.getAttribute('data-item');
                        if (itemCategory === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (lightbox) {
        let currentImageIndex = 0;
        const images = [];
        
        // Collect all gallery images
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const placeholder = item.querySelector('.image-placeholder');
            if (img) {
                images.push({
                    src: img.src,
                    alt: img.alt || item.querySelector('.gallery-title')?.textContent || `Image ${index + 1}`,
                    element: item
                });
            } else if (placeholder) {
                images.push({
                    src: placeholder.style.backgroundImage || '',
                    alt: item.querySelector('.gallery-title')?.textContent || `Image ${index + 1}`,
                    element: item
                });
            }
        });
        
        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentImageIndex = index;
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                closeLightbox();
            });
        }
        
        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
        
        // Previous image
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightbox();
            });
        }
        
        // Next image
        if (lightboxNext) {
            lightboxNext.addEventListener('click', function(e) {
                e.stopPropagation();
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightbox();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    updateLightbox();
                } else if (e.key === 'ArrowRight') {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    updateLightbox();
                }
            }
        });
        
        function updateLightbox() {
            if (images.length > 0 && images[currentImageIndex]) {
                const currentImage = images[currentImageIndex];
                if (lightboxImage) {
                    lightboxImage.src = currentImage.src || '';
                    lightboxImage.alt = currentImage.alt;
                    lightboxImage.style.display = currentImage.src ? 'block' : 'none';
                    
                    // Remove any existing placeholder
                    const existingPlaceholder = lightboxImage.parentNode.querySelector('.lightbox-placeholder');
                    if (existingPlaceholder) {
                        existingPlaceholder.remove();
                    }
                    
                    // If no image src, create a placeholder
                    if (!currentImage.src) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'lightbox-placeholder';
                        placeholder.style.width = '600px';
                        placeholder.style.height = '800px';
                        placeholder.style.background = 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)';
                        placeholder.style.display = 'flex';
                        placeholder.style.alignItems = 'center';
                        placeholder.style.justifyContent = 'center';
                        placeholder.textContent = currentImage.alt;
                        if (lightboxImage.parentNode) {
                            lightboxImage.parentNode.appendChild(placeholder);
                        }
                    }
                }
                if (lightboxCaption) {
                    lightboxCaption.textContent = currentImage.alt;
                }
            }
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

