document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll('.l-reveal');
    if (!targets.length) return;


    targets.forEach(el => el.classList.add('l-reveal-hidden'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('l-reveal-hidden');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));


    setTimeout(() => {
        document.querySelectorAll('.l-reveal-hidden').forEach(el => {
            el.classList.remove('l-reveal-hidden');
        });
    }, 4000);
});