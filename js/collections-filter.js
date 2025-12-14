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

        // Update nav dropdown active state
        navDropdownLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-volume') === volume) {
                link.classList.add('active');
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const volume = this.getAttribute('data-volume');
            filterByVolume(volume);
        });
    });

    // Handle nav dropdown menu clicks
    const navDropdownLinks = document.querySelectorAll('.nav-dropdown-link');
    const navItemDropdown = document.querySelector('.nav-item-dropdown');
    
    navDropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if we're already on collections page
            if (window.location.pathname.includes('collections.html')) {
                e.preventDefault();
            }
            
            const volume = this.getAttribute('data-volume');
            
            // Update active state
            navDropdownLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Filter collections (if on collections page)
            if (window.location.pathname.includes('collections.html')) {
                filterByVolume(volume);
            } else {
                // If on another page, navigate with hash
                window.location.href = `collections.html#${volume}`;
            }
            
            // Close dropdown on mobile
            if (window.innerWidth <= 768) {
                navItemDropdown?.classList.remove('active');
            }
        });
    });

    // Toggle dropdown on click (mobile)
    const navDropdownTrigger = document.querySelector('.nav-dropdown-trigger');
    if (navDropdownTrigger && window.innerWidth <= 768) {
        navDropdownTrigger.addEventListener('click', function(e) {
            if (navItemDropdown) {
                e.preventDefault();
                navItemDropdown.classList.toggle('active');
            }
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

