document.addEventListener("DOMContentLoaded", function() {
    const components = [
        { id: 'navbar-container', url: 'components/navbar.html' },
        { id: 'hero-container', url: 'components/hero.html' },
        { id: 'formacao-container', url: 'components/formacao.html' },
        { id: 'projetos-container', url: 'components/projetos.html' },
        { id: 'objetivos-container', url: 'components/objetivos.html' },
        { id: 'footer-container', url: 'components/footer.html' }
    ];

    components.forEach(component => {
        fetch(component.url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(component.id).innerHTML = data;
            });
    });
});
