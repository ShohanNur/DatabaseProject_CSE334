# House Booking Platform – MERN Stack 🏠✨

A **full‑stack accommodation marketplace** built with the MERN stack that lets guests search & book stays while hosts manage inventory through a dedicated admin dashboard.

| Layer | Tech | Notes |
|-------|------|-------|
| Database | **MongoDB Atlas** | Mongoose ODM, multi‑document transactions to prevent double‑booking |
| Backend API | **Express + Node.js** | Modular REST endpoints, JWT auth, role‑based access (*guest*, *host*, *admin*) |
| Admin UI | **React 17 (CRA) + SCSS** | DataGrid‑powered CRUD for hotels, rooms & users |
| Guest UI | **React 18 (CRA) + Tailwind CSS** | Mobile‑first pages for search, listings, checkout |
| Real‑time | **Socket.io** (future) | Ready for live notifications on booking status |
| Auth & Security | **bcryptjs**, **JWT**, HTTP‑only cookies | Refresh‑token pattern & form validation |
| Dev & Ops | Nodemon, ESLint, GitHub Actions (draft), Docker‑ready | Automatic restart & linting |

---

## ✨ Key Features

### Guest‑facing (frontend/)
* 🔍 **Dynamic search** by city, date range, price, rooms & more.  
* 📈 **Featured locations and property types** surfaced via MongoDB aggregation.  
* 📜 **Detail pages** with photo gallery, availability checker & price calculator.  
* 🛎️ **Instant booking / reservation modal** that blocks dates across all selected rooms.  
* 🪄 Smooth UI polish (hover zoom, animation, custom colour palette).  

### Admin Panel (adminPanel/)
* 📊 **Dashboard** widgets (users, earnings, balance), interactive charts & tables.  
* 🏨 **Hotels & rooms CRUD** – multi‑file Cloudinary image upload, room‑to‑hotel linking.  
* 👤 **User management** with server‑side pagination, soft‑deletes.  
* 🌗 **Dark‑mode toggle** backed by React Context.  

### Backend (backend/)
* 🔑 **Auth endpoints** `/api/auth/register | login | logout` issuing access & refresh tokens.  
* 🛏️ **Hotels** `/api/hotels` REST routes with filters `?city=&min=&max=` and helpers `countByType`, `countByCity`.  
* 🏘️ **Rooms** nested under hotels, availability calendar patched atomically.  
* 🧑 **Users** admin‑only CRUD & stats.  
* ♻️ **Error middleware** for consistent JSON errors.

---

## 📂 Repository Layout
```
house-booking-platform/
├── backend/        # Express API + Mongoose models
├── frontend/       # Guest‑facing React app (Tailwind)
├── adminPanel/     # Admin dashboard React app (SCSS)
└── README.md       # ← you are here
```

> Each sub‑project is an *independent* Create‑React‑App / Node workspace so you can run them standalone or together with a reverse proxy.

---

## 🚀 Quick Start (local)

```bash
git clone github.com:ShohanNur/DatabaseProject_CSE334.git
cd house-booking-platform
```

### 1. Backend API
```bash
cd backend
npm i
cp .env.example .env  # add MONGO=<connection> JWT_SECRET=<secret> PORT=8800
npm start             # http://localhost:8800
```

### 2. Guest Web
```bash
cd ../frontend
npm i
npm start             # http://localhost:3000
```

### 3. Admin Panel
```bash
cd ../adminPanel
npm i
npm start             # http://localhost:3006 (proxy→8800)
```

> **Tip:** Use *concurrently* or Docker‑Compose to spin up all three with a single command.

---

## 🔐 Environment Variables (backend)

| Name | Purpose |
|------|---------|
| `MONGO` | MongoDB connection string |
| `JWT_SECRET` | Signing key for access tokens |
| `COOKIE_SECRET` | Optional, to sign cookies |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | (frontends) image uploads |

---

## 📡 Sample API Contract

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Create account |
| `POST` | `/api/auth/login` | ❌ | Email/Password → JWT cookies |
| `GET` | `/api/hotels` | ✅ optional | Filter list, supports `featured` & price range |
| `GET` | `/api/hotels/find/:id` | ✅ optional | Single hotel with rooms |
| `POST` | `/api/hotels` | 🛡️ admin | Create hotel (photos via Cloudinary) |
| `PUT` | `/api/rooms/availability/:id` | ✅ | Mark room numbers unavailable (booking) |

Full Swagger collection lives in `backend/docs/openapi.yaml`.

---

## 🖥️ Screenshots

| Guest Home | Hotel Detail | Admin Dashboard |
|------------|--------------|-----------------|
| ![home](docs/screens/home.png) | ![hotel](docs/screens/hotel.png) | ![admin](docs/screens/admin.png) |

---

## 🛠️ Roadmap

* Stripe integration for secure payments.  
* Email / SMS notifications via Twilio.  
* i18n & currency localisation.  
* Docker‑Compose & k8s manifests.  

---

## 🤝 Contributing

1. Fork, create feature branch `git checkout -b feat/my-change`.  
2. Run `npm test` & `eslint .` before committing.  
3. Open a pull request describing *what* & *why*.

---

## 📝 License

This project is licensed under the **MIT License** – see [`LICENSE`](LICENSE).

---

> _Built with 💖 & coffee (Jan 2022 → Aug 2022)_

