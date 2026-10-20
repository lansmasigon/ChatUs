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

## 🧪 Testing Matchmaking
Open two separate browser tabs at `http://localhost:5173`:
1. In Tab 1: Enter Name (e.g., `Archer`) and School (e.g., `DLSU Manila`).
2. In Tab 2: Enter Name (e.g., `Isko`) and School (e.g., `UP Diliman`).
3. Click **"Find a Match & Start Chatting"** in both tabs — they will be instantly paired in real-time!
