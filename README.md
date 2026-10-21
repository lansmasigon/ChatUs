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

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Real-time Backend**: Node.js, Express, Socket.io
- **Process Orchestration**: Concurrently

---

## ⚙️ Environment Configuration

Create or update `.env` in the project root:

```env
# Matchmaker Server URL (localhost for dev, or your Render URL for production)
VITE_SERVER_URL=http://localhost:3001
```

---

## 🏃 Running Locally

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

## 🌐 Deployment (Render + Vercel)

### 1. Deploy Backend to [Render.com](https://render.com/)
1. Create a **New Web Service** &rarr; Connect this GitHub repo.
2. Settings:
   - **Language**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Plan**: `Free`
3. Copy your live Render URL (e.g., `https://chatus-backend.onrender.com`).

### 2. Deploy Frontend to [Vercel](https://vercel.com/)
1. Import this repository into Vercel.
2. In **Environment Variables**, add:
   - `VITE_SERVER_URL`: `https://chatus-backend.onrender.com` *(your Render URL)*
3. Click **Deploy**.
