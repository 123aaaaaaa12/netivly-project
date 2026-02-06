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

    // ========================================= //
    
}); // <--- To jest teraz na samym końcu, zamyka wszystko poprawnie