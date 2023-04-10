# Automatizace v testování: Webdriver.io (v8)

## Prerequisity
- Java 11+
- Node.js verze 16+ (včetně chocolatey na Windows)

## Spuštění testů

### 1. Instalace balíků
Spusť tento příkaz v terminálu
```shell
npm install
```
### 2. Spuštění testů
Spusť tento příkaz v terminálu
```shell
npm run wdio
```
Pokud testy spouštíš úplně poprvé, může se objevit nějaké potvrzovací okno pro povolení webriveru kontrolz nad prohlížečem. Potvrď ho a povol. 


## Spouštění testovacích sad
Tento projekt je nakonfigurovaný tak, aby šlo spouště jednotlivá řešení z lekcí jako testovací sady. To se udělá příkazem:
```shell
npm run wdio -- --suite <suite_name>
```
například po spuštětní příkladů lekce 1:
```shell
npm run wdio -- --suite lesson_01
```
