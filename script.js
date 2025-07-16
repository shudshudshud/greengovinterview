// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced hover effects for cards
    document.querySelectorAll('.content-card, .idea-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });

    // Animated counters for metrics
    function animateCounters() {
        const counters = document.querySelectorAll('.metric-number');
        counters.forEach(counter => {
            const finalText = counter.textContent;
            const finalValue = parseInt(finalText.replace(/[^\d]/g, ''));
            
            if (!isNaN(finalValue) && finalValue > 0) {
                let current = 0;
                const increment = finalValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        counter.textContent = finalText;
                        clearInterval(timer);
                    } else {
                        let displayValue = Math.floor(current);
                        if (finalText.includes('%')) {
                            counter.textContent = displayValue + '%';
                        } else if (finalText.includes('K')) {
                            counter.textContent = displayValue + 'K';
                        } else if (finalText.includes('M')) {
                            counter.textContent = displayValue + 'M';
                        } else if (finalText.includes('S$')) {
                            counter.textContent = 'S$' + displayValue + 'M';
                        } else if (finalText.includes('+')) {
                            counter.textContent = displayValue + '+';
                        } else {
                            counter.textContent = displayValue;
                        }
                    }
                }, 30);
            }
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply fade-in animations
    document.querySelectorAll('.content-card, .idea-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add active nav item highlighting
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 150) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavItem);

    // Enhanced accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });

    // Initialize animations after a delay
    setTimeout(animateCounters, 1000);
});

// Add CSS for keyboard navigation and active states
const style = document.createElement('style');
style.textContent = `
    .using-keyboard .nav-item:focus {
        outline: 3px solid var(--accent-green);
        outline-offset: 2px;
    }
    
    .nav-item.active {
        background: var(--secondary-green);
        color: white;
    }
    
    .nav-item.active:hover {
        background: var(--primary-green);
    }
`;
document.head.appendChild(style);