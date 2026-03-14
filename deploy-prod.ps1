# --- CONFIGURATION ---
$projectName = "euser-safaris-web"
$dockerBinDir = "C:\Program Files\Docker\Docker\resources\bin"
$dockerPath = Join-Path $dockerBinDir "docker.exe"

# Add Docker bin to Path for the current session (fixes credential helper issues)
$env:Path = "$dockerBinDir;$env:Path"

Write-Host "Starting Production Deployment for $projectName..."

# 1. Build the production image
Write-Host "Building Docker image..."
& $dockerPath compose build

# 2. Stop and remove existing containers (if any)
Write-Host "Cleaning up old instances..."
& $dockerPath compose down

# 3. Ensure network exists
if (!(& $dockerPath network ls -q -f name=n8n-network)) { 
    Write-Host "Creating n8n-network..."
    & $dockerPath network create n8n-network 
}

# 4. Start the application stack
Write-Host "Launching containers..."
& $dockerPath compose up -d

Write-Host "Deployment successful!"
Write-Host "Internal bridge to Cloudflare established on n8n-network."
& $dockerPath ps
