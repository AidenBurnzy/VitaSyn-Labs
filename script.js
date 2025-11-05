// Carousel functionality
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.autoplayInterval = null;
        
        this.init();
    }

    init() {
        this.createDots();
        this.addEventListeners();
        this.startAutoplay();
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.dot');
    }

    addEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.prevSlide();
            this.startAutoplay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.nextSlide();
            this.startAutoplay();
        });

        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
}

function initResearchNotice(onContinue) {
    const notice = document.querySelector('.research-notice');
    if (!notice) return;

    // Check both localStorage (long-term) and sessionStorage (this tab session)
    const hasAcceptedPermanent = localStorage.getItem('research_notice_accepted');
    const hasAcceptedSession = sessionStorage.getItem('research_notice_accepted');
    
    if (hasAcceptedPermanent === 'true' && hasAcceptedSession === 'true') {
        notice.classList.add('hidden');
        document.body.classList.remove('notice-locked');
        return;
    }

    const continueBtn = document.getElementById('notice-continue');
    const exitBtn = document.getElementById('notice-exit');
    const message = notice.querySelector('.notice-message');

    if (!continueBtn || !exitBtn || !message) return;

    notice.classList.remove('hidden');
    document.body.classList.add('notice-locked');
    message.classList.add('hidden');
    continueBtn.disabled = false;
    exitBtn.disabled = false;

    const closeNotice = () => {
        notice.classList.add('hidden');
        document.body.classList.remove('notice-locked');
        // Save to both localStorage (permanent) and sessionStorage (cleared on hard refresh)
        localStorage.setItem('research_notice_accepted', 'true');
        sessionStorage.setItem('research_notice_accepted', 'true');
    };

    continueBtn.addEventListener('click', () => {
        closeNotice();
        if (typeof onContinue === 'function') {
            onContinue();
        }
    });

    exitBtn.addEventListener('click', () => {
        message.classList.remove('hidden');
        continueBtn.disabled = true;
        exitBtn.disabled = true;
    });
}

function initAgeGate() {
    const ageGate = document.querySelector('.age-gate');
    if (!ageGate) return null;

    // Check both localStorage (long-term) and sessionStorage (this tab session)
    const hasVerifiedPermanent = localStorage.getItem('age_verified');
    const hasVerifiedSession = sessionStorage.getItem('age_verified');
    
    if (hasVerifiedPermanent === 'true' && hasVerifiedSession === 'true') {
        ageGate.classList.add('hidden');
        document.body.classList.remove('notice-locked');
        return null;
    }

    const yesBtn = document.getElementById('age-verify-yes');
    const noBtn = document.getElementById('age-verify-no');
    const message = ageGate.querySelector('.age-gate-message');

    if (!yesBtn || !noBtn || !message) return null;

    const closeGate = () => {
        ageGate.classList.add('hidden');
        document.body.classList.remove('notice-locked');
        // Save to both localStorage (permanent) and sessionStorage (cleared on hard refresh)
        localStorage.setItem('age_verified', 'true');
        sessionStorage.setItem('age_verified', 'true');
    };

    const openGate = () => {
        ageGate.classList.remove('hidden');
        document.body.classList.add('notice-locked');
        message.classList.add('hidden');
        yesBtn.disabled = false;
        noBtn.disabled = false;
    };

    yesBtn.addEventListener('click', () => {
        closeGate();
    });

    noBtn.addEventListener('click', () => {
        message.classList.remove('hidden');
        yesBtn.disabled = true;
        noBtn.disabled = true;
    });

    return openGate;
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#search' && href !== '#cart') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                console.log('Newsletter subscription:', email);
                emailInput.value = '';
                alert('Thank you for subscribing!');
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// WooCommerce API Integration via Netlify Function
const PRODUCT_ENDPOINTS = resolveProductEndpoints();
let allProducts = []; // Store all products globally

function resolveProductEndpoints() {
    const endpoints = [];
    const searchParams = new URLSearchParams(window.location.search);
    const overrideHost = window.NETLIFY_FUNCTION_HOST || searchParams.get('functionHost');

    if (overrideHost) {
        endpoints.push(`${overrideHost.replace(/\/$/, '')}/.netlify/functions/products`);
    }

    const host = window.location.hostname || '';
    if (!overrideHost) {
        if (
            host === '' ||
            host === 'localhost' ||
            host === '127.0.0.1' ||
            host.endsWith('.netlify.app') ||
            host.endsWith('.netlify.live') ||
            host.endsWith('.netlify.dev') ||
            host.endsWith('vitasynlabs.com')
        ) {
            endpoints.push('/.netlify/functions/products');
        }
    }

    const fallbackHost = 'https://vitasynlabs.netlify.app';
    const fallbackEndpoint = `${fallbackHost}/.netlify/functions/products`;
    if (!endpoints.includes(fallbackEndpoint)) {
        endpoints.push(fallbackEndpoint);
    }

    return endpoints;
}

async function fetchProductsFromEndpoints() {
    const failures = [];

    for (const endpoint of PRODUCT_ENDPOINTS) {
        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = `API Error: ${response.status} - ${errorData.message || response.statusText || 'Unknown error'}`;
                failures.push({ endpoint, message });
                console.error('Product fetch error:', endpoint, message);
                continue;
            }

            console.log(`Products loaded from ${endpoint}`);
            return await response.json();
        } catch (err) {
            const message = err && err.message ? err.message : 'Network error';
            failures.push({ endpoint, message });
            console.error('Product fetch error:', endpoint, message);
        }
    }

    const error = new Error('All product endpoints failed');
    error.causes = failures;
    throw error;
}

async function loadWooCommerceProducts() {
    try {
        console.log('Fetching products from WooCommerce...');
        
        const products = await fetchProductsFromEndpoints();
        console.log('Products loaded:', products);
        
        allProducts = products; // Store globally
        
        if (products && products.length > 0) {
            displayWooCommerceProducts(products);
        } else {
            console.log('No products found from API');
            showProductLoadError('No products available at this time.');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback: Keep static HTML products visible and show a subtle notice
        console.log('Keeping static product cards as fallback');
        let fallbackNotice = 'Unable to load live products. Showing catalog products.';

        if (error && Array.isArray(error.causes)) {
            const details = error.causes.map(cause => `${cause.endpoint}: ${cause.message}`).join(' | ');
            fallbackNotice += ` Details: ${details}`;
        } else {
            fallbackNotice += ' (Tip: append ?functionHost=https://vitasynlabs.netlify.app when previewing off Netlify.)';
        }

        showProductLoadError(fallbackNotice);
    }
}

function showProductLoadError(message) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    // Check if there are existing static products
    const existingProducts = productGrid.querySelectorAll('.product-card');
    
    if (existingProducts.length === 0) {
        // No fallback products, show error
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: #666; font-size: 18px;">${message}</p>
                <p style="color: #999; font-size: 14px; margin-top: 10px;">Please try refreshing the page or contact support.</p>
            </div>
        `;
    } else {
        // Static products exist, just log the issue
        console.log('Static products are displayed as fallback');
    }
}

function displayWooCommerceProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    
    if (!productGrid) {
        console.error('Product grid not found');
        return;
    }

    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const imageUrl = product.images && product.images.length > 0 
            ? product.images[0].src 
            : null;
        
        const price = product.price || '0.00';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${imageUrl ? 
                    `<img src="${imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
                    `<div class="placeholder-img">PEPTIDE IMAGE</div>`
                }
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${price}</p>
                <button class="view-details-btn">VIEW DETAILS</button>
            </div>
        `;
        
        // Open product detail modal instead of redirecting
        productCard.addEventListener('click', (e) => {
            openProductDetail(product);
        });
        
        productGrid.appendChild(productCard);
    });
    
    console.log(`Displayed ${products.length} products`);
}

function openProductDetail(product) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.product-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    
    const imageUrl = product.images && product.images.length > 0 
        ? product.images[0].src 
        : null;
    
    const price = product.price || '0.00';
    const description = product.description || product.short_description || 'No description available.';
    
    modal.innerHTML = `
        <div class="product-modal-overlay"></div>
        <div class="product-modal-content">
            <button class="product-modal-close">&times;</button>
            
            <div class="product-modal-grid">
                <div class="product-modal-image">
                    ${imageUrl ? 
                        `<img src="${imageUrl}" alt="${product.name}">` :
                        `<div class="product-modal-placeholder">PRODUCT IMAGE</div>`
                    }
                </div>
                
                <div class="product-modal-info">
                    <h2 class="product-modal-title">${product.name}</h2>
                    <p class="product-modal-price">$${price}</p>
                    
                    <div class="product-modal-description">
                        ${description}
                    </div>
                    
                    <div class="product-modal-meta">
                        <p><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
                        <p><strong>Stock Status:</strong> ${product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                    
                    <div class="product-modal-actions">
                        <a href="${product.permalink}" class="product-modal-btn primary">ADD TO CART</a>
                        <button class="product-modal-btn secondary" onclick="document.querySelector('.product-modal').remove(); document.body.style.overflow = '';">CONTINUE SHOPPING</button>
                    </div>
                    
                    <div class="product-modal-disclaimer">
                        <p><em>For research purposes only. Not for human consumption.</em></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    modal.querySelector('.product-modal-close').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    modal.querySelector('.product-modal-overlay').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
}

// Make product cards clickable on home page
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    console.log('Found product cards:', productCards.length);
    
    productCards.forEach((card, index) => {
        // Make cards clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            console.log('Product card clicked:', index);
            e.preventDefault();
            e.stopPropagation();
            // Redirect to order page
            window.location.href = 'order.html';
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Product cards initialized');
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const openAgeGate = initAgeGate();
    initResearchNotice(openAgeGate);
    
    new Carousel();
    
    loadWooCommerceProducts();
    
    initSmoothScroll();
    initNewsletter();
    initNavbarScroll();
    initProductCards(); // Add click functionality to product cards
    
    console.log('VitaSyn Labs Website Loaded');
});