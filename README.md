# Prhay

A private, focused space for your prayer life. No accounts, no cloud, no tracking — just you and your prayers.

**[prhay.robbiemed.org](https://prhay.robbiemed.org)**

<img width="693" height="914" alt="pr1" src="https://github.com/user-attachments/assets/46d29606-0a8b-4fe3-b52d-39135925ec40" />

<!-- Add screenshots here -->
<!-- ![Home Screen](screenshots/home.png) -->
<!-- ![Session](screenshots/session.png) -->
<!-- ![Settings](screenshots/settings.png) -->

## What It Does

Prhay helps you build a consistent prayer habit by organizing the people and things you pray for into lists with a smart daily rotation.

- **Add people and prayer items** with optional notes, organized into custom lists (Personal, Family, Church, or your own)
- **Set a schedule** — daily, specific days of the week, or specific days of the month
- **Start a session** and pray through cards one at a time
- **Smart rotation** — Today's list always includes your daily prayers plus a configured number of random items from each list, cycling through so everyone gets covered before anyone repeats
- **Weekly Scripture** — a verse about prayer on the home screen, rotating through 52 passages across the year
- **Bilingual** — English and Korean

## Privacy First

Everything stays on your device. Prhay stores all data in your browser's local storage. There are no user accounts, no servers, no analytics, no cookies. Your prayer life is between you and God.

You can export your data as a JSON backup at any time from Settings, and import it on another device.

## Install It

Prhay is a Progressive Web App. Visit [prhay.robbiemed.org](https://prhay.robbiemed.org) on your phone or computer and install it:

- **iOS Safari** — tap Share, then "Add to Home Screen"
- **Android Chrome** — tap the menu, then "Install app" or "Add to Home Screen"
- **Desktop** — click the install icon in the address bar

Once installed, it works offline and launches like a native app.

## Optional: Push Reminders via ntfy

Prhay can send you prayer reminders through [ntfy](https://ntfy.sh), a simple open-source notification service. Set up a topic in Settings and Prhay will ping you 24 hours after each completed session. No account required — just a topic URL.

## Tech Stack

No build step, no bundler, no npm. The entire app runs from static files:

- **React 18** via CDN with Babel standalone for in-browser JSX
- **Tailwind CSS** via CDN
- **Lucide** icons (vanilla) with a custom React bridge
- **Service Worker** for offline caching
- Plain JavaScript modules using a `window.Prhay` namespace

### File Structure

```
index.html              Thin shell with CDN imports and script loading
manifest.json           PWA manifest
sw.js                   Service worker (offline support)
css/styles.css          Fonts and animations
icons/                  App icons (SVG, PNG)
js/
  i18n.js               Translations (en/ko)
  verses.js             52 weekly prayer verses (en/ko)
  notifications.js      ntfy integration
  session.js            Session queue builder with rotation logic
  icons.js              Lucide-to-React bridge
  App.jsx               Main app component and state
  components/
    NavBar.jsx           Bottom tab navigation
    WelcomeModal.jsx     First-time splash screen
  views/
    HomeView.jsx         Home screen with verse, prayer prompt, filters
    SessionView.jsx      Prayer card session
    CompleteView.jsx     Session completion
    ManageView.jsx       Add, edit, delete prayers
    StatsView.jsx        Activity heatmap and list breakdown
    SettingsView.jsx     Dark mode, language, lists, ntfy, data
```

## Contributing

This is free and open-source software. Issues and pull requests are welcome.

## License

FOSS by [robbiemed](https://robbiemed.org) 2026 | SDG
