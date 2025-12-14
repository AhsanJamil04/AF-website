// Collections Filter - Volume 1 & Volume 2
document.addEventListener('DOMContentLoaded', function() {
    const volumeFilterSelect = document.getElementById('volumeFilter');
    const collectionSections = document.querySelectorAll('.collection-section[data-volume]');

    if (!volumeFilterSelect) return;

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

    // Add change event listener to dropdown
    volumeFilterSelect.addEventListener('change', function() {
        const volume = this.value;
        filterByVolume(volume);
    });

    // Check URL hash on page load
    const hash = window.location.hash;
    if (hash === '#volume1' || hash === '#volume2') {
        const volume = hash.substring(1);
        volumeFilterSelect.value = volume;
        filterByVolume(volume);
    } else {
        // Show all by default
        showAllCollections();
    }
});

