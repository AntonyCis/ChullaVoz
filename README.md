# ChullaVoz — SentimentHub

> Análisis de sentimiento para pequeños negocios ecuatorianos. Demo viva para CV.

[![Live Demo](https://img.shields.io/badge/demo-chulla--voz.vercel.app-black?style=for-the-badge&logo=vercel)](https://chulla-voz.vercel.app/)
[![API Docs](https://img.shields.io/badge/API-swagger-85EA2D?style=for-the-badge&logo=swagger)](https://chullavoz-api.onrender.com/swagger/index.html)
[![Health](https://img.shields.io/badge/health-chullavoz--api.onrender.com-blue?style=flat&logo=render)](https://chullavoz-api.onrender.com/health)
[![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Neon](https://img.shields.io/badge/Postgres-Neon-00E699?logo=postgresql)](https://neon.tech/)

**Frontend (Vercel)** siempre despierto + **API (Render)** con cold start ~30s + **DB (Neon)** serverless Postgres. Stack dockerizado.

---

## 🚀 Live Demo

| Servicio | URL |
|---|---|
| **App** | **https://chulla-voz.vercel.app/** |
| **API Swagger** | https://chullavoz-api.onrender.com/swagger/index.html |
| **Health** | https://chullavoz-api.onrender.com/health |

> **Nota CV:** La API en Render free tier se duerme tras 15min sin tráfico. La primera carga puede tardar ~30s — el frontend muestra spinner `Despertando servidor...`. Las siguientes son instantáneas.

---

## ✨ Qué hace

* **Ingesta de reviews** desde GoogleMaps / Instagram / Facebook / Twitter (`POST /api/reviews`)
* **Análisis de sentimiento** con Hugging Face NLP (`SentimentAnalysisService`)
* **Analytics por negocio** (`GET /api/analytics/business/{id}`): total reviews, rating promedio, distribución de sentimiento, top topics, recomendaciones accionables
* Dashboard React con `Recharts`: `SentimentChart`, `TopicsChart`, `Analytics`

Business demo: `550e8400-e29b-41d4-a716-446655440000`

---

## 🧱 Stack

| Capa | Tech |
|---|---|
| **Backend** | ASP.NET 10, EF Core 10, Npgsql, FluentValidation, Serilog, Swashbuckle |
| **IA** | Hugging Face Inference API (`hf_*`), Azure OpenAI (opcional) |
| **DB** | Postgres 15 — Neon Serverless (pooled `ep-withered-frog-b4te11cb-pooler`) |
| **Frontend** | React 19, Vite 8, TypeScript, Tailwind 4, Axios, Recharts |
| **Infra** | Docker, Render (API), Vercel (frontend), Neon (DB), GitHub Actions CI |

---

## 🏗️ Arquitectura

```
[Vercel] chulla-voz.vercel.app  --VITE_API_URL-->  [Render Docker] chullavoz-api.onrender.com --Host=neon.pooler--> [Neon] neondb (production)
   Vite + React                                        ASP.NET 10 + EF Core           Postgres 15
   never sleeps                                        sleeps 15min -> 30s wake        free forever
```

---

## 💻 Desarrollo local

```bash
# 1. Clonar y env
git clone https://github.com/AntonyCis/ChullaVoz.git
cd ChullaVoz

# .env.local ya está gitignored, copia el ejemplo:
# POSTGRES_USER, DATABASE_URL (Neon pooled), HUGGINGFACE_API_KEY, etc.

# 2. Con Docker (recomendado)
docker-compose up --build
# API: http://localhost:5189/swagger
# Frontend: http://localhost:3000  (Vite) o http://localhost:5173
# Postgres: localhost:5432

# 3. O sin Docker
dotnet restore src/SentimentHub.API/SentimentHub.API.csproj
dotnet ef database update --project src/SentimentHub.API  # requiere DATABASE_URL o ConnectionStrings__DefaultConnection
dotnet run --project src/SentimentHub.API
cd frontend && npm ci && npm run dev
```

Env vars clave:
```
# .env.local (local) / Render Environment (prod)
DATABASE_URL=postgresql://neondb_owner:***@ep-withered-frog-b4te11cb-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
ConnectionStrings__DefaultConnection=Host=ep-withered-frog-b4te11cb-pooler...;Port=5432;Database=neondb;Username=...;Password=...;Ssl Mode=Require;Trust Server Certificate=true
VITE_API_URL=https://chullavoz-api.onrender.com/api  # en Vercel
HUGGINGFACE_API_KEY=hf_...
```

---

## 📦 Estructura

```
ChullaVoz/
├── src/
│   ├── SentimentHub.API/      # Controllers, Services, Data, Migrations
│   │   ├── Controllers/       # ReviewsController, AnalyticsController
│   │   ├── Services/          # ReviewService, SentimentAnalysisService, AnalyticsService
│   │   ├── Data/              # ApplicationDbContext, ApplicationDbContextFactory
│   │   └── Program.cs         # CORS AllowAll, /health, Swagger prod, fallback DATABASE_URL
│   └── SentimentHub.Core/
├── frontend/
│   ├── src/
│   │   ├── services/api.ts    # VITE_API_URL || localhost
│   │   ├── pages/Dashboard.tsx
│   │   └── components/        # ReviewForm, Analytics, SentimentChart, TopicsChart
│   └── Dockerfile             # ARG VITE_API_URL
├── Dockerfile                 # ASP.NET 10 + libgssapi-krb5-2 (Neon channel_binding)
├── docker-compose.yml
├── render.yaml                # Blueprint Render (API docker, healthCheck /health)
├── neon.ts                    # defineConfig({}) — project patient-lake-45433138
└── .github/workflows/ci.yml   # Build .NET + Vite
```

---

## 🔌 API

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/reviews` | Crear review `{businessId, author, content, source, rating}` |
| `GET` | `/api/reviews/{id}` | Obtener review |
| `GET` | `/api/reviews/business/{businessId}` | Reviews por negocio |
| `GET` | `/api/analytics/business/{businessId}` | Analytics agregados |
| `GET` | `/health` | Health check Render |
| `GET` | `/swagger` | Docs |

---

## 🚢 Deploy

* **Render:** Blueprint desde `render.yaml` → `env: docker` → `PORT=10000` → `ConnectionStrings__DefaultConnection` (Neon pooled + libgssapi fix)
* **Vercel:** Project `frontend` → `VITE_API_URL` → auto-deploy en push a `main`
* **Neon:** `neon link --project-id patient-lake-45433138 --branch production` + `neon deploy` + `dotnet ef database update` con `ConnectionStrings__DefaultConnection`

Migración a Render desde Fly/Railway sin cambios de código (solo CORS + PORT + health).

---

## 📄 Licencia

MIT — Proyecto para CV.
