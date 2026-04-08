# 🔍 Find Your Paper (FYP)

An advanced, full-stack semantic academic discovery platform. Built with a monolithic microservice architecture, **FYP** leverages open-source Machine Learning embeddings and Postgres vector search to locate, filter, and deeply analyze millions of OpenAccess papers based on pure contextual meaning rather than standard keyword matching.

---

## ✨ Core Features
- **Semantic Vector Match**: Queries bypass string-matching and instead compute cosine distance through arrays, ensuring conceptual relevance for scientific papers.
- **Contextual Sentence Highlighting**: On fetch, the abstract sentences are individually embedded and scored against your initial query. FYP dynamically bridges `<mark>` nodes to highlight the most relevant mathematical sentence on the interface!
- **DDoS Resilient**: Employs backend-auth native Redis caching mapped tightly to individual user JWT tokens. 
- **Academic API Polling**: Plugs directly into the OpenAlex dataset using "Polite Pools" to seamlessly stream real research papers down to your local Postgres database. 

---

## 🛠 Tech Stack
| Domain | Technology | Purpose |
| ------ | ---------- | ------- |
| **Frontend** | React, TypeScript, Vite | Delivers a stunning, hardware-accelerated Glassmorphism Interface. |
| **Backend API** | Node.js, Express | Acts as the central nervous system handling external client traffic, JWT generation, and User data logic. |
| **AI Microservice** | Python, FastAPI | Performs deep ML logic holding HuggingFace transformers. |
| **Vector Engine** | PostgreSQL (`pgvector`) | Stores the 384-dimensional array maps and performs high-speed `<=>` similarity clustering directly via SQL. |
| **Cache Engine** | Redis | Blocks network spam and caches expensive LLM computations over 24-hour periods. |

---

## 🚀 Getting Started

Since this project relies on bridging multiple operating systems contexts (Node, Python, Postgres), we highly recommend using Docker to initialize the data layers. Everything is bundled natively through Makefiles to bypass complex commands. 

### Prerequisites
- Docker & Docker-Compose (Required for Database provisioning)
- Node.js (>= 20)
- Python (>= 3.11)

### 1. Spin up the Data Layer
You must initialize `pgvector` and `redis` before you do anything. From the root directory:
```bash
docker compose up -d
```

### 2. Start the AI Microservice
Inside a new terminal:
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```
*(The AI Service boots on localhost:8000)*

### 3. Start the Backend Gateway
Inside a new terminal:
```bash
cd backend
npm install
npm run dev
```
*(The Backend Express router boots on localhost:3000)*

### 4. Boot the Interface
Inside a final terminal:
```bash
cd frontend
npm install
npm run dev
```
*(The App launches on locally on localhost:5173).*

---

## ☁️ Deployment

For taking the software into a true production context, you have two choices:
1. **Managed Scaling**: Deploy the `/frontend` automatically through **Vercel**, deploy the two Node and Python folders to **Render.com**, and configure the databases natively using a **Supabase** instance which supports `pgvector` out of the box!
2. **Container Mode**: We've included full monolithic `Dockerfile`s in each package. You can launch `make build` inside a DigitalOcean Droplet Linux VPS to instantly map the entire application universally without needing Node or Python installed on the host OS. 

---
> *Architected to push the limits of semantic mapping inside the academic domain.*
