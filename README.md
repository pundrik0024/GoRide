
User: demo@goride.in / Demo@123
Admin: admin@goride.in / Admin@123


# GoRide — Indian Intercity Bus Booking Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) intercity bus booking platform built as a college project. GoRide offers a complete bus ticket booking experience with search, seat selection, payment simulation, live tracking, and an admin panel.

## 🚌 Features

### Customer Features
- **City Autocomplete Search** — Search buses between 55+ Indian cities with real-time suggestions
- **Bus Listings** — Filter by departure time, bus type, price range, and amenities; sort by price, departure, or duration
- **Interactive Seat Map** — 2+2 seat layout with visual seat states (available, selected, booked)
- **Complete Booking Flow** — Search → Select Bus → Pick Seats → Passenger Details → Payment → QR Ticket
- **Digital Ticket** — QR code-based boarding pass with full trip details
- **My Bookings Dashboard** — View upcoming, completed, and cancelled trips
- **Booking Cancellation** — Cancel with instant refund simulation
- **Live Bus Tracking** — Simulated GPS tracking with route progress visualization
- **Review System** — Rate and review completed trips

### Admin Features
- **Dashboard** — Real-time stats, booking trends, revenue charts (Recharts)
- **Bus Management** — CRUD operations for fleet
- **Route Management** — Create and manage intercity routes
- **Schedule Management** — Set departure times, fares, seat availability
- **Booking & Payment Monitoring** — View all bookings and transactions
- **User Management** — View registered users

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS 3.4, React Router 6 |
| Backend | Node.js, Express.js 4 |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (JSON Web Tokens) + bcrypt |
| Charts | Recharts |
| QR Codes | qrcode.react |
| Icons | Material Symbols (Google Fonts) |
| Font | Manrope (Google Fonts) |

## 📁 Project Structure

```
goride/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI, layout, home, search, booking, admin components
│   │   ├── pages/          # Route pages (Home, Search, Seats, Payment, Admin...)
│   │   ├── context/        # AuthContext, BookingContext
│   │   ├── services/       # API service modules (Axios)
│   │   └── utils/          # Formatters, validators
│   └── tailwind.config.js  # Design system tokens
│
├── server/                 # Express.js backend
│   ├── config/             # Database connection
│   ├── controllers/        # Route handlers
│   ├── middleware/          # Auth, admin, error handling
│   ├── models/             # Mongoose schemas (9 models)
│   ├── routes/             # API route definitions
│   ├── seed/               # Database seed scripts
│   └── utils/              # Helpers
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ 
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone / Navigate to the project
```bash
cd goride
```

### 2. Install Dependencies
```bash
# Install server dependencies
cd server && npm install

# Install client dependencies  
cd ../client && npm install
```

### 3. Configure Environment
```bash
# Copy the example env file
cp server/.env.example server/.env

# Edit if needed (defaults work for local MongoDB)
```

Local demo `.env`:
```
MONGODB_URI=mongodb://localhost:27017/goride
JWT_SECRET=replace_with_a_long_random_secret
PORT=5001
NODE_ENV=development
```

The client proxies `/api` requests to `http://127.0.0.1:5001` by default. Override it in `client/.env` with `VITE_API_PROXY_TARGET` if you use a different backend port.

### 4. Seed the Database
```bash
cd server
npm run seed
```

This resets and populates the local demo database with Indian cities, fictional routes and pickup points, buses, 31 days of schedules, users, sample bookings, reviews, and payment records. `npm run seed:reset` does the same reset explicitly.

Demo routes and operators are fictional and do not represent real services.

### 5. Start the Application
```bash
# Terminal 1 — Start the backend
cd server
npm run dev

# Terminal 2 — Start the frontend
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

If port 5173 is already occupied, Vite will print the alternate local URL it selected.

## 👤 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| User | `demo@goride.in` | `Demo@123` |
| Admin | `admin@goride.in` | `Admin@123` |

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Core
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cities/search?q=` | City autocomplete |
| GET | `/api/routes/popular` | Popular routes |
| GET | `/api/schedules/search?from=&to=&date=` | Search buses |
| GET | `/api/schedules/:id` | Schedule detail |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | User's bookings |
| PUT | `/api/bookings/:id/cancel` | Cancel booking |
| POST | `/api/payments` | Process payment |
| POST | `/api/reviews` | Submit review |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| CRUD | `/api/admin/buses` | Manage buses |
| CRUD | `/api/admin/routes` | Manage routes |
| CRUD | `/api/admin/schedules` | Manage schedules |

## 🎨 Design System

The UI follows an editorial transit aesthetic inspired by architectural wayfinding:

- **Primary**: Forest Green `#315C4B`
- **Canvas**: Warm Off-White `#F7F7F5` 
- **Text**: Charcoal `#171717` / Stone Gray `#6B6B67`
- **Borders**: Hairline `#E6E6E1` — no box-shadows
- **Font**: Manrope across all elements
- **Radii**: 8px (inputs/buttons), 12px (cards)

## 📋 License

This is a fictional project built for educational purposes. Not affiliated with any real transportation company.

---

Built with ❤️ as a college full-stack project — **GoRide Technologies Pvt. Ltd. (Fictional)**
