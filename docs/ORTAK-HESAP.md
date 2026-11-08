# Ortak hesap ve bulut kayıtları — 8 Kasım 2026

## Yapı
- Proje: `nur-mobile-ec382`, ücretsiz Spark planı.
- Firebase Authentication: e-posta/şifre etkin. Kullanıcı adı Auth profilindeki `displayName` alanıdır; giriş e-posta ile yapılır.
- Firestore: `(default)`, Avrupa `eur3`. Kurallar `firebase/firestore.rules` dosyasında; 7 Kasım 2026 tarihinde konsola yayımlandı.
- Web uygulaması: `NUR Ortak Hesap`, 8 Kasım 2026 tarihinde kaydedildi. `firebase/web-config.json` yalnız halka açık istemci bağlantı bilgilerini içerir; yönetici anahtarı veya parola içermez.
- `src/account/account.mjs` aynı denetleyiciyi mobil ve site paketlerinde kullanır. `scripts/prepare-web.mjs`, Firebase SDK'yı yerel pakete dahil eder.
- Mobilde Ayarlar > Profil, sitede üst menüde Hesabım. Sitenin genel Ayarlar bölümü gizli kalır.

## Kayıt kapsamı ve davranış
Kur’an ayracı ve notları, Mushaf sayfası, aktif zikir ve geçmiş oturumları, eğitim ilerlemeleri eşitlenir. İzinler, konum ve indirilen çevrimdışı dosyalar cihaza özeldir.

Bulut kaydı için e-posta doğrulaması gerekir. İlerleme önce cihazda tutulur; bağlantı varken değişiklikten sonra eşitlenir. Hesaba ilk girişte bulut kaydı alınır. Okuma sırasında diğer cihazdan gelen farklı kayıtlar sessizce ekranı değiştirmez; profil ekranından açılır. Aynı kayıt iki cihazda değiştirilmişse yerel veya bulut sürümü seçilir. Farklı alanlar birleştirilir.

Misafir ilerlemesi hesap verilerine kendiliğinden karıştırılmaz. Profildeki aktarım düğmesiyle eklenebilir. Çakışan misafir aktarımı otomatik yapılmaz ve misafir kopyası korunur. Hesaptan çıkınca misafir kaydı geri gelir. Hesapların gönderilmeyi bekleyen yerel kayıtları ayrı tutulur.

## Doğrulama
- `test-account-progress.mjs`: birleştirme, çakışma, silme ve geçersiz veri sınırları.
- `test-account-sync.cjs`: gerçek hesap oluşturmadan simüle Firebase ile iki tarayıcı bağlamı; giriş/çıkış, misafir ayrımı, hesap değişimi, iki cihaz, çevrimdışı değişiklik ve açık çakışma seçimi.
- `test-account-ui.cjs`: hizmet yapılandırılmamış durum, hesap penceresi ve 360/768/1440 genişlikte gezinme.
- Canlı Firebase denetimi: giriş uç noktası etkin; mevcut olmayan test adresi reddedildi. Kimliksiz Firestore okuması 403 ile reddedildi. Canlı kullanıcı yaratılmadı.

## Cihaz kabul testi henüz yapılmadı
Yeni APK bu çalışma sırasında oluşturulmadı/yayımlanmadı. Gerçek bir hesapta doğrulama e-postasının alınması, Android WebView oturum kalıcılığı ve telefon-site arasında canlı eşitleme ilk APK testinde doğrulanmalıdır. Simüle testler fiziksel telefon sonucu değildir.

Önerilen kabul testi: hesap oluştur ve e-postayı doğrula; Kur’an ayracı ve eğitim ilerlemesi kaydet; sitede aynı hesapla aç; telefonda çevrimdışı ilerle ve yeniden bağlan; iki cihazda aynı ayracı değiştirip çakışma seçimini dene; çıkış ve farklı hesap girişinde kayıtların ayrıldığını doğrula.
