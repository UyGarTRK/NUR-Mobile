# Sistem analizi sonrası düzeltme kaydı

## 8 Ekim 2026 — Vakit güvenilirliği düzeltmeleri (henüz APK’ya alınmadı)

Web kaynağı: 2026.10.08-vakit-guvenilirlik-1. Telefonda kullanıcı beyanıyla 0.3.2-test (108) var. Bu düzeltmeler yerel kaynak ve kontrol HTML’sinde; GitHub’a gönderilmedi, yeni APK üretilmedi.

- Başlangıçtaki örnek namaz saatleri kaldırıldı. Güncel tarih/konum verisi yoksa sayaç ve saatler bekleme durumunda.
- Günlük önbellek tarih ve konum kimliğiyle doğrulanıyor. Eski biçimli günlük kayıtlar tekrar veri alınana kadar kullanılmıyor; kullanıcı tercihleri/notları silinmiyor.
- Aylık dönüştürme takvimi temizlemiyor. Farklı aylar birlikte korunuyor; eski konumun gecikmiş yanıtı reddediliyor.
- API’nin günlük tarihi ve altı vaktin biçim/sırası kontrol ediliyor; eksik veri eski saatlerle tamamlanmıyor.
- Yarın verisi yokken bugünün imsak saati yarına kopyalanmıyor. Türkiye günü ve +03:00 vakit hesabı cihazın saat diliminden ayrıldı.
- 30 günlük pencerenin kapsadığı bütün aylar yükleniyor; Ocak sonu/Şubat/Mart geçişi test edildi. Aktif uygulama, yeniden görünür olma ve bağlantının geri gelmesi yenilemeyi tetikliyor. Uygulama kapalıyken sınırsız arka plan yenilemesi eklenmedi.
- Bildirim ayarları planın son tarihini gösteriyor. Yeni konumda plan yoksa eski konum alarmları bırakılmıyor; aynı konumda geçici veri eksikliği mevcut alarmları kaldırmıyor.
- Yüzen kartın ilk konumu başlıktan aşağı alındı; kayıtlı kullanıcı konumu korundu. Azaltılmış hareket tercihi tüm CSS hareketlerini kapsıyor.
- APK üretiminde gömülü raster/sesler kayıpsız, içerik hash’iyle adlandırılan dosyalara ayrılıyor; aynı varlık tek kez yazılıyor. Kaynak HTML ve tek dosyalı kontrol kopyası korunuyor. İnceleme paketinde HTML 14.408.707 → 1.643.797 bayt (%88,6 azalma); APK toplam boyutu için henüz yeni derleme ölçümü yok.

Doğrulama: inline JS sözdizimi; bildirim ve güncelleme davranış testleri; farklı saat dilimi/boş/eski/yanlış konumlu önbellek/gece yarısı/yarın eksik/ay geçişi/gecikmiş yanıt testleri; 16 ana ekranın 320 ve 390 px genişliği; Canvas hikâye üretimi ve yerel ses URL’leri; 45 medya başvurusunun byte eşitliği. Sayfa JavaScript hatası 0. Tam Android derleme ve gerçek telefon doğrulaması bu revizyonda yapılmadı.

Açık kapsam: dua/hadis metinlerinin kaynakla tek tek editoryal doğrulanması; hesap/bulut hizmeti kurulumu; hassas yerel verinin şifreli depoya geçişi; tam modüler mimariye dönüşüm; dini günlerin resmî takvimle içerik denetimi. Bunlar otomatik metin değişikliği veya kozmetik kapatma ile tamamlanmış sayılmadı. Mevcut eğitim kilitleri, kapalı tefsir tercihi, ana tema ve imza ayarları korundu.
