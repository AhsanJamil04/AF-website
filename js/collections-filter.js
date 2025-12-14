// Collections Filter - Volume 1 & Volume 2
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.volume-filter-btn');
    const navVolumeFilter = document.getElementById('navVolumeFilter');
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

        // Update filter buttons
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-volume') === volume) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update nav dropdown
        if (navVolumeFilter) {
            navVolumeFilter.value = volume;
        }
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const volume = this.getAttribute('data-volume');
            filterByVolume(volume);
        });
    });

    // Add change event listener to nav dropdown
    if (navVolumeFilter) {
        navVolumeFilter.addEventListener('change', function() {
            const volume = this.value;
            filterByVolume(volume);
        });
    }

    // Check URL hash on page load
    const hash = window.location.hash;
    if (hash === '#volume1' || hash === '#volume2') {
        const volume = hash.substring(1);
        filterByVolume(volume);
    } else {
        // Show all by default
        showAllCollections();
    }
});

