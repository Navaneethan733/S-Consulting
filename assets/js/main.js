document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Mobile Menu Toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to the document handler immediately after SVGs are swapped out
        mobileNav.classList.toggle('open');
        // Toggle icon between hamburger and close symbol
        if (mobileNav.classList.contains('open')) {
            menuToggle.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        } else {
            menuToggle.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
    });

    // Close mobile menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            menuToggle.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Stats Counter Animation (Intersection Observer)
    const counters = document.querySelectorAll('.counter');
    const animateCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const speed = 100; // Adjustment for count duration
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                observer.unobserve(counter); // Ensure it only runs once
            }
        });
    }, { threshold: 0.5 }); // Triggers when 50% of the element is visible

    counters.forEach(counter => {
        animateCounters.observe(counter);
    });

    // Norris Text Animation
    const norrisLink = document.querySelectorAll("a.norris");
    norrisLink.forEach((link) => {
        const text = link.textContent;
        let chars = [];
        if (window.Intl && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
            chars = Array.from(segmenter.segment(text), (s) => s.segment);
        } else {
            chars = text.split('');
        }
        
        link.textContent = '';
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.setAttribute('data-char', char === ' ' ? '\u00A0' : char);
            span.style.setProperty('--index', index);
            span.textContent = char === ' ' ? '\u00A0' : char;
            link.appendChild(span);
        });
    });

    // Cinematic Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Start staggered reveal
        setTimeout(() => {
            preloader.classList.add('active');
        }, 100);

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('preloader-exit');
                setTimeout(() => {
                    preloader.remove();
                    document.body.style.overflow = 'visible';
                }, 1000); // Wait for panels to slide away
            }, 1000); // Give user time to see the logo
        });
    }
});
