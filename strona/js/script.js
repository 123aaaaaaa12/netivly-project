document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. TRYB CIEMNY (Dark Mode)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    const updateBtnText = () => {
        if (themeToggle) {
            themeToggle.innerText = body.classList.contains('dark-mode') ? "Jasny" : "Ciemny";
        }
    };
    updateBtnText();

    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateBtnText();
    });

    // ==========================================
    // 2. MENU MOBILNE (Hamburger)
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Blokada scrollowania strony przy otwartym menu
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Zamykanie menu po kliknięciu w link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }

    // ==========================================
    // 3. OBSŁUGA BAZY DANYCH (JSON)
    // ==========================================
    const articlesList = document.getElementById('articles-list'); // Baza Wiedzy
    const articlesContainer = document.getElementById('articles-container'); // Start
    const hubArtContainer = document.getElementById('articles-hub-container'); // Akademia/Materiały (Analizy)
    const hubGuideContainer = document.getElementById('guides-hub-container'); // Akademia/Materiały (Poradniki)
    const searchInput = document.getElementById('search-input');

    let allData = [];

    // Sprawdzamy czy na danej podstronie jest jakikolwiek kontener na dane
    if (articlesList || articlesContainer || hubArtContainer || hubGuideContainer) {
        fetch('dane.json')
            .then(res => {
                if (!res.ok) throw new Error("Błąd wczytywania dane.json");
                return res.json();
            })
            .then(data => {
                allData = data;
                renderPageContent();
            })
            .catch(err => console.error("Problem z bazą danych:", err));
    }

    function renderPageContent() {
        // A. STRONA GŁÓWNA (3 najnowsze w gridzie)
        if (articlesContainer) {
            const latest = [...allData].reverse().slice(0, 3);
            articlesContainer.innerHTML = latest.map(art => cardGridTemplate(art)).join('');
        }

        // B. AKADEMIA / MATERIAŁY (Podział na Artykuły i Poradniki)
        if (hubArtContainer) {
            const arts = allData.filter(i => i.typ === 'artykul');
            hubArtContainer.innerHTML = arts.map(art => cardGridTemplate(art)).join('');
        }
        if (hubGuideContainer) {
            const guides = allData.filter(i => i.typ === 'poradnik');
            hubGuideContainer.innerHTML = guides.map(art => cardGridTemplate(art)).join('');
        }

        // C. BAZA WIEDZY (Pełna lista pozioma z wyszukiwarką)
        if (articlesList) {
            renderHorizontalList(allData);
        }
    }

    // Szablon Karty Pionowej (Grid)
    function cardGridTemplate(art) {
        return `
        <a href="${art.link}" class="article-card-v2">
            <div class="article-img-placeholder">${art.tag || 'TECH'}</div>
            <div class="card-body">
                <span class="tag">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <p>${art.opis}</p>
                <div class="card-footer-meta">
                    <span>${art.data}</span>
                    <span>${art.czasCzytania}</span>
                </div>
            </div>
        </a>`;
    }

    // Szablon Karty Poziomej (Lista)
    function renderHorizontalList(items) {
        if (!articlesList) return;
        if (items.length === 0) {
            articlesList.innerHTML = "<p style='text-align:center; padding:40px; opacity:0.5;'>Brak wyników...</p>";
            return;
        }
        articlesList.innerHTML = items.map(art => `
        <a href="${art.link}" class="article-card-horizontal">
            <div class="card-img-side">${art.tag || 'TECH'}</div>
            <div class="card-content-side">
                <span class="tag" style="margin-bottom:8px;">${art.kategoria}</span>
                <h3>${art.tytul}</h3>
                <p>${art.opis}</p>
            </div>
        </a>`).join('');
    }

    // ==========================================
    // 4. WYSZUKIWARKA I KATEGORIE
    // ==========================================
    
    searchInput?.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allData.filter(art => 
            art.tytul.toLowerCase().includes(term) || 
            art.kategoria.toLowerCase().includes(term) ||
            art.opis.toLowerCase().includes(term)
        );
        renderHorizontalList(filtered);
    });

    document.querySelectorAll('.sidebar-box .tag').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = e.target.textContent.split(' (')[0].trim();
            
            if (cat.toLowerCase() === 'wszystkie') {
                renderHorizontalList(allData);
                if (searchInput) searchInput.value = '';
            } else {
                const filtered = allData.filter(art => art.kategoria.toLowerCase() === cat.toLowerCase());
                renderHorizontalList(filtered);
                if (searchInput) searchInput.value = cat;
            }
        });
    });
}); // <--- To jest teraz na samym końcu, zamyka wszystko poprawnie