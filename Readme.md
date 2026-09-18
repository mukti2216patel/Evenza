# Evenza

A full-stack event planning platform that connects **event organizers** with **vendors** — from creating an event and shortlisting vendors, to tracking budgets, checklists, guests, payments and ratings, with an AI planning assistant on top.

Built with the MERN stack (MongoDB, Express 5, React 19, Node.js) and Vite + Tailwind CSS v4.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Frontend Routes](#frontend-routes)
- [Third-Party Integrations](#third-party-integrations)
- [Known Issues / Roadmap](#known-issues--roadmap)

---

## Features

Evenza has two distinct roles, each with its own dashboard and route tree.

### For Users (event organizers)

| Feature | Description |
| --- | --- |
| Event management | Create, update, delete and browse events (name, type, date, location, description) |
| Vendor discovery | Browse vendors by category, price and experience |
| Vendor requests | Send a booking query to a vendor with a proposed budget; vendor accepts or rejects |
| Budget management | Set a personal budget per event, add cost items by category, and view a combined budget that merges the user's own spend with each accepted vendor's spend |
| Smart checklist | Personal tasks plus tasks assigned to specific vendors, with toggle / edit / delete |
| Guest management | Import contacts via Google People API and send bulk invitations via `mailto:` |
| Ratings & reviews | Rate a vendor 1–5 with a review, once per vendor per event |
| AI assistant | Generate ideas, checklist suggestions and budget tips for an event |

### For Vendors

| Feature | Description |
| --- | --- |
| Vendor dashboard | Overview of activity |
| Queries / payments | See incoming booking requests and accept or reject them |
| Accepted events | List of events the vendor is confirmed for |
| Per-event budget | Add and delete cost items against an event budget |
| Per-event checklist | View tasks assigned by the organizer plus add personal tasks |
| Ratings | View ratings and reviews received |
| AI assistant | Same planning assistant, scoped to the vendor's event |

---

## Tech Stack

**Frontend**
- React 19 + React Router 7
- Vite 6
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Axios, `react-hot-toast`, `react-icons`
- Recharts + `react-d3-speedometer` for budget visualisations
- AOS for scroll animations
- `@react-oauth/google`, `jwt-decode`

**Backend**
- Node.js + Express 5
- MongoDB with Mongoose 8
- JWT auth (`jsonwebtoken`) + `bcrypt` password hashing
- `zod` for request validation
- `openai` SDK for AI suggestions
- `twilio` (WhatsApp messaging — currently commented out)
- `cors`, `dotenv`

**Tooling**
- `concurrently` to run client and server together
- ESLint 9 (client)
- `nodemon` (server)

---

## Project Structure

```
Evenza/
├── package.json              # root scripts — runs client + server together
├── client/                   # React (Vite) frontend
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx           # all routes + role guards
│       ├── main.jsx
│       ├── components/
│       │   ├── authentication/   # Login, Signup, PrivateRoute
│       │   ├── home/             # Dashboard, CreateEvent, ManageEvent, Vendors
│       │   ├── events/           # per-event: budget, guests, checklist, vendor select/query/rate
│       │   ├── plan-vendors/     # vendor-side per-event: checklist, budget, AI assistant
│       │   ├── Home_vendor/      # vendor dashboard, queries, payments, ratings, event list
│       │   ├── profile/          # user + vendor profile pages
│       │   ├── Features/         # landing page feature sections
│       │   └── Layout.jsx, EventLayout.jsx, Navbar.jsx, Header.jsx, Footer.jsx
│       └── images/
└── server/                   # Express API
    ├── server.js             # entry point, starts the HTTP listener
    └── src/
        ├── app.js            # express app, CORS, JSON, route mounting
        ├── config/db.js      # Mongoose connection
        ├── middlewares/      # isLoggedIn JWT guard
        ├── helper/           # password hashing
        ├── models/           # user, vendor, event, checklist, vendor_event,
        │                     # vendor_budget, vendor_rating
        ├── controllers/      # auth, event, user, vendor, profile, checklist, ai
        └── routes/           # auth, event, user, vendor, profile, ai
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (the repo pins a `node` dependency at v24)
- npm
- A MongoDB instance (local or MongoDB Atlas)
- An OpenAI API key (for the AI assistant)
- A Google Cloud OAuth client with the People API enabled (for guest import)

### Installation

```bash
git clone https://github.com/mukti2216patel/Evenza.git
cd Evenza

# root (concurrently + shared deps)
npm install

# backend
cd server && npm install

# frontend
cd ../client && npm install
```

---

## Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=8080
MONGODB_URL=mongodb://127.0.0.1:27017/evenza
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=sk-...

# Optional — only needed if WhatsApp messaging is re-enabled
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

> **Important:** the frontend currently hardcodes `http://localhost:8080` as the API base URL in ~44 places, so the server **must** run on port `8080` for the app to work as-is. See [Known Issues](#known-issues--roadmap).

The Google OAuth client ID for contact import is hardcoded in `client/src/components/events/GuestManagement.jsx` — replace it with your own.

---

## Running the App

From the project root, start both services at once:

```bash
npm start
```

This runs:
- **client** → `cd client && npm run dev` (Vite dev server, usually http://localhost:5173)
- **server** → `cd server && npm start`

Or run them separately:

```bash
npm run server   # backend only
npm run client   # frontend only
```

Other client scripts: `npm run build`, `npm run preview`, `npm run lint`.

---

## API Reference

All routes are mounted under `/api`. Protected routes require an `Authorization` header containing the raw JWT (no `Bearer ` prefix — see [Known Issues](#known-issues--roadmap)).

### Auth — `/api/auth`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/user/signup` | Register an organizer (`name, email, phone, password, role:"user"`) |
| POST | `/user/login` | Organizer login → returns a 1-hour JWT |
| POST | `/vendor/signup` | Register a vendor (adds `category, price, experience`) |
| POST | `/vendor/login` | Vendor login → returns a 1-hour JWT |

### Events — `/api/event` *(auth required)*

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/all-events` | List the logged-in user's events |
| GET | `/:eventId` | Fetch a single event |
| POST | `/create` | Create an event |
| POST | `/all-events/:id` | Update an event |
| POST | `/all-events/delete/:id` | Delete an event |
| GET | `/acceptedvendors/:eventId` | Vendors who accepted this event |
| GET | `/checklist/task/personal/:eventId` | Fetch personal checklist tasks |
| POST | `/checklist/task/personal/:eventId` | Add a personal task |
| GET | `/checklist/task/vendor/:eventId/:vendorId` | Fetch tasks assigned to a vendor |
| POST | `/checklist/task/vendor/:eventId/:vendorId` | Assign a task to a vendor |
| POST | `/checklist/task/toggle/:taskId` | Toggle task completion |
| POST | `/checklist/task/update/:taskId` | Edit a task |
| POST | `/checklist/task/delete/:taskId` | Delete a task |

### User — `/api/user` *(auth required)*

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/select-vendor` | List vendors available for selection |
| POST | `/query-vendor` | Send a booking request to a vendor |
| GET | `/vendor-budgets` | Vendor-side budgets for an event |
| GET | `/my-budget` | The organizer's own budget for an event |
| POST | `/my-budget` | Create or update that budget |

### Vendor — `/api/vendor`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/:vendorId/payments` | — | Booking requests / payments for a vendor |
| POST | `/payments/:id` | — | Accept or reject a request |
| GET | `/accepted-events` | ✅ | Events the vendor has accepted |
| GET | `/:eventId/vendor-tasks` | ✅ | Assigned + personal tasks for an event |
| POST | `/:eventId/vendor-personal-task` | ✅ | Add a personal task |
| GET | `/getBudget` | ✅ | Vendor's budget for an event |
| POST | `/addCostItem` | ✅ | Add a cost line item |
| DELETE | `/deleteCostItem/:eventId/:itemId` | ✅ | Remove a cost line item |
| GET | `/getCombinedBudget` | ✅ | Merged user + vendor budget view |
| GET | `/getvendorRatings` | ✅ | Ratings received |
| POST | `/addRating` | ✅ | Submit a rating for a vendor |

### Profile — `/api/profile` *(auth required)*

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Fetch the logged-in user's or vendor's profile |
| PUT | `/` | Update the profile |

### AI — `/api/ai`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/suggestions` | Body: `{ eventName, type, budget, location, details }` → returns planning ideas, checklist items and budget tips from `gpt-4o-mini` |

---

## Data Models

| Model | Collection | Key fields |
| --- | --- | --- |
| `userModel` | `usermodels` | name, email (unique), password, phone, role (`user`/`vendor`) |
| `vendorModel` | `vendormodels` | name, email (unique), password, phone, category, price, experience, role |
| `eventModel` | `eventmodels` | ename, location, description, date, type, userId |
| `vendor_eventModel` | `vendor_eventmodels` | eventId, userId, vendorId, budget, eventDate, status (`Pending`/`Accepted`/`Rejected`) — unique on (eventId, vendorId) |
| `Checklist` | `checklists` | eventId, userId, vendorId, label, checked, isPersonal |
| `vendor_budget` | `vendor_budgets` | eventId, vendorId, userId, isVendor, budget, items[{ category, cost }] |
| `ratingModel` | `ratingmodels` | eventId, vendorId, userId, rating (1–5), review — unique on (eventId, vendorId, userId) |

**Relationships:** a user owns many events → each event can have many vendor requests (`vendor_event`) → accepted vendors get checklist items, budget entries and ratings scoped to that event.

---

## Frontend Routes

**Public**
- `/` — landing page
- `/login`, `/signup`

**User-only** (guarded by `PrivateRoute allowedRoles={['user']}`)
- `/dashboard`, `/create`, `/manage`, `/vendors`, `/user`
- `/event/:eventId/vendor/:vendorId/query`
- `/rate/:vendorId/:eventId`
- `/manage/:eventId/` → `select-vendor` (default), `budget`, `guests`, `checklist`, `ai`

**Vendor-only** (guarded by `PrivateRoute allowedRoles={['vendor']}`)
- `/vendor-dashboard`, `/eventslist`, `/payments`, `/ratings`, `/vendor-queries`, `/VendorProfile`
- `/:eventId/` → `vendor-checklist`, `vendor-budget`, `vendor-ai`

Any unmatched path redirects to `/`.

---

## Third-Party Integrations

| Service | Used for | Status |
| --- | --- | --- |
| OpenAI (`gpt-4o-mini`) | Event planning suggestions | Active |
| Google People API | Importing guest contacts | Active (client-side OAuth token flow) |
| Twilio | WhatsApp invitations | Imported and configured, but the controller and route are commented out |

---

## Known Issues / Roadmap

These are worth addressing before deploying:

1. **`node_modules` is committed to the repository** (~226 MB). Add a root `.gitignore` with `node_modules/`, `.env` and `.idea/`, then `git rm -r --cached node_modules`.
2. **Hardcoded API base URL.** `http://localhost:8080` appears ~44 times across the client. Move it to a `VITE_API_URL` environment variable and a shared Axios instance.
3. **Hardcoded Google OAuth client ID** in `GuestManagement.jsx` — should come from `import.meta.env`.
4. **Auth header format.** The middleware reads `req.headers.authorization` and passes it straight to `jwt.verify`, so the token must be sent *without* the `Bearer ` prefix. Standardising on `Bearer <token>` (and stripping it server-side) would be safer.
5. **Login email validation is inconsistent** — the login schema requires an email of at least 15 characters, while signup allows 5. Short emails can register but not log in.
6. **bcrypt salt rounds set to 5** in `helper/authHelper.js`; 10–12 is the usual recommendation.
7. **Two auth collections.** Users and vendors live in separate collections with separate login endpoints; email uniqueness isn't enforced across both.
8. **CORS is fully open** (`app.use(cors())`) — lock it down to the frontend origin in production.
9. **`node` listed as an npm dependency** in `server/package.json` — this should be a `engines` field, not a package.
10. **`.idea/` IDE config is tracked** in version control.
11. **No test suite and no CI** configured.
12. **JWTs expire in 1 hour** with no refresh flow, so users are silently logged out mid-session.

---
## License

No license file is currently present in the repository. Consider adding one (MIT is a common choice) to clarify how others may use the code.
