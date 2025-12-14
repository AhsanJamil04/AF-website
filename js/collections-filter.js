// Collections Filter - Volume 1 & Volume 2, Bridal & Formal
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.volume-filter-btn');
    const navDropdownLinks = document.querySelectorAll('.nav-dropdown-link');
    const collectionSections = document.querySelectorAll('.collection-section[data-volume]');
    const categorySections = document.querySelectorAll('.category-section[data-category]');

    // Initialize: Show all collections by default
    function showAllCollections() {
        collectionSections.forEach(section => {
            section.classList.remove('hidden');
            section.style.opacity = '1';
        });
        categorySections.forEach(section => {
            section.style.display = '';
            section.style.opacity = '1';
        });
    }

    // Filter by volume or category
    function filterCollections(filter) {
        if (filter === 'all') {
            // Show all collections
            collectionSections.forEach(section => {
                section.classList.remove('hidden');
                section.style.opacity = '1';
            });
            categorySections.forEach(section => {
                section.style.display = '';
                section.style.opacity = '1';
            });
        } else if (filter === 'bridal' || filter === 'formal') {
            // Filter by category (bridal or formal)
            collectionSections.forEach(section => {
                section.classList.remove('hidden');
                section.style.opacity = '1';
            });
            categorySections.forEach(section => {
                const category = section.getAttribute('data-category');
                if (category === filter) {
                    section.style.display = '';
                    section.style.opacity = '1';
                } else {
                    section.style.display = 'none';
                    section.style.opacity = '0';
                }
            });
        } else if (filter === 'volume1' || filter === 'volume2') {
            // Filter by volume
            collectionSections.forEach(section => {
                if (section.getAttribute('data-volume') === filter) {
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
            });
            // Show all categories within the selected volume
            categorySections.forEach(section => {
                const volumeSection = section.closest('.collection-section[data-volume]');
                if (volumeSection && volumeSection.getAttribute('data-volume') === filter) {
                    section.style.display = '';
                    section.style.opacity = '1';
                } else if (!volumeSection || volumeSection.classList.contains('hidden')) {
                    section.style.display = 'none';
                    section.style.opacity = '0';
                }
            });
        }

        // Update filter buttons
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update nav dropdown active state
        navDropdownLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-filter') === filter) {
                link.classList.add('active');
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterCollections(filter);
        });
    });

    // Handle nav dropdown menu clicks
    const navItemDropdown = document.querySelector('.nav-item-dropdown');
    
    navDropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if we're already on collections page
            if (window.location.pathname.includes('collections.html')) {
                e.preventDefault();
            }
            
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            navDropdownLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Filter collections (if on collections page)
            if (window.location.pathname.includes('collections.html')) {
                filterCollections(filter);
            } else {
                // If on another page, navigate with hash
                window.location.href = `collections.html#${filter}`;
            }
            
            // Close dropdown on mobile
            if (window.innerWidth <= 768) {
                navItemDropdown?.classList.remove('active');
            }
        });
    });

    // Check URL hash on page load
    const hash = window.location.hash;
    if (hash) {
        const filter = hash.substring(1); // Remove the #
        if (['all', 'bridal', 'formal', 'volume1', 'volume2'].includes(filter)) {
            filterCollections(filter);
        } else {
            showAllCollections();
        }
    } else {
        // Show all by default
        showAllCollections();
    }
});
