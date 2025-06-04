# IntelDesk

**IntelDesk** is a secure, full-stack Security Information System (SIS) designed for the National Police Foundation (NPF) to streamline reporting, incident tracking, and intelligence logging.

## 🛠 Tech Stack

* **Frontend:** React.js (with Vite) + TypeScript
* **Backend:** Node.js + Express + TypeScript
* **Database:** MongoDB
* **Package Manager:** npm

## 📁 Project Structure

```
IntelDesk/
├── client/           # Frontend (React + Vite + TypeScript)
│   ├── src/
│   └── vite.config.ts
├── server/           # Backend (Node + Express + TypeScript)
│   ├── src/
│   └── tsconfig.json
├── .env
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/inteldesk.git
cd inteldesk
```

### 2. Install dependencies

```bash

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/inteldesk
```

### 4. Run the development servers

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:5173` (default Vite port).
Backend will run on `http://localhost:5000`.

## 📦 Scripts

### Frontend (`client/`)

* `npm run dev` – Run Vite dev server
* `npm run build` – Build for production

### Backend (`server/`)

* `npm run dev` – Run backend using ts-node-dev
* `npm run build` – Compile TypeScript
* `npm start` – Start production server

## 📌 Features

* Secure incident and intelligence report submission
* User authentication and role-based access
* Dashboard with reporting metrics
* MongoDB-powered data storage
* Modular, scalable TypeScript codebase

## 🛡 Security Notes

* Make sure to never expose sensitive credentials.
* Enable HTTPS and environment-specific configurations in production.

## 📄 License

MIT License. See `LICENSE` file for details.

---

Developed with by IBRAHIM.
