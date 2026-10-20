# ChatUs 🇵🇭 - Random Campus Chat for Students in the Philippines

ChatUs is a real-time 1-on-1 random chat application built for college and university students across the Philippines. Students can pick or type their campus, set a display name/alias, and match with online peers based on their matching preference.

---

## 🚀 Features

- **Philippine Universities & Colleges Directory**:
  - Quick-select chips for major campuses (UP Diliman, Ateneo, DLSU Manila, UST, PUP, FEU, Mapúa).
  - Searchable datalist covering top universities across Luzon, Visayas, and Mindanao.
  - Custom input support for any regional college or school.

- **Matchmaking Preferences**:
  - 🎲 **Anyone (Any School)**: Connect with any student currently online in the country.
  - 🏫 **Same School**: Match exclusively with batchmates and students from your own campus.
  - ⚔️ **Different School**: Meet peers from other colleges and universities.

- **Real-Time 1-on-1 Chat**:
  - Live bidirectional messaging powered by **Socket.io**.
  - Dynamic live online student counter.
  - Typing indicators (*"Typing a message..."*).
  - Safe disconnect guard (*"Skip / End" -> "Press again"*).
  - Campus matchup banner & conversational icebreakers for student banter.

- **🛡️ Cloudflare Turnstile Bot Protection**:
  - Smart, frictionless bot protection embedded right in the onboarding form.
  - Prevents automated bots and spammers from filling queues.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Bot Protection**: Cloudflare Turnstile (`@marsidev/react-turnstile`)
- **Real-time Backend**: Node.js, Express, Socket.io
- **Process Orchestration**: Concurrently

---

## ⚙️ Environment Configuration

Create or update `.env` in the project root:

```env
# Cloudflare Turnstile Site Key (From Cloudflare Dashboard > Turnstile)
# For local development, '1x00000000000000000000AA' always passes
VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=your_cloudflare_site_key

# Matchmaker Server URL
VITE_SERVER_URL=http://localhost:3001

# Optional: Cloudflare Secret Key for server-side token validation
# CLOUDFLARE_TURNSTILE_SECRET_KEY=your_cloudflare_secret_key
```

---

## 🏃 Running the Application

### 1. Run Frontend and Backend Together (Recommended)
```bash
npm run dev:all
```
This boots:
- **Matchmaking Server**: `http://localhost:3001`
- **Vite Web Client**: `http://localhost:5173`

### 2. Run Individually
- Backend only:
  ```bash
  npm run server
  ```
- Frontend only:
  ```bash
  npm run dev
  ```

---

## 🌐 Deployment (Vercel / Netlify + Render)

1. **Deploy Backend to [Render.com](https://render.com/)**:
   - New **Web Service** &rarr; Connect GitHub repo.
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Copy your Render URL (e.g. `https://chatus-backend.onrender.com`).

2. **Deploy Frontend to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)**:
   - Import your repository.
   - Add Environment Variables:
     - `VITE_SERVER_URL`: `https://chatus-backend.onrender.com`
     - `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`: Your Cloudflare Turnstile Site Key.
   - Click **Deploy**.

1. **Deploy Backend to [Render.com](https://render.com/)**:
   - New **Web Service** &rarr; Connect GitHub repo.
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Copy your Render URL (e.g. `https://chatus-backend.onrender.com`).

2. **Deploy Frontend to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)**:
   - Import your repository.
   - Add Environment Variables:
     - `VITE_SERVER_URL`: `https://chatus-backend.onrender.com`
     - `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`: Your Cloudflare Turnstile Site Key.
   - Click **Deploy**.

