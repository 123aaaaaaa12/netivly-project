# Proton i Steam Play — jak uruchamiać gry z Windowsa na Linuksie?

**Czas czytania:** ~16 min  
**Poziom:** Początkujący / Średniozaawansowany  
**Kategoria:** Proton & Steam Play

---

Masz Linuksa, masz Steama i widzisz setki gier w swojej bibliotece oznaczonych "Nie wspiera Linuksa". Brzmi jak problem? Wcale nie — dzięki Protonowi możesz uruchomić zdecydowaną większość z nich. Ten artykuł wyjaśni Ci czym jest Proton, jak działa, jak go skonfigurować i co zrobić gdy gra nie startuje od razu.

---

## Czym właściwie jest Proton?

**Proton** to warstwa kompatybilności stworzona przez Valve (twórców Steama) we współpracy z firmą CodeWeavers. Jest zbudowana na bazie projektu **Wine** — open-source'owego oprogramowania, które "tłumaczy" wywołania systemowe Windowsa na język Linuksa.

Ale Proton to nie jest samo Wine. To Wine plus cały zestaw usprawnień:

- **DXVK** — tłumaczy DirectX 9/10/11 na Vulkan, co daje lepszą wydajność w grach
- **VKD3D-Proton** — tłumaczy DirectX 12 na Vulkan (zoptymalizowana wersja stworzona przez Valve)
- **Steam Linux Runtime** — izolowane środowisko, które zapewnia że gra dostanie wszystkie potrzebne biblioteki niezależnie od dystrybucji
- **Media Foundation patches** — pozwala odtwarzać przerywniki filmowe (cutscenki) w grach
- **Szereg łatek i poprawek** specyficznych dla poszczególnych gier

Innymi słowy: Proton to kompletna platforma, która sprawia, że Windows-tylko gra myśli, że jest uruchamiana na Windowsie — choć w rzeczywistości działa na Linuksie.

---

## Steam Play — gdzie to wszystko się spotyka

**Steam Play** to nazwa funkcji w kliencie Steam, która integruje Proton z biblioteką gier. To dzięki niej możesz kliknąć "Graj" przy grze, która oficjalnie nie wspiera Linuksa, i Steam automatycznie użyje Protona żeby ją uruchomić.

### Jak włączyć Steam Play?

1. Otwórz **Steam**
2. Kliknij **Steam** (lewy górny róg) → **Ustawienia**
3. Wybierz zakładkę **Zgodność** (lub Compatibility)
4. Zaznacz opcję **"Włącz Steam Play dla wszystkich pozostałych tytułów"**
5. W polu poniżej wybierz wersję Protona
6. Kliknij **OK** i **zrestartuj Steam**

Po restarcie przy każdej grze zobaczysz możliwość uruchomienia jej przez Proton — nawet jeśli jest oznaczona jako "tylko Windows".

---

## Proton, Proton Experimental, Proton GE — co wybrać?

Gdy wchodzisz w ustawienia Steam Play, zobaczysz kilka wersji Protona. Oto co oznaczają:

### Proton [numer wersji, np. 9.0]
Stabilne, oficjalne wydania od Valve. Dobrze przetestowane, bezpieczny wybór. Nowe wersje pojawiają się regularnie i zazwyczaj poprawiają kompatybilność z konkretnymi grami.

**Używaj gdy:** Chcesz stabilności i nie chcesz eksperymentować.

### Proton Experimental
Wersja "bleeding edge" — najnowsze zmiany od Valve, jeszcze przed oficjalnym wydaniem. Często zawiera poprawki dla konkretnych nowych gier.

**Używaj gdy:** Gra nie działa na stabilnym Protonie, a na ProtonDB ktoś poleca Experimental.

### Proton GE (GloriousEggroll)
Tutaj robi się ciekawie. **Proton GE** to *nieoficjalna* wersja Protona tworzona przez społeczność — konkretnie przez użytkownika o pseudonimie GloriousEggroll. Zawiera dodatkowe patche i poprawki, których Valve jeszcze nie zdążyło włączyć do oficjalnego Protona. Często obsługuje więcej gier i działa lepiej z trudnymi tytułami.

Proton GE nie jest dostępny z poziomu ustawień Steama domyślnie — trzeba go zainstalować osobno. Najłatwiej zrobić to przez narzędzie **ProtonUp-Qt**.

**Używaj gdy:** Gra nie działa na oficjalnym Protonie lub chcesz lepszej kompatybilności z filmami i cutscenkami.

---

## Jak zainstalować Proton GE?

### Metoda 1: ProtonUp-Qt (polecana)

ProtonUp-Qt to graficzne narzędzie do zarządzania wersjami Protona.

```bash
# Na Fedorze (przez Flatpak — zalecane)
flatpak install flathub net.davidotek.pupgui2

# Uruchomienie
flatpak run net.davidotek.pupgui2
```

Po uruchomieniu kliknij **"Add version"**, wybierz **Proton-GE** i zainstaluj najnowszą wersję. Po chwili pojawi się ona w liście wersji Protona w ustawieniach Steam.

### Metoda 2: Ręcznie

```bash
# Utwórz katalog na niestandardowe wersje Protona
mkdir -p ~/.steam/root/compatibilitytools.d/

# Pobierz Proton GE ze strony GitHub (zamień X.X na aktualną wersję)
# https://github.com/GloriousEggroll/proton-ge-custom/releases
# Pobierz archiwum .tar.gz i rozpakuj do katalogu powyżej

tar -xzf GE-ProtonX-XX.tar.gz -C ~/.steam/root/compatibilitytools.d/
```

Zrestartuj Steam — nowa wersja pojawi się na liście.

---

## Jak ustawić Proton dla konkretnej gry?

Nie musisz zmieniać globalnej wersji Protona dla wszystkich gier. Możesz ustawić różną wersję dla każdej gry osobno — i to jest często lepsze rozwiązanie.

1. Znajdź grę w bibliotece Steam
2. Kliknij **prawym przyciskiem myszy** → **Właściwości**
3. Przejdź do zakładki **Zgodność** (Compatibility)
4. Zaznacz **"Wymuś użycie określonej warstwy kompatybilności Steam Play"**
5. Wybierz wersję Protona z listy

Dzięki temu gra A może używać Proton 9.0, gra B Proton GE, a gra C Proton Experimental — bez wzajemnych konfliktów.

---

## Parametry uruchomieniowe — zaawansowana konfiguracja

Wiele problemów z Protonem można rozwiązać dodając odpowiednie parametry uruchomieniowe. Ustawiasz je tak:

1. Kliknij prawym na grę → **Właściwości**
2. W zakładce **Ogólne** znajdź pole **"Opcje uruchamiania"**
3. Wpisz parametry

Oto najważniejsze z nich:

```
PROTON_USE_WINED3D=1 %command%
```
Używa starszego renderu WineD3D zamiast DXVK. Przydatne gdy gra crashuje z DXVK.

```
DXVK_ASYNC=1 %command%
```
Włącza asynchroniczną kompilację shaderów w DXVK — zmniejsza "stutter" (zacięcia) podczas ładowania shaderów po raz pierwszy.

```
PROTON_NO_ESYNC=1 %command%
```
Wyłącza esync — pomaga gdy gra crashuje przy starcie z powodu problemów z synchronizacją.

```
gamemoderun %command%
```
Uruchamia grę z GameMode — automatyczna optymalizacja systemu podczas grania.

```
mangohud %command%
```
Włącza nakładkę MangoHud (FPS counter, temperatury, itp.).

Można łączyć kilka parametrów naraz:

```
DXVK_ASYNC=1 gamemoderun mangohud %command%
```

---

## Prefiks Wine — co to jest?

Każda gra uruchamiana przez Proton dostaje własny **prefiks Wine** — izolowany folder, który symuluje strukturę dysku Windowsa (folder `C:\`, `Program Files`, itp.). Prefiksy domyślnie znajdują się w:

```
~/.steam/steam/steamapps/compatdata/[ID_GRY]/pfx/
```

To ważne z kilku powodów:
- Gry nie wpływają na siebie nawzajem — każda ma swój "Windows"
- Możesz ręcznie ingerować w prefiks (np. instalować dodatkowe biblioteki przez Winetricks)
- Gdy coś się posuje, możesz usunąć prefiks i zacząć od nowa

### Winetricks — instalowanie brakujących bibliotek

Czasem gra potrzebuje dodatkowej biblioteki Windows, której Proton nie dostarcza. Tu wchodzi **Winetricks**:

```bash
# Instalacja
sudo dnf install winetricks  # Fedora
sudo apt install winetricks  # Ubuntu

# Instalacja biblioteki (np. Visual C++ Redistributable) w prefiksie konkretnej gry
WINEPREFIX=~/.steam/steam/steamapps/compatdata/[ID_GRY]/pfx winetricks vcrun2019
```

---

## Najczęstsze problemy i ich rozwiązania

### Gra się nie uruchamia wcale

**Sprawdź:**
- Czy masz włączony Steam Play w ustawieniach?
- Czy sterowniki GPU są aktualne?
- Spróbuj innej wersji Protona (Experimental lub GE)
- Sprawdź logi: kliknij prawym → Właściwości → sekcja z logami

### Gra uruchamia się, ale zaraz crashuje

**Sprawdź:**
- Parametr `PROTON_NO_ESYNC=1 %command%` w opcjach uruchamiania
- Czy gra nie ma problemu z anti-cheat (to może być nie do obejścia)
- Wpis na ProtonDB — ktoś mógł już rozwiązać ten problem

### Brak dźwięku

```bash
# Sprawdź czy PipeWire / PulseAudio działa
systemctl --user status pipewire
systemctl --user status pulseaudio

# Dodaj parametr uruchomieniowy
PULSE_LATENCY_MSEC=60 %command%
```

### Gra działa, ale nie ma cutscynek (filmów)

To klasyczny problem. Rozwiązanie: zainstaluj **Proton GE** — ma patche dla Media Foundation i zazwyczaj rozwiązuje ten problem od razu.

### Myszka jest "zablokowana" w grze (problem z captured cursor)

```bash
# Parametr uruchomieniowy
PROTON_USE_WINED3D11=1 %command%
```

Albo spróbuj: `SDL_MOUSE_RELATIVE_SPEED_SCALE=0.5 %command%`

---

## Jak sprawdzić czy gra będzie działać? ProtonDB

Zanim kupisz grę albo zanim zaczniesz debugować, wejdź na **[protondb.com](https://www.protondb.com/)** i wyszukaj jej nazwę.

Zobaczysz ocenę kompatybilności:

| Ocena | Znaczenie |
|-------|-----------|
| **Platinum** | Działa natywnie i bez problemów |
| **Gold** | Działa z minimalnymi tweakami |
| **Silver** | Działa, ale z pewnymi problemami |
| **Bronze** | Uruchamia się, ale z dużymi problemami |
| **Borked** | Nie działa |

Poniżej oceny znajdziesz raporty od innych użytkowników — często z konkretymi parametrami i rozwiązaniami dla problemów. To kopalnia wiedzy.

---

## Podsumowanie

Proton sprawia, że gaming na Linuksie jest dziś naprawdę dostępny. Zapamiętaj najważniejsze punkty:

1. **Proton = Wine + DXVK + VKD3D + poprawki** — nie to samo co zwykłe Wine
2. **Włącz Steam Play** w ustawieniach → zakładka Zgodność
3. **Dla problematycznych gier** spróbuj Proton GE zainstalowanego przez ProtonUp-Qt
4. **Parametry uruchomieniowe** w Właściwościach gry mogą rozwiązać większość problemów
5. **ProtonDB** to Twoje pierwsze miejsce do sprawdzenia kompatybilności

Nie każda gra zadziała — ale zdecydowana większość tak. A lista kompatybilnych tytułów rośnie z każdą aktualizacją Protona.

---

## Co dalej?

- 🔍 [Jak czytać raporty ProtonDB i sprawdzać kompatybilność?](#)
- ⚙️ [Konfiguracja systemu pod gaming — kompletny setup](#)
- 🚀 [Jak zacząć z gamingiem na Linuksie?](#)