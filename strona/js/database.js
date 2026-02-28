document.addEventListener('DOMContentLoaded', () => {
    console.log("Netivly Engine v3.0: Cinema & Bento Active");

    // --- KONFIGURACJA KONTENERÓW ---
    const ui = {
        // Warstwy kinowe (index.html)
        layerAi: document.getElementById('layer-ai'),
        layerInfra: document.getElementById('layer-infra'),
        layerSecurity: document.getElementById('layer-security'),
        layerBusiness: document.getElementById('layer-business'), // Nowa warstwa pod e-booki
        
        // Standardowe widoki
        list: document.getElementById('articles-list'),      // Baza Wiedzy (Lista)
        home: document.getElementById('articles-container'), // Akademia (Grid)
        hubArt: document.getElementById('articles-hub-container'), 
        hubGuide: document.getElementById('guides-hub-container'),
        
        // Statystyki i Szukajka
        globalCount: document.getElementById('dynamic-article-count'),
        searchInput: document.getElementById('search-input')
    };

    let allData = [];

    // --- POBIERANIE BAZY ---
    fetch('dane.json')
        .then(res => {
            if (!res.ok) throw new Error("Błąd odczytu bazy danych JSON");
            return res.json();
        })
        .then(data => {
            // Sortujemy: najnowsze (po ID lub kolejności w pliku) na górę
            allData = [...data].reverse();
            
            // Inicjalizacja komponentów
            updateGlobalStats();
            renderDynamicContent();
            setupSearchAndFilters();
            handleUrlParameters();
        })
        .catch(err => {
            console.error("Netivly DB Error:", err);
            if(ui.list) ui.list.innerHTML = "<p>Baza danych jest tymczasowo niedostępna.</p>";
        });

    // --- RENDEROWANIE ---
    function renderDynamicContent() {
        // 1. KINOWE WARSTWY (Strona Główna - 9:16)
        if (ui.layerAi) {
            const data = allData.filter(a => a.kategoria.toLowerCase().includes('ai') || a.typ === 'artykul');
            ui.layerAi.innerHTML = data.map(art => cinemaCardTemplate(art)).join('');
        }
        if (ui.layerInfra) {
            const data = allData.filter(a => a.kategoria.toLowerCase().includes('hard') || a.kategoria.toLowerCase().includes('net'));
            ui.layerInfra.innerHTML = data.map(art => cinemaCardTemplate(art)).join('');
        }
        if (ui.layerSecurity) {
            const data = allData.filter(a => a.kategoria.toLowerCase().includes('cyb') || a.tag === 'SEC');
            ui.layerSecurity.innerHTML = data.map(art => cinemaCardTemplate(art)).join('');
        }
        if (ui.layerBusiness) {
            const data = allData.filter(a => a.kategoria.toLowerCase().includes('biz') || a.typ === 'poradnik');
            ui.layerBusiness.innerHTML = data.map(art => cinemaCardTemplate(art)).join('');
        }

        // 2. STANDARDOWY GRID (Akademia / Start)
        if (ui.home) {
            const latest = allData.slice(0, 2); // Na start pokazujemy 2 najnowsze
            ui.home.innerHTML = latest.map(art => gridCardTemplate(art)).join('');
        }
        if (ui.hubArt) {
            const data = allData.filter(i => i.typ === 'artykul');
            ui.hubArt.innerHTML = data.map(art => gridCardTemplate(art)).join('');
        }
        if (ui.hubGuide) {
            const data = allData.filter(i => i.typ === 'poradnik');
            ui.hubGuide.innerHTML = data.map(art => gridCardTemplate(art)).join('');
        }

        // 3. BAZA WIEDZY (Poziome karty)
        if (ui.list) {
            renderHorizontalList(allData);
        }
    }

    // --- SZABLONY (TEMPLATES) ---

    function cinemaCardTemplate(art) {
        return `
        <a href="${art.link}" class="card-9-16">
            <div class="card-img-bg" style="background-image: url('assets/img/covers/${art.slug}.jpg'), linear-gradient(135deg, #020617, #1d4ed8);"></div>
            <div class="card-overlay-content">
                <span class="cat-tag">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <div class="card-footer">
                    <span>${art.czasCzytania} czytania</span>
                    <i class="fas fa-arrow-right-long"></i>
                </div>
            </div>
        </a>`;
    }

    function gridCardTemplate(art) {
        return `
        <a href="${art.link}" class="article-card-v2">
            <div class="article-img-placeholder">${art.tag || 'PRO'}</div>
            <div class="card-body">
                <span class="tag-meta">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <p>${art.opis}</p>
                <div class="card-footer-meta">
                    <span>${art.data}</span>
                    <span>${art.czasCzytania}</span>
                </div>
            </div>
        </a>`;
    }

    function renderHorizontalList(items) {
        if (!ui.list) return;
        ui.list.innerHTML = items.length ? items.map(art => `
        <a href="${art.link}" class="article-card-horizontal">
            <div class="card-img-side">${art.tag || 'NET'}</div>
            <div class="card-content-side">
                <span class="tag-meta" style="margin-bottom:8px;">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <p>${art.opis}</p>
            </div>
        </a>`).join('') : "<p class='no-results'>Nie znaleziono dopasowań.</p>";
    }

    // --- LOGIKA POMOCNICZA ---

    function updateGlobalStats() {
        if (ui.globalCount) ui.globalCount.innerText = allData.length;
    }

    function setupSearchAndFilters() {
        ui.searchInput?.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allData.filter(art => 
                art.tytul.toLowerCase().includes(term) || 
                art.kategoria.toLowerCase().includes(term)
            );
            renderHorizontalList(filtered);
        });

        document.querySelectorAll('.category-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const cat = btn.innerText.split('(')[0].trim();
                if (ui.searchInput) {
                    ui.searchInput.value = (cat.toLowerCase() === 'wszystkie') ? '' : cat;
                    ui.searchInput.dispatchEvent(new Event('input'));
                }
            });
        });
    }

    function handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter') || urlParams.get('search');
        if (filter && ui.searchInput) {
            ui.searchInput.value = filter;
            ui.searchInput.dispatchEvent(new Event('input'));
        }
    }
});