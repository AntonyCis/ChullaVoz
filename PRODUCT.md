# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: .NET 10 (ASP.NET + EF Core + Npgsql) + React 19 + Vite 8 + Tailwind 4 + Postgres 15 (Neon serverless) + Docker. Deploy Render (API) + Vercel (frontend) + Neon (DB). Elegido por codebase existente y demo CV con free tiers.

## Users

**Primario:** Dueño de pequeño negocio ecuatoriano que necesita entender qué dicen sus clientes sin leer cientos de reviews dispersos en GoogleMaps/Instagram/Facebook/Twitter.

**Secundario:** Community manager que gestiona varias marcas y necesita dashboard centralizado por businessId.

**Evaluador:** Reclutador / hiring manager que entra 1 vez desde el CV (https://chulla-voz.vercel.app/) y decide en 3s si la demo funciona y el craft es senior. Necesita carga instantánea, prueba de integración full-stack y repo pro.

Jobs: 1) Agregar review → ver análisis de sentimiento + topics automáticamente. 2) Consultar analytics agregados para decidir acciones. 3) Verificar calidad técnica en GitHub/API docs.

## Product Purpose

Centralizar reviews multi-fuente, analizar sentimiento con IA (Hugging Face), y convertirlo en analytics accionables para negocios pequeños que no tienen equipo de data. Éxito = dueño pasa de "tengo reviews dispersos" a "sé qué mejorar esta semana" en <2 min, y reclutador ve demo viva + código mantenible.

## Positioning

A diferencia de un dashboard genérico o un clasificador de texto aislado, ChullaVoz combina **ingesta multi-fuente + análisis IA + recomendaciones en lenguaje de negocio** en un flujo cerrado por businessId, con stack productivo real (no mock) desplegado en infra serverless.

## Operating Context

* Flujo por `businessId` (demo: `550e8400-e29b-41d4-a716-446655440000`).
* Frontend Vercel (`chulla-voz.vercel.app`) → `VITE_API_URL` → API Render (`chullavoz-api.onrender.com`, free tier duerme 15min → 30s wake) → Neon Postgres pooled.
* Local: `docker-compose up` (postgres:5432, api:5189, frontend:3000).
* Docs: `/swagger`, `/health` para deploy checks.
* Evaluación en móvil y desktop, primera visita con spinner `Despertando servidor...`.

## Capabilities and Constraints

**Capacidades confirmadas:**
- CRUD reviews `POST /api/reviews`, `GET /api/reviews/{id}`, `GET /api/reviews/business/{id}`
- Analytics `GET /api/analytics/business/{id}` → totalReviews, averageRating, sentimentSummary, topTopics, actionRecommendations
- SentimentAnalysisService (Hugging Face), AnalyticsService, ReviewService
- EF Core migrations auto en startup (`Program.cs:40`)

**Constraints:**
- Mantener Docker, .NET 10 + React, Neon/Render/Vercel free tiers. No añadir auth/pagos para demo CV.
- CORS `AllowAll` para Vercel, `PORT=10000` en Render, Swagger también en Production.
- `HUGGINGFACE_API_KEY` requerido, `channel_binding=require` requiere `libgssapi-krb5-2` en runtime.
- BusinessId fijo para demo, sin multi-tenant real.

**Terminología:** Review (author, content, source, rating), SentimentAnalysis (sentiment, confidence, topics), BusinessAnalytics.

**Undecided:** Multi-negocio real, auth, i18n, pricing.

## Brand Commitments

* Nombre público: **ChullaVoz** (código interno `SentimentHub`). Mantener.
* Voz: directa, ecuatoriana, sin jerga corporativa. Copy existente: "Análisis de sentimiento para pequeños negocios ecuatorianos".
* Sin logo/paleta cerrada — redesign libre dentro de brief.

## Evidence on Hand

* Código: `frontend/src/pages/Dashboard.tsx:7` + `components/ReviewForm.tsx:10`, `Analytics.tsx:9`, `services/api.ts:4`
* API: `src/SentimentHub.API/Controllers/ReviewsController.cs`, `AnalyticsController.cs`, `Services/SentimentAnalysisService.cs:38`
* Infra: `Dockerfile`, `frontend/Dockerfile`, `render.yaml`, `docker-compose.yml`, `neon.ts`
* Deploy vivo: frontend `https://chulla-voz.vercel.app/`, swagger `https://chullavoz-api.onrender.com/swagger/index.html`
* Ausencias que no se deben fabricar: testimonials reales, métricas de clientes, logos de negocios.

## Product Principles

1. **De reviews dispersos a decisión en 2 minutos** — cada pantalla debe responder "qué hago mañana".
2. **Demo que no parece demo** — infra real, no mocks, pero UX que explica el cold start.
3. **Craft senior visible en el repo** — código limpio, migraciones, docs y deploy importan tanto como la UI.

## Accessibility & Inclusion

Sin requisito específico más allá de web estándar. Dashboard debe ser navegable por teclado, contraste legible y responsive móvil (propietario revisa desde el celular en el local).
