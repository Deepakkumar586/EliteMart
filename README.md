# EliteMart — Vite + React + Tailwind starter

This project is a minimal Vite + React setup with Tailwind CSS and a dark/light theme toggle (class-based dark mode).

## Setup (PowerShell)

```powershell

npm install
npm run dev
```

- Open the URL printed by `npm run dev`.
- The theme toggle in the header switches between light and dark; the setting is saved to `localStorage`.

## Notes

- Tailwind is configured with `darkMode: 'class'` — we toggle the `dark` class on the `document.documentElement`.
- If you want to use a different package manager, run the equivalent `pnpm`/`yarn` commands.

## Redux + Persistence

This project now uses Redux Toolkit (`@reduxjs/toolkit`) with `react-redux` and `redux-persist` to persist the theme setting.

After installing dependencies, run the dev server. The theme will be restored automatically from persisted state.
