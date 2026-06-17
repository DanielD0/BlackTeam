Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("public/assets/black_tights_front.png")
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()
$g = [System.Drawing.Graphics]::FromImage($bmp)
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Red, 15)
$g.DrawRectangle($pen, 0, 0, $bmp.Width, $bmp.Height)
$pen.Dispose()
$g.Dispose()
$bmp.Save("public/assets/black_tights_front.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Red border added successfully!"
