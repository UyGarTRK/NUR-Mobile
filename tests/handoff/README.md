# Test referansları

Bu testler geliştirme ortamında çalıştırılmış Playwright/Chromium testleridir. Mutlak Playwright modül yolu, /tmp/chromium ve file:// proje yolu yerel makineye göre uyarlanmalıdır. İnternet çağrıları kapatılır; lucide ikon üretimi mock edilir. Canlı servis veya gerçek Android testi değildir.

- test-all-stories.cjs: 12 kart, indirme, günlük seçim, beğeni kalıcılığı, 320px.
- test-story-swipe.cjs: gerçek CDP dokunma hareketleriyle küme geçişi, kısa dokunma ve sınırlar.
- test-stories320.cjs: basılı tutma ve otomatik ilerleme.

Önceki ortam sonuçları BURADAN-DEVAM-ET.md ve CHANGELOG.md içinde.
