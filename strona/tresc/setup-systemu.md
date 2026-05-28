# Setup systemu pod gaming na Linuksie — konfiguracja krok po kroku

**Czas czytania:** ~18 min  
**Poziom:** Początkujący / Średniozaawansowany  
**Kategoria:** Setup systemu

---

Masz zainstalowanego Linuksa i Steam — ale czy Twój system jest rzeczywiście zoptymalizowany pod gaming? Domyślna instalacja to dopiero punkt startowy. Ten artykuł przeprowadzi Cię przez kompletny setup: od sterowników, przez kernel, po narzędzia gamingowe, które robią realną różnicę.

---

## Zanim zaczniesz — co masz w komputerze?

Pierwsza rzecz to wiedzieć z czym pracujesz. Otwórz terminal i sprawdź:

```bash
# Informacje o CPU
lscpu | grep "Model name"

# Informacje o GPU
lspci | grep -i vga

# Ile RAM masz i czy jest poprawnie wykryty
free -h

# Jaki kernel masz zainstalowany
uname -r
```

Zapisz te informacje — będą przydatne gdy będziesz szukał pomocy lub sprawdzał kompatybilność sprzętu.

---

## Krok 1: Aktualizacja systemu

Zawsze zaczynaj od pełnej aktualizacji. Nowe wersje kernela, Mesa (sterowniki GPU open source) i bibliotek systemowych bezpośrednio wpływają na wydajność w grach.

```bash
# Fedora
sudo dnf update --refresh

# Ubuntu / Linux Mint
sudo apt update && sudo apt upgrade

# Po aktualizacji zrestartuj system
sudo reboot
```

Rób to regularnie — co tydzień lub dwa. Gaming na Linuksie poprawia się z każdą aktualizacją.

---

## Krok 2: Sterowniki GPU

To najważniejszy element całego setupu.

### AMD — sterowniki są wbudowane w kernel

Jeśli masz kartę AMD (RX 400, 500, 5000, 6000, 7000 series) — sterowniki AMDGPU są już w jądrze Linuksa. Wystarczy zadbać o aktualną wersję Mesa:

```bash
# Fedora
sudo dnf install mesa-dri-drivers mesa-vulkan-drivers

# Ubuntu (dodaj repo z nowszą Mesa)
sudo add-apt-repository ppa:kisak/kisak-mesa
sudo apt update && sudo apt upgrade
```

Sprawdź czy Vulkan działa:

```bash
# Zainstaluj vulkan-tools
sudo dnf install vulkan-tools   # Fedora
sudo apt install vulkan-tools   # Ubuntu

# Sprawdź
vulkaninfo --summary
```

### NVIDIA — sterowniki proprietary

NVIDIA wymaga zainstalowania zamkniętych sterowników. Otwarte sterowniki (nouveau) nie nadają się do gamingu.

**Fedora:**

```bash
# Dodaj repozytoria RPM Fusion (jeśli jeszcze nie masz)
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Zainstaluj sterowniki
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda

# Poczekaj aż moduł się skompiluje (ok. 5 minut) i uruchom ponownie
sudo reboot
```

**Ubuntu:**

```bash
sudo ubuntu-drivers autoinstall
sudo reboot
```

Po restarcie sprawdź czy sterownik działa:

```bash
nvidia-smi
```

Powinieneś zobaczyć tabelę z informacjami o karcie i wersją sterownika.

> ⚠️ Jeśli po restarcie nie widzisz środowiska graficznego — uruchom system w trybie recovery i wróć do poprzedniego sterownika. NVIDIA na Linuksie bywa kapryśna przy aktualizacjach kernela.

### Sprawdzenie czy GPU renderuje przez właściwy sterownik

```bash
glxinfo | grep "OpenGL renderer"
```

Powinieneś zobaczyć nazwę swojej karty graficznej, nie "llvmpipe" (to software renderer — źle).

---

## Krok 3: Włączenie 32-bitowych bibliotek

Wiele gier potrzebuje 32-bitowych wersji bibliotek graficznych. Bez nich gry mogą nie startować.

```bash
# Fedora
sudo dnf install mesa-dri-drivers.i686 mesa-vulkan-drivers.i686

# Ubuntu
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install libgl1:i386 libvulkan1:i386
```

---

## Krok 4: Instalacja i konfiguracja Steama

```bash
# Fedora
sudo dnf install steam

# Ubuntu
sudo apt install steam
# lub pobierz .deb ze store.steampowered.com
```

Po instalacji i zalogowaniu, wejdź w **Steam → Ustawienia → Zgodność** i włącz Steam Play dla wszystkich tytułów. Wybierz najnowszy stabilny Proton.

### Lokalizacja biblioteki Steam

Domyślnie Steam instaluje gry w `~/.steam/steam/steamapps/`. Jeśli masz osobny dysk (SSD) przeznaczony na gry, dodaj go jako drugą lokalizację:

**Steam → Ustawienia → Pobieranie → Foldery biblioteki Steam → Dodaj folder**

---

## Krok 5: Instalacja GameMode

GameMode to demon od Feral Interactive, który automatycznie optymalizuje system gdy uruchamiasz grę:

- Ustawia governor CPU na `performance` (zamiast `powersave` lub `schedutil`)
- Optymalizuje priorytety procesów
- Może wyłączać zbędne usługi w tle

```bash
# Fedora
sudo dnf install gamemode

# Ubuntu
sudo apt install gamemode

# Sprawdź czy działa
gamemoded -t
```

Żeby gra korzystała z GameMode, dodaj do opcji uruchamiania w Steam:

```
gamemoderun %command%
```

---

## Krok 6: Instalacja MangoHud

MangoHud to nakładka pokazująca wydajność w grach — FPS, użycie CPU i GPU, temperatury, VRAM. Niezbędne do sprawdzenia czy system działa jak powinien.

```bash
# Fedora
sudo dnf install mangohud

# Ubuntu
sudo apt install mangohud
```

Użycie w grach Steam — opcje uruchamiania:

```
mangohud %command%
```

Możesz też skonfigurować co jest wyświetlane, edytując plik:

```bash
mkdir -p ~/.config/MangoHud
nano ~/.config/MangoHud/MangoHud.conf
```

Przykładowa konfiguracja:

```ini
fps
cpu_temp
gpu_temp
ram
vram
frame_timing
position=top-left
font_size=20
```

---

## Krok 7: Konfiguracja schedulera I/O i swap

### Swap i zswap

Jeśli masz mało RAM (8 GB lub mniej), upewnij się że masz skonfigurowany swap. Sprawdź:

```bash
swapon --show
```

Jeśli jest pusto — dodaj swap file:

```bash
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Dodaj do /etc/fstab żeby przetrwał restart
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Zmniejsz "swappiness" — domyślnie Linux zbyt agresywnie używa swap, co zabija wydajność w grach:

```bash
# Sprawdź aktualne ustawienie (domyślnie 60)
cat /proc/sys/vm/swappiness

# Ustaw na 10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.d/99-gaming.conf
sudo sysctl --system
```

### Scheduler I/O dla SSD

```bash
# Sprawdź aktualny scheduler dla dysku (zamień sda na nazwę swojego dysku)
cat /sys/block/sda/queue/scheduler

# Dla SSD ustaw none lub mq-deadline
echo 'none' | sudo tee /sys/block/sda/queue/scheduler
```

---

## Krok 8: Limity plików otwartych (esync/fsync)

Proton używa esync i fsync do zarządzania synchronizacją wątków. Domyślny limit plików w Linuksie jest za niski i może powodować crashe gier.

Sprawdź aktualny limit:

```bash
ulimit -Hn
```

Jeśli wartość jest mniejsza niż 524288, zwiększ ją:

```bash
sudo nano /etc/security/limits.conf
```

Dodaj na końcu pliku:

```
*               hard    nofile          524288
*               soft    nofile          524288
```

Zrestartuj system i sprawdź ponownie:

```bash
ulimit -Hn
# Powinno pokazać 524288
```

---

## Krok 9: Instalacja Proton GE

Proton GE to nieoficjalna, ulepszona wersja Protona z dodatkowymi poprawkami. Najłatwiej zainstalować przez ProtonUp-Qt:

```bash
# Zainstaluj Flatpak (jeśli nie masz)
sudo dnf install flatpak   # Fedora
sudo apt install flatpak   # Ubuntu

# Dodaj Flathub
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

# Zainstaluj ProtonUp-Qt
flatpak install flathub net.davidotek.pupgui2
```

Uruchom ProtonUp-Qt, kliknij **"Add version"** → wybierz **Proton-GE** → zainstaluj najnowszą wersję. Zrestartuj Steam.

---

## Krok 10: Opcjonalne — Heroic Games Launcher

Masz gry na Epic Games Store lub GOG? Heroic Games Launcher to najlepszy sposób na uruchomienie ich na Linuksie.

```bash
# Zainstaluj przez Flatpak
flatpak install flathub com.heroicgameslauncher.hgl
```

Heroic obsługuje Proton i Wine, ma ładny interfejs i aktywny rozwój. Zdecydowanie lepszy niż próba uruchomienia oficjalnych launcherów Epic/GOG przez Proton.

---

## Krok 11: Środowisko graficzne — kilka wskazówek

### Wayland vs X11

Nowsze dystrybucje domyślnie używają **Wayland** jako serwera wyświetlania. Wayland jest nowocześniejszy, ale Steam i niektóre gry mają z nim problemy.

Jeśli masz problemy z grami lub Steam się dziwnie zachowuje, spróbuj wrócić do **X11 (Xorg)**. Na ekranie logowania, przed zalogowaniem, kliknij ikonkę koła zębatego i wybierz sesję Xorg.

### Compositor i animacje

Na X11 warto wyłączyć compositor podczas grania — zmniejsza input lag. W KDE Plasma: **Ustawienia → Efekty pulpitu → wyłącz** lub użyj skrótu `Alt+Shift+F12`.

---

## Podsumowanie — checklista setupu

Przejdź przez tę listę i zaznaczaj co masz zrobione:

- [ ] System zaktualizowany
- [ ] Sterowniki GPU zainstalowane i działające (`nvidia-smi` lub `glxinfo`)
- [ ] 32-bitowe biblioteki zainstalowane
- [ ] Steam zainstalowany, Steam Play włączony
- [ ] GameMode zainstalowany i używany (`gamemoderun %command%`)
- [ ] MangoHud zainstalowany
- [ ] Swappiness ustawione na 10
- [ ] Limit plików zwiększony do 524288
- [ ] Proton GE zainstalowany przez ProtonUp-Qt
- [ ] Heroic Games Launcher (jeśli masz Epic/GOG)

Jeśli wszystko z listy jest odhaczone — masz solidny, zoptymalizowany system gamingowy. Większość gier powinna działać bez żadnych dodatkowych zabiegów.

---

## Co dalej?

- 🔧 [Proton & Steam Play — jak konfigurować dla konkretnych gier?](#)
- 🔍 [Jak sprawdzić kompatybilność gry przed zakupem?](#)
- 🚀 [Jak zacząć z gamingiem na Linuksie?](#)
