# `event_management_system`

## Event Management System
Projekt jest stworzony w React i TypeScript. Event Management System to platforma, na której użytkownicy mogą dodawać różne eventy (wydarzenia). Wydarzenie dodajemy za pomocą przycisku Create Event - dane z formularza wysyłane są do backendu. Nowe wydarzenie dodawane jest do strony gównej (Home) - tu można przeszukiwać eventy, dodawać do ulubionych (w trakcie pracy), wejść w specyfikacje eventu. Tu uzytkownik może kupić bilet na taki event. W backendzie tworzony jest bilet ze swoim unikalnym ID oraz przypisaniem do użytkownika. Przycisk BuyTicket przekierowuje nas do strony, na której można wybrać rodzaj płatności (obsługa płatności nie jest w pełni funkcjonalna, planuję dalej nad nią pracować). Do testu najlepiej jest wybrać opcję Przelewy24 i losowo wygenerować dane. Na samym końcu użytkownik proszony jest o podanie imienia, nazwiska oraz adresu email. Po spełnieniu tych kroków bilet w formacie PDF jest pobierany na komputer. Zakładka Search działa jako wyszukiwarka dla naszych eventów pod względem słów kluczowych. Zakładka HotEvents wyświetla 30 najpopularniejszych eventów (z największą ilością polubień w kolejności malejącej). Aktualnie przesyłam kod NIEKOMPLETNY lecz planuję nad nim dalej pracować (przesyłam go teraz ze wględy na to, że nie mam autlanie czasu by coś więcej napisać). Mam nadzieję że projekt przykuje uwage i otrzymam jakiś feedback. Dzięki !

## Dalszy rozwój 
W przyszłości planuję dodać kilka nowych funkcjonalności.
1. Stworzyć podstronę, na której będą eventy, które dodał użytkownik. Czyli jako organizator jakiegoś wydarzenia będę mógł nim zarządzać z osobnego panelu.
2. Kiedy organizator wprowadzi jakieś zmiany w evencie to zostanie wysłana wiadomość do użytkowników (których event dotyczy, tzn. to wydarzenie jest przez nich polubione np. na platformie eventowej lub na adres email)
3. Osobna zakładka dla polubionych eventów
4. Możliwość założenia konta lub podania adresu email dla newslettera (np. że został dodany nowy event)
5. Organizator tworząc event w formularzu będzie musiał podać dokładną danę rozpoczęcia i zakończenia eventu, by po okresie np. tygodnia od jego zakończenia, event był usówany z backendu.

Welcome to your new `event_management_system` project and to the Internet Computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with `event_management_system`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd event_management_system/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
# event_managment_system
