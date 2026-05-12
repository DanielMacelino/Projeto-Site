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

                // Initialize GitHub stats if formation is loaded
                if (component.id === 'formacao-container') {
                    initGithubStats();
                }
            });
    });

    function initGithubStats() {
        const username = 'DanielMacelino';
        const content = document.getElementById('github-content');
        if (!content) return;

        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Not Found') {
                    content.innerHTML = '<p class="text-danger small text-center">Usuário não encontrado.</p>';
                    return;
                }
                content.innerHTML = `
                    <div class="row g-3 text-center">
                        <div class="col-6">
                            <div class="p-3 rounded-3 bg-dark-soft">
                                <span class="h4 fw-bold d-block text-primary">${data.public_repos}</span>
                                <span class="small text-muted">Repositórios</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="p-3 rounded-3 bg-dark-soft">
                                <span class="h4 fw-bold d-block text-primary">${data.followers}</span>
                                <span class="small text-muted">Seguidores</span>
                            </div>
                        </div>
                        <div class="col-12 text-start mt-3">
                            <p class="small text-muted mb-1"><i class="fas fa-history me-2"></i> Atividade recente:</p>
                            <div class="p-2 rounded-3 bg-dark-soft small text-center">
                                <a href="https://github.com/${username}" target="_blank" class="text-decoration-none text-main">
                                    Acesse o perfil completo <i class="fas fa-external-link-alt ms-1 small"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(err => {
                content.innerHTML = '<p class="text-danger small text-center">Erro ao carregar dados do GitHub.</p>';
            });
    }

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

    // Click events
    document.addEventListener('click', function(e) {
        // Back to Top click
        if (e.target.closest('#back-to-top')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Auto-close mobile navbar on link click
        const navLink = e.target.closest('.nav-link') || e.target.closest('.navbar-brand');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navLink && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                // Fallback if instance doesn't exist yet
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        }
    });
});
