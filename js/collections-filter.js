// Collections Filter - Volume 1 & Volume 2
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.volume-filter-btn');
    const collectionSections = document.querySelectorAll('.collection-section[data-volume]');

    // Initialize: Show all collections by default
    function showAllCollections() {
        collectionSections.forEach(section => {
            section.classList.remove('hidden');
            section.style.opacity = '1';
        });
    }

    // Filter by volume
    function filterByVolume(volume) {
        collectionSections.forEach(section => {
            if (volume === 'all') {
                section.classList.remove('hidden');
                section.style.opacity = '1';
            } else {
                if (section.getAttribute('data-volume') === volume) {
                    section.classList.remove('hidden');
                    section.style.opacity = '1';
                    // Smooth scroll to the section
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else {
                    section.classList.add('hidden');
                    section.style.opacity = '0';
                }
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the volume filter value
            const volume = this.getAttribute('data-volume');
            
            // Filter collections
            filterByVolume(volume);
        });
    });

    // Check URL hash on page load
    const hash = window.location.hash;
    if (hash === '#volume1' || hash === '#volume2') {
        const volume = hash.substring(1);
        const button = document.querySelector(`.volume-filter-btn[data-volume="${volume}"]`);
        if (button) {
            button.click();
        }
    } else {
        // Show all by default
        showAllCollections();
    }
});

