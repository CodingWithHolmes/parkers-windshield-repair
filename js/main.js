// Gallery functionality
class ImageGallery {
    constructor() {
        this.currentIndex = 0;
        this.galleryData = [
            {
                image: 'images/before-after/placeholder-1.jpg',
                alt: 'Windshield crack repair before and after',
                beforeLabel: 'Before',
                afterLabel: 'After'
            },
            {
                image: 'images/before-after/placeholder-2.jpg',
                alt: 'Windshield chip repair before and after',
                beforeLabel: 'Before',
                afterLabel: 'After'
            },
            {
                image: 'images/before-after/placeholder-3.jpg',
                alt: 'Windshield star crack repair before and after',
                beforeLabel: 'Before',
                afterLabel: 'After'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.track = document.querySelector('.gallery-track');
        this.prevBtn = document.querySelector('.gallery-prev');
        this.nextBtn = document.querySelector('.gallery-next');
        this.indicators = document.querySelectorAll('.indicator');
        
        this.createGalleryItems();
        this.bindEvents();
        this.updateNavigation();
    }
    
    createGalleryItems() {
        // Clear existing items
        this.track.innerHTML = '';
        
        // Create gallery items
        this.galleryData.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="image-container">
                    <img src="${item.image}" alt="${item.alt}" class="gallery-image">
                </div>
                <div class="image-caption">
                    <span class="before-label">${item.beforeLabel}</span>
                    <span class="after-label">${item.afterLabel}</span>
                </div>
            `;
            this.track.appendChild(galleryItem);
        });
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previous());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previous();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.next();
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        // Auto-advance (optional - can be disabled)
        this.startAutoAdvance();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.previous();
            }
        }
    }
    
    goTo(index) {
        if (index < 0 || index >= this.galleryData.length) return;
        
        this.currentIndex = index;
        this.updateGallery();
        this.updateNavigation();
        this.updateIndicators();
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.galleryData.length;
        this.goTo(nextIndex);
    }
    
    previous() {
        const prevIndex = this.currentIndex === 0 ? this.galleryData.length - 1 : this.currentIndex - 1;
        this.goTo(prevIndex);
    }
    
    updateGallery() {
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
    }
    
    updateNavigation() {
        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.galleryData.length - 1;
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoAdvance() {
        // Auto-advance every 5 seconds (optional feature)
        setInterval(() => {
            // Only auto-advance if user hasn't interacted recently
            if (!this.userInteracted) {
                this.next();
            }
        }, 5000);
        
        // Track user interaction
        const trackInteraction = () => {
            this.userInteracted = true;
            setTimeout(() => {
                this.userInteracted = false;
            }, 10000); // Reset after 10 seconds
        };
        
        this.prevBtn.addEventListener('click', trackInteraction);
        this.nextBtn.addEventListener('click', trackInteraction);
        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', trackInteraction);
        });
    }
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                mobileMenu.classList.contains('active').toString());
        });
    }
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate any layout-dependent elements
    if (window.gallery) {
        window.gallery.updateGallery();
    }
}, 250);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery
    window.gallery = new ImageGallery();
    
    // Initialize other features
    initSmoothScrolling();
    initLazyLoading();
    initMobileMenu();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add loading state
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading spinner if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', () => {
            // Fallback for broken images
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTUwTDIwMCAxMDBMMzAwIDE1MEwyMDAgMjAwTDEwMCAxNTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3NDhGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo=';
            img.alt = 'Image not available';
        });
    });
}); 