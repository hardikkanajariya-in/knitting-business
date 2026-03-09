# Nirbhai Group — Image Download Script
# Run this in PowerShell: .\download-images.ps1

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$imgDir = Join-Path $baseDir "assets\img"

# Create directories
@("hero", "products", "factory", "team") | ForEach-Object {
    $dir = Join-Path $imgDir $_
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
}

$images = @(
    # ── HERO / BANNER BACKGROUNDS ──
    # Home hero: Industrial knitting machine close-up with wires & mechanisms
    @{ url = "https://images.pexels.com/photos/36327501/pexels-photo-36327501.jpeg?auto=compress&cs=tinysrgb&w=1920"; path = "hero\hero-bg.jpg" },
    # Home hero split: Worker operates textile machinery in manufacturing plant
    @{ url = "https://images.pexels.com/photos/6525848/pexels-photo-6525848.jpeg?auto=compress&cs=tinysrgb&w=1920"; path = "hero\hero-split.jpg" },
    # About banner: Long hallway in textile factory with industrial machinery
    @{ url = "https://images.pexels.com/photos/8246487/pexels-photo-8246487.jpeg?auto=compress&cs=tinysrgb&w=1920"; path = "hero\about-bg.jpg" },
    # NK banner: Industrial textile spinning machine in action
    @{ url = "https://images.pexels.com/photos/36327502/pexels-photo-36327502.jpeg?auto=compress&cs=tinysrgb&w=1920"; path = "hero\nk-bg.jpg" },
    # NC banner: Luxury quilted leather car interior (automotive upholstery)
    @{ url = "https://images.pexels.com/photos/4149333/pexels-photo-4149333.jpeg?auto=compress&cs=tinysrgb&w=1920"; path = "hero\nc-bg.jpg" },
    # Sustainability banner: Green forest / nature
    @{ url = "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1920"; path = "hero\sustainability-bg.jpg" },

    # ── NK PRODUCT IMAGES (Knitted Fabrics for Automotive) ──
    # Raised Fabrics: Blue textured upholstery fabric pattern
    @{ url = "https://images.pexels.com/photos/925706/pexels-photo-925706.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\raised.jpg" },
    # 3D Spacer Fabrics: Detailed blue fabric showcasing rich texture
    @{ url = "https://images.pexels.com/photos/4863009/pexels-photo-4863009.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\3d.jpg" },
    # FR (Flame Retardant): Thread spools in textile factory (industrial fabric production)
    @{ url = "https://images.pexels.com/photos/6717035/pexels-photo-6717035.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\fr.jpg" },
    # Coated Textiles: Rows of textile rolls stored in factory
    @{ url = "https://images.pexels.com/photos/236748/pexels-photo-236748.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\coated.jpg" },

    # ── NC PRODUCT IMAGES (Chemical Coatings & Leather for Automotive) ──
    # Synthetic Leather: White leather luxury car interior seats
    @{ url = "https://images.pexels.com/photos/3778766/pexels-photo-3778766.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\synthetic-leather.jpg" },
    # Genuine Leather: Brown leather Rolls-Royce car seats (premium automotive)
    @{ url = "https://images.pexels.com/photos/3894048/pexels-photo-3894048.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\genuine-leather.jpg" },
    # Direct Coating: Luxury car seat close-up with red/black leather upholstery
    @{ url = "https://images.pexels.com/photos/32613926/pexels-photo-32613926.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\direct-coating.jpg" },
    # Specialty Finishes: Blue suede car seat with geometric patterns
    @{ url = "https://images.pexels.com/photos/14786437/pexels-photo-14786437.jpeg?auto=compress&cs=tinysrgb&w=800"; path = "products\others.jpg" },

    # ── FACTORY IMAGES ──
    # NK Factory: Textile factory yarn production line with automated machinery
    @{ url = "https://images.pexels.com/photos/8246480/pexels-photo-8246480.jpeg?auto=compress&cs=tinysrgb&w=1200"; path = "factory\nk-factory.jpg" },
    # NC Factory: Worker inspects spools on industrial textile machinery
    @{ url = "https://images.pexels.com/photos/3544567/pexels-photo-3544567.jpeg?auto=compress&cs=tinysrgb&w=1200"; path = "factory\nc-factory.jpg" },
    # Team Factory: Indian factory workers in textile mill (blue uniforms)
    @{ url = "https://images.pexels.com/photos/31090804/pexels-photo-31090804.jpeg?auto=compress&cs=tinysrgb&w=1200"; path = "factory\team-factory.jpg" },

    # ── TEAM HEADSHOTS ──
    # Rajeev Kumar (MD, Chairman): Indian businessman in white shirt holding suit jacket
    @{ url = "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400"; path = "team\rajeev-kumar.jpg" },
    # Prathit Kamdar (CEO): Cheerful Indian businessman in gray shirt
    @{ url = "https://images.pexels.com/photos/7580937/pexels-photo-7580937.jpeg?auto=compress&cs=tinysrgb&w=400"; path = "team\prathit-kamdar.jpg" }
)

Write-Host "`n=== Nirbhai Group — Downloading $($images.Count) images ===" -ForegroundColor Cyan
Write-Host "Target: $imgDir`n" -ForegroundColor Gray

$success = 0
$failed = 0

foreach ($img in $images) {
    $dest = Join-Path $imgDir $img.path
    $name = $img.path
    try {
        Write-Host "  Downloading: $name ... " -NoNewline
        Invoke-WebRequest -Uri $img.url -OutFile $dest -UseBasicParsing -ErrorAction Stop
        $size = [math]::Round((Get-Item $dest).Length / 1KB, 1)
        Write-Host "OK (${size} KB)" -ForegroundColor Green
        $success++
    } catch {
        Write-Host "FAILED: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n=== Done! $success downloaded, $failed failed ===" -ForegroundColor Cyan
Write-Host "Images saved to: $imgDir`n"
