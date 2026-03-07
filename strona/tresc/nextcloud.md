Jeżeli masz już postawiony własny serwer NAS (np. na CasaOS, Unraid lub TrueNAS), pierwszą rzeczą, którą powinieneś tam zainstalować, jest Nextcloud Hub. To potężne, darmowe narzędzie, które sprawia, że przestajesz być zależny od płatnych subskrypcji w chmurze.

### Artykuł o serwerach NAS.

<a href="artykul.html?id=linux-live-usb-poradnik">Naciśnij ten tekst aby przenieść się do artykułu.</a>

## Nextcloud Hub: Twoje własne centrum dowodzenia!

Jeśli szukasz sposobu na ucieczkę z „ekosystemu” Google, Microsoftu czy Apple, to trafiłeś pod właściwy adres. Nextcloud Hub to w skrócie Twoja prywatna chmura – odpowiednik takiego Google Workspace lub Microsoft 365, ale z jedną kluczową różnicą: to Ty decydujesz, gdzie przechowywane są Twoje dane.

### Co zyskujesz dzięki Nextcloud:
*   **Prywatny dysk (Files):** Działa jak Google Drive czy Dropbox. Masz dostęp do swoich dokumentów z komputera, telefonu i przeglądarki. Twoje dane nigdzie nie „wypływają” – są u Ciebie w domu.
*   **Kopia zdjęć z telefonu:** Koniec z płaceniem za dodatkowe GB w Google Photos czy iCloud. Aplikacja mobilna automatycznie wysyła zdjęcia na Twój serwer.
*   **Biuro Online (Office):** Możesz edytować dokumenty Word, Excel czy PowerPoint bezpośrednio w przeglądarce, nawet wspólnie z innymi osobami w tym samym czasie.
*   **Komunikacja (Talk):** Prywatny czat i wideokonferencje. Bezpieczna alternatywa dla Zooma czy Skype’a.
*   **Kalendarz i Kontakty:** Wszystko, co masz w telefonie, synchronizuje się z Twoim serwerem, a nie z serwerami wielkich korporacji.


### Instalacja Nextcloud Hub.

1. **Metoda "Jedno kliknięcie" (CasaOS / Unraid)**

**W CasaOS** wchodzisz w App Store, wyszukujesz "Nextcloud" i klikasz Install. System sam skonfiguruje bazę danych i kontenery w tle. 



**W Unraid:** Przechodzisz do zakładki Apps, wpisujesz "Nextcloud" i wybierasz jedną z gotowych paczek (np. od linuxserver.io).

2. **Oficjalny instalator Web (Dla zwykłego hostingu)**

Jeśli masz zwykły serwer FTP/hosting stron WWW:



* **Pobierasz** plik setup-nextcloud.php ze strony Nextcloud.

* **Wrzucasz** go na swój serwer.

* **Otwierasz** ten plik w przeglądarce (np. twojadomena.pl/setup-nextcloud.php).

* **Kreator** sam pobierze resztę plików i przeprowadzi Cię przez konfigurację.

3. **Docker Compose (Dla zaawansowanych)**



Jeśli chcesz mieć pełną kontrolę, używasz Dockera. Przykładowy, uproszczony plik konfiguracyjny wygląda tak: Patrz na samym dole artykułu.

### O czym musisz pamiętać podczas instalacji?
*   **Baza danych:** Nextcloud potrzebuje bazy (najlepiej MariaDB lub PostgreSQL). W prostych instalatorach (jak w CasaOS) jest ona dodawana automatycznie.

*   **Dostęp z zewnątrz:** Aby korzystać z Nextcloud poza domem, będziesz potrzebować Reverse Proxy (np. Nginx Proxy Manager) lub usługi typu Tailscale, żeby było to bezpieczne.

*   **Pamięć RAM:** Nextcloud Hub jest dość "ciężki" przez funkcje biurowe i czat, więc serwer powinien mieć minimum 2-4 GB RAM, aby działał płynnie.

### Podsumowanie
Jeśli budujesz domowy serwer, Nextcloud jest powodem, dla którego warto to robić. To najbardziej kompletne narzędzie do odzyskania cyfrowej wolności.

```bash
services:
  db:
    image: mariadb:10.6
    volumes:
      - nextcloud_db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=twoje_haslo
  app:
    image: nextcloud
    ports:
      - 8080:80
    links:
      - db
    volumes:
      - nextcloud_data:/var/www/html




