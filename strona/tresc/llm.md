Ostatnimi czasy AI stało się bardzo popularne, więc dlaczego nie spróbować uruchomić własnego chata na swoim komputerze?

## Large Language Model (LLM) czyli własny model AI.

Ostatnio całkiem sporo czasu czasu używam AI i zastanawiałem się czy nie spróbować pobrać i uruchomić własny lokalny LLM. Więc pobrałem i używałem przez kilka dni. LLMy testowałem na konfiguracji:

|  System  |    Procesor   |    Grafika   |    RAM     |
| -------- |    --------   |   ---------  |  --------  |
|  Fedora  |  Ryzen 7 5700 |Radeon RX 6600 |    32GB    |


### Wybór platformy AI & Machine Learning.
Aby uruchomić własny model potrzebujemy aplikacji która pozowli przeprowadzić konwersację z modelem (czyli w skrócie okienka do rozmowy z chatbotem).Jeżeli chodzi o platformę mamy do wyboru całekiem sporo opcji:

| Program | Interfejs Użytkownika |
| :--- | :--- |
| LM Studio | GUI - Okienka |
| Ollama | CLI - Terminal |

Ja wybrałem LM Studio i pobrałem plik z oficjalnej strony *[LM STUDIO (LINK)](https://lmstudio.ai)*

### Jak Pobrać LM Studio?

1. **Odwiedź oficjalną stronę projektu**:
   - [LM Studio](https://example.com/lm-studio)

2. **Znajdź sekcję "Pobierz" lub "Download"**:
   - Na stronie głównej lub w menu nawigacyjnym znajdziesz przycisk lub zakładkę do pobierania.

3. **Wybierz odpowiedni plik do pobrania**:
   - Wybierz najnowszą wersję dla swojej operacyjnej systemu (Windows, macOS, Linux).

4. **Pobierz plik**:
   - Kliknij na przycisk "Pobierz" lub "Download". Poczekaj na zakończenie pobierania.

5. **Zainstaluj program**:
   - Po pobraniu odkryj plik doinstalowawczy (np. *.zip, *.exe) i postępuj zgodnie z instrukcjami instalacyjnymi.

6. **Sprawdź poprawność instalacji**:
   - Uruchom program LM Studio, aby upewnić się, że został poprawnie zainstalowany.



## Konfiguracja LM Studio i Modelu LLM
### Instalacja modelu.
<img src="https://raw.githubusercontent.com/123aaaaaaa12/netivly-photos/main/lmstudio.png" 
     alt="LM Studio Screenshot" 
     style="max-width: 100%; height: auto;">


Po uruchomieniu LM studio powinnieneś zobaczyć oto właśnie tą aplikację.
* **Na pasku po lewej** są cztery przyciski.
1. Chaty
2. Developer
3. Moje Modele 
4. Wyszukiwarka Modeli (tutaj je pobierasz)

> **Netivly Insight:** LM Studio waży około 1GB ale rozmiary modeli mogą sięgać od 1 do 40 GB w zależności od funkcji jakie pełnią. Dla przykładu: Model który ma nazwie 7B ma około 7 miliardów parametrów im więcej parametrów tym bardziej szczegółowy i precyzyjny jest ale wpływa to na rozmiar pliku.

* **Ja wybrałem modele:**
* Qwen2.5 Coder 7B Instruct 
* Deepseek Coder 1.3B Instruct

> **Netivly Insight:** Jeśli chcesz używać modelu do analizy zdjęc wybierz modele "vision"

# Modele AI dla różnych zastosowań

Jeśli już pobrałeś własny model tworzysz nowy chat i klikasz Ctrl + l i wybierasz model który załaduje się do pamięci RAM. Teraz już możesz używać własnego AI. Mi spodobały się modele Qwen dlatego pokaże na ich przykładzie:

### **Qwen2-VL** (Modele "z oczami")
- **Typ:** Vision-Language Models
- **Opis:** Przydatne do analizowania zdjęć, zrzutów ekranu czy projektów stron.
- **Zastosowanie:**
  - Analiza błędów z Cloudflare
  - Zamiana rysunków na kod HTML

* **Wersje:**

- **2B**: Bardzo szybki, idealny na start.
- **7B**: Dobry do szczegółowych analiz, znacznie mądrzejszy niż wersja 2B.

### **Qwen2.5-Coder** (Programista)
- **Wersje:**
  - **1.5B / 3B**: Dobre do prostych poprawek, błyskawiczne (niskie zużycie RAM).
  - **7B**: Złoty środek.
  - **32B**: Dotrainingowany na bardziej skomplikowanych JavaScriptach, zajmie około 20-24 GB RAM.

### **Qwen2-Math** (Specjalista od matematyki)
- **Opis:** Dotrenowany na zadaniach logiczno-matematycznych.
- **Zastosowanie:**
  - Budowa kalkulatorów
  - Zaawansowane skrypty finansowe
  - Logika oparta na liczbach

### **Qwen2.5** (Generalista)
- **Opis:** Wersja "do wszystkiego" – pisania artykułów, wymyślania nazw projektów czy tłumaczenia tekstów.
- **Zalety:**
  - Dobre radzenie sobie z naturalnym językiem
  - Kreatywny writing 
  - Bogatsze słownictwo
- **Wady:**
  - Gorzej w pisaniu kodu

## Podsumowanie.

Nie potrzebujesz superkomputera, by zacząć przygodę z LLM do prostrzych modeli wystarczy nawet przeciętny komputer. Wykorzystanie otwartej architektury, takiej jak rodzina modeli Qwen, w połączeniu z narzędziami typu LM Studio czy Ollama, pozwala na budowanie ciekawych rzeczy lub aplikacji przy zachowaniu pełnej prywatności i zerowych kosztach subskrypcji.

### Masz Pytania ? Zapraszamy na forum!
*[Forum (LINK)](forum.html)*      
:P
