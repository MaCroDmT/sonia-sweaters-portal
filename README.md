# Sonia & Sweaters Limited - Career Portal & CMS

A modern, dynamic web application designed for Sonia & Sweaters Limited. This project features a public-facing corporate website with a dedicated Career section and a secure Headless CMS for HR management.

## 🚀 Overview

This project transforms a static corporate presence into a data-driven platform. It allows HR administrators to manage job postings in real-time through a secure dashboard, while providing a seamless application experience for potential candidates.

### Key Features

- **Headless CMS:** A secure `/admin` portal for HR to Create, Read, Update, and Delete (CRUD) job postings.
- **Real-time Updates:** Changes made in the CMS are instantly reflected on the public website.
- **Secure Authentication:** Firebase Auth protects the administrative dashboard.
- **Serverless Database:** Powered by Firebase Firestore for reliable, real-time data storage.
- **Zero-Cost Resume Handling:** Applications and resumes are forwarded directly to the HR email inbox via SMTP, eliminating expensive cloud storage requirements.
- **Multi-Language Support:** Instant localization for 9 global languages: English, Bengali, Chinese, Spanish, German, French, Portuguese, Arabic, and Hindi.

## 🛠 Technical Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Vue.js 3 (Composition API) | Reactive and modular UI development. |
| **Localization** | Vue i18n v9 | Managed dictionary-based language switching. |
| **Build Tool** | Vite | Ultra-fast development and optimized production builds. |
| **Styling** | Tailwind CSS v4 | Modern, utility-first styling for responsive design. |
| **Routing** | Vue Router | Client-side navigation with security guards. |
| **Database** | Firebase Firestore | Real-time NoSQL database. |
| **Auth** | Firebase Authentication | Secure admin access control. |
| **Backend** | Node.js & Express.js | Lightweight API for handling resume uploads and emails. |
| **Mail** | Nodemailer & Multer | Secure SMTP delivery with memory-buffered file handling. |

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ssl-vue-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Run the development server:**
   ```bash
   # Start the frontend
   npm run dev
   
   # Start the backend server (in a separate terminal)
   node server.js
   ```

## 🏗 Project Structure

- `src/components/`: Modular Vue components (Hero, About, Career, etc.).
- `src/components/admin/`: CMS-specific components (Dashboard, Login).
- `server.js`: Express server for handling email applications.

## 🌍 Localization (Multi-Language)

The project uses `vue-i18n` for global accessibility. Translations are stored as JSON dictionaries in `src/locales/`.

- **Supported Languages:** English (en), Bengali (bn), Chinese (zh), Spanish (es), German (de), French (fr), Portuguese (pt), Arabic (ar), Hindi (hi).
- **Adding/Editing Text:** To update website content, modify the corresponding JSON file in `src/locales/`. The system uses a key-value mapping (e.g., `"nav.about": "..."`) which ensures consistency across all languages.
- **Language Switcher:** A reactive dropdown is located in the `AppHeader.vue` that updates the global state instantly without page reloads.

## 📝 Handover Notes

- **Deployment:** The frontend can be built using `npm run build` and hosted on static platforms. The `server.js` requires a Node.js environment.
- **Security:** Ensure Firestore rules are set to `allow read` for the public and `allow write` only for authenticated users.
- **Next Steps:** Consider implementing Firebase Storage if in-app resume viewing is required in the future.

---

© 2026 Sonia & Sweaters Limited. All rights reserved.
