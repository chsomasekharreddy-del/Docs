# DocAI (HealthSage)

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Groq](https://img.shields.io/badge/AI-Groq_LLM-F05A28.svg)](https://groq.com/)

**DocAI (HealthSage)** is an intelligent healthcare platform that assists users with preliminary symptom analysis, medical information retrieval, health insights, and guided next steps. It combines a high-performance **FastAPI** backend with a responsive **React 19 + Vite** frontend, powered by a Retrieval-Augmented Generation (RAG) pipeline with **Groq LLM** and local clinical references.

---

## 📑 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Environment Configuration](#environment-configuration)
- [Getting Started / Local Setup](#getting-started--local-setup)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Database Migrations (Alembic)](#2-database-migrations-alembic)
  - [3. Frontend Setup](#3-frontend-setup)
- [API Reference](#api-reference)
  - [Authentication & Users](#authentication--users)
  - [Medical Chat & Reports](#medical-chat--reports)
- [Testing](#testing)
- [Security & Architecture Practices](#security--architecture-practices)

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    React 19 + Vite Client                   │
│         (Auth, AI Chat UI, Insights, Profile, Settings)     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON (Proxy /api)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     FastAPI Application                     │
│  ┌───────────────────────┐       ┌────────────────────────┐ │
│  │   Auth / User Router  │       │  Medical Chat Router   │ │
│  │ (Argon2 / PyJWT Auth) │       │ (RAG + Rate Limiter)   │ │
│  └───────────┬───────────┘       └───────────┬────────────┘ │
└──────────────┼───────────────────────────────┼──────────────┘
               ▼                               ▼
     ┌──────────────────┐            ┌──────────────────┐
     │ PostgreSQL (ORM) │            │ Groq API (LLM)   │
     │ SQLAlchemy/Alembic│           │ + Local RAG Docs │
     └──────────────────┘            └──────────────────┘
```

---

## ✨ Key Features

- **🔐 Robust Authentication & User Management**:
  - Secure password hashing using **Argon2id** (via `pwdlib`).
  - RFC 7519 compliant **JWT Access Tokens** (`PyJWT`) with automatic expiration.
  - Flexible login accepting either **Email** or **Username**.
  - Role-ready user profiles and protected routes.

- **🩺 AI-Powered Medical Chat & Triage**:
  - Context-aware medical symptom evaluation powered by Groq (`openai/gpt-oss-20b` or custom models).
  - Lightweight **RAG (Retrieval-Augmented Generation)** querying local clinical knowledge bases (`model/medical_data/`).
  - Cautious clinical guardrails and emergency condition detection (recommending immediate emergency care for high-risk flags).
  - Automated **Consultation Summary Reports** generating actionable takeaways for doctor visits.

- **⏱️ API Rate Limiting & Protection**:
  - In-memory sliding window rate limiter protecting sensitive AI endpoints (20 requests/minute per user/IP).

- **🎨 Modern Responsive Frontend**:
  - Built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.
  - Client-side routing with **React Router v7**.
  - Dark / Light theme support and toast notifications.
  - Local chat history persistence with user-controlled privacy settings.

---

## 🛠️ Tech Stack

### Backend (`server/`)
- **Framework**: FastAPI (Python 3.12+ / 3.14)
- **ASGI Server**: Uvicorn
- **ORM & Migrations**: SQLAlchemy 2.0, Alembic
- **Database**: PostgreSQL (via `psycopg2-binary`)
- **Authentication**: `PyJWT`, `pwdlib[argon2]`, `python-multipart`
- **Configuration**: `pydantic-settings`, `python-dotenv`
- **AI / LLM Integration**: `groq`

### Frontend (`client/`)
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API with auto-bearer auth injection

---

## 📁 Project Directory Structure

```text
DOCS/
├── client/                     # React + Vite Frontend Application
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images and design assets
│   │   ├── components/         # Reusable UI components
│   │   │   ├── auth/           # Login, Signup, ProtectedRoute modals
│   │   │   ├── chat/           # AI Chat messages, input, insight cards
│   │   │   ├── common/         # Navbar, Footer, Toast notifications
│   │   │   └── landing/        # Hero, Features, How It Works sections
│   │   ├── context/            # AuthContext, ChatContext, ThemeContext
│   │   ├── lib/                # API client helper (apiFetch)
│   │   ├── pages/              # Chat, Landing, Profile, Settings, etc.
│   │   ├── App.jsx             # Route layout and providers
│   │   └── main.jsx            # React root entry point
│   ├── package.json
│   └── vite.config.js          # Vite config with API proxy
│
├── model/                      # Clinical reference material for RAG
│   └── medical_data/           # Curated medical reference texts
│
├── server/                     # FastAPI Backend Application
│   ├── alembic/                # Database migration scripts & environment
│   ├── app/
│   │   ├── config.py           # Pydantic Settings & environment variables
│   │   ├── database.py         # SQLAlchemy engine & session factory
│   │   ├── main.py             # FastAPI entrypoint & CORS setup
│   │   ├── models.py           # SQLAlchemy User & data models
│   │   ├── schemas.py          # Pydantic validation schemas
│   │   ├── routers/
│   │   │   ├── auth.py         # /auth/login endpoint
│   │   │   ├── chat.py         # /chat & /chat/report endpoints
│   │   │   └── user.py         # /users registration & profile endpoints
│   │   ├── services/
│   │   │   └── medical_chat.py # Groq LLM client & RAG document search
│   │   └── utils/
│   │       ├── hashing.py      # Argon2 password hashing
│   │       ├── oauth2.py       # JWT creation & bearer verification
│   │       └── rate_limit.py   # In-memory sliding window rate limiter
│   ├── requirements.txt        # Server Python dependencies
│   ├── alembic.ini             # Alembic configuration
│   └── tests/                  # Automated integration tests
│
├── requirements.txt            # Root dependencies
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Configuration

Create a `.env` file inside the `server/` directory:

### `server/.env`
```ini
# PostgreSQL Database Settings
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_NAME=DocAI
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_postgres_password

# JWT Security
JWT_SECRET_KEY=your_super_secret_64_character_hex_key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60

# Groq AI Model Settings (for Medical Chat)
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-20b

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000

# Google OAuth (optional, enables "Continue with Google")
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/auth/google/callback
```

> **Tip:** You can generate a secure 256-bit secret key for `JWT_SECRET_KEY` using:
> ```bash
> python server/scripts/generate_secret.py
> ```

### Google sign-in setup

In Google Cloud Console, create an **OAuth client ID** for a Web application. Add this exact authorized redirect URI:

```text
http://127.0.0.1:8000/auth/google/callback
```

Copy the resulting client ID and client secret into `server/.env` using the variables above, then restart the backend. The redirect URI must exactly match the value configured in Google Cloud. For production, change both `FRONTEND_URL` and `GOOGLE_REDIRECT_URI` to your HTTPS deployment URLs and register that production redirect URI in Google Cloud.

---

## 🚀 Getting Started / Local Setup

### 1. Backend Setup

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Create and activate a virtual environment**:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv .venv
     (Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned) ; (.\.venv\Scripts\Activate.ps1)
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### 2. Database Migrations (Alembic)

Ensure your PostgreSQL service is running and the database specified in `.env` exists. Then apply migrations:

```bash
alembic upgrade head
```

### 3. Run the Backend API

```bash
uvicorn app.main:app --reload
```

- **API Base URL**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`
- **ReDoc Documentation**: `http://127.0.0.1:8000/redoc`

---

### 4. Frontend Setup

1. **Open a new terminal and navigate to the client folder**:
   ```bash
   cd client
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open `http://localhost:5173` in your browser.

---

## 📡 API Reference

### Root
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | No | Health check and welcome greeting |

---

### Authentication & Users

#### 1. Register User
- **`POST /users`**
- **Auth:** None
- **Request Body (`application/json`):**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2026-08-29T12:00:00.000000Z"
  }
  ```

#### 2. User Login
- **`POST /auth/login`**
- **Auth:** None
- **Content-Type:** `application/x-www-form-urlencoded`
- **Request Body:**
  | Parameter | Type | Description |
  | :--- | :--- | :--- |
  | `username` | string | Email address or username |
  | `password` | string | User account password |
- **Response (`200 OK`):**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "token_type": "bearer"
  }
  ```

#### 3. Get Current Authenticated User Profile
- **`GET /users/me`**
- **Auth:** `Bearer <token>`
- **Response (`200 OK`):**
  ```json
  {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2026-08-29T12:00:00.000000Z"
  }
  ```

#### 4. Get User by ID
- **`GET /users/{id}`**
- **Auth:** `Bearer <token>`
- **Response (`200 OK`):** User profile object

---

### Medical Chat & Reports

#### 1. Send Message to AI Medical Assistant
- **`POST /chat`**
- **Auth:** `Bearer <token>` *(Rate limit: 20 req/min)*
- **Request Body (`application/json`):**
  ```json
  {
    "message": "I have had a throbbing headache and mild fever for 2 days.",
    "history": [
      {
        "role": "user",
        "content": "Hi doctor"
      },
      {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      }
    ]
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "reply": "**Possible explanations**\n- Tension headache or viral infection...\n\n**What you can do now**\n- Stay hydrated and rest...\n\n**When to seek urgent help**\n- If accompanied by stiff neck or high fever..."
  }
  ```

#### 2. Generate Consultation Summary Report
- **`POST /chat/report`**
- **Auth:** `Bearer <token>` *(Rate limit: 20 req/min)*
- **Request Body (`application/json`):**
  ```json
  {
    "history": [
      { "role": "user", "content": "I have persistent joint pain in my knees." },
      { "role": "assistant", "content": "Let us explore possible causes..." }
    ]
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "report": "**Summary of Symptoms**\n- Joint pain in knees...\n\n**Recommended Questions for your Physician**\n- ..."
  }
  ```

---

## 🧪 Testing

The backend includes automated integration tests covering routes, authentication, input validation, and security headers:

```bash
python server/tests/test_routes.py
```

---

## 🔒 Security & Architecture Practices

1. **Password Security**: Passwords are never stored in plaintext; hashed with Argon2id using recommended memory and iteration parameters.
2. **Timing-Safe Auth & Enumeration Defense**: Unified 401 Unauthorized responses for invalid credentials prevent username/email harvesting.
3. **Token Verification**: Strict decoding verifying expiration (`exp`), algorithm (`HS256`), and integer subject identity (`sub`).
4. **CORS Isolation**: Controlled origins configured via environment variables to protect against cross-origin exploitation.
5. **Rate Limiting**: Thread-safe sliding window rate limiting prevents abuse of expensive LLM endpoints.
