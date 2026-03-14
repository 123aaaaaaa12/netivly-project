
# Terminal dla opornych: 10 komend, które musisz znać

Jeśli używasz komputera z systemem Linux lub dopiero planujesz przesiadkę na system spod znaku pingwina, to podstawowa znajomość terminala jest kluczowa. Oczywiście, w dzisiejszych czasach da się wyklikać prawie wszystko myszką, ale uwierz mi – terminal to Twoja największa supermoc (a bez niego... no cóż, powodzenia :P).

Oto zestawienie absolutnych fundamentów, które pozwolą Ci swobodnie poruszać się po systemie.

## 10 Podstawowych komend

**1. Wyświetlanie zawartości folderu (w tym ukrytych plików)**
Pokazuje wszystkie pliki i foldery w bieżącym katalogu z dokładnymi szczegółami (uprawnienia, waga).
```bash
ls -la
```

**2. Tworzenie nowego katalogu**
Tworzy nowy folder o nazwie "my_folder" w miejscu, w którym aktualnie się znajdujesz.
```bash
mkdir my_folder
```

**3. Usuwanie plików i folderów**
Usuwa folder oraz całą jego zawartość bez pytania o zgodę.
> **Netivly Insight:** Używaj tej komendy z ogromną ostrożnością! Użycie `rm -rf` w złym miejscu (np. na głównym katalogu systemu `/`) może bezpowrotnie zniszczyć cały Twój system.
```bash
rm -rf /sciezka/do/folderu
```

**4. Kopiowanie plików**
Kopiuje plik "file.txt" do nowej, wskazanej lokalizacji.
```bash
cp /sciezka/do/plik.txt /sciezka/do/nowej_lokalizacji/
```

**5. Przenoszenie (lub zmiana nazwy) plików**
Przenosi plik do nowego folderu. Ta sama komenda służy również do zmiany nazwy plików!
```bash
mv /sciezka/do/plik.txt /sciezka/do/docelowy_folder/
```

**6. Czytanie zawartości pliku**
Błyskawicznie wyświetla całą zawartość pliku tekstowego bezpośrednio w terminalu.
```bash
cat /sciezka/do/plik.txt
```

**7. Wyszukiwanie tekstu (Grep)**
Przeszukuje plik i wyświetla tylko te linijki, w których znajduje się szukana przez Ciebie fraza ("search_term").
```bash
grep 'search_term' /sciezka/do/plik.txt
```

**8. Monitorowanie zasobów (Menedżer zadań)**
Wyświetla na żywo obecny stan systemu, w tym zużycie procesora (CPU), pamięci RAM oraz listę działających procesów.
```bash
top
```

**9. Sprawdzanie miejsca na dysku**
Pokazuje wszystkie zamontowane dyski i partycje oraz ilość wolnego miejsca w czytelnym formacie (MB/GB).
```bash
df -h
```

**10. Sprawdzanie połączenia z internetem**
Wysyła pakiety do serwera (np. Google), aby sprawdzić, czy masz dostęp do sieci i jak duże są opóźnienia (ping). Aby zatrzymać, wciśnij `Ctrl+C`.
```bash
ping google.com
```

---

## Bonus: Zarządzanie pakietami (Aktualizacje i Instalacja)

Aby wykonać operacje na systemie, często będziesz musiał poprzedzić komendę słowem `sudo` (uprawnienia administratora). Oto jak instalować programy i aktualizować system w najpopularniejszych dystrybucjach:

### 📦 Debian, Ubuntu, Mint (APT)

*   **Aktualizacja listy pakietów:** `sudo apt update`
*   **Instalacja aktualizacji:** `sudo apt upgrade`
*   **Instalacja nowego programu:** `sudo apt install nazwa_pakietu`
*   **Usuwanie programu:** `sudo apt remove nazwa_pakietu`
*   **Czyszczenie śmieci (nieużywanych zależności):** `sudo apt autoremove`

### 📦 Fedora (DNF)

*   **Sprawdzenie dostępnych aktualizacji:** `sudo dnf check-update`
*   **Aktualizacja całego systemu:** `sudo dnf upgrade`
*   **Instalacja nowego programu:** `sudo dnf install nazwa_pakietu`
*   **Usuwanie programu z jego resztkami:** `sudo dnf autoremove nazwa_pakietu`
*   **Czyszczenie bufora (cache):** `sudo dnf clean all`

### 📦 Arch Linux, Manjaro (Pacman)

*   **Pełna aktualizacja systemu:** `sudo pacman -Syu`
*   **Instalacja nowego programu:** `sudo pacman -S nazwa_pakietu`
*   **Usuwanie programu (wraz z nieużywanymi zależnościami):** `sudo pacman -Rns nazwa_pakietu`
*   **Czyszczenie pamięci podręcznej pobranych pakietów:** `sudo pacman -Sc`

### 📦 openSUSE (Zypper)

*   **Aktualizacja repozytoriów:** `sudo zypper refresh`
*   **Aktualizacja systemu:** `sudo zypper update`
*   **Instalacja nowego programu:** `sudo zypper install nazwa_pakietu`
*   **Usuwanie programu:** `sudo zypper remove nazwa_pakietu`

---

## Podsumowanie

Powyższa lista to nawet nie jest wierzchołek góry lodowej możliwości Linuxa. Żeby Cię jednak nie zmartwić – większość trudniejszych komend na co dzień nie będzie Ci w ogóle potrzebna. A jeśli nagle będziesz potrzebował specyficznego skryptu?

👉 **[Zapytaj własnego LLM-a (Zbuduj prywatne AI z naszego poradnika)](https://netivly.pl/artykul?id=llm)**  
👉 **[Dołącz do dyskusji na Forum Netivly i zapytaj o co tylko chcesz!](forum.html)**
```