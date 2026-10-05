#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
source_logo="${1:-$project_root/branding/app-logo-source.png}"
res="$project_root/android/app/src/main/res"

if [[ ! -f "$source_logo" ]]; then
  echo "Logo bulunamadı: $source_logo" >&2
  exit 1
fi

mkdir -p "$project_root/branding"
cp "$source_logo" "$project_root/branding/app-logo-source.png"

declare -A launcher_sizes=(
  [mdpi]=48 [hdpi]=72 [xhdpi]=96 [xxhdpi]=144 [xxxhdpi]=192
)
declare -A foreground_sizes=(
  [mdpi]=108 [hdpi]=162 [xhdpi]=216 [xxhdpi]=324 [xxxhdpi]=432
)

for density in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  launcher="${launcher_sizes[$density]}"
  foreground="${foreground_sizes[$density]}"
  safe_logo=$((foreground * 2 / 3))
  target="$res/mipmap-$density"
  mkdir -p "$target"

  convert "$source_logo" -filter Lanczos -resize "${launcher}x${launcher}" \
    -gravity center -extent "${launcher}x${launcher}" "$target/ic_launcher.png"
  cp "$target/ic_launcher.png" "$target/ic_launcher_round.png"

  convert -size "${foreground}x${foreground}" xc:none \
    \( "$source_logo" -filter Lanczos -resize "${safe_logo}x${safe_logo}" \) \
    -gravity center -composite "$target/ic_launcher_foreground.png"
done

while IFS=' ' read -r splash_path width height; do
  min_side=$((width < height ? width : height))
  logo_size=$((min_side * 42 / 100))
  convert -size "${width}x${height}" xc:'#194d3f' \
    \( "$source_logo" -filter Lanczos -resize "${logo_size}x${logo_size}" \) \
    -gravity center -composite "$splash_path"
done < <(find "$res" -type f -name splash.png -print0 | while IFS= read -r -d '' file; do
  dimensions="$(identify -format '%w %h' "$file")"
  printf '%s %s\n' "$file" "$dimensions"
done)

echo "NUR launcher ve açılış görselleri oluşturuldu."
