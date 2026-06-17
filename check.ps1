Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("public/assets/black_tights_front.png")
$top = -1
$bottom = -1
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        if ($bmp.GetPixel($x, $y).A -gt 0) {
            if ($top -eq -1) { $top = $y }
            $bottom = $y
        }
    }
}
Write-Host "Top: $top, Bottom: $bottom, Height: $($bmp.Height)"
