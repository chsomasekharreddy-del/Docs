# Docs
Docs.ai is an AI-powered healthcare platform that predicts possible diseases from user symptoms using machine learning. It provides confidence scores, precautions, and healthcare recommendations, with features for doctor discovery and map-based navigation. The project combines frontend, backend, APIs, and ML.

## Run locally

1. Copy `server/.env.example` to `server/.env`, fill in the database and `GROQ_API_KEY` values, then install the backend dependencies with `pip install -r server/requirements.txt`.
2. Start the API: `cd server` then `uvicorn app.main:app --reload`.
3. Copy `client/.env.example` to `client/.env`, install packages with `npm install`, then run `npm run dev` from `client`.

The browser calls `/api` in development, which Vite proxies to FastAPI. The backend also allows the standard Vite development origins through CORS for deployments where the client and API run on separate origins.

The chat and report endpoints require a signed-in user and are rate-limited to 20 requests per minute per user/IP. Chat history stays in the browser only when the user enables the conversation-history setting.
