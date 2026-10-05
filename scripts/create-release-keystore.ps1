$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$AndroidRoot = Join-Path $ProjectRoot "android"
$KeyDir = Join-Path $AndroidRoot "keys"
$KeyFile = Join-Path $KeyDir "uygar-medya-release.jks"
$PropertiesFile = Join-Path $AndroidRoot "keystore.properties"

if ((Test-Path $KeyFile) -or (Test-Path $PropertiesFile)) {
    throw "İmza dosyası veya keystore.properties zaten mevcut. Var olan anahtarın üzerine yazılmadı."
}

$SecurePassword = Read-Host "En az 12 karakterli üretim imza parolasını girin" -AsSecureString
$Pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecurePassword)
try {
    $Password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($Pointer)
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($Pointer)
}

if ($Password.Length -lt 12) { throw "Parola en az 12 karakter olmalıdır." }

New-Item -ItemType Directory -Force -Path $KeyDir | Out-Null
& keytool -genkeypair -v `
    -keystore $KeyFile `
    -alias "uygar-medya" `
    -keyalg RSA -keysize 4096 -validity 9125 `
    -dname "CN=UyGar Medya,OU=NUR,O=UyGar Medya,C=TR" `
    -storepass $Password -keypass $Password
if ($LASTEXITCODE -ne 0) { throw "İmza anahtarı oluşturulamadı." }

$PropertiesContent = @"
storeFile=keys/uygar-medya-release.jks
storePassword=$Password
keyAlias=uygar-medya
keyPassword=$Password
"@
[System.IO.File]::WriteAllText($PropertiesFile, $PropertiesContent, (New-Object System.Text.UTF8Encoding($false)))

$Password = $null
Write-Host "UyGar Medya üretim imza anahtarı oluşturuldu. .jks dosyasını ve parolayı iki ayrı güvenli yerde yedekleyin."
