# NUR Mobil Uygulama Güvenlik Temeli

## Güvenlik hedefi

Uygulamanın HTML, JavaScript, görsel ve metin dosyalarının kullanıcı cihazında izinsiz değiştirilmesini zorlaştırmak; değiştirilmiş uygulamaların güvenilir sunucu hizmetlerine erişmesini engellemek; konum, kişisel notlar ve kullanım verilerini gereksiz yere toplamamak veya açık biçimde saklamamak.

Hiçbir istemci uygulaması mutlak biçimde değiştirilemez değildir. Güvenilir sınır istemci kodu değil; imzalı dağıtım paketi, işletim sistemi güvenli depolaması ve sunucu tarafındaki yetkilendirmedir.

## Mevcut HTML sürümüne uygulanan katman

- Ağ bağlantıları yalnızca uygulamanın kullandığı HTTPS alan adlarıyla sınırlandırıldı.
- İsteklerde çerez ve HTTP kimlik bilgisi gönderimi kapatıldı.
- İsteklere 15 saniyelik zaman aşımı ve `no-store` önbellek politikası eklendi.
- CSP ile komut dosyası, stil, bağlantı, çerçeve, nesne ve form kaynakları sınırlandırıldı.
- Referrer bilgisi gönderimi kapatıldı.
- Kur'an API'sinden gelen Arapça metin ve mealler HTML olarak çalıştırılmadan önce güvenli metne dönüştürülüyor.
- Hutbe içeriği alınırken kaynak alan adı ayrıca doğrulanıyor.

## Mobil pakete geçerken zorunlu mimari

### 1. Paket ve kaynak bütünlüğü

- Android sürümü yalnızca imzalı AAB/APK, iOS sürümü yalnızca imzalı IPA olarak dağıtılmalı.
- HTML, JavaScript, yazı tipi, ikon ve görseller CDN yerine uygulama paketine alınmalı.
- Üretim imzalama anahtarları kaynak kod deposunda veya geliştirici bilgisayarında düz dosya olarak tutulmamalı; korumalı CI/CD sırrı veya donanım destekli anahtar kasası kullanılmalı.
- Üretim derlemesinde hata ayıklama, uzaktan WebView denetimi ve kaynak haritaları kapatılmalı.
- İçerik güncellemeleri HTTPS üzerinden alınmalı; her içerik paketi sunucuda özel anahtarla imzalanmalı ve uygulama gömülü açık anahtarla Ed25519 imzasını doğrulamadan içeriği kullanmamalı.

### 2. WebView güvenliği

- Rastgele internet sayfaları uygulama WebView'ında açılmamalı; dış bağlantılar sistem tarayıcısına gönderilmeli.
- Android'de `allowFileAccess`, `allowContentAccess`, universal file URL erişimi ve gereksiz JavaScript köprüleri kapatılmalı.
- Yalnızca paket içindeki uygulama origin'i ile izin verilen HTTPS API alan adları kullanılmalı.
- iOS'ta `WKWebView` gezinme politikasıyla alan adı beyaz listesi uygulanmalı.
- Kamera, mikrofon ve konum izinleri yalnızca özelliğin kullanıldığı anda istenmeli. Mikrofon ve kamera kullanılmıyorsa manifestten tamamen çıkarılmalı.

### 3. Sunucu/API sınırı

- Gizli API anahtarları mobil pakete veya JavaScript'e kesinlikle konulmamalı.
- Anahtarlı üçüncü taraf servislerine uygulama doğrudan değil, NUR sunucusu üzerinden erişmeli.
- Sunucu tüm parametreleri tekrar doğrulamalı; istemciden gelen şehir, koordinat, sure, ayet veya kaynak bilgisine güvenmemeli.
- Hız sınırlama, istek boyutu sınırı, şema doğrulama ve kötüye kullanım kaydı uygulanmalı.
- Android istekleri için Play Integrity, iOS istekleri için App Attest doğrulaması sunucuda yapılmalı. Başarısız bütünlük sonucu tek başına kullanıcıyı kilitlemek yerine risk sinyali olarak değerlendirilip hassas işlemlerde ek kontrol uygulanmalı.

### 4. Yerel veri güvenliği

- Konum, Kur'an notları ve ilerleme bilgileri hassas kabul edilmeli.
- Hassas veri `localStorage` içinde tutulmamalı. Android Keystore / iOS Keychain ile korunan şifreli yerel depoya taşınmalı.
- Namaz vakti, tema ve menü düzeni gibi hassas olmayan tercihler uygulamanın özel depolamasında tutulabilir.
- Yedeklemeye girmemesi gereken not ve anahtar dosyaları Android Auto Backup ve iCloud yedekleme kurallarından çıkarılmalı.
- Uygulama kaldırıldığında kullanıcı verilerinin beklenen şekilde silindiği doğrulanmalı.

### 5. Ağ güvenliği

- Yalnızca TLS/HTTPS kullanılmalı; cleartext trafik kapatılmalı.
- Android Network Security Configuration içinde izin verilen alan adları tanımlanmalı.
- Sertifika sabitleme ancak anahtar yenileme ve yedek pin planı hazırsa uygulanmalı.
- API yanıtlarına maksimum boyut, içerik türü ve zaman aşımı kontrolü eklenmeli.

### 6. İçerik ve yönetim güvenliği

- Kur'an, meal, hadis, dua, hutbe ve siyer içerikleri sürümlü bir içerik manifestine bağlanmalı.
- Manifest her dosyanın SHA-256 özetini, içerik sürümünü ve imzasını taşımalı.
- Uygulama doğrulama başarısızsa eski doğrulanmış içeriği kullanmalı; bozuk paketi göstermemeli.
- Yönetim paneli mobil uygulamanın içinde bulunmamalı. Ayrı alan adı, çok faktörlü giriş, rol tabanlı yetki ve değişiklik günlüğü kullanılmalı.

## Yayına çıkış kapıları

1. OWASP MASVS tabanlı tehdit modeli tamamlanmalı.
2. Android ve iOS üretim derlemelerinde gizli anahtar taraması yapılmalı.
3. Statik analiz, bağımlılık zafiyet taraması ve mobil dinamik test uygulanmalı.
4. Değiştirilmiş paket, MITM, bozuk içerik paketi, çevrimdışı çalışma ve izin reddi senaryoları test edilmeli.
5. Kritik bulgular kapatılmadan mağaza sürümü oluşturulmamalı.

## Geçiş sırası

1. Mevcut HTML uygulamasını modüllere ayır ve bütün üçüncü taraf varlıkları yerelleştir.
2. Mobil kabuğu oluştur; güvenli WebView ve izin politikalarını uygula.
3. Yerel veriyi güvenli depoya taşı.
4. NUR API geçidini ve imzalı içerik dağıtımını kur.
5. Play Integrity ve App Attest doğrulamasını ekle.
6. Güvenlik testlerini otomatik derleme sürecine bağla.

