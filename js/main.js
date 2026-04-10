// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 400);
}, { passive: true });

// ── Active section link ──
const sections = document.querySelectorAll('section[id], .hero[id]');
const sectionLinks = document.querySelectorAll('.nav-sections a');

if (sectionLinks.length) {
    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = '#' + entry.target.id;
                sectionLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(s => observerNav.observe(s));
}

// ── Scroll animations ──
const animElements = document.querySelectorAll('.animate-on-scroll');
const observerAnim = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerAnim.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animElements.forEach(el => observerAnim.observe(el));

// ── Close mobile menu on link click ──
document.querySelectorAll('.nav-sections a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-sections').classList.remove('open');
    });
});

// ── Dark mode toggle ──
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}
