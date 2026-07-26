# CGL Ace Backend - Production Ready REST APIs

This is the backend service for **CGL Ace**, a comprehensive SSC CGL preparation platform. Built with **Node.js**, **Express.js**, **TypeScript**, and **Prisma ORM**, it features a secure authentication layer, role-based controls (Student and Admin), detailed mock-test evaluation and scoring analytics, PDF storage integration, and analytics dashboard KPIs.

---

## 🚀 Key Features

*   **Authentication & Session Management**:
    *   Secure User Signup & Login with password hashing (`bcryptjs`).
    *   Double JWT tokens flow (Short-lived Access Token + Rotate-on-use Refresh Tokens).
    *   One-Time Password (OTP) verification for email activation and password resets.
*   **Student Profile & Insights**:
    *   Profile updates and image uploads (streamed via Multer and stored on Cloudinary CDN).
    *   Aggregated performance statistics: mock test counts, correct/wrong/unattempted metrics, subject-wise score tracking, accuracy rates, and percentile-rank calculations.
*   **Subjects & Topics CRUD**:
    *   Nested subjects (e.g., Quantitative Aptitude) and topics (e.g., Percentage).
*   **Question Bank Management**:
    *   CRUD operations for questions, multi-options, marks allocation, negative marks, difficulty levels, and rich explanations.
*   **Mock Test Platform**:
    *   Admin mock test builder linking database questions.
    *   Anti-cheat mechanisms: strips correct answers/explanations from questions during active student attempts.
    *   Timer tracking, save interim state during test attempts, and auto-submit configurations.
    *   Automated test grading, scoring, accuracy calculations, and live ranking relative to other competitors.
*   **Study Materials & Previous Papers**:
    *   Admin PDF upload (handled by Cloudinary CDN storage).
    *   Student search, filtering by subjects, and bookmarking.
*   **General Utilities**:
    *   Activity logs for user logins/logouts.
    *   System notifications (global broadcasts or targeted individual alerts).
    *   Bookmarks registry (toggle questions, study material, and mock tests).
*   **Admin Dashboard metrics**:
    *   Daily Active Users (DAUs), total counts (users, tests, questions, PDFs), and rolling monthly analytics logs.
*   **Robust Security & Docs**:
    *   CORS enabled, Helmet security headers, API Rate Limiters, custom ApiError classes, and Zod validation middleware.
    *   Interactive Swagger API Documentation at `/api-docs`.

---

## 🛠️ Technology Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript (strict-mode)
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Upload Storage**: Cloudinary (via Multer Buffer)
*   **Email Transporter**: Nodemailer (SMTP)
*   **Validation**: Zod
*   **Logger**: Winston Logger + Morgan
*   **Security & Rate Limit**: Helmet, CORS, express-rate-limit
*   **API Docs**: Swagger UI Express + Swagger JSdoc

---

## 📁 Directory Structure

```
backend/
 ├── prisma/
 │   ├── schema.prisma        # Database Tables & Relations Definition
 │   └── seed.ts              # Database Seeding Script (Subjects, Questions, Tests, Users)
 ├── src/
 │   ├── config/              # Winston, Prisma, Cloudinary, Nodemailer configurations
 │   ├── constants/           # HTTP codes, Roles, Bookmarks, and Difficulty levels
 │   ├── controllers/         # Express Request/Response handlers
 │   ├── middleware/          # JWT check, Zod validations, uploads, limiters, global error
 │   ├── prisma/              # Prisma client bridge registry
 │   ├── routes/              # Express API Route controllers
 │   ├── services/            # Core business logic & database queries
 │   ├── types/               # TypeScript type extensions
 │   ├── utils/               # catchAsync, custom ApiErrors, OTP/JWT helpers
 │   ├── validations/         # Zod schemas for input validation
 │   ├── app.ts               # Express configuration middleware registry
 │   └── server.ts            # Server bootstrapper & shutdown listener
 ├── .env.example             # Template for variables
 ├── package.json
 └── tsconfig.json
```

---

## ⚙️ Setup and Installation

### 1. Prerequisite Installations
*   Ensure **Node.js** (v18+) is installed.
*   Ensure **PostgreSQL** is running and you have created a database (e.g. `cgl_ace`).

### 2. Install Project Dependencies
In the `backend/` directory, run:
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Fill in the parameters:
*   `DATABASE_URL`: Connection string to your PostgreSQL instance.
*   `JWT_SECRET` / `JWT_REFRESH_SECRET`: Secure secret keys.
*   `SMTP_*`: Your SMTP credentials (e.g., Mailtrap, Ethereal, or Gmail).
*   `CLOUDINARY_*`: Cloudinary API keys for file/PDF attachments.

### 4. Run Migrations & Generate Prisma client
Apply database migrations to sync your Postgres database schema:
```bash
npx prisma migrate dev --name init
```
*(This automatically runs `prisma generate` to compile types for the Prisma client)*

### 5. Seed Mock Data
Populate the database with pre-defined subjects, topics, question sets, mock tests, an admin (`admin@cglace.com`), and a student account (`student@cglace.com`) (default password is `password123`):
```bash
npm run prisma:seed
```

### 6. Run Server in Development Mode
To start the hot-reloading development server:
```bash
npm run dev
```
The server will start on port `5000`. You can visit the API documentation at:
🔗 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

---

## 📚 API Endpoints Summary

All routes are versioned under `/api/v1`.

### 🔑 Authentication (`/api/v1/auth`)
*   `POST /register` - Registers a new user. Sends OTP email.
*   `POST /verify-otp` - Verifies email OTP/password reset code.
*   `POST /login` - Signs in user, returns access token + refresh token.
*   `POST /refresh-token` - Generates a new access token using a valid refresh token.
*   `POST /forgot-password` - Requests an OTP reset code.
*   `POST /reset-password` - Resets password using the received OTP code.
*   `POST /logout` - Revokes refresh token (requires auth).
*   `PATCH /change-password` - Modifies password for authenticated user.

### 👤 Profile Management (`/api/v1/users`)
*   `GET /profile` - Retrieve current user profile details.
*   `PUT /profile` - Update profile name.
*   `POST /profile/picture` - Uploads user avatar (Multer field: `profilePicture`).
*   `GET /statistics` - Aggregated stats for completed tests, accuracy, correct questions.

### 📝 Subjects and Topics (`/api/v1/subjects`)
*   `GET /` - List all subjects.
*   `POST /` - Create a subject (*Admin only*).
*   `GET /:id/topics` - List topics in a subject.
*   `POST /:id/topics` - Create a topic in a subject (*Admin only*).

### ❓ Questions Management (`/api/v1/questions`)
*   `GET /` - Search/Query questions bank (*Admin only*).
*   `POST /` - Create question + option sub-records (*Admin only*).
*   `GET /:id` - Fetch single question (*Admin only*).
*   `PUT /:id` - Update question and synchronize nested options (*Admin only*).
*   `DELETE /:id` - Delete question and options (*Admin only*).

### 🏆 Mock Tests (`/api/v1/mock-tests`)
*   `GET /` - List all available tests.
*   `GET /:id` - Fetch single test details (Hides solutions/explanations for Students).
*   `POST /` - Create a test linking question IDs (*Admin only*).
*   `PUT /:id` - Edit test properties (*Admin only*).
*   `DELETE /:id` - Delete mock test (*Admin only*).
*   `POST /:id/start` - Initialize mock test attempt for student.
*   `POST /attempts/:id/save-answers` - Saves intermediate answers during a test.
*   `POST /attempts/:id/submit` - Submits and grades the test. Calculates rank.
*   `GET /attempts/:id/result` - Fetch detailed score results, solutions, and explanations.

### 📚 Study Materials (`/api/v1/study-materials`)
*   `GET /` - List study materials. Filterable by subject, topic, search query.
*   `POST /` - Upload new PDF study sheet (*Admin only*, Multer field: `pdf`).
*   `PUT /:id` - Update metadata (*Admin only*).
*   `DELETE /:id` - Remove PDF material (*Admin only*).

### 📅 Current Affairs (`/api/v1/current-affairs`)
*   `GET /` - Fetch news items/PDF updates.
*   `GET /:id` - Fetch detailed news page.
*   `POST /` - Create daily update or upload monthly digest (*Admin only*).
*   `PUT /:id` - Edit current affairs (*Admin only*).
*   `DELETE /:id` - Delete current affairs (*Admin only*).

### 📂 Previous Year Papers (`/api/v1/previous-papers`)
*   `GET /` - Fetch papers catalog (filtered by subject, year, examType).
*   `POST /` - Upload new paper PDF (*Admin only*, Multer field: `pdf`).
*   `PUT /:id` - Update paper details (*Admin only*).
*   `DELETE /:id` - Delete paper (*Admin only*).

### 🔖 Bookmarks (`/api/v1/bookmarks`)
*   `GET /` - List all bookmarked questions, study sheets, or tests.
*   `POST /` - Toggle a bookmark status (body: `type`, `questionId`, `studyMaterialId`, `mockTestId`).

### 🔔 System Notifications (`/api/v1/notifications`)
*   `GET /` - Fetch student notifications.
*   `POST /` - Create targeted or broadcast system notification (*Admin only*).
*   `PATCH /:id/read` - Mark a notification as read.

### 📊 Admin Dashboard (`/api/v1/dashboard`)
*   `GET /admin` - Admin KPIs: DAU, total users, tests, questions, and signups/attempts monthly charts (*Admin only*).
