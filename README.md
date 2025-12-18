# EliteMart

> A simple e-commerce frontend for EliteMart — order products, add to cart, login via Firebase, manage state with Redux, maintain a wishlist, and checkout using Razorpay.

## 🚀 Project Overview

- **Core features:** Product listing, add-to-cart, cart management via **Redux**, user **authentication using Firebase**, **Wishlist**, and checkout integration with **Razorpay**.
- **Frontend Docker image:** `deepakkumar246/elitemart-frontend:1.1` (replace with the correct Docker Hub username if different).
- **Backend:** Provided as a separate service (see the Backend setup note below).

---

## 💻 Local Development

### Prerequisites

- Node.js (>= 16) and npm or yarn
- A Firebase project and credentials (add to your Vite env variables)
- Razorpay API keys for checkout

### Run the frontend locally

1. Install dependencies:

```bash
npm install
# or
yarn
```

2. Start the dev server:

```bash
npm run dev
# or
yarn dev
```

3. Open the app at http://localhost:4173

## Environment Variables (.env) 🔒

Create a `.env` file in the project root with the following variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_RAZORPAY_KEY`
- `VITE_BACKEND_URL`
  VITE_BACKEND_URL="http://localhost:5000"

### Backend

- The backend is a separate repository/service. For local backend setup and Docker image details, check the backend repo README. The backend must expose port `5000` (default in compose example below).
  https://github.com/Deepakkumar586/elitemart-backend

---

## 🐳 Docker & Docker Compose

This repo includes instructions for running the **frontend** together with a **backend** container using Docker Compose (version `3.9`).

### Example `docker-compose.yml`

```yaml
version: "3.9"

services:
	backend:
		image: deepakkumar264/elitemart-backend:1.1
		container_name: backend
		ports:
			- "5000:5000"
		env_file:
			- ../EliteMartBackend/.env
		restart: always

	frontend:
		image: deepakkumar264/elitemart-frontend:1.1
		container_name: frontend
		ports:
			- "4173:4173"
		depends_on:
			- backend
		restart: always
```

Notes:

- Replace `deepakkumar264/*` with the Docker Hub images you use (the frontend image you mentioned earlier was `deepakkumar246/elitemart-frontend:1.1` — confirm which username/tag is correct and update the compose file accordingly).
- `env_file` for the backend points to `../EliteMartBackend/.env` in this example; adjust paths to where your backend `.env` actually resides.

### Build & push your frontend image (example)

```bash
# From the frontend root
docker build -t deepakkumar246/elitemart-frontend:1.1 .
docker push deepakkumar246/elitemart-frontend:1.1
```

### Start services with Docker Compose

```bash
docker compose up -d
docker compose logs -f frontend
```

---

## ✅ Troubleshooting & Tips

- If the site can't authenticate, re-check the Firebase env vars and ensure the Firebase project allows the origin URL (for dev `http://localhost:4173`).
- For Razorpay integration, set the keys as env vars and ensure the backend handles payment verification securely.
- If Docker containers won't start, inspect logs (`docker compose logs`) and ensure the backend `.env` path is correct.

---

## 🎯 Important notes

- Confirm Docker Hub usernames/tags for both frontend and backend images and update the compose file accordingly.
- For backend image/setup, check your backend repository's README for build and env instructions.

---

## 📄 License

Open source — see `LICENSE`.

---

If you'd like, I can also add a `docker-compose.yml` file to this repo and a short `.env.example` for the frontend to help document the required variables — tell me if you want me to add those files.

---
