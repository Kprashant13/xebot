/**
 * Xebot Website Components
 * Loads and initializes global header, footer, and common functionality.
 */

// Configuration
const CONFIG = {
    isSubdir: window.location.pathname.includes('/blog/'),
    basePath: window.location.pathname.includes('/blog/') ? '..' : '.'
};

// Logo SVG (shared across all pages)
const LOGO_SVG = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
    <path d="M9 9L23 23M23 9L9 23" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/>
    <path d="M9 9L23 23M23 9L9 23" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <circle cx="9" cy="9" r="2.5" fill="white"/>
    <circle cx="23" cy="9" r="2.5" fill="white"/>
    <circle cx="9" cy="23" r="2.5" fill="white"/>
    <circle cx="23" cy="23" r="2.5" fill="white"/>
    <circle cx="16" cy="16" r="3" fill="white"/>
    <circle cx="16" cy="16" r="1.5" fill="url(#gradient)"/>
    <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
            <stop stop-color="#6366f1"/>
            <stop offset="1" stop-color="#a855f7"/>
        </linearGradient>
    </defs>
</svg>`;

// Get current page for active nav
function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path.endsWith('/index.html')) return 'home';
    if (path.includes('/features')) return 'features';
    if (path.includes('/pricing')) return 'pricing';
    if (path.includes('/companies')) return 'companies';
    if (path.includes('/blog')) return 'blog';
    return '';
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    return savedTheme;
}

// Render header
function renderHeader() {
    const currentPage = getCurrentPage();
    const signupLink = CONFIG.isSubdir ? '/#signup' : '#signup';

    return `
    <nav class="navbar">
        <div class="container">
            <a href="/" class="navbar-brand">
                ${LOGO_SVG}
                XEBOT
            </a>

            <ul class="navbar-nav">
                <li><a href="/"${currentPage === 'home' ? ' class="active"' : ''}>Home</a></li>
                <li><a href="/features"${currentPage === 'features' ? ' class="active"' : ''}>Features</a></li>
                <li><a href="/pricing"${currentPage === 'pricing' ? ' class="active"' : ''}>Pricing</a></li>
                <li><a href="/companies"${currentPage === 'companies' ? ' class="active"' : ''}>For Companies</a></li>
                <li><a href="/blog"${currentPage === 'blog' ? ' class="active"' : ''}>Blog</a></li>
            </ul>

            <div class="navbar-actions">
                <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"/>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                    <svg class="moon-icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                </button>
                <a href="${signupLink}" class="btn btn-gradient btn-open-lead-modal">Get Started Free</a>
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </nav>

    <div class="mobile-nav" id="mobile-nav">
        <div class="mobile-nav-header">
            <span class="navbar-brand">XEBOT</span>
            <button class="modal-close" id="mobile-nav-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <ul class="mobile-nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/companies">For Companies</a></li>
            <li><a href="/blog">Blog</a></li>
        </ul>
        <div class="mobile-nav-actions">
            <a href="${signupLink}" class="btn btn-gradient btn-lg w-full btn-open-lead-modal">Get Started Free</a>
        </div>
    </div>`;
}

// Render footer
function renderFooter() {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-logo">XEBOT</div>
                    <p class="footer-description">
                        The modern coding interview platform built for AI-assisted development.
                    </p>
                    <div class="footer-social">
                        <a href="https://x.com/xebot_ai" class="footer-social-link" aria-label="X" target="_blank">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/xebot" class="footer-social-link" aria-label="LinkedIn" target="_blank">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                <rect x="2" y="9" width="4" height="12"/>
                                <circle cx="4" cy="4" r="2"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="footer-column">
                    <h4>Product</h4>
                    <ul class="footer-links">
                        <li><a href="/features">Features</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                        <li><a href="/companies">For Companies</a></li>
                        <li><a href="/practice">Practice</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Resources</h4>
                    <ul class="footer-links">
                        <li><a href="/case-study-fintech">FinTech Case Study</a></li>
                        <li><a href="/case-study-ai-ml">AI/ML Case Study</a></li>
                        <li><a href="/case-study-devtools">DevTools Case Study</a></li>
                        <li><a href="/blog">Blog</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Company</h4>
                    <ul class="footer-links">
                        <li><a href="/about">About</a></li>
                        <li><a href="/careers">Careers</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Legal</h4>
                    <ul class="footer-links">
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="footer-copyright">&copy; 2026 Xebot Technologies Pvt. Ltd. All rights reserved.</p>
                <div class="footer-legal">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// Render lead capture modal
function renderLeadModal() {
    return `
    <div class="lead-modal" id="lead-modal">
        <div class="lead-modal-content">
            <div class="lead-modal-header">
                <h3>Get Started with Xebot</h3>
                <button class="lead-modal-close" id="lead-modal-close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="lead-modal-body">
                <p class="lead-modal-subtitle">Join 23 companies already using Xebot to hire smarter.</p>

                <div class="lead-modal-benefits">
                    <div class="lead-modal-benefit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>Free trial with no credit card required</span>
                    </div>
                    <div class="lead-modal-benefit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>AI-powered coding assessments</span>
                    </div>
                    <div class="lead-modal-benefit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>Evaluate vibe coding skills</span>
                    </div>
                </div>

                <form class="lead-form" id="lead-form">
                    <div class="lead-form-row">
                        <div class="lead-form-group">
                            <label for="lead-first-name">First Name</label>
                            <input type="text" id="lead-first-name" name="firstName" class="lead-form-input" placeholder="John" required>
                        </div>
                        <div class="lead-form-group">
                            <label for="lead-last-name">Last Name</label>
                            <input type="text" id="lead-last-name" name="lastName" class="lead-form-input" placeholder="Doe" required>
                        </div>
                    </div>
                    <div class="lead-form-group">
                        <label for="lead-email">Work Email</label>
                        <input type="email" id="lead-email" name="email" class="lead-form-input" placeholder="john@company.com" required>
                    </div>
                    <div class="lead-form-group">
                        <label for="lead-phone">Phone Number <span class="optional">(Optional)</span></label>
                        <input type="tel" id="lead-phone" name="phone" class="lead-form-input" placeholder="+1 (555) 123-4567">
                    </div>
                    <div class="lead-form-group">
                        <label for="lead-company-size">Company Size</label>
                        <select id="lead-company-size" name="companySize" class="lead-form-select" required>
                            <option value="">Select company size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="500+">500+ employees</option>
                        </select>
                    </div>
                    <button type="submit" class="lead-form-submit">Get Started Free</button>
                </form>

                <div class="lead-form-footer">
                    <p>By submitting, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="success-modal">
        <div class="modal-content">
            <button class="modal-close" id="success-modal-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <div class="text-center" style="padding: 2rem 0;">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" width="64" height="64" style="margin: 0 auto 1.5rem;">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="16 10 10 16 8 14"/>
                </svg>
                <h3 class="modal-title">You're on the list!</h3>
                <p class="text-secondary" style="margin-bottom: 1.5rem;">We'll reach out soon with your early access invite. Check your email for confirmation.</p>
                <a href="/blog" class="btn btn-secondary">Read Our Blog While You Wait</a>
            </div>
        </div>
    </div>`;
}

// Initialize all common functionality
function initCommon() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        }

        updateThemeIcon(document.documentElement.getAttribute('data-theme'));

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // Mobile Navigation
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        mobileNavClose?.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Scroll Animations
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Lead Capture Modal
    const leadModal = document.getElementById('lead-modal');
    const leadModalClose = document.getElementById('lead-modal-close');
    const leadForm = document.getElementById('lead-form');
    const successModal = document.getElementById('success-modal');
    const successModalClose = document.getElementById('success-modal-close');

    function openLeadModal() {
        if (leadModal) {
            leadModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLeadModal() {
        if (leadModal) {
            leadModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Open modal on CTA button clicks
    document.querySelectorAll('.btn-open-lead-modal, a[href="#signup"], a[href="/#signup"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openLeadModal();
        });
    });

    // Close modal
    leadModalClose?.addEventListener('click', closeLeadModal);

    leadModal?.addEventListener('click', (e) => {
        if (e.target === leadModal) {
            closeLeadModal();
        }
    });

    // Handle lead form submission
    leadForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(leadForm);
        const data = {
            name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            companySize: formData.get('companySize'),
            source: 'lead-modal',
            timestamp: new Date().toISOString()
        };

        const submitBtn = leadForm.querySelector('.lead-form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        const scriptURL = 'https://script.google.com/macros/s/AKfycbxQ5AqA374MPUA_HBuOHjxN22ktzmC_lqNV8fhplih_vsDye9xqWO8QIB-ABJr7qLOsaA/exec';

        try {
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            closeLeadModal();
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            leadForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    successModalClose?.addEventListener('click', () => {
        if (successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    successModal?.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLeadModal();
            if (successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Load LinkedIn Tag Manager
function loadLinkedInTag() {
    window._linkedin_partner_id = "8577212";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

    const s = document.getElementsByTagName("script")[0];
    const b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
}

// Main initialization
function initXebot() {
    // Initialize theme first to prevent flash
    initTheme();

    // Inject header
    const headerPlaceholder = document.getElementById('xebot-header');
    if (headerPlaceholder) {
        headerPlaceholder.outerHTML = renderHeader();
    }

    // Inject footer
    const footerPlaceholder = document.getElementById('xebot-footer');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = renderFooter();
    }

    // Inject lead modal
    const modalPlaceholder = document.getElementById('xebot-modal');
    if (modalPlaceholder) {
        modalPlaceholder.outerHTML = renderLeadModal();
    }

    // Initialize common functionality
    initCommon();

    // Load LinkedIn tag
    loadLinkedInTag();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initXebot);
} else {
    initXebot();
}

// Export for manual use
window.XebotComponents = {
    renderHeader,
    renderFooter,
    renderLeadModal,
    initCommon,
    initXebot
};
