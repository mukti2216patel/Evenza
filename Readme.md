
<h1 align="center"> Event Management System</h1>
<p align="center"><i>A smart platform to manage events, vendors, guests, and budgets efficiently.</i></p>

---

## 🚀 Overview

This system allows users to:

- Create and manage events
- Hire vendors for different event services
- Manage guest lists and invitations
- Track budget allocation per vendor
- Create smart checklists for tasks
- Vendors can manage their own tasks and respond to user queries

---

## 🧑‍💻 User Roles

### 1. **User / Event Organizer**
- Create events
- View and hire vendors
- Assign tasks to vendors
- Track budgets
- View guest list and send invitations

### 2. **Vendor**
- Respond to user queries
- Accept or reject tasks
- Manage personal checklist items

---

## 🛠 Tech Stack

- **Frontend:** React.js, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Additional Tools:** Zod (validation), bcrypt (password hashing), Socket.IO (real-time notifications)

---

## 🌟 Features

### User-side:
- Event creation & management
- Vendor hiring & query handling
- Budget management
- Smart checklist for event tasks
- Guest management with invitations

### Vendor-side:
- Accept/reject tasks
- Manage personal tasks
- View assigned events

### Common:
- Role-based authentication
- Secure login/signup
- Real-time updates using Socket.IO

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Pdiya13/EventManagementSystem.git
cd EventManagementSystem

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run backend
cd ../backend
npm run dev

# Run frontend
cd ../frontend
npm start

