# EliteMart Backend

This repository contains the server/API for the EliteMart application. It provides product, order, user and payment endpoints used by the frontend. This README explains how to run the backend locally, with Docker, and how to set required environment variables (two critical checks are performed at startup: database connection and Razorpay keys).

## 🔗 Repository

- GitHub: https://github.com/Deepakkumar586/elitemart-backend

## Quick overview

- Docker image: `deepakkumar264/elitemart-backend:1.1`
- Ports: default server port `5000` (configurable via `PORT` env var)

## Quick setup checklist

1. Clone the backend repo: `git clone https://github.com/Deepakkumar586/elitemart-backend.git`
2. Create an `.env` with:

```env
PORT=5000
MONGO_URI=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

3. Install and run: `npm install && npm run dev` (see backend README for exact scripts)
4. Or use the published Docker image: `docker run -d --name elitemart-backend -p 5000:5000 --env-file ./path/to/.env deepakkumar264/elitemart-backend:1.1`

- Important startup checks (the container will exit with an error if any required env var is missing):
  1. Database connection string (MONGO_URI) — backend will verify it can parse/use the connection string.
  2. Razorpay keys (`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`) — required for payment flows.

## Prerequisites

- Node.js 18+ (for local development)
- npm or yarn
- MongoDB (local or hosted) if developing locally
- Docker (optional, recommended for deployment)

## Environment variables

Create a `.env` file with the following variables. The backend requires the database URI and Razorpay keys; if these are missing the service will exit with an error.

Required (critical checks):

```env
PORT=5000
MONGO_URI=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Notes:

- `PORT` defaults to `5000` if not set.
- The backend performs two critical checks on startup:

  1. **Database connection:** `MONGO_URI` must be set and valid (server will validate connectivity).
  2. **Razorpay keys:** `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` must be set for payment flows.

- When using Docker Compose, place your backend `.env` file where the compose file expects it (example in the root `docker-compose.yml` uses `../EliteMartBackend/.env`).

## .env example

A sample `.env` example file is included at `backend/.env.example` for convenience.

## Run locally (development)

1. Clone the repo:

```bash
git clone https://github.com/deepakkumar264/elitemart-backend.git
cd elitemart-backend
```

2. Install dependencies and run:

```bash
npm install
npm run dev
# or
npm run start:dev
```

3. The server will run on `http://localhost:5000` (unless `PORT` is set).

## Run with Docker

Pull the published backend image:

```bash
docker pull deepakkumar264/elitemart-backend:1.1
```

Run the image (example):

```bash
docker run -d --name elitemart-backend -p 5000:5000 --env-file ./backend/.env deepakkumar264/elitemart-backend:1.1
```

### Docker Compose

Use the provided `docker-compose.yml` (or the example in the main project's README) to run both backend and frontend together. The backend service expects the `.env` file path set in `env_file` and performs startup env checks for DB and Razorpay keys.

## Build & push (optional)

Build the image locally:

```bash
docker build -t <dockerhub-username>/elitemart-backend:1.1 .
```

Push to Docker Hub (after `docker login`):

```bash
docker push <dockerhub-username>/elitemart-backend:1.1
```

## API (high level)

Example endpoints (implementation-specific details are in the code):

- `GET /api/products` - list products
- `GET /api/products/:id` - single product
- `POST /api/orders` - create order
- `POST /api/payments/razorpay` - create a Razorpay order / handle payments
- `POST /api/auth/login` - authenticate user

## Troubleshooting

- If the container exits immediately after starting, check logs: `docker logs <container>` — the startup checks will print which env var is missing or invalid.
- If the database connection fails, verify `MONGO_URI` and that your database is accessible from where the container runs.
- For Razorpay issues, confirm both `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set and valid.

## Contributing

- Please open issues or PRs on the GitHub repository: https://github.com/deepakkumar264/elitemart-backend

## License

See the main project's `LICENSE` file.

---

If you want, I can also add endpoint-specific documentation (request/response samples) or integration tests for the payment flow — would you like that next?
