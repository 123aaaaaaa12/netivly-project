Kiedy instalujesz Linuxa, system pyta Cię o coś, o czym Windows nigdy nie wspomina: **jaki system plików chcesz na swoim dysku?** Dla większości początkujących to moment konsternacji — klikają "dalej" i zapominają o temacie.

Ale jeśli budujesz domowy serwer NAS, planujesz przechowywać ważne dane lub po prostu chcesz wiedzieć, co tak naprawdę dzieje się z Twoimi plikami — wybór między **Btrfs** a **ZFS** ma znaczenie.

Oba systemy oferują funkcje, o których ext4 może tylko pomarzyć: snapshoty, integralność danych, wbudowany RAID. Różnią się jednak filozofią, wymaganiami sprzętowymi i tym, jak bardzo dadzą Ci w kość podczas konfiguracji.

Ja na co dzień używam **Btrfs** — jest domyślny na Fedorze i przez ostatni rok nie zawiódł mnie ani razu. Ale czy to oznacza, że ZFS jest gorszy? Niekoniecznie. Czas to sprawdzić.

---

## Skąd się wzięły i czym są?

### Btrfs — dziecko Linuxa

Btrfs (czytaj: "Butter FS" lub "B-tree FS") powstał w 2007 roku w laboratoriach Oracle. Od początku był projektowany z myślą o jądrze Linux — jest jego integralną częścią, co oznacza że nie musisz instalować żadnych dodatkowych sterowników. Fedora używa go domyślnie od wersji 33, openSUSE jeszcze wcześniej.

### ZFS — legenda z Sun Microsystems

ZFS narodził się w 2005 roku w firmie Sun Microsystems jako odpowiedź na potrzeby korporacyjnych centrów danych. Przez lata zdobył opinię **najbardziej niezawodnego systemu plików na świecie** — do dziś jest sercem systemów takich jak TrueNAS. Na Linuksie działa przez projekt OpenZFS, ale ze względu na różnice licencyjne nie może być wbudowany w jądro — instalujesz go osobno.

> **Netivly Insight:** Właśnie dlatego TrueNAS Scale (które polecaliśmy w artykule o budowie NAS-a) używa ZFS — to system zaprojektowany do ochrony danych za wszelką cenę, nawet kosztem złożoności konfiguracji.

---

## Runda 1: Wydajność 🏎️

To temat, przy którym ZFS zbiera najwięcej ciosów — i nie bez powodu.

### RAM — największa różnica

ZFS jest zaprojektowany tak, żeby używać jak najwięcej dostępnej pamięci RAM jako cache (mechanizm nazywa się ARC — Adaptive Replacement Cache). Na serwerach korporacyjnych z 128 GB RAM to zaleta. Na domowym komputerze z 8 GB — potrafi być problemem.

Btrfs nie ma własnego cache'u RAM — korzysta ze standardowego mechanizmu jądra Linux, co oznacza że nie "zjada" pamięci na własne potrzeby.

> **Netivly Insight:** Jeśli planujesz postawić ZFS na maszynie z mniej niż 16 GB RAM, ustaw ręcznie limit ARC w konfiguracji. Inaczej system będzie odczuwalnie wolniejszy przy innych zadaniach.

### Codzienna praca z plikami

| Operacja | Btrfs | ZFS |
| :--- | :--- | :--- |
| **Zapis sekwencyjny** | Bardzo dobry | Bardzo dobry |
| **Zapis losowy** | Dobry | Dobry |
| **Zużycie RAM** | Niskie | Wysokie (ARC) |
| **Obciążenie CPU** | Niskie | Średnie |
| **Kompresja danych** | Tak (zstd, lzo) | Tak (lz4, zstd) |

W praktyce przy domowym NAS-ie różnice w surowej wydajności są niezauważalne — oba systemy obsłużą streaming filmów 4K, backupy i udostępnianie plików bez mrugnięcia okiem. Wydajność zaczyna mieć znaczenie dopiero przy dziesiątkach dysków i setkach jednoczesnych użytkowników — czyli nie w Twoim domu.

**Zwycięzca rundy:** Btrfs — głównie za mniejsze zużycie RAM na typowym domowym sprzęcie.

---

## Runda 2: Snapshoty 📸

To jest moment, w którym oba systemy zostawiają ext4 daleko w tyle. Snapshot to błyskawiczna "fotografia" stanu Twojego systemu plików w danej chwili — i możliwość powrotu do niej w każdej chwili.

Skasowałeś ważny folder? Aktualizacja zepsuła system? Przywracasz snapshot i problem znika w kilka sekund.

### Jak działają snapshoty w Btrfs?

Btrfs używa mechanizmu **CoW (Copy-on-Write)** — zamiast nadpisywać dane, przy każdej zmianie tworzy nową wersję bloku danych, zachowując starą. Snapshot to po prostu wskaźnik do poprzedniego stanu — zajmuje niemal zero miejsca dopóki dane się nie zmieniają.

```bash
# Tworzenie snapshotu
sudo btrfs subvolume snapshot /home /home_snapshot_2026

# Lista snapshotów
sudo btrfs subvolume list /

# Przywracanie (podmiana aktualnego folderu na snapshot)
sudo mv /home /home_stary
sudo btrfs subvolume snapshot /home_snapshot_2026 /home
```

### Jak działają snapshoty w ZFS?

ZFS również używa CoW, ale jego snapshoty są jeszcze bardziej rozbudowane — możesz je wysyłać na zdalny serwer (`zfs send`), klonować i przeglądać jak zwykłe foldery.

```bash
# Tworzenie snapshotu
sudo zfs snapshot pool/dane@2026-03-20

# Lista snapshotów
sudo zfs list -t snapshot

# Przywracanie
sudo zfs rollback pool/dane@2026-03-20
```

### Automatyczne snapshoty

Oba systemy można zautomatyzować — Btrfs za pomocą narzędzia `snapper`, ZFS za pomocą `zfs-auto-snapshot`. Snapper jest szczególnie dobrze zintegrowany z Fedorą i openSUSE — po instalacji praktycznie działa sam.

> **Netivly Insight:** Fedora domyślnie konfiguruje snapper przy instalacji na Btrfs. Oznacza to, że jeśli aktualizacja systemu coś zepsuje, możesz wrócić do poprzedniego stanu bez żadnego wcześniejszego przygotowania — to działa od pierwszego uruchomienia.

**Zwycięzca rundy:** Remis — oba systemy oferują snapshoty na światowym poziomie. Btrfs wygrywa łatwością użycia na Fedorze, ZFS — możliwościami replikacji zdalnej.

---

## Runda 3: Łatwość konfiguracji 🔧

To runda, w której różnica między oboma systemami jest najbardziej odczuwalna — szczególnie jeśli dopiero zaczynasz przygodę z serwerami.

### Btrfs — działa od razu

Jeśli instalujesz Fedorę, Btrfs jest już tam gdzie powinien być. Nie musisz nic robić — system plików jest skonfigurowany, snapshoty działają, kompresja jest włączona. Możesz zacząć korzystać z zaawansowanych funkcji od pierwszego dnia.

```bash
# Sprawdzenie czy używasz Btrfs
df -T /

# Informacje o wolumenie
sudo btrfs filesystem show

# Włączenie kompresji na istniejącym folderze
sudo btrfs filesystem defragment -r -czstd /home
```

### ZFS — wymaga przygotowania

Na Linuksie ZFS nie jest częścią jądra, więc instalacja wygląda inaczej w zależności od dystrybucji. Na Ubuntu:

```bash
sudo apt install zfsutils-linux
```

Na Fedorze jest trudniej — ze względu na konflikt licencyjny między ZFS (CDDL) a jądrem Linux (GPL), instalacja wymaga dodatkowych kroków przez projekt OpenZFS i moduły DKMS. Nie jest to niemożliwe, ale dla początkującego użytkownika może być pierwszą poważną przeszkodą.

> **Netivly Insight:** Jeśli zależy Ci na ZFS i nie chcesz się bawić w ręczną kompilację modułów — rozważ Ubuntu Server lub TrueNAS Scale jako bazę dla swojego NAS-a. Te systemy mają ZFS "w domu" i działają bez dodatkowej konfiguracji.

### Zarządzanie dyskami i RAID

Tutaj ZFS błyszczy — tworzenie puli dysków jest intuicyjne i odbywa się jedną komendą:

```bash
# Tworzenie prostego RAID-1 (mirror) w ZFS
sudo zpool create dane mirror /dev/sdb /dev/sdc
```

Btrfs również obsługuje RAID, ale jego implementacja RAID 5/6 jest oficjalnie oznaczona jako **eksperymentalna** i nie zaleca się jej do produkcyjnych zastosowań z ważnymi danymi.

| Funkcja | Btrfs | ZFS |
| :--- | :--- | :--- |
| **Instalacja na Fedorze** | Wbudowany | Wymaga dodatkowych kroków |
| **Instalacja na Ubuntu** | Dostępny | Bardzo łatwa |
| **RAID 1 (mirror)** | Stabilny | Stabilny |
| **RAID 5/6** | Eksperymentalny ⚠️ | Stabilny (RAIDZ) |
| **Zarządzanie pulą dysków** | Średnie | Bardzo intuicyjne |

**Zwycięzca rundy:** Btrfs na Fedorze — zero konfiguracji, działa od razu. ZFS wygrywa jeśli planujesz poważny serwer z wieloma dyskami i potrzebujesz stabilnego RAID 5/6.

---

## Runda 4: Stabilność 🏗️

To temat, przy którym przez lata Btrfs zbierał najwięcej krytyki. Czy słusznie? W 2026 roku odpowiedź jest bardziej złożona niż kiedyś.

### ZFS — battle-tested od dwóch dekad

ZFS ma za sobą ponad 20 lat produkcyjnych wdrożeń w bankach, centrach danych i korporacjach na całym świecie. To system, który był projektowany z jednym głównym założeniem: **Twoje dane nigdy nie mogą zginąć ani ulec cichemu uszkodzeniu.**

Kluczowy mechanizm to **checksumowanie każdego bloku danych** — ZFS przy każdym odczycie weryfikuje czy dane nie uległy uszkodzeniu (tzw. "bit rot"). Jeśli wykryje problem i masz RAID — automatycznie naprawia dane z kopii zapasowej, bez żadnej interwencji z Twojej strony.

### Btrfs — dojrzały, ale z gwiazdką

Btrfs przez długi czas miał reputację systemu "prawie gotowego". Pierwsze wersje faktycznie bywały problematyczne. W 2026 roku sytuacja wygląda jednak znacznie lepiej — rdzeń systemu, snapshoty i kompresja są stabilne i sprawdzone w milionach instalacji Fedory.

Checksumowanie danych również jest obecne w Btrfs — to ważna informacja, którą wiele starszych porównań pomija.

Gwiazdka pozostaje przy RAID 5/6 — tego w Btrfs nadal nie powinieneś używać do ważnych danych.

> **Netivly Insight:** "Stabilność" to nie tylko odporność na błędy — to też dojrzałość narzędzi do naprawy systemu. Jeśli ZFS ulegnie uszkodzeniu, masz do dyspozycji `zpool scrub` i rozbudowane narzędzia diagnostyczne rozwijane przez dwie dekady. Btrfs również posiada `btrfs scrub` i `btrfs check`, ale społeczność jest zgodna — narzędzia ZFS są bardziej dojrzałe.

### Kiedy stabilność ma krytyczne znaczenie?

Jeśli na swoim NAS-ie przechowujesz:
- jedyne kopie zdjęć rodzinnych
- dokumenty firmowe
- archiwa których nie możesz odtworzyć

— to ZFS daje Ci dodatkową warstwę spokoju, której Btrfs jeszcze w pełni nie dorównuje.

| Cecha | Btrfs | ZFS |
| :--- | :--- | :--- |
| **Lata produkcyjnych wdrożeń** | ~10 lat | ~20 lat |
| **Checksumowanie danych** | Tak | Tak |
| **Automatyczna naprawa danych** | Częściowa | Pełna (z RAID) |
| **Narzędzia diagnostyczne** | Dobre | Bardzo dojrzałe |
| **RAID 5/6** | Eksperymentalny ⚠️ | Stabilny |

**Zwycięzca rundy:** ZFS — dwie dekady wdrożeń produkcyjnych i bardziej dojrzałe narzędzia naprawcze robią różnicę gdy stawką są ważne dane.

---

## Kiedy wybrać Btrfs, a kiedy ZFS?

### Wybierz Btrfs jeśli:

- Używasz Fedory, openSUSE lub innej dystrybucji gdzie jest domyślny
- Budujesz prosty domowy NAS z jednym lub dwoma dyskami w RAID 1
- Zależy Ci na snapshotach systemu bez dodatkowej konfiguracji
- Masz mniej niż 16 GB RAM
- Dopiero zaczynasz przygodę z serwerami i nie chcesz walczyć z instalacją

### Wybierz ZFS jeśli:

- Budujesz dedykowany serwer NAS z trzema lub więcej dyskami
- Potrzebujesz stabilnego RAID 5/6 (RAIDZ) do ważnych danych
- Masz minimum 16 GB RAM i nie boisz się konfiguracji
- Używasz Ubuntu Server lub TrueNAS Scale jako bazy
- Przechowujesz dane których utrata byłaby nieodwracalna

> **Netivly Insight:** Nie musisz wybierać raz na zawsze. Wielu użytkowników zaczyna od Btrfs na laptopie czy pierwszym NAS-ie, a gdy system rośnie — migruje do ZFS na dedykowanym sprzęcie. To naturalna droga.

---

## Podsumowanie

Kilka lat temu to porównanie byłoby jednostronne — ZFS wygrywał w każdej kategorii, a Btrfs był "obiecującym projektem". W 2026 roku obraz jest znacznie bardziej wyrównany.

**Btrfs** to dojrzały, wygodny system który działa świetnie na codziennym komputerze i prostym NAS-ie. Używam go na Fedorze od ponad roku i jedyne co mogę powiedzieć — po prostu działa, nie przeszkadza i daje mi snapshoty kiedy ich potrzebuję.

**ZFS** to pancerz dla Twoich danych. Jeśli budujesz poważny serwer z wieloma dyskami i przechowujesz dane które muszą przetrwać każdy scenariusz — ZFS jest właściwym wyborem, nawet jeśli wymaga więcej pracy na starcie.

Krótko mówiąc: **Btrfs do życia, ZFS do archiwum.**

~~Oczywiście jak zawsze w IT — najlepsza konfiguracja to ta która działa dla Ciebie. Jeśli masz już Btrfs i jesteś z niego zadowolony, nie ma powodu żeby zmieniać. Jeśli budujesz nowy serwer od zera i zależy Ci na maksymalnej ochronie danych — daj ZFS szansę.

---

### Masz pytania lub używasz któregoś z tych systemów?
Podziel się swoimi doświadczeniami w naszej społeczności!
👉 **[Dołącz do dyskusji na Forum Netivly](forum.html)**

---
