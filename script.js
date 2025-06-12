document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu functionality
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // Scroll down
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // Scroll up
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and timeline items
    document.querySelectorAll('section, .timeline-item, .skill-category, .development-item').forEach(element => {
        observer.observe(element);
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile sidebar functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const floatingMenuButton = document.querySelector('.floating-menu-button');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    function toggleSidebar() {
        floatingMenuButton.classList.toggle('active');
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : '';
    }

    floatingMenuButton.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking a link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileSidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    // Handle scroll behavior for floating menu button
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navHeight = nav.offsetHeight;
        
        // Show floating button when scrolled past nav height
        if (currentScroll > navHeight) {
            floatingMenuButton.style.transform = 'translateY(0)';
        } else {
            floatingMenuButton.style.transform = 'translateY(-100px)';
        }

        // Update nav classes for animation
        if (currentScroll > lastScroll && currentScroll > navHeight) {
            nav.classList.add('scroll-down');
            nav.classList.remove('scroll-up');
        } else if (currentScroll < lastScroll) {
            nav.classList.add('scroll-up');
            nav.classList.remove('scroll-down');
        }

        lastScroll = currentScroll;

        // Update active links
        updateActiveLink();
    });

    // Update active state for both desktop and mobile navigation
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const desktopLinks = document.querySelectorAll('.nav-links a');
        const mobileLinks = document.querySelectorAll('.sidebar-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        // Update desktop navigation
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Update mobile navigation
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-category');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Add staggered animation delay to skill categories and development items
    const animatedElements = document.querySelectorAll('.skill-category, .development-item');
    animatedElements.forEach((element, index) => {
        element.style.setProperty('--delay', `${index * 0.1}s`);
    });
}); 
