# SSH dla początkujących: Bezpieczne połączenia krok po kroku

Masz serwer, NAS-a, Raspberry Pi albo zdalny VPS? W pewnym momencie pojawia się pytanie: jak się do tego podłączyć nie będąc przy klawiaturze? Odpowiedź brzmi: **SSH**.

SSH (Secure Shell) to protokół który pozwala zdalnie sterować dowolnym komputerem z systemem Linux przez szyfrowane połączenie. Zamiast siedzieć fizycznie przy serwerze — wpisujesz jedną komendę na swoim laptopie i masz pełny dostęp do terminala z drugiego końca domu, miasta albo świata.

Jeśli czytałeś nasz artykuł o podstawach terminala — SSH to naturalny kolejny krok. Jeśli nie czytałeś, nie martw się — wszystko wyjaśniamy od zera.

---

## Jak działa SSH?

Nie musisz znać matematyki żeby to zrozumieć. SSH działa na zasadzie **szyfrowania asymetrycznego** — masz dwa klucze: publiczny i prywatny. Klucz publiczny możesz rozdawać wszystkim, klucz prywatny zostaje tylko u Ciebie.

Gdy łączysz się z serwerem, oba komputery "uzgadniają" szyfrowanie bez wysyłania haseł przez sieć. Ktoś kto podsłuchuje Twoje połączenie widzi tylko zaszyfrowany szum — nic więcej.

> **Netivly Insight:** SSH jest aktywnie rozwijany od 1995 roku i do dziś jest standardem w administracji serwerami na całym świecie. Jeśli kiedykolwiek będziesz zarządzać własnym serwerem — będziesz używać SSH codziennie.

---

## Instalacja i pierwsze połączenie

### Linux i macOS — gotowe od razu

Na Linuksie i macOS SSH jest zainstalowany domyślnie. Otwierasz terminal i łączysz się jedną komendą:

```bash
ssh użytkownik@adres_serwera
```

Przykład dla domowego NAS-a:

```bash
ssh dawid@192.168.1.100
```

Przy pierwszym połączeniu SSH zapyta czy ufasz temu serwerowi — wpisujesz `yes`. Następnie podajesz hasło i jesteś w środku.

### Windows — dwie opcje

**Opcja 1: OpenSSH (wbudowany w Windows 10/11)** — najprostsza, otwierasz PowerShell lub CMD i wpisujesz dokładnie tę samą komendę co na Linuksie:

```powershell
ssh użytkownik@adres_serwera
```

**Opcja 2: PuTTY** — starsze, ale wciąż popularne narzędzie z graficznym interfejsem. Przydatne jeśli wolisz klikać zamiast pisać. Pobierasz z [putty.org](https://putty.org), wpisujesz adres serwera i klikasz "Open".

> **Netivly Insight:** Jeśli masz Windows 10 lub 11 — zapomnij o PuTTY. Wbudowany OpenSSH działa identycznie jak na Linuksie i nie wymaga instalacji niczego dodatkowego.

---

## Klucze SSH — koniec z hasłami

Wpisywanie hasła przy każdym połączeniu jest nie tylko uciążliwe — jest też mniej bezpieczne. Hasła można podsłuchać, zgadnąć lub wyłudzić. Klucze SSH są odporne na wszystkie te ataki.

### Generowanie pary kluczy

Na swoim komputerze (nie na serwerze!) wpisujesz:

```bash
ssh-keygen -t ed25519 -C "twój_komentarz"
```

Terminal zapyta o lokalizację pliku (wciśnij Enter żeby zachować domyślną) i opcjonalne hasło do klucza. Klucz zostaje zapisany w `~/.ssh/`.

### Kopiowanie klucza na serwer

```bash
ssh-copy-id użytkownik@adres_serwera
```

To wszystko. Od tej chwili SSH będzie używać klucza zamiast hasła. Na Windows bez `ssh-copy-id` możesz to zrobić ręcznie:

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh użytkownik@adres_serwera "cat >> ~/.ssh/authorized_keys"
```

### Dlaczego klucze są lepsze od haseł?

Klucz prywatny nigdy nie opuszcza Twojego komputera — serwer dostaje tylko klucz publiczny. Nawet jeśli ktoś przechwyci całą komunikację, nie jest w stanie odtworzyć klucza prywatnego. Ataki brute-force na hasła stają się bezużyteczne.

---

## Plik config — SSH na skróty

Zamiast za każdym razem wpisywać pełny adres, użytkownika i port — możesz stworzyć skróty dla swoich serwerów.

Tworzysz plik `~/.ssh/config` (na Windows: `C:\Users\TwojaNazwa\.ssh\config`):

```
Host nas
    HostName 192.168.1.100
    User dawid
    Port 22
    IdentityFile ~/.ssh/id_ed25519

Host vps
    HostName 123.45.67.89
    User root
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
```

Od tej chwili zamiast `ssh dawid@192.168.1.100` wpisujesz po prostu:

```bash
ssh nas
```

> **Netivly Insight:** Plik config to jedna z tych rzeczy które odkrywasz po miesiącu używania SSH i zastanawiasz się jak mogłeś bez tego żyć. Szczególnie przydatny gdy zarządzasz kilkoma serwerami jednocześnie.

---

## Kilka przydatnych sztuczek

### Kopiowanie plików przez SCP

SSH to nie tylko terminal — możesz przez niego przesyłać pliki komendą `scp`:

```bash
# Skopiuj plik na serwer
scp plik.txt dawid@192.168.1.100:/home/dawid/

# Skopiuj plik z serwera na swój komputer
scp dawid@192.168.1.100:/home/dawid/plik.txt ./

# Skopiuj cały folder
scp -r folder/ dawid@192.168.1.100:/home/dawid/
```

### Tunelowanie portów

Masz usługę na serwerze która nasłuchuje lokalnie (np. panel webowy na porcie 8080) i chcesz do niej dostać się z laptopa? SSH może stworzyć tunel:

```bash
ssh -L 8080:localhost:8080 dawid@192.168.1.100
```

Teraz otwierasz w przeglądarce `http://localhost:8080` na swoim laptopie i widzisz panel z serwera — jakbyś był bezpośrednio przy maszynie.

### SSH agent — hasło do klucza raz na sesję

Jeśli zabezpieczyłeś klucz prywatny hasłem (co jest dobrą praktyką), SSH będzie prosić o nie przy każdym połączeniu. SSH agent zapamiętuje odblokowany klucz na czas sesji:

```bash
# Uruchom agenta
eval $(ssh-agent)

# Dodaj klucz (wpisujesz hasło raz)
ssh-add ~/.ssh/id_ed25519

# Od tej chwili SSH nie pyta o hasło do końca sesji
```

---

## Hardening — podstawowe zabezpieczenie serwera SSH

Domyślna konfiguracja SSH jest funkcjonalna, ale nie optymalna pod kątem bezpieczeństwa. Kilka zmian które warto wprowadzić od razu.

Plik konfiguracyjny SSH na serwerze to `/etc/ssh/sshd_config`. Edytujesz go jako root:

```bash
sudo nano /etc/ssh/sshd_config
```

### Zmień domyślny port

Boty które skanują internet atakują domyślnie port 22. Zmiana portu nie jest zabezpieczeniem samym w sobie, ale drastycznie redukuje liczbę prób włamania w logach:

```
Port 2222
```

### Wyłącz logowanie hasłem

Gdy masz już klucze SSH — logowanie hasłem jest zbędne i niebezpieczne:

```
PasswordAuthentication no
PermitRootLogin no
```

### Zrestartuj SSH po zmianach

```bash
sudo systemctl restart sshd
```

> **Netivly Insight:** Zanim wyłączysz logowanie hasłem — upewnij się że klucz działa poprawnie i możesz się zalogować. Inaczej możesz odciąć się od własnego serwera. Zawsze testuj nowe połączenie w osobnym oknie terminala przed zamknięciem aktualnej sesji.

### Fail2ban — automatyczna blokada atakujących

Fail2ban monitoruje logi SSH i automatycznie blokuje adresy IP które zbyt często podają błędne hasło:

```bash
# Ubuntu/Debian
sudo apt install fail2ban

# Fedora
sudo dnf install fail2ban

# Uruchomienie
sudo systemctl enable --now fail2ban
```

Domyślna konfiguracja działa od razu — po 5 nieudanych próbach logowania adres IP jest blokowany na 10 minut.

---

## Podsumowanie

SSH to narzędzie które towarzyszy administratorom od trzech dekad — i nie bez powodu. Jest szybkie, bezpieczne i działa wszędzie.

Jeśli dopiero zaczynasz — zacznij od prostego połączenia hasłem, naucz się poruszać po zdalnym terminalu, a potem wróć tu i skonfiguruj klucze. To naturalny rytm nauki.

**Krótka ściągawka:**
- `ssh użytkownik@serwer` — podstawowe połączenie
- `ssh-keygen -t ed25519` — generowanie kluczy
- `ssh-copy-id użytkownik@serwer` — kopiowanie klucza
- `scp plik użytkownik@serwer:/ścieżka` — przesyłanie plików
- `~/.ssh/config` — skróty dla serwerów

~~SSH to dopiero początek. Gdy poczujesz się swobodnie z połączeniami zdalnymi, otwiera się przed Tobą świat automatyzacji — skrypty które same łączą się z serwerami, wykonują zadania i wracają z wynikami. Ale to temat na osobny artykuł.

---

### Masz pytania albo utknąłeś na którymś kroku?
Podziel się swoimi doświadczeniami w naszej społeczności!
👉 **[Dołącz do dyskusji na Forum Netivly](forum.html)**

---
