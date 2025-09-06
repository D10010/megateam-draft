// JavaScript for TRON MEGATEAM Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
            }
        });
    }

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
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            if (typeof target === 'string' && target.includes('M')) {
                element.textContent = '$' + current + 'M';
            } else if (typeof target === 'string' && target.includes('+')) {
                element.textContent = current.toLocaleString() + '+';
            } else {
                element.textContent = current.toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer for triggering counter animations
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const element = entry.target;
                const id = element.id;
                
                switch(id) {
                    case 'stat-hubs':
                        animateCounter(element, 40);
                        break;
                    case 'stat-squads':
                        animateCounter(element, 150);
                        break;
                    case 'stat-deliverables':
                        animateCounter(element, '3000+');
                        break;
                    case 'stat-funding':
                        animateCounter(element, '40M');
                        break;
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe all stat elements
    document.querySelectorAll('[id^="stat-"]').forEach(el => {
        statsObserver.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
        
        lastScroll = currentScroll;
    });

    // Add particle animation to hero section
    function createParticles() {
        const heroSection = document.querySelector('section');
        if (!heroSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-bg';
        heroSection.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 6;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = posX + '%';
            particle.style.top = posY + '%';
            particle.style.animationDelay = delay + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // Form validation and interaction
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading for images (if any are added later)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });

    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('[data-year]');
    copyrightElements.forEach(el => {
        el.textContent = el.textContent.replace('2024', currentYear);
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.classList.add('aos-animate');
            });
        }, 100);
    });

    console.log('TRON MEGATEAM Landing Page Loaded Successfully! 🚀');
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);