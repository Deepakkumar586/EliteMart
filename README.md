# EliteMart

Elitemart is a React web app built with Vite and Tailwind CSS. This README explains how to run the app locally and with Docker, including Windows-specific Docker Desktop steps.

**Quick actions**
- **Docker (recommended):** `docker pull deepakkumar264/elitemart:1.1` then `docker run -p 4173:4173 deepakkumar264/elitemart:1.1`
- **Local dev:** `npm install` → `npm run dev` (visit http://localhost:5173)

**Contents**
- **Prerequisites**
- **Run with Docker**
- **Run locally (dev & production preview)**
- **Environment variables (Firebase)**
- **Build and push Docker image (optional)**
- **Troubleshooting**

**Prerequisites**
- Node.js (LTS) and npm installed for local development
- Docker Desktop installed and running for Windows users (see next section)

**Installing Docker Desktop (Windows)**
1. Download Docker Desktop from https://www.docker.com/get-started and follow the installer.
2. On Windows 10/11, enable WSL2 integration if prompted and restart your computer.
3. Open Docker Desktop and verify it shows "Docker is running".

**Run with Docker (pull & run image)**
1. Pull the published image:

```bash
docker pull deepakkumar264/elitemart:1.1
```

2. Run the container and map the port:

```bash
docker run -d --name elitemart -p 4173:4173 deepakkumar264/elitemart:1.1
```

3. Open your browser to: http://localhost:4173

Notes:
- The container uses Vite's `preview` server which listens on port `4173` inside the container.
- To stop and remove the container:

```bash
docker stop elitemart && docker rm elitemart
```

**Run locally (development)**
1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd Elitemart
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open http://localhost:5173 in your browser (Vite dev server default).

**Production preview locally**
1. Build and preview locally (same behavior as the Docker preview):

```bash
npm run build
npm run preview -- --host
```

This will run the preview server (default port 4173) and bind it to your host.

**Environment variables (Firebase)**
- This project uses Vite environment variables for Firebase. Create a `.env` file in the project root with values like:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Make sure to restart the dev server after adding `.env`.

**Build and push Docker image (optional)**
1. Build locally:

```bash
docker build -t <dockerhub-username>/elitemart:1.1 .
```

2. Push to Docker Hub (after `docker login`):

```bash
docker push <dockerhub-username>/elitemart:1.1
```

**Troubleshooting**
- If you can't reach the app at the expected port, ensure Docker Desktop is running and ports are not blocked by a firewall.
- If preview runs on a different port, check `package.json` scripts and the `dockerfile` (this project exposes `4173` for preview).
- For dev server port, Vite defaults to `5173` (see `vite.config.js`).

**Acknowledgements & License**
- Built with Vite, React, Tailwind CSS, and Redux Toolkit.
- See the `LICENSE` file for licensing details.

If you'd like, I can also add a small `.env.example` with the Firebase keys placeholder and a short contributing guide. Tell me if you want that added.
