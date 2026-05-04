document.addEventListener("DOMContentLoaded", function() {
    const components = [
        { id: 'navbar-container', url: 'components/navbar.html' },
        { id: 'hero-container', url: 'components/hero.html' },
        { id: 'sobre-container', url: 'components/sobre.html' },
        { id: 'formacao-container', url: 'components/formacao.html' },
        { id: 'habilidades-container', url: 'components/habilidades.html' },
        { id: 'projetos-container', url: 'components/projetos.html' },
        { id: 'objetivos-container', url: 'components/objetivos.html' },
        { id: 'footer-container', url: 'components/footer.html' }
    ];

    components.forEach(component => {
        fetch(component.url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(component.id).innerHTML = data;
                
                // If it's the navbar, we need to handle initial transparency
                if (component.id === 'navbar-container') {
                    handleNavbarScroll();
                }
            });
    });

    // Handle Navbar Scroll and Back to Top
    window.addEventListener('scroll', handleNavbarScroll);

    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        const backToTop = document.getElementById('back-to-top');

        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
            if (backToTop) backToTop.style.display = 'flex';
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (backToTop) backToTop.style.display = 'none';
        }
    }

    // Back to Top click
    document.addEventListener('click', function(e) {
        if (e.target.closest('#back-to-top')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});
