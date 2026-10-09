# Test referansları

Bu testler geliştirme ortamında çalıştırılmış Playwright/Chromium testleridir. Mutlak Playwright modül yolu, /tmp/chromium ve file:// proje yolu yerel makineye göre uyarlanmalıdır. İnternet çağrıları kapatılır; lucide ikon üretimi mock edilir. Canlı servis veya gerçek Android testi değildir.

- test-all-stories.cjs: 12 kart, indirme, günlük seçim, beğeni kalıcılığı, 320px.
- test-story-swipe.cjs: gerçek CDP dokunma hareketleriyle küme geçişi, kısa dokunma ve sınırlar.
- test-stories320.cjs: basılı tutma ve otomatik ilerleme.

Önceki ortam sonuçları BURADAN-DEVAM-ET.md ve CHANGELOG.md içinde.

## Vakit güvenilirliği testleri

- test-notification-planning.cjs: kaynak/kontrol kopyası, süre ve ses ayrımı, hata sonrası alarm koruma, konum değişikliği.
- test-updates.cjs: güncelleme ekranı durumları.
- test-prayer-data.cjs: Playwright ve Edge ile izole HTTP sunucusunda tarihler, önbellek, aylar, yarış durumu, medya ve 16 ekran. NUR_TEST_WEB_DIR hazırlanmış www dizinine ayarlanabilir; varsayılan proje www dizini. Dış HTTPS istekleri engellenir, vakit API yanıtları test içinde taklit edilir. Canlı API veya Android testi değildir.
