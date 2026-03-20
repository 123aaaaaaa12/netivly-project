# Własna Chmura w Domu: Jak Zbudować Serwer NAS i Odzyskać Prywatność

Google Photos właśnie podniósł ceny. iCloud znowu wysyła powiadomienie o pełnym magazynie. OneDrive synchronizuje Twoje dokumenty na serwery w Irlandii, gdzie przegląda je kilka tysięcy algorytmów. Brzmi znajomo?

W 2026 roku przechowywanie danych w chmurze korporacyjnej to nie wygoda — to oddanie kontroli nad swoim cyfrowym życiem w zamian za miesięczną subskrypcję. Domowy serwer **NAS (Network Attached Storage)** to odpowiedź na ten problem. Twoje dane, Twój sprzęt, Twoje zasady.

Ten przewodnik przeprowadzi Cię przez cały proces — od wyboru sprzętu, przez instalację systemu, konfigurację RAID, aż po postawienie własnych usług które zastąpią Google Drive, Netflix i wiele innych. Projekt na jeden wieczór, który zmienia sposób w jaki korzystasz z technologii na lata.

---

## Dlaczego potrzebujesz NAS-a w swoim domu?

Większość z nas kojarzy serwery z głośnymi szafami w serwerowniach. Tymczasem nowoczesny domowy NAS to ciche urządzenie wielkości pudełka na buty, które rozwiązuje kilka poważnych problemów naraz.

### Problem 1: Abonamentowe pułapki

Policz ile płacisz miesięcznie za przechowywanie danych. Google One 2TB — 35 zł. iCloud 2TB — 37 zł. OneDrive 1TB w pakiecie Microsoft 365 — 37 zł. Razem ponad 100 zł miesięcznie, ponad 1200 zł rocznie — za przechowywanie własnych danych na cudzych serwerach.

Dobre dyski NAS 2x4TB to wydatek około 800-1000 zł jednorazowo. Zwrot inwestycji w mniej niż rok, a potem już tylko czysta oszczędność.

### Problem 2: Prywatność której nie ma

Regulaminy Google, Apple i Microsoft zawierają zapisy pozwalające im skanować Twoje pliki w celach "bezpieczeństwa" i "ulepszania usług". Twoje zdjęcia z wakacji, skany aktów notarialnych, prywatna korespondencja — wszystko to przechodzi przez algorytmy AI profilujące Cię jako konsumenta.

Na własnym NAS-ie jedyną osobą z dostępem do danych jesteś Ty.

### Problem 3: Brak kontroli

Konta w chmurze bywają blokowane bez ostrzeżenia. Firma może upaść, zmienić politykę, podnieść ceny albo po prostu zdecydować że Twoje dane naruszają regulamin. W 2023 roku Google zablokował dziesiątki tysięcy kont za zdjęcia uznane przez algorytm za nieodpowiednie — w większości były to zdjęcia dzieci w kąpieli, całkowicie niewinne.

NAS należy do Ciebie. Nikt go nie zablokuje.

> **Netivly Insight:** NAS to nie tylko dysk sieciowy. To pełnoprawny, cichy komputer który możesz wykorzystać do dziesiątek zadań — od streamingu filmów przez blokowanie reklam w całej sieci domowej aż po lokalne AI działające bez internetu.

---

## Sprzęt: Od czego zacząć budowę?

Masz trzy drogi. Każda ma sens w innych okolicznościach — wybór zależy od budżetu, miejsca i tego czego oczekujesz od serwera.

### Droga 1: Drugie życie starego komputera (Low Cost)

Jeśli masz w szafie stary komputer stacjonarny lub małą biurową maszynkę (Dell Optiplex, HP EliteDesk, Lenovo ThinkCentre) — masz już 70% serwera. Linux i systemy NAS-owe działają świetnie nawet na sprzęcie sprzed 10 lat.

Czego szukasz na Allegro lub OLX: procesory Intel Core i3/i5 generacji 6-8, minimum 8 GB RAM, obudowa z miejscem na kilka dysków 3.5".

- **Zaleta:** Najniższy koszt wejścia, często dosłownie za darmo
- **Wada:** Wyższy pobór prądu (40-80W) i większy rozmiar

### Droga 2: Nowoczesny Mini-PC (Najlepszy stosunek ceny do możliwości)

W 2026 roku hitem są procesory Intel z serii N — szczególnie **N100** i **N150**. Komputer wielkości dłoni zużywa tyle prądu co żarówka (6-10W w spoczynku), obsługuje multimediów w 4K, a kosztuje 400-700 zł.

Popularne modele: Beelink Mini S12 Pro, Trigkey G5, GMKtec NucBox. Do tego dokupujesz obudowę z dyskami lub kieszeń USB/SATA.

- **Zaleta:** Cisza, minimalne rachunki za prąd, nowoczesne złącza USB4/Thunderbolt
- **Wada:** Ograniczona liczba slotów na dyski wewnętrzne — zwykle 1-2

### Droga 3: Gotowy NAS od Synology lub QNAP

Synology i QNAP to firmy które robią NAS-y "z pudełka" — własny system operacyjny, aplikacje przez kliknięcie, gwarancja producenta. Brzmi idealnie. Ale jest pewien haczyk.

| Cecha | Synology/QNAP | DIY (własny sprzęt) |
| :--- | :--- | :--- |
| **Cena samego urządzenia** | 800-3000 zł | 0-700 zł |
| **Łatwość konfiguracji** | Bardzo łatwa | Średnia |
| **Możliwości rozbudowy** | Ograniczone | Nieograniczone |
| **Kontrola nad systemem** | Częściowa | Pełna |
| **Wsparcie producenta** | Tak | Społeczność |
| **Ryzyko vendor lock-in** | Wysokie | Brak |

Synology to świetny wybór jeśli chcesz mieć NAS który "po prostu działa" i nie interesuje Cię grzebanie w systemie. Jeśli jednak zależy Ci na pełnej kontroli, niższych kosztach i możliwości postawienia własnych usług — własny sprzęt wygrywa.

> **Netivly Insight:** Wybierając dyski, szukaj modeli dedykowanych do NAS — **WD Red Plus** lub **Seagate IronWolf**. Zwykłe dyski z laptopów nie są przystosowane do pracy 24/7 i mogą zawieść w najmniej oczekiwanym momencie. Różnica w cenie to zwykle 20-30 zł za dysk — warta każdej złotówki.

---

## Pobór prądu i realne koszty eksploatacji

To temat który większość poradników pomija — a jest kluczowy przy podejmowaniu decyzji o sprzęcie.

NAS działa 24 godziny na dobę, 365 dni w roku. Nawet małe różnice w poborze prądu przekładają się na realne pieniądze.

### Ile kosztuje prąd?

Przyjmijmy obecną cenę prądu w Polsce — około 0,80 zł za kWh.

| Sprzęt | Pobór prądu | Koszt miesięczny | Koszt roczny |
| :--- | :--- | :--- | :--- |
| **Mini-PC (N100)** | 8-12W | ~5-7 zł | ~65-85 zł |
| **Stary PC (i5 6gen)** | 45-65W | ~26-37 zł | ~315-445 zł |
| **Synology DS223** | 15-20W | ~9-12 zł | ~105-140 zł |
| **Raspberry Pi 5** | 5-8W | ~3-5 zł | ~35-60 zł |

Różnica między Mini-PC a starym PC to nawet 360 zł rocznie — wystarczy na dwa dobre dyski NAS. Przy planowaniu budżetu zawsze uwzględniaj koszt prądu, nie tylko koszt zakupu.

### Kiedy dyski śpią?

Nowoczesne systemy NAS potrafią usypiać dyski po okresie bezczynności — wtedy pobór spada do minimum. TrueNAS, Unraid i CasaOS obsługują tę funkcję. Realne koszty przy normalnym użytkowaniu domowym są zazwyczaj o 30-40% niższe niż podane powyżej wartości maksymalne.

---

## Oprogramowanie: Wybierz swój poziom trudności

System operacyjny to serce NAS-a. To on decyduje o tym jak wygodnie zarządzasz dyskami, jak łatwo instalujesz aplikacje i jak bardzo musisz rozumieć to co robisz.

### CasaOS — dla każdego

CasaOS to projekt który zmienił domowy self-hosting. Instalujesz go jedną komendą na dowolnym Linuksie, a po chwili masz panel webowy który wygląda jak interfejs smartfona. Aplikacje instalujesz kliknięciem — Jellyfin, Nextcloud, Pi-hole, Home Assistant, wszystko dostępne w sklepie z aplikacjami.

```bash
curl -fsSL https://get.casaos.io | sudo bash
```

To wszystko. Po kilku minutach wchodzisz na `http://adres-ip-serwera` i widzisz gotowy panel.

- **Dla kogo:** Początkujący, użytkownicy domowi, osoby które chcą efektów bez grzebania w konfiguracji
- **Największa zaleta:** Sklep z aplikacjami, piękny interfejs, zero wiedzy technicznej wymaganej
- **Największa wada:** Mniejsza kontrola nad szczegółami konfiguracji

### Unraid — dla domowych multimediów

Unraid to płatny system (jednorazowa licencja od około 200 zł) który przez lata wyznaczał standardy domowego NAS-a. Jego unikalna cecha to **brak wymogu identycznych dysków** — możesz mieszać stare i nowe dyski o różnych pojemnościach w jednej puli. Jeden dysk pełni rolę parzystości (zabezpieczenia), reszta to przestrzeń użytkowa.

- **Dla kogo:** Entuzjaści multimediów, osoby z kolekcją filmów i muzyki, Plex/Jellyfin użytkownicy
- **Największa zaleta:** Elastyczność dysków, świetny ekosystem wtyczek, aktywna społeczność
- **Największa wada:** Płatny, system plików mniej odporny na błędy niż ZFS

### TrueNAS Scale — dla poważnych danych

TrueNAS Scale to pancerz dla Twoich danych. Zbudowany na ZFS — systemie plików który sprawdza integralność każdego bloku danych przy każdym odczycie. Jeśli dysk zaczyna się psuć, TrueNAS to wykryje zanim stracisz cokolwiek.

- **Dla kogo:** Zaawansowani użytkownicy, osoby przechowujące dane krytyczne, małe firmy
- **Największa zaleta:** ZFS, snapshoty, replikacja, pełna kontrola
- **Największa wada:** Stroma krzywa uczenia, wymaga więcej RAM (minimum 8 GB, zalecane 16 GB)

| System | Poziom | Cena | Największa zaleta |
| :--- | :--- | :--- | :--- |
| **CasaOS** | Bardzo łatwy | Darmowy | Sklep z aplikacjami, zero konfiguracji |
| **Unraid** | Średni | ~200 zł | Mieszanie dysków różnych pojemności |
| **TrueNAS Scale** | Zaawansowany | Darmowy | ZFS, niezawodność korporacyjna |

> **Netivly Insight:** Jeśli dopiero zaczynasz — postaw CasaOS. Możesz go zainstalować na Ubuntu lub Debianie w 5 minut i od razu zobaczyć efekty. Gdy poczujesz się swobodnie, migracja do TrueNAS to naturalny kolejny krok.

---

## RAID krok po kroku: Jak zabezpieczyć dane przed awarią dysku

RAID to technologia która pozwala na połączenie kilku dysków w jeden wolumin — z redundancją. Gdy jeden dysk padnie, dane są bezpieczne na pozostałych.

### Podstawowe poziomy RAID

**RAID 0 — Tylko prędkość (bez zabezpieczenia)**

Dane są rozdzielane między dyski naprzemiennie — prędkość rośnie, ale awaria jednego dysku oznacza utratę wszystkiego. Do NAS-a domowego — nie używaj.

**RAID 1 — Kopia lustrzana (najprostsze zabezpieczenie)**

Każdy zapis trafia jednocześnie na dwa dyski. Awaria jednego — drugi ma wszystko. Tracisz połowę pojemności ale zyskujesz spokój ducha. Dwa dyski 4TB = 4TB przestrzeni użytkowej.

**RAID 5 — Wydajność i zabezpieczenie (minimum 3 dyski)**

Dane i informacje o parzystości są rozdzielane między wszystkie dyski. Możesz stracić jeden dysk bez utraty danych. Trzy dyski 4TB = 8TB przestrzeni użytkowej + zabezpieczenie przed awarią 1 dysku.

**RAID 6 — Podwójne zabezpieczenie (minimum 4 dyski)**

Jak RAID 5, ale możesz stracić dwa dyski jednocześnie. Do poważnych archiwów.

### Konfiguracja RAID 1 w TrueNAS Scale — krok po kroku

1. Wejdź w **Storage → Create Pool**
2. Nadaj nazwę puli (np. `dane`)
3. Wybierz **Mirror** jako typ vdev
4. Dodaj dwa dyski do vdev
5. Kliknij **Create**

```bash
# Sprawdzenie stanu puli z poziomu terminala
zpool status

# Uruchomienie scrub (weryfikacja integralności danych)
zpool scrub dane
```

> **Netivly Insight:** **RAID to nie backup.** Jeśli przypadkowo skasujesz folder, zostanie on skasowany z obu dysków jednocześnie. RAID chroni przed awarią sprzętu — nie przed błędem ludzkim. Do prawdziwego backupu potrzebujesz zasady 3-2-1 którą opisujemy poniżej.

### Zasada 3-2-1 — Jedyna strategia backupu która ma sens

- **3** kopie danych — oryginał + dwie kopie zapasowe
- **2** różne nośniki — np. NAS i zewnętrzny dysk USB
- **1** kopia poza domem — zaszyfrowany backup na taniej chmurze (Backblaze B2, ~2 zł/miesiąc za 10 GB) lub NAS u kogoś z rodziny

```bash
# Instalacja Rclone
sudo apt install rclone  # Ubuntu/Debian
sudo dnf install rclone  # Fedora

# Konfiguracja połączenia z Backblaze
rclone config

# Synchronizacja folderu z chmurą
rclone sync /mnt/dane backblaze:nazwa-bucketa
```

---

## Co postawić na NAS-ie? Usługi które zastąpią płatne subskrypcje

### Jellyfin — Twój własny Netflix

Jellyfin to darmowa, otwartoźródłowa alternatywa dla Plex i Netflix. Wrzucasz filmy i seriale na dysk NAS-a, Jellyfin automatycznie pobiera okładki, opisy i napisy, a potem strumieniujesz wszystko na dowolne urządzenie — telewizor, telefon, tablet, przeglądarkę. W przeciwieństwie do Plex — w 100% darmowy i bez wysyłania danych na zewnątrz.

```bash
docker run -d \
  --name jellyfin \
  -p 8096:8096 \
  -v /mnt/dane/filmy:/media \
  -v /mnt/dane/jellyfin/config:/config \
  --restart unless-stopped \
  jellyfin/jellyfin
```

### Nextcloud — Twój własny Google Drive

Nextcloud to kompletna chmura w jednym pakiecie — synchronizacja plików, galeria zdjęć, kalendarz, kontakty, notatki, edytor dokumentów online. Aplikacja na telefon automatycznie synchronizuje zdjęcia zaraz po ich zrobieniu — dokładnie jak Google Photos, tylko że trafiają na Twój dysk.

```bash
docker run -d \
  --name nextcloud \
  -p 8080:80 \
  -v /mnt/dane/nextcloud:/var/www/html \
  --restart unless-stopped \
  nextcloud
```

> **Netivly Insight:** Nextcloud ma ponad 200 oficjalnych aplikacji — od wideokonferencji (Nextcloud Talk) przez zarządzanie projektami (Deck) aż po własny serwis muzyczny. To nie jest zwykły dysk sieciowy — to pełna platforma produktywności.

### Vaultwarden — Twój własny menedżer haseł

Vaultwarden to lekka implementacja protokołu Bitwarden. Przechowujesz hasła na własnym serwerze, a korzystasz z oficjalnych aplikacji Bitwarden na wszystkich urządzeniach. Zero subskrypcji. Zero cudzych serwerów.

```bash
docker run -d \
  --name vaultwarden \
  -p 8081:80 \
  -v /mnt/dane/vaultwarden:/data \
  --restart unless-stopped \
  vaultwarden/server
```

### Pi-hole — Koniec z reklamami w całej sieci

Pi-hole działa jako DNS serwer dla całej sieci domowej — blokuje reklamy i trackery zanim dotrą do jakiegokolwiek urządzenia. Działa na telewizorze, telefonie, tablecie — wszędzie, bez instalowania żadnych rozszerzeń.

```bash
docker run -d \
  --name pihole \
  -p 53:53/tcp -p 53:53/udp \
  -p 8082:80 \
  -e TZ=Europe/Warsaw \
  -e WEBPASSWORD=twoje_haslo \
  -v /mnt/dane/pihole/etc:/etc/pihole \
  -v /mnt/dane/pihole/dnsmasq:/etc/dnsmasq.d \
  --restart unless-stopped \
  pihole/pihole
```

| Usługa | Zastępuje | Koszt subskrypcji |
| :--- | :--- | :--- |
| **Jellyfin** | Netflix + Plex | ~50 zł/mies. |
| **Nextcloud** | Google Drive + Photos | ~35 zł/mies. |
| **Vaultwarden** | 1Password / LastPass | ~15 zł/mies. |
| **Pi-hole** | AdGuard Premium | ~8 zł/mies. |
| **Immich** | Google Photos | ~35 zł/mies. |
| **Razem** | — | **~143 zł/mies.** |

Za darmo. Na własnym sprzęcie. Z pełną kontrolą nad danymi.

---

## Sieć i dostęp zdalny: Jak dostać się do NAS-a spoza domu

### Metoda 1: WireGuard VPN — najpewniejsze rozwiązanie

Stawiasz serwer VPN bezpośrednio na NAS-ie. Łączysz się z VPN i masz dostęp do wszystkich usług jakbyś był w domu. Szczegółowy poradnik znajdziesz w artykule o WireGuard na Netivly.

```bash
sudo apt install wireguard  # Ubuntu/Debian
sudo dnf install wireguard-tools  # Fedora
wg genkey | tee privatekey | wg pubkey > publickey
```

### Metoda 2: Tailscale — VPN bez konfiguracji routera

Tailscale eliminuje największy ból głowy — konfigurację przekierowania portów. Instalujesz agenta na NAS-ie i laptopie, logujesz się i gotowe. Plan darmowy obsługuje do 100 urządzeń.

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

### Metoda 3: Reverse proxy z domeną

Kupujesz domenę (~50 zł/rok), konfigurujesz **Nginx Proxy Manager** i dostajesz ładne adresy HTTPS do swoich usług: `jellyfin.twojadomena.pl`, `nextcloud.twojadomena.pl` i tak dalej.

> **Netivly Insight:** Jeśli dopiero zaczynasz z dostępem zdalnym — zacznij od Tailscale. Zero konfiguracji routera, działa za NAT-em, bezpieczny i darmowy. Własna domena i reverse proxy to naturalny kolejny krok.

### Stałe IP dla NAS-a — obowiązkowy krok

NAS musi mieć stałe IP w sieci lokalnej. W panelu routera (`192.168.1.1`) znajdź sekcję DHCP → Rezerwacje i przypisz stałe IP do MAC adresu NAS-a.

```bash
# Sprawdzenie MAC adresu
ip link show
```

---

## Podsumowanie

Własny serwer NAS to inwestycja która zwraca się szybko — finansowo i mentalnie. Przestajesz płacić za subskrypcje, odzyskujesz prywatność i zyskujesz kontrolę nad własnym cyfrowym życiem.

Jeśli miałbym polecić jedną ścieżkę na start:

1. **Sprzęt:** Mini-PC z procesorem N100 + 2x dyski WD Red Plus 4TB
2. **System:** CasaOS na Ubuntu Server
3. **Pierwsza usługa:** Nextcloud — od razu zastępuje Google Drive i Photos
4. **Dostęp zdalny:** Tailscale — działa w 10 minut bez grzebania w routerze
5. **Backup:** Rclone + Backblaze B2 — automatyczny, zaszyfrowany, tani

~~Pamiętaj: nie musisz robić wszystkiego naraz. NAS to projekt który rośnie razem z Tobą — zacznij od jednej usługi, naucz się jej, dodaj kolejną. Za rok będziesz mieć własną infrastrukturę której większość firm może pozazdrościć.

---

### Masz pytania albo utknąłeś na którymś kroku?
Podziel się swoimi doświadczeniami w naszej społeczności!
👉 **[Dołącz do dyskusji na Forum Netivly](forum.html)**

---
<br>
<small style="color: #64748b; font-size: 0.8rem; line-height: 1.4; display: block; text-align: center;">
  <strong>Nota prawna:</strong> Wszystkie nazwy, znaki towarowe oraz logotypy produktów, usług i firm wymienione w tym artykule są własnością ich odpowiednich twórców, firm lub fundacji. Zostały użyte wyłącznie w celach informacyjno-edukacyjnych. Netivly Project nie jest oficjalnie powiązany z żadnym z wymienionych podmiotów.
</small>