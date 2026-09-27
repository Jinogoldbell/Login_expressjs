# Auralis — Login Demo

A full-stack login flow built from scratch (no cloned branding):

- **Frontend:** React (Vite) + Tailwind CSS, with client-side validation and Axios for API calls.
- **Backend:** Node.js + Express, with mock/static credential checking (no database).

## Project structure

```
auralis-login/
├── backend/
│   ├── data/users.js       # Mock "database" of users
│   ├── routes/auth.js      # POST /api/auth/login — validation + mock auth
│   ├── server.js           # Express app entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/Login.jsx      # Login form UI + validation + API call
    │   ├── pages/Dashboard.jsx  # Dummy post-login page
    │   ├── App.jsx              # Routes (/login, /dashboard)
    │   ├── api.js                # Axios instance
    │   └── main.jsx
    ├── vite.config.js           # Proxies /api → http://localhost:5000
    ├── tailwind.config.js
    └── package.json
```

## Running it locally

### 1. Start the backend

```bash
cd backend
npm install
npm start        # or: npm run dev (with nodemon, auto-restarts)
```

The API runs at `http://localhost:5000`. Health check: `GET /api/health`.

### 2. Start the frontend (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Vite's dev server proxies any
request to `/api/*` through to the Express backend, so the frontend never
needs to hardcode a backend URL.

### 3. Log in

Use one of the mock accounts in `backend/data/users.js`:

| Email               | Password    |
|---------------------|-------------|
| demo@auralis.io     | Passw0rd!   |
| ava@auralis.io      | Sunrise42   |

A successful login stores a mock token in `localStorage` and redirects to
`/dashboard`, which is a protected route (it redirects back to `/login` if
no token is present).

## What's implemented

- **Frontend validation:** empty fields, malformed email, password under 6
  characters — shown inline per field before any network call is made.
- **Backend validation:** the same checks are repeated server-side (never
  trust client-side validation alone), plus the actual credential check
  against the mock user list.
- **Error handling:** invalid credentials or validation failures return a
  `4xx` JSON response with a `message`, which the UI surfaces in an alert
  banner above the form.
- **Success flow:** on `200 OK`, the token/user are saved and the user is
  routed to `/dashboard`; a "Log out" button clears the token and returns
  to `/login`.

## Notes on going further

This is a demo/portfolio-style project, so a few things are intentionally
simplified — worth knowing if you build on it:

- Passwords are stored in plaintext in `users.js` for simplicity. In a real
  app, hash passwords with bcrypt/argon2 and never keep them in source code.
- The "token" returned by the backend is a base64 string, not a real signed
  JWT — swap in `jsonwebtoken` (or a session store) for anything real.
- There's no rate limiting or CSRF protection, which you'd want before
  deploying a login form publicly.
