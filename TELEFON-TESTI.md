# NUR Android Telefon Testi — 0.2.0-test

## APK üretme ve kurma

1. Bu projenin içeriğini GitHub deposuna aktarın; ZIP dosyasını tek dosya olarak yüklemeyin.
2. Depoda Actions → NUR Android APK → Run workflow seçin.
3. Başarılı çalışmanın Artifacts bölümünden NUR-debug-APK paketini indirin.
4. Paket içindeki app-debug.apk dosyasını telefona gönderip kurun. İzin yalnız APK'yı açtığınız uygulama için gerekir.

Bu ZIP kaynak projesidir, kurulabilir APK değildir. Debug APK test içindir; UyGar Medya mağaza imzası kullanılmaz. Aynı telefondaki eski debug paket farklı anahtarla imzalıysa üzerine kurulmayabilir. Eski uygulamayı kaldırmak cihazdaki kayıtları siler; kayıtları korumadan kaldırmayın.

## Kontroller

- İlk açılış: logo, sabit açık tema, konum seçim ekranı, taşma olmaması.
- Konum: izin verince şehir adı; izin reddedince manuel il/ilçe seçimi; uçak modunda anlaşılır durum mesajı.
- Vakitler: seçili il/ilçe ve tarih için resmi veriyle karşılaştırma; yatsı sonrası ertesi gün imsak geçişi.
- Okuma: Kur’an, eğitim, hadis, dua, siyer ve tarih okuyucularında geri tuşu doğru yere döner; kaydırma konumu korunur.
- Nur: tüm ekranlarda görünür; sürüklenir; 30 saniye sonra sağ kenara çekilir; dokununca sohbet açılır; klavye açıkken panel taşmaz.
- Profil: bilgiler cihazda kaydedilir; uygulamayı kapatıp açınca görünür. Hesap hizmeti bağlı değilken doğrulanmış giriş yapılmış gibi gösterilmez.
- Kayıtlar: eğitim tamamlanma, zikir geçmişi, notlar ve kaldığım ayet uygulama yeniden açıldığında korunur.
- Uçak modu: ikonlar, yazı tipleri ve gömülü içerikler görünür. Ağdan alınan yeni mealler, güncel hutbe, vakit ve hava durumu internet gerektirir.
- 320–430 piksel genişlik: menü, profil formları, aylık takvim ve sohbet yatay taşmaz.
- Bildirimler: bu ilk pakette arka plan ezan zamanlaması tamamlanmadı; bu madde başarısız/eksik olarak işaretlenmelidir.

## Sonraki bağlantılar

Gerçek e-posta doğrulama/senkronizasyon için hesap hizmeti; model yanıtları için güvenli Nur sunucusu; arka plan ezan için yerel bildirim planlayıcısı gerekir. Telefon testi bunların aktif olduğunu varsaymaz.
