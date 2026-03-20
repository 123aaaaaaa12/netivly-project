# Własny ChatGPT na domowym komputerze. Jak uruchomić lokalne AI za darmo?

Ostatnimi czasy sztuczna inteligencja zdominowała rynek IT. Większość osób korzysta z rozwiązań chmurowych (takich jak ChatGPT czy Claude), oddając korporacjom swoje dane i kod. Dlaczego by więc nie spróbować uruchomić własnego, w pełni prywatnego modelu na własnym komputerze?

## Czym jest LLM (Large Language Model)?
LLM to w uproszczeniu "mózg" sztucznej inteligencji, który potrafi rozumieć tekst i generować odpowiedzi. Ostatnio spędzam sporo czasu na pracy z AI, więc postanowiłem sprawdzić, jak lokalne modele poradzą sobie w codziennych zadaniach. Pobrałem kilka z nich i intensywnie testowałem przez ostatnie dni.

Całość środowiska uruchomiłem i testowałem na następującej konfiguracji sprzętowej:

|  System  |    Procesor   |    Karta Graficzna   |    RAM     |
| :------- | :------------ | :------------------- | :--------- |
|  Fedora  |  Ryzen 7 5700 | Radeon RX 6600       |    32 GB   |

### Wybór platformy do obsługi AI
Aby wygodnie rozmawiać z modelem, potrzebujemy odpowiedniej aplikacji – "okienka" czatu, które załaduje pliki modelu do pamięci naszego komputera. Obecnie na rynku dominują dwa świetne rozwiązania:

| Program | Interfejs Użytkownika | Najlepsze dla... |
| :--- | :--- | :--- |
| **LM Studio** | GUI (Graficzne Okienka) | Początkujących i fanów wygodnego klikania |
| **Ollama** | CLI (Terminal / Konsola) | Administratorów i budowania automatyzacji |

Ja zdecydowałem się na **LM Studio**. To potężne, a zarazem banalnie proste narzędzie.

### Jak pobrać i uruchomić LM Studio?

1. **Pobierz aplikację:** Wejdź na oficjalną stronę projektu: [lmstudio.ai](https://lmstudio.ai/) i pobierz wersję odpowiednią dla Twojego systemu (Windows, macOS, Linux).
2. **Instalacja (Windows/Mac):** Wystarczy uruchomić pobrany plik instalacyjny i przeklikać standardowy kreator.
3. **Instalacja (Linux - Wskazówka):** Jeśli używasz Linuxa (tak jak ja Fedory), pobierzesz plik w formacie `.AppImage`. Pamiętaj, aby przed jego uruchomieniem nadać mu uprawnienia do wykonywania! Możesz to zrobić klikając na plik prawym przyciskiem myszy (Właściwości -> Uprawnienia) lub wpisując w terminalu: `chmod +x nazwa_pliku.AppImage`.

## Konfiguracja LM Studio i pobieranie modeli

<img src="https://raw.githubusercontent.com/123aaaaaaa12/netivly-photos/main/lmstudio.png" 
     alt="Interfejs LM Studio" 
     style="max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0;">

Po uruchomieniu LM Studio powita Cię nowoczesny, ciemny interfejs. Na lewym pasku nawigacyjnym znajdziesz cztery główne zakładki:
1. **Czat** – miejsce do rozmowy z AI.
2. **Local Server** – opcje deweloperskie (stawianie lokalnego API).
3. **Moje Modele** – zarządzanie pobranymi plikami (ikona folderu).
4. **Wyszukiwarka** – wbudowana przeglądarka modeli (ikona lupy).

> **Netivly Insight:** Samo LM Studio waży około 1 GB, ale rozmiary modeli (zazwyczaj w formacie `.gguf`) mogą wahać się od 1.5 GB do nawet 40 GB. Dla przykładu: model oznaczony jako **7B** posiada 7 miliardów parametrów. Im więcej parametrów, tym model jest bystrzejszy i precyzyjniejszy, ale wymaga więcej pamięci RAM i mocniejszej karty graficznej.

**Na start polecam przetestować te dwa modele:**
* `Qwen2.5-Coder-7B-Instruct` (Świetny wirtualny programista)
* `DeepSeek-Coder-1.3B-Instruct` (Wersja "kieszonkowa", działa nawet na słabych laptopach)

## Rodzina modeli Qwen – co wybrać?

Aby rozpocząć rozmowę, wystarczy wejść w zakładkę Czatu, kliknąć górny pasek (lub skrót `Ctrl + L`) i załadować pobrany model do pamięci RAM. 

Szczególnie do gustu przypadły mi modele z rodziny **Qwen** (stworzone przez Alibabę), które w testach często pokonują zachodnią konkurencję. Oto krótki przegląd ich wersji:

### 1. Qwen2-VL (Modele "z oczami")
- **Typ:** Vision-Language Models (VLM)
- **Opis:** Potrafią "widzieć". Przydatne do analizowania zrzutów ekranu, czytania błędów z konsoli lub zamiany narysowanych na kartce projektów na gotowy kod HTML.
- **Wersje:**
  - **2B**: Bardzo szybki, idealny na start i do prostych zdjęć.
  - **7B**: Znacznie mądrzejszy, świetny do szczegółowych analiz architektury.

### 2. Qwen2.5-Coder (Dla programistów)
- **Opis:** Model wytrenowany specjalnie pod kątem logiki programowania i pisania czystego kodu.
- **Wersje:**
  - **1.5B / 3B**: Błyskawiczne, zużywają znikomą ilość RAM-u. Dobre do prostych skryptów (np. Bash).
  - **7B**: Złoty środek. Świetnie radzi sobie z Pythonem, JS czy HTML. Zmieści się na domowym komputerze.
  - **32B**: Potwór do zaawansowanych projektów. Wymaga mocnego sprzętu (zajmie około 20-24 GB RAM).

### 3. Qwen2-Math (Specjalista od liczb)
- **Opis:** Dotrenowany na zaawansowanych zadaniach logiczno-matematycznych. Idealny do pisania kalkulatorów, skryptów finansowych i rozwiązywania zawiłych problemów z algorytmiką.

### 4. Qwen2.5 (Generalista)
- **Opis:** Wersja "do wszystkiego". Klasyczny asystent tekstowy.
- **Zalety:** Bardzo dobrze radzi sobie z językiem naturalnym (w tym polskim!), świetny do copywritingu, redagowania artykułów i wymyślania nazw projektów. Ma bogate słownictwo.
- **Wady:** Radzi sobie z programowaniem odczuwalnie gorzej niż dedykowana wersja *Coder*.

## Podsumowanie

Nie potrzebujesz farmy serwerów za miliony dolarów, by zacząć przygodę ze sztuczną inteligencją. Do prostszych modeli wystarczy nawet przeciętny, kilkuletni komputer. Wykorzystanie otwartej architektury w połączeniu z narzędziami takimi jak LM Studio pozwala na budowanie genialnych rzeczy przy **zachowaniu pełnej prywatności swoich danych i przy zerowych kosztach subskrypcji**. To esencja suwerenności IT.

---
### Masz Pytania lub problem z instalacją?
Podziel się swoimi wynikami testów w naszej społeczności!  
👉 **[Dołącz do dyskusji na Forum Netivly](forum.html)**

---
<br>
<small style="color: #64748b; font-size: 0.8rem; line-height: 1.4; display: block; text-align: center;">
  <strong>Nota prawna:</strong> Wszystkie nazwy, znaki towarowe oraz logotypy produktów, usług i firm wymienione w tym artykule są własnością ich odpowiednich twórców, firm lub fundacji. Zostały użyte wyłącznie w celach informacyjno-edukacyjnych. Netivly Project nie jest oficjalnie powiązany z żadnym z wymienionych podmiotów.
</small>