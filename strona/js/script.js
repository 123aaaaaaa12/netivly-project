document.addEventListener('DOMContentLoaded', () => {
    // --- 1. OBSŁUGA TRYBU CIEMNEGO ---
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // --- 2. OBSŁUGA BAZY DANYCH I WYSZUKIWARKI ---
    const articlesList = document.getElementById('articles-list');
    const searchInput = document.getElementById('search-input');
    let baseArticles = [];
    // Znajdujemy wszystkie linki w panelu bocznym (Kategorie)
    const categoryLinks = document.querySelectorAll('.sidebar-box .tag');

categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Zapobiega odświeżeniu strony

        // Pobieramy nazwę kategorii z tekstu linku (np. "Networking (8)" zamieniamy na "Networking")
        // Używamy split(' ('), żeby uciąć liczbę w nawiasie
        const selectedCategory = e.target.textContent.split(' (')[0].trim();

        // Jeśli klikniemy kategorię, filtrujemy bazę artykułów
        const filtered = baseArticles.filter(art => 
            art.kategoria.toLowerCase() === selectedCategory.toLowerCase()
        );

        // Wyświetlamy przefiltrowane wyniki
        renderArticles(filtered);

        // Opcjonalnie: wpisz nazwę kategorii w wyszukiwarkę, żeby użytkownik widział co się dzieje
        if (searchInput) {
            searchInput.value = selectedCategory;
        }
    });
});

    // Pobieranie danych z pliku JSON
    if (articlesList) {
        fetch('dane.json')
            .then(response => response.json())
            .then(data => {
                baseArticles = data;
                renderArticles(baseArticles); // Wyświetl wszystko na start
            })
            .catch(error => {
                articlesList.innerHTML = "<p>Błąd ładowania danych bazy wiedzy.</p>";
            });
    }

    // Funkcja tworząca karty artykułów
    function renderArticles(items) {
        if (items.length === 0) {
            articlesList.innerHTML = "<p>Brak wyników dla tego zapytania.</p>";
            return;
        }

        articlesList.innerHTML = items.map(art => `
            <a href="${art.link}" class="article-card-v2" style="flex-direction: row; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div class="article-img-placeholder" style="width: 150px; height: 100px; flex-shrink: 0; font-size: 0.8rem; background: var(--primary); color: white;">
                    ${art.tag}
                </div>
                <div class="card-body" style="padding: 10px;">
                    <span class="tag">${art.kategoria}</span>
                    <h3 style="font-size: 1.2rem; margin: 5px 0;">${art.tytul}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">${art.opis}</p>
                </div>
            </a>
        `).join('');
    }

    // Obsługa wpisywania tekstu w wyszukiwarkę
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();
            const filtered = baseArticles.filter(art => 
                art.tytul.toLowerCase().includes(searchText) || 
                art.opis.toLowerCase().includes(searchText) || 
                art.kategoria.toLowerCase().includes(searchText)
            );
            renderArticles(filtered);
        });
    }
});