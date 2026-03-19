W dobie pracy zdalnej i rosnących zagrożeń cyfrowych, posiadanie systemu operacyjnego w kieszeni to nie tylko gadżet, ale konieczność. Linux w trybie "Live" pozwala uruchomić pełnoprawne, bezpieczne środowisko pracy na niemal każdym komputerze, nie zostawiając na nim żadnych śladów.

## Dlaczego warto mieć Linux Live USB?

Dla zwykłego użytkownika jak i dla małej firmy to najtańsze i najprostrze narzędzie serwisowe.

### Kluczowe zastosowania:
*   **Bezpieczne finanse:** Logowanie do banku z systemu, który nie ma wirusów lub keyloggerów.
*   **Ratowanie danych:** Kiedy Windows się nie uruchamia, Linux da ci możliwość dostania się do dysku.
*   **Prywatność w podróży:** Masz możliwość bezpiecznego korzystania z przeglądarki na cudzym komputerze.

---

## Czego potrzebujesz?

Zanim zaczniesz, przygotuj:
1.  **Pendrive:** Minimum 8GB (najlepszy wybór to standard USB 3.0 dla szybkości).
2.  **Obraz ISO:** Wybraną dystrybucję Linuxa (np. Linux Mint lub Ubuntu).
3.  **Program do "wypalania":** Narzędzie, które przygotuje pendrive.

| Narzędzie | System | Zaleta |
| :--- | :--- | :--- |
| **BalenaEtcher** | Windows/macOS/Linux | Najprostszy interfejs, zero błędów. |
| **Rufus** | Windows | Bardzo szybki, duże możliwości konfiguracji. |
| **Ventoy** | Linux/Windows | Pozwala wrzucić wiele systemów na jeden pendrive. |

---

## Instrukcja krok po kroku

### Krok 1: Pobieranie systemu
Dla początkujących systemem wartym do polecenia będzie **Linux Mint (edycja Cinnamon)**. Jest stabilny i przypomina układem Windowsa.

### Krok 2: Przygotowanie nośnika
Otwórz program BalenaEtcher lub Rufus, wybierz z listy pobrany plik ISO, wskaż na pendrive i kliknij **Flash!**. 

> **Uwaga:** Ta operacja usunie wszystkie dane z Twojego pendrive'a. Upewnij się, że nie masz tam ważnych plików!

### Krok 3: Uruchamianie (Bootowanie)
Włóż pendrive do komputera, uruchom go ponowine i podczas uruchamiania naciskaj klawisz menu startowego (zazwyczaj **F12**, **F11** lub **Esc**). Wybierz swój pendrive z listy.

---

## Netivly Insight: Persystencja danych
Standardowy tryb Live kasuje wszystkie zmiany po restarcie. Jeśli chcesz instalować programy i zapisywać pliki bezpośrednio na pendrive, szukaj w programie Rufus opcji **"Persistent partition"**. Dzięki temu Twój kieszonkowy Linux stanie się prawdziwym komputerem w breloku.

```bash
# Sprawdzenie wydajności Twojego pendrive pod Linuxem
sudo hdparm -tT /dev/sda