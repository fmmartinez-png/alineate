document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const isActive = linkPath === currentPath || (!currentPath && linkPath.endsWith('index.html'));
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        }
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25 }
        );

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add('is-visible'));
    }
});

