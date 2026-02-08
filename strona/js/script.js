document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    // 1. Tryb Ciemny
    if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');
    
    const updateText = () => {
        if(themeToggle) themeToggle.innerText = body.classList.contains('dark-mode') ? "Jasny" : "Ciemny";
    };
    updateText();

    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateText();
    });

    // 2. Menu Mobilne
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Blokada skrolowania tła
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Zamykanie przy kliknięciu w link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }
});