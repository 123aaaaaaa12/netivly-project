// Nasłuchujemy, aż cała strona się załaduje
document.addEventListener('DOMContentLoaded', () => {
  
  // Elementy pop-upa o ciasteczkach
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtn = document.getElementById('accept-cookies');

  if (cookiePopup && acceptBtn) {
    // Sprawdzamy w Local Storage, czy użytkownik już wcześniej kliknął "Akceptuję"
    const hasAcceptedCookies = localStorage.getItem('netivly_cookies_accepted');

    if (!hasAcceptedCookies) {
      // Jeśli nie zaakceptował, czekamy 1.5 sekundy (1500ms) i wysuwamy okienko
      setTimeout(() => {
        cookiePopup.classList.add('show');
      }, 1500);
    }

    // Co się dzieje po kliknięciu przycisku
    acceptBtn.addEventListener('click', () => {
      // 1. Chowamy okienko dodając animację powrotu
      cookiePopup.classList.remove('show');
      
      // 2. Zapisujemy informację w pamięci przeglądarki
      localStorage.setItem('netivly_cookies_accepted', 'true');
    });
  }

});