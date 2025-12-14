// Side Navigation with Scroll Spy
document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.getElementById('sideNav');
    const sideNavToggle = document.getElementById('sideNavToggle');
    const sideNavOverlay = document.getElementById('sideNavOverlay');
    const pieceSections = document.querySelectorAll('.piece-section[id]');
    const navLinks = document.querySelectorAll('.nav-dress-link');
    const volumeLinks = document.querySelectorAll('.nav-volume-link');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (!sideNav || pieceSections.length === 0) return;

    // Mobile toggle functionality
    function toggleSideNav() {
        sideNav.classList.toggle('visible');
        if (sideNavOverlay) {
            sideNavOverlay.classList.toggle('active');
        }
        if (sideNavToggle) {
            sideNavToggle.classList.toggle('active');
        }
    }

    // Close side nav
    function closeSideNav() {
        sideNav.classList.remove('visible');
        if (sideNavOverlay) {
            sideNavOverlay.classList.remove('active');
        }
        if (sideNavToggle) {
            sideNavToggle.classList.remove('active');
        }
    }

    // Toggle button event
    if (sideNavToggle) {
        sideNavToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSideNav();
        });
    }

    // Overlay click to close
    if (sideNavOverlay) {
        sideNavOverlay.addEventListener('click', closeSideNav);
    }

    // Show side nav after scrolling past header (desktop only)
    function checkScrollPosition() {
        // Only auto-show on desktop (screens wider than 1024px)
        if (window.innerWidth > 1024) {
            const scrollY = window.scrollY;
            const headerHeight = document.querySelector('.page-header')?.offsetHeight || 0;
            
            if (scrollY > headerHeight + 100) {
                sideNav.classList.add('visible');
            } else {
                sideNav.classList.remove('visible');
            }
        }
    }

    // Scroll spy: Highlight current section
    function updateActiveSection() {
        const scrollY = window.scrollY;
        const offset = 200; // Offset for better detection
        
        let currentSection = null;
        
        pieceSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY + offset >= sectionTop && scrollY + offset < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
                
                // Expand parent volume if collapsed
                const navItem = link.closest('.nav-item');
                if (navItem) {
                    navItem.classList.add('active');
                }
            }
        });

        // Update active volume based on visible section
        if (currentSection) {
            const currentPiece = document.getElementById(currentSection);
            const volumeSection = currentPiece?.closest('.collection-section[data-volume]');
            if (volumeSection) {
                const volume = volumeSection.getAttribute('data-volume');
                navItems.forEach(item => {
                    if (item.getAttribute('data-volume') === volume) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        }
    }

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link immediately
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close side nav on mobile after clicking
                if (window.innerWidth <= 1024) {
                    setTimeout(closeSideNav, 300);
                }
            }
        });
    });

    // Toggle volume expansion
    volumeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const navItem = this.closest('.nav-item');
            navItem.classList.toggle('active');
        });
    });

    // Initial check
    checkScrollPosition();
    updateActiveSection();

    // Update on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkScrollPosition();
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close side nav when switching from mobile to desktop
        if (window.innerWidth > 1024) {
            if (sideNavOverlay) {
                sideNavOverlay.classList.remove('active');
            }
            if (sideNavToggle) {
                sideNavToggle.classList.remove('active');
            }
            checkScrollPosition();
        } else {
            // On mobile, don't auto-show
            sideNav.classList.remove('visible');
        }
    });

    // Handle volume filter changes (buttons and nav dropdown)
    const filterButtons = document.querySelectorAll('.volume-filter-btn');
    const navDropdownLinks = document.querySelectorAll('.nav-dropdown-link');
    
    function updateSideNavVisibility(volume) {
        navItems.forEach(item => {
            if (volume === 'all') {
                item.style.display = '';
            } else {
                const itemVolume = item.getAttribute('data-volume');
                item.style.display = itemVolume === volume ? '' : 'none';
            }
        });
    }

    // Listen to filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const volume = this.getAttribute('data-volume');
            updateSideNavVisibility(volume);
        });
    });

    // Listen to nav dropdown link clicks
    navDropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            const volume = this.getAttribute('data-volume');
            updateSideNavVisibility(volume);
        });
    });
});

