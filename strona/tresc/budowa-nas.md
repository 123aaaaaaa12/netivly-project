Czy zastanawiałeś się kiedyś, co stanie się z Twoimi zdjęciami i dokumentami, gdy Google lub Microsoft nagle zablokują Twoje konto lub podniosą ceny abonamentu? Budowa własnego serwera **NAS (Network Attached Storage)** to krok w stronę pełnej suwerenności cyfrowej.

### Wybór bazy sprzętowej

Nie potrzebujesz najnowszego procesora i9. Dla domowego serwera kluczowe są dwa parametry: **ilość złącz SATA** oraz **niskie zużycie energii (TDP)**.

1.  **Poleasingowe komputery:** Dell Optiplex lub HP Elitedesk to świetny start (tanie i solidne).
2.  **Dedykowane płyty główne:** Rozwiązania z wbudowanym procesorem Intel Celeron (np. seria J) są niezwykle energooszczędne.

### System operacyjny: TrueNAS vs Unraid

Wybór systemu zależy od Twoich priorytetów:

*   **TrueNAS:** Korzysta z potężnego systemu plików **ZFS**. Gwarantuje najwyższy poziom ochrony przed utratą danych (tzw. bit-rot), ale wymaga identycznych dysków.
*   **Unraid:** Pozwala na mieszanie dysków o różnych pojemnościach i jest niezwykle przyjazny dla początkujących.

### Zasada Backup 3-2-1
Pamiętaj, że serwer NAS to nie backup – to po prostu magazyn danych. Zawsze stosuj zasadę:
**3** kopie danych, na **2** różnych nośnikach, z czego **1** kopia znajduje się fizycznie w innej lokalizacji.