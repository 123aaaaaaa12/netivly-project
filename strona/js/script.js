document.addEventListener('DOMContentLoaded', () => {
    // 1. TRYB CIEMNY I HAMBURGER (Logika uniwersalna)
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // 2. KONTENERY (Sprawdzamy na której jesteśmy podstronie)
    const articlesList = document.getElementById('articles-list'); // Baza Wiedzy (Poziome)
    const articlesContainer = document.getElementById('articles-container'); // Start (3 najnowsze)
    const hubArtContainer = document.getElementById('articles-hub-container'); // Centrum (Artykuły)
    const hubGuideContainer = document.getElementById('guides-hub-container'); // Centrum (Poradniki)

    if (articlesList || articlesContainer || hubArtContainer || hubGuideContainer) {
        fetch('dane.json')
            .then(res => res.json())
            .then(data => {
                // A. STRONA GŁÓWNA (Index) - Pokazuje tylko 3 najnowsze pionowe
                if (articlesContainer) {
                    const latest = [...data].reverse().slice(0, 3);
                    articlesContainer.innerHTML = latest.map(art => cardGridTemplate(art)).join('');
                }

                // B. CENTRUM WIEDZY - Podział na Artykuły i Poradniki (Pionowe)
                if (hubArtContainer) {
                    hubArtContainer.innerHTML = data.filter(i => i.typ === 'artykul').map(art => cardGridTemplate(art)).join('');
                }
                if (hubGuideContainer) {
                    hubGuideContainer.innerHTML = data.filter(i => i.typ === 'poradnik').map(art => cardGridTemplate(art)).join('');
                }

                // C. BAZA WIEDZY - Pełna lista (Pozioma - Twoja poprawka)
                if (articlesList) {
                    renderHorizontalList(data, articlesList);
                    setupSearch(data, articlesList);
                }
            });
    }

    // SZABLON PIONOWY (Grid)
    function cardGridTemplate(art) {
        return `
        <a href="${art.link}" class="article-card-v2">
            <div class="article-img-placeholder">${art.tag}</div>
            <div class="card-body">
                <span class="tag">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <p>${art.opis}</p>
                <div class="card-footer-meta"><span>${art.data}</span><span>${art.czasCzytania}</span></div>
            </div>
        </a>`;
    }

    // SZABLON POZIOMY (Lista)
    function renderHorizontalList(items, container) {
        container.innerHTML = items.map(art => `
        <a href="${art.link}" class="article-card-horizontal">
            <div class="card-img-side">${art.tag}</div>
            <div class="card-content-side">
                <span class="tag" style="margin-bottom:8px;">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <p>${art.opis}</p>
            </div>
        </a>`).join('');
    }

    function setupSearch(data, container) {
        document.getElementById('search-input')?.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = data.filter(art => art.tytul.toLowerCase().includes(term) || art.kategoria.toLowerCase().includes(term));
            renderHorizontalList(filtered, container);
        });
    }
});