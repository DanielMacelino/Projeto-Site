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

    // Initialize AOS with a small delay or check
    function safeInitAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                disable: 'mobile' // Opcional: desabilitar em celular se preferir mais performance
            });
        }
    }

    // Load components
    let loadedCount = 0;
    components.forEach(component => {
        const container = document.getElementById(component.id);
        if (!container) {
            console.error(`Container not found: ${component.id}`);
            return;
        }

        fetch(component.url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
                
                // Post-load logic
                if (component.id === 'navbar-container') {
                    handleNavbarScroll();
                }
                if (component.id === 'formacao-container') {
                    initGithubStats();
                }

                // Refresh AOS after each component
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }

                loadedCount++;
                if (loadedCount === components.length) {
                    safeInitAOS();
                }
            })
            .catch(err => {
                console.error(`Failed to load ${component.url}:`, err);
            });
    });

    function initGithubStats() {
        const username = 'DanielMacelino';
        const content = document.getElementById('github-content');
        if (!content) return;

        Promise.all([
            fetch(`https://api.github.com/users/${username}`).then(res => res.json()),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(res => res.json())
        ])
        .then(([userData, reposData]) => {
            if (userData.message === 'Not Found') {
                content.innerHTML = '<p class="text-danger small text-center">Usuário não encontrado.</p>';
                return;
            }

            const languages = reposData
                .map(repo => repo.language)
                .filter(lang => lang !== null);
            
            const langCount = languages.reduce((acc, lang) => {
                acc[lang] = (acc[lang] || 0) + 1;
                return acc;
            }, {});

            const topLanguage = Object.keys(langCount).reduce((a, b) => langCount[a] > langCount[b] ? a : b, 'N/A');

            content.innerHTML = `
                <div class="row g-3 text-center">
                    <div class="col-6">
                        <div class="p-3 rounded-3 bg-dark-soft">
                            <span class="h4 fw-bold d-block text-primary">${userData.public_repos}</span>
                            <span class="small text-muted">Repositórios</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-3 rounded-3 bg-dark-soft">
                            <span class="h4 fw-bold d-block text-primary">${topLanguage}</span>
                            <span class="small text-muted">Linguagem Principal</span>
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
            if (content) content.innerHTML = '<p class="text-danger small text-center">Erro ao carregar dados do GitHub.</p>';
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
        if (e.target.closest('#back-to-top')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const navLink = e.target.closest('.nav-link') || e.target.closest('.navbar-brand');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navLink && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        }
    });
});
