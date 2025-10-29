<div align="center">

# MailMind

AI‑powered Gmail sorting assistant — fetch your recent emails, classify them with Gemini, and browse in a clean, responsive UI.

</div>

## Overview

MailMind is a full‑stack app:

- Backend: Node.js + Express
	- Google OAuth 2.0 login (gmail.readonly)
	- Gmail API to fetch recent emails
	- Classify emails with Google Gemini via a simple API
- Frontend: React + Vite + Tailwind
	- Google sign‑in, session cookie
	- Dashboard with selectable fetch limit, right‑side drawer for mail details
	- Classify button, loading skeletons, and a scanning GIF overlay during classification

Live example (if deployed):

- Frontend (Vercel): https://mailmind-ai-gen.vercel.app
- Backend (Render): https://mailmind-c9if.onrender.com


## Project structure

```
backend/
	server.js                 # Express app (CORS, routes)
	routes/
		auth.js                 # Google OAuth + user session cookie + /auth/google/mails
		classify.js             # POST /api/classify (Gemini classification)
		mail.js                 # Gmail list + get message details
	middlewares/
		auth.middleware.js      # JWT cookie verify

frontend/
	src/
		pages/
			LoginPage.jsx         # Google sign‑in + Gemini API key input (sessionStorage)
			DashBoard.jsx         # Main UI — list, drawer, classify, loader overlay
		components/
			LoadingSkeleton.jsx   # List skeletons
			MailDrawer.jsx        # Right‑aligned mail detail drawer
		store/
			mailSlice.js          # fetchMails, classifyMails thunks + state
			authSlice.js          # auth state (via /auth/me)
			store.js              # Redux store
		utils/
			axiosInstance.js      # API base URL + withCredentials
	public/
		google_login.png        # Google logo for sign‑in button
		scanngText.gif          # Scanning loader GIF (or scannigText.gif)
	vercel.json               # SPA rewrite so /dashboard works on direct link
```


## Prerequisites

- Node.js 18+ (recommended 20+)
- Google Cloud project with OAuth 2.0 Client ID (Web application)
	- Scopes used: gmail.readonly, userinfo.email, userinfo.profile, openid


## Environment variables

Backend (Render / local .env):

- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=
- GOOGLE_REDIRECT_URI= http(s)://<your-backend-domain>/auth/google/callback
- JWT_SECRET= a strong random string
- FRONTEND_URL= http(s)://<your-frontend-domain>
- PORT=5000 (optional)
- NODE_ENV=production (on Render)

Frontend (Vercel / local .env):

- VITE_API_BASE_URL= http(s)://<your-backend-domain>


## Local development

Backend (terminal 1):

```powershell
cd backend
npm install
$env:PORT=5000; $env:GOOGLE_CLIENT_ID="..."; $env:GOOGLE_CLIENT_SECRET="..."; $env:GOOGLE_REDIRECT_URI="http://localhost:5000/auth/google/callback"; $env:JWT_SECRET="your_secret"; $env:FRONTEND_URL="http://localhost:5173"; npm run dev
```

Frontend (terminal 2):

```powershell
cd frontend
npm install
$env:VITE_API_BASE_URL="http://localhost:5000"; npm run dev
```

Open http://localhost:5173 and click “Sign in with Google”.


## How authentication works

1) Frontend opens `${VITE_API_BASE_URL}/auth/google`.
2) Backend redirects to Google, then back to `/auth/google/callback`.
3) Backend sets a signed JWT session cookie (`token`) and redirects to `${FRONTEND_URL}/dashboard`.
4) Frontend makes credentialed requests with axios (`withCredentials: true`).

Notes:

- In production, cookies are set with `SameSite=None; Secure` (requires HTTPS and matching domains).
- CORS allows credentials for the configured `FRONTEND_URL`.


## Features

- Fetch emails with a selected limit (5–25)
- Right‑aligned drawer to read an email fully
- Classify with Gemini — provide your API key on the login page
- Loading skeletons and a scanning GIF overlay while classifying


## API

All routes are relative to the backend base URL.

- `GET /auth/google` → Start OAuth flow
- `GET /auth/google/callback` → OAuth redirect handler (server‑side)
- `GET /auth/me` → Returns `{ user }` for the current session
- `GET /auth/google/mails?maxResults=10` → Returns `{ mails: [...] }`
- `POST /api/classify` → Body: `{ emails, gemini_key }` → Returns `{ classifiedMails }`


## Frontend state (Redux)

- `fetchMails(limit)`
	- Calls `/auth/google/mails?maxResults=<limit>`
	- Stores `mails`
- `classifyMails(emails)`
	- Uses `sessionStorage.getItem('gemini_api_key')`
	- Calls `POST /api/classify`
	- Stores `classifiedMails`

Gemini API key

- Enter on Login page; stored in `sessionStorage` as `gemini_api_key`.
- Login button is disabled until a non‑empty key is entered.


## Deployment

Backend (Render):

1) Create a Web Service pointing to `backend/`
2) Build command: `npm install`
3) Start command: `npm start`
4) Set environment variables:
	 - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
	 - `GOOGLE_REDIRECT_URI` = `https://<render-app>.onrender.com/auth/google/callback`
	 - `JWT_SECRET` = strong string
	 - `FRONTEND_URL` = `https://<your-vercel-app>.vercel.app`
	 - `NODE_ENV` = `production`

Frontend (Vercel):

1) Import project, root = `frontend/`
2) Env: `VITE_API_BASE_URL` = `https://<render-app>.onrender.com`
3) SPA rewrite is included via `frontend/vercel.json` so `/dashboard` and deep links work
4) Deploy


## Troubleshooting

- 404 for `/dashboard` on Vercel:
	- Ensure `frontend/vercel.json` exists:
		```json
		{ "rewrites": [ { "source": "/(.*)", "destination": "/" } ] }
		```

- `Not allowed by CORS`:
	- Add your Vercel domain to the `allowedOrigins` in `backend/server.js` or set `FRONTEND_URL` correctly and include it in the list.

- `secretOrPrivateKey must have a value`:
	- Ensure `JWT_SECRET` is set in Render env. Both signing (routes/auth.js) and verifying (middlewares/auth.middleware.js) use `JWT_SECRET`.

- `invalid_grant` from Google:
	- The `redirect_uri` must exactly match the one set in Google Cloud Console.
	- Don’t reuse a one‑time authorization code (avoid double refresh/back during callback).
	- Confirm `GOOGLE_CLIENT_ID`/`SECRET` pair match the same Google project where you configured the redirect URI.

- Classification overlay GIF not visible:
	- Place `scanngText.gif` (or `scannigText.gif`) in `frontend/public/`.


## Scripts

Backend:

```powershell
cd backend
npm run dev   # nodemon
npm start     # production
```

Frontend:

```powershell
cd frontend
npm run dev
npm run build
npm run preview
```


## License

ISC — see `LICENSE`.
