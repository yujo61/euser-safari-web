# Euser Safaris Project Context (GEMINI.md)

## 📌 Project Overview
**Name**: Euser Safaris Website
- **Goal**: Launch a high-performance, premium safari booking platform with AI-driven lead generation.
- **Brand**: Euser Safaris (Savanna Gold & Black/White aesthetic).
- **Core Stack**: Next.js 14 (App Router), TypeScript, Tailwind, Docker, n8n (AI Logic).

## 🧠 Brain Architecture (Typebot + n8n)
The website's chat widget is powered by a sophisticated RAG (Retrieval-Augmented Generation) system:
1.  **Frontend**: Typebot widget integrated into the global Next.js layout.
2.  **Logic Engine**: n8n workflow `Cj3eVDMYk6a4wB2J`.
3.  **LLM**: Gemini 2.5 Flash (via OpenRouter).
4.  **Knowledge Base**: Supabase Vector Store containing safari-specific prices, itineraries, and company FAQs.
5.  **Lead Gate**: Strict logic that requires visitor's **Name** and **Email** before releasing safari details, synced directly to **Google Sheets**.

## 📊 Current Status
- [x] Website: Production-ready and optimized.
- [x] Images: 100% verified and high-fidelity.
- [x] n8n Analysis: Completed.
- [ ] KB Sync: Preparing export of `packages.ts` for ingestion.

## 🛠️ System Instructions
- **Aesthetics**: Premium Black & White theme with Safari accents (Gold/Lush Green). High-impact visual hierarchy.
- **Code Standards**: 
    - Use Functional Components with TypeScript.
    - Modularize UI components in `src/components`.
    - Maintain Atomic Design principles.
- **Deployment**: Must be Dockerized and exposed via Cloudflare Tunnel.
- **Content**: Data defined in `src/data/packages.ts`. Supports 10 curated experiences.

## 📈 Phase-by-Phase Progress
1.  [x] **Phase 1: Initialization & Branding**
2.  [x] **Phase 2: Content Generation & Assets**
3.  [x] **Phase 3: Core UI Components**
4.  [x] **Phase 4: Production-Ready Hero Section**
5.  [x] **Phase 5: Safari Discovery Grid**
6.  [x] **Phase 6: Dynamic Detail Pages**
7.  [x] **Phase 7: AI Chat & Lead Integration**
8.  [x] **Phase 8: Dockerization & Orchestration**
9.  [x] **Phase 9: Deployment & Cloudflare Tunnel**
10. [x] **Phase 10: Final Audit & Handover**

---
*This file is updated by the Engineering Lead (AI) to maintain persistent context across sessions.*
