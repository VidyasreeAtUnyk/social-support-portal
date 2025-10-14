# 🧩 Social Support Portal

A modern, multi-step social support application built with **Next.js**, **React Hook Form**, **Yup**, and a custom **Design System**.  
This project simulates an AI-powered form assistant that helps users describe their financial and social situations using the “Help Me Write” feature.

---

## 🚀 Features

- **Modular Design System** for reusable UI components (Buttons, Inputs, Cards, FormField, etc.)
- **Step-based Form Flow**
  - Step 1 → Personal Info
  - Step 2 → Family & Financial Info
  - Step 3 → Situation Description (AI-powered)
- **Validation with Yup & React Hook Form**
- **Mock AI suggestions** (fallback for when API quota is exhausted)
- **Vercel Deployment Ready**

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** Material UI + Custom Design System
- **Form Handling:** React Hook Form + Yup Validation
- **State Management:** Redux Toolkit
- **AI Integration (Mocked):** OpenAI API simulation for “Help Me Write”
- **Deployment:** Vercel

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/social-support-portal.git
cd social-support-portal
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Environment Variables
Create a .env.local file in the root directory and add the following:

bash
Copy code
# OpenAI API Key (optional for production)
OPENAI_API_KEY=your_openai_api_key_here
💡 If you don’t have an API key or have exceeded the quota, the app will automatically fall back to mock AI responses via mockAISuggestion.ts.

4️⃣ Run the Development Server
bash
Copy code
npm run dev
Visit http://localhost:3000 to see your app running.

🧱 Build & Deployment
Build the Project
bash
Copy code
npm run build
Start in Production Mode
bash
Copy code
npm start
Deploy on Vercel
This project is pre-configured for Vercel. Just run:

bash
Copy code
vercel
Or push your code to GitHub and connect it to your Vercel dashboard.

Current deployment:
https://social-support-portal-iota.vercel.app

🔑 Setting Up the OpenAI API Key
Go to OpenAI API Keys

Click Create new secret key

Copy the key and add it to your .env.local file:

bash
Copy code
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
Restart your dev server (npm run dev)

If the API quota is exceeded, the app will gracefully fallback to mock AI responses to ensure the flow still works.

🧹 Common Commands
Command	Description
npm run dev	Start dev server
npm run build	Create production build
npm start	Run production server
npm run lint	Run ESLint
vercel --prod	Deploy to Vercel Production

📦 Folder Structure
pgsql
Copy code
├── app/
│   ├── components/
│   ├── page.tsx
│   └── layout.tsx
├── lib/
│   ├── designSystem/
│   ├── hooks/
│   └── store/
├── services/
│   └── ai/
│       └── mockAISuggestion.ts
├── public/
├── .env.local
├── package.json
└── README.md
📜 Notes
The AI “Help Me Write” feature currently uses a mock API due to limited OpenAI quota.

Future updates may integrate the real OpenAI API via services/ai/getAISuggestion.ts.

```
