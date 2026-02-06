document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const articlesList = document.getElementById('articles-list');
    const homeContainer = document.getElementById('articles-container');
    const hubArtContainer = document.getElementById('articles-hub-container');
    const hubGuideContainer = document.getElementById('guides-hub-container');
    const globalCount = document.getElementById('dynamic-article-count');

    let allData = [];

    // 1. POBIERANIE DANYCH
    fetch('dane.json')
        .then(res => res.json())
        .then(data => {
            allData = data;
            
            // Licznik w sidebarze
            if (globalCount) globalCount.innerText = data.length;

            // Renderowanie odpowiednich sekcji
            renderContent();
            
            // Uruchomienie filtrów (Kategorie)
            initCategoryFilters();
            
            // Sprawdzenie parametrów URL (np. z ikon na stronie głównej)
            checkUrlParams();
        })
        .catch(err => console.error("Błąd bazy danych:", err));

    // 2. FUNKCJA RENDERUJĄCA
    function renderContent(filteredData = null) {
        const dataToUse = filteredData || allData;

        // Strona Główna (2 najnowsze)
        if (homeContainer) {
            const latest = [...allData].reverse().slice(0, 2);
            homeContainer.innerHTML = latest.map(art => gridTemplate(art)).join('');
        }

        // Akademia (Podział Artykuły / Poradniki)
        if (hubArtContainer) {
            hubArtContainer.innerHTML = allData.filter(i => i.typ === 'artykul').map(art => gridTemplate(art)).join('');
        }
        if (hubGuideContainer) {
            hubGuideContainer.innerHTML = allData.filter(i => i.typ === 'poradnik').map(art => gridTemplate(art)).join('');
        }

        // Baza Wiedzy (Lista pozioma)
        if (articlesList) {
            renderHorizontal(dataToUse);
        }
    }

    // 3. SZABLONY KART
    function gridTemplate(art) {
        return `
        <a href="${art.link}" class="article-card-v2">
            <div class="article-img-placeholder">${art.tag || 'TECH'}</div>
            <div class="card-body">
                <span class="tag-meta" style="color:var(--primary); font-weight:800; font-size:0.75rem; text-transform:uppercase; margin-bottom:10px; display:block;">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <p>${art.opis}</p>
                <div class="card-footer-meta"><span>${art.data}</span><span>${art.czasCzytania}</span></div>
            </div>
        </a>`;
    }

    function renderHorizontal(items) {
        if (!articlesList) return;
        if (items.length === 0) {
            articlesList.innerHTML = "<p style='text-align:center; padding:40px; opacity:0.5;'>Nie znaleziono artykułów...</p>";
            return;
        }
        articlesList.innerHTML = items.map(art => `
        <a href="${art.link}" class="article-card-horizontal">
            <div class="card-img-side">${art.tag || 'TECH'}</div>
            <div class="card-content-side">
                <span class="tag-meta" style="margin-bottom:8px; font-size:0.7rem; color:var(--primary); font-weight:800; text-transform:uppercase; display:block;">${art.kategoria}</span>
                <h3 style="font-size:1.3rem; margin-bottom:5px;">${art.tytul}</h3>
                <p style="font-size:0.95rem; color:var(--text-muted);">${art.opis}</p>
            </div>
        </a>`).join('');
    }

    // 4. LOGIKA WYSZUKIWARKI
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allData.filter(art => 
                art.tytul.toLowerCase().includes(term) || 
                art.kategoria.toLowerCase().includes(term)
            );
            renderHorizontal(filtered);
        });
    }

    // 5. LOGIKA KATEGORII (To co nie działało)
    function initCategoryFilters() {
        const categoryLinks = document.querySelectorAll('.category-item');
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Pobierz tekst, usuń nawiasy z cyframi np. "(12)"
                let catName = link.innerText.split('(')[0].trim();
                
                if (catName.toLowerCase() === 'wszystkie') {
                    catName = '';
                }

                // Wpisz do wyszukiwarki i WYMUŚ zdarzenie input
                if (searchInput) {
                    searchInput.value = catName;
                    searchInput.dispatchEvent(new Event('input')); // To uruchamia filtrowanie!
                }
                
                // Przewiń do listy
                if(articlesList) articlesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // 6. OBSŁUGA LINKÓW Z FILTREM (np. z ikon na głównej)
    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter');
        if (filter && searchInput) {
            searchInput.value = filter;
            searchInput.dispatchEvent(new Event('input'));
        }
    }
});