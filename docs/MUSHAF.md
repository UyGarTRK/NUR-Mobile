# Diyanet mushaf okuyucusu — 4 Kasım 2026

Sûre bilgisi ekranındaki iki seçenek mevcut meal okuyucusunu ve yeni sayfa okuyucusunu açar. Uygulamanın genel teması değiştirilmedi.

Kaynak: https://webdosya.diyanet.gov.tr/kuran/kuranikerim/dosyalar/document/kuran.pdf
Diyanet İşleri Başkanlığı, Yayın No 949, Kur’an-ı Kerim (Rahle Boy), 5. baskı 2018. Orijinal PDF değiştirilmeden src/mushaf içinde tutulur. Metin yeniden dizilmez. PDF.js 5.6.205 yerel olarak paketlenmiştir; lisansı vendor/LICENSE dosyasındadır.

PDF 616 yaprak içerir. Okuyucu PDF 2–606 arasını gösterir: numarasız Fâtiha (mantıksal 0) ve basılı 1–604 sayfalar. Ek dualar ve yayın sayfaları okuma aralığına dahil değildir. 114 sûre başlangıcı basılı fihristten scripts/index-diyanet-mushaf.py ile çıkarıldı; manifest.json kaynak ve SHA-256 bilgisini içerir. Farklı mushafların sayfa numaralarıyla karıştırılmamalıdır.

Sayfa/cüz seçimi, önceki/sonraki, kaydırma, büyütme ve cihazda son konumu saklama vardır. Ses ve hatim tamamlama takibi henüz yoktur. nurMushafPositionV1 yalnız açılmış son sayfayı saklar; okunmuş/tamamlanmış sayfa anlamına gelmez.

tests/handoff/test-mushaf.cjs gerçek yerel PDF ile çevrimdışı sayfa açılışını, sınırları, büyütmeyi, son konuma dönüşü, mevcut meal ekranını ve 320/390/530 piksel genişlikleri kontrol eder. Tarayıcı testi fiziksel Android cihaz testi değildir. Güncel kaynak için APK oluşturulmadı veya yayımlanmadı. Sonraki telefon testinde eski Android WebView uyumluluğu, bellek kullanımı, geri tuşu ve ekran dönüşü ayrıca kontrol edilmeli.
