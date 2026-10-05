#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
android_root="$project_root/android"
key_dir="$android_root/keys"
key_file="$key_dir/uygar-medya-release.jks"
properties_file="$android_root/keystore.properties"

if [[ -e "$key_file" || -e "$properties_file" ]]; then
  echo "İmza dosyası veya keystore.properties zaten mevcut. Var olan anahtarın üzerine yazılmadı." >&2
  exit 1
fi

read -r -s -p "En az 12 karakterli üretim imza parolasını girin: " store_password
echo
read -r -s -p "Parolayı tekrar girin: " confirmation
echo

if [[ ${#store_password} -lt 12 ]]; then
  echo "Parola en az 12 karakter olmalıdır." >&2
  exit 1
fi
if [[ "$store_password" != "$confirmation" ]]; then
  echo "Parolalar eşleşmiyor." >&2
  exit 1
fi

mkdir -p "$key_dir"
keytool -genkeypair -v \
  -keystore "$key_file" \
  -alias "uygar-medya" \
  -keyalg RSA -keysize 4096 -validity 9125 \
  -dname "CN=UyGar Medya,OU=NUR,O=UyGar Medya,C=TR" \
  -storepass "$store_password" -keypass "$store_password"

umask 077
{
  printf 'storeFile=keys/uygar-medya-release.jks\n'
  printf 'storePassword=%s\n' "$store_password"
  printf 'keyAlias=uygar-medya\n'
  printf 'keyPassword=%s\n' "$store_password"
} > "$properties_file"

echo "UyGar Medya üretim imza anahtarı oluşturuldu. .jks dosyasını ve parolayı iki ayrı güvenli yerde yedekleyin."
