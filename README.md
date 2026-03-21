# APRICA — React Frontend

Built with Vite + React + Tailwind CSS

## Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server (make sure Flask backend is running on port 5000)
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build
# Output goes to /dist folder
```

## Project Structure

```
aprica-react/
├── index.html
├── vite.config.js        ← proxies /api → localhost:5000
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx          ← entry point
    ├── App.jsx           ← routes
    ├── index.css         ← Tailwind + global styles
    ├── lib/
    │   ├── AuthContext.jsx  ← login state
    │   └── api.js           ← all API calls
    ├── pages/
    │   ├── HomePage.jsx     ← landing page
    │   ├── AuthPage.jsx     ← login/signup
    │   └── DashboardPage.jsx
    └── components/
        ├── layout/
        │   ├── Sidebar.jsx
        │   └── Topbar.jsx
        ├── ui/
        │   └── index.jsx    ← shared UI components
        └── features/
            └── Panels.jsx   ← all 8 feature panels
```

## Routes

| Path         | Page       | Protected |
|--------------|------------|-----------|
| /            | Home       | No        |
| /auth        | Login/Signup| No       |
| /dashboard   | Dashboard  | Yes ✓     |

## Backend

Make sure your Flask `app.py` is running:
```bash
python app.py
```

The Vite dev server proxies all `/api/*` requests to `http://localhost:5000`.
