# ⏱️ TickTock Timesheets  
*A simple SaaS-style Timesheet Management App built with Next.js 15, TypeScript, and NextAuth*

---

## 📖 Overview

Welcome to **TickTock Timesheet- Management**, a frontend technical assessment project simulating a real-world **Timesheet Management SaaS app**.  
This project demonstrates clean code practices, modular structure, responsive UI, and seamless API integration — all built using **Next.js 15**, **TypeScript**, and **NextAuth**.



---

## 🚀 Features

### 🔐 Login Page
- Simple login with **dummy credentials** (shown on the UI).
- On successful login, users are redirected to the **Dashboard**.
- Token is securely stored via **NextAuth session**.
- Built-in authentication handled by **NextAuth v4**.

### 📊 Dashboard Page
- Displays a **Timesheet Table View** with the following columns:
  - 📅 Week #
  - 🗓️ Date
  - 🟢 Status
  - ⚙️ Actions
- Fully responsive and matches the provided Figma design.

### ➕ Add New Entry (Bonus Feature)
- Add/Edit modal to create new timesheet entries.
- Data is **persisted to Local Storage** for demo purposes.
- On page refresh, entries will reset (non-persistent beyond session).
- Includes basic **form validation** and error handling.

## Extra Features Implemented
- Task management system within each timesheet entry
- Each timesheet can contain multiple tasks
- Tasks are persisted in localStorage per timesheet
- Full CRUD operations for tasks (Create, Read, Update, Delete)

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| ⚛️ **React 19** | Component-based UI |
| 🔥 **Next.js 15** | Framework for SSR, routing, and API routes |
| 🛡️ **NextAuth v4** | Authentication & session handling |
| 📘 **TypeScript** | Type safety and clean code |
| 🎨 **TailwindCSS v4** | Responsive and utility-first styling |
| ✅ **ESLint** | Code linting and best practices enforcement |

---

## 📂 Project Structure

timesheet-management/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── timesheets/
│   │   │       └── route.ts
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── route.ts
│   │   ├── layout.tsx
│   │   └── login/
│   │       └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── TimesheetTableView.tsx
│   │   │   ├── TimesheetListView.tsx
│   │   │   └── TaskModal.tsx
│   │   └── layout/
│   │       └── DashboardHeader.tsx
│   ├── lib/
│   │   ├── types.ts
│   │   ├── mockData.ts
│   │   └── constants.ts
│   └── styles/
│       └── globals.css
├── public/
│   └── favicon.ico
├── .eslintrc.json
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md

// the above file folder structure may slightly vary from the actual it is for representation purpose , the decent file folder structure can be looked upon in repo

yaml
Copy code

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ticktock-timesheets.git
cd ticktock-timesheets
2. Install dependencies
bash
Copy code
npm install
3. Run the development server
bash
Copy code
npm run dev
Your app will be available at:
👉 http://localhost:3000

🔑 Login Credentials (Demo)
Use the dummy credentials displayed on the login screen to sign in.

📡 API Integration
All API calls are routed through internal API routes (/pages/api/*).

Authentication tokens are securely handled via NextAuth sessions.

Demo timesheet entries are fetched and displayed from these internal APIs.

🧪 Bonus (Optional Features)
✅ Modal-based Add/Edit Timesheet Entry

✅ Responsive layout for mobile and desktop

✅ Basic form validation with error messages

🧪 (Optional) Unit/component testing support

📐 Code Quality
♻️ Reusable components and hooks for cleaner structure

📁 Modular directory organization

✨ Clean naming conventions and separation of concerns

🔍 Linting with ESLint for consistent style

📘 Notes & Assumptions
Dummy Authentication: This project uses static credentials and next-auth for demo purposes.

Local Storage: New timesheet entries persist only for the current session. On page refresh, they are cleared.

Backend: All data is handled via internal API routes with mock data for simplicity.

📄 Evaluation Highlights
Category	What’s Covered
🎨 UI/UX	Clean, responsive design following Figma
🧱 Code Quality	Modular, readable, and maintainable
🔌 API Integration	Async handling, error states, session tokens
🧠 State Management	React hooks for efficient state handling
🧪 Testing (Optional)	Extendable for unit/component tests
📚 Documentation	Detailed README and setup instructions

📚 Time Spent
~4-6 hours total, including planning, coding, styling, and documentation.

👨‍💻 Author
Developed with ❤️ by [Your Name] as part of the TenTwenty Frontend Technical Assessment 2025.

📜 License
This project is for technical assessment/demo purposes only and not intended for production use.

