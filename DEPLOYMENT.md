# Euser Safaris Deployment Guide

## 🚀 Deployment Script (PowerShell)

Save this as `deploy.ps1` in your project root. Replace `YOUR_TUNNEL_TOKEN` with your actual Cloudflare Tunnel token.

```powershell
# --- CONFIGURATION ---
$projectName = "euser-safaris-web"
$imageTag = "latest"

Write-Host "🚀 Starting Deployment for $projectName..." -ForegroundColor Cyan

# 1. Build the production image
Write-Host "📦 Building Docker image..."
docker compose build

# 2. Stop and remove existing containers (if any)
Write-Host "🛑 Cleaning up old instances..."
docker compose down

# 3. Start the application stack
Write-Host "✨ Launching containers..."
docker compose up -d

Write-Host "✅ Deployment successful!" -ForegroundColor Green
Write-Host "🌐 Your site is now running on port 3000 and being bridged to Cloudflare."
docker ps
```

## 🛠️ Environment Setup

1.  **TUNNEL_TOKEN**: Ensure you have a `.env` file in `euser-safaris-web/` with:
    ```env
    TUNNEL_TOKEN=your_token_here
    ```
2.  **Cloudflare DNS**:
    -   Go to [Zero Trust Dashboard](https://one.dash.cloudflare.com/).
    -   Navigate to **Networks** > **Tunnels**.
    -   Find your tunnel (or create a new one).
    -   Add a **Public Hostname**:
        -   **Subdomain**: `safari` (or your Choice)
        -   **Domain**: `yourdomain.com`
        -   **Service Type**: `HTTP`
        -   **URL**: `euser-safaris-web:3000` (matches the service name in docker-compose.yml)

## 📦 Verification

Run `docker logs -f cloudflare-tunnel` to verify the connection is established.
