# BAPS Bal Mandal Admin Panel

A secure, scalable, and feature-rich admin panel for BAPS Bal Mandal, built with React, Tailwind CSS, and a robust Node.js/Express backend.

---

## Features
- JWT-based authentication with role-based access (superadmin, admin, volunteer, user)
- User management: add, edit, delete, search, filter, profile view
- Attendance management: mark, view, bulk mark, export, summary
- Event, Post, Achievement, Notification, Log management
- Add/Edit modals for all modules
- Dashboard with stats
- Responsive, modern UI with sidebar, topbar, and protected routes
- Toast notifications and modals for all actions
- Secure backend with best practices (helmet, CORS, rate limiting, XSS, etc.)

---

## Setup Instructions

### 1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd BAPS-Bal-Mandal
```

### 2. **Install Dependencies**
#### Backend
```bash
cd backend
npm install
```
#### Admin Frontend
```bash
cd ../admin
npm install
```

### 3. **Environment Variables**
- Copy `.env.example` to `.env` in both `backend` and `admin` folders.
- Fill in the required values (MongoDB URI, JWT secret, etc.).

### 4. **Run Locally**
#### Backend
```bash
cd backend
npm run dev
```
#### Admin Frontend
```bash
cd admin
npm run dev
```
- Admin panel will be available at `http://localhost:5173` (or as shown in terminal).

### 5. **Deployment**
- Backend: Deploy to Vercel, Render, or your preferred Node.js host.
- Admin: Deploy to Vercel or Netlify (static build).
- See `vercel.json` and `RENDER_DEPLOYMENT.md` for details.

---

## Usage
- Log in as an admin or superadmin to access all features.
- Use the sidebar to navigate between modules.
- Click "Add" or "Edit" to manage records. Use the "View" button in Users to see detailed profiles.
- All actions provide instant feedback via toast notifications.

---

## Support
For issues or questions, please contact the project maintainer. 