# NUR değişiklik ve APK kayıt defteri

## Hazırlanıyor — 8 Ekim 2026 uygulama içi test güncellemeleri

- Ekstra > Ayarlar > Uygulama Güncellemeleri ekranı ve Firebase App Distribution Android köprüsü eklendi. Henüz Android derlemesi veya gerçek cihaz doğrulaması yapılmadı.
- Otomatik kontrol sadece test hesabı bağlıysa çalışır; ilk giriş kullanıcı düğmesine bağlıdır. HTML ön izlemede kurulum devre dışıdır.
- Firebase SDK tam sürümü yalnız debug derlemelerinde bulunur. Güncelleme kurulumu Android kullanıcı onayı gerektirir.
- İş akışı eski paketteki yanlış imza önbellek yolundan `android/debug.keystore` yoluna geçirildi. Anahtar yoksa veya sertifika v162 ile eşleşmiyorsa durur; yeni imza anahtarı üretmez.
- Kullanıcı kurulu dosyayı `NUR-v162-0.3.1-test` olarak bildirdi. Yerel aynı adlı APK sertifika SHA-256: `66:97:08:97:00:5E:A9:34:50:D8:3D:F4:5F:59:56:9B:94:64:22:A8:80:89:05:0C:CA:56:4A:AA:6D:B9:09:EF`. Telefonda doğrudan doğrulanmış değildir.
- Yerel güncelleme ekranı durum testleri ve bildirim planlama testleri geçti. Firebase Android yapılandırma dosyası kullanıcıdan alınıp proje/uygulama kimlikleri doğrulanarak eklendi. App Distribution etkin, onaylanan test kullanıcısı eklendi, App Testers API etkinliği doğrulandı. GitHub dağıtım yetkisi, ilk APK/sürüm daveti ve imza anahtarının kalıcı yedeği bekliyor.


## Henüz APK’ya alınmamış — 8 Ekim 2026 bildirim ayarları

- Seçili vakitlerin giriş bildirimi Ezan Vakti sesiyle planlanır; ön hatırlatma ses anahtarı bunu sessize almaz. Ana bildirim anahtarı ve vakit seçimleri korunur.
- Süre seçimi yalnız ek ön hatırlatmayı etkiler. Plan listesi gerçek gönderim saatini Türkiye saatine göre gösterir; kapalı ayarlar aktif plan gibi sunulmaz.
- HTML ön izlemede masaüstü bildirim gönderimi kaldırıldı; yerel telefon köprüsü korunur.
- Telefon izinleri, kanal sesi, Rahatsız Etmeyin ve pil kısıtları nedeniyle kesin ses/teslim garantisi verilmez. Gerçek cihaz testi ve APK derlemesi yapılmadı.

## Henüz APK'ya alınmamış — 2026.10.08-hikayeler-1

### Eklendi
- Ayet, Hadis, Dua, Esmâül Hüsnâ günlük hikâyeleri; her birinde üç içerik.
- Gece/seher/gündüz AI arka planları, 1080x1920 metin ve kaynak içeren paylaşım PNG'si.
- Günlük sabit seçimler; beğeni ve izlenme durumunun gün içinde kalıcılığı.
- Android dosya paylaşımı için Capacitor Share ve Filesystem bağımlılıkları.
- Sağa/sola kaydırmayla doğrudan önceki/sonraki kümenin ilk hikâyesine geçiş.

### Düzeltildi / düzenlendi
- Bildirim anahtarının izin sonucu sonrasında geri kapanması için yarış durumu düzeltmesi.
- Bildirim kişiselleştirme ekranı, ayrı uygulama izin seçeneğinin kaldırılması.
- Ses varsayılanları: genel 4 / ezan öncesi 1 / ezan vakti 2.
- Ayrı ses kanalları, kategori testleri, öncesi ve giriş bildirimlerinin birlikte planlanması.
- Android konum izin/servis ayrımı, şehir çözümleme nedeniyle vakitlerin beklememesi.
- Hava durumunun bağımsız yüklenmesi.
- Açılış videosunun ekranı cover ölçekle doldurması.

### Doğrulandı
- Yerel HTML'de 12 hikâye ve 12 birleşik PNG çıktısı; günlük seçimler ve beğeniler.
- 320 px hikâye genişliği; dokunma, basılı tutma, otomatik ilerleme.
- Yatay küme kaydırma, dikey hareketin geçiş yapmaması, ilk/son küme sınırları.
- Güncel HTML'de Sıradaki Vakit solma/sürükleme/konum hatırlama kontrolü (bu tur yeni özellik değil).
- Bildirim/konum için önceki mock ve tarayıcı testleri; gerçek cihaz doğrulaması değil.

### Bekliyor
- Gerçek telefonda bildirim sesi/teslim, ekran kapalı ve uygulama kapalı senaryoları.
- Gerçek konum izinleri ve GPS kapalı/açık akışı.
- Açılış videosunun farklı telefon oranlarında görünümü.
- Android paylaşım menüsü ve dosya eki.
- Günün duası/ayeti ve yeni hutbe için sunucu tabanlı bildirim tetikleyicileri.

## Son kurulu APK — doğrulama gerekli

Kesin APK dosyası, yayın tarihi, SHA-256, versionCode ve imza bu sohbet sonunda doğrulanmadı. Kaynaktaki 0.3.2-test / 5 değerlerini kurulu APK bilgisi diye sunmayın.

## Her yeni APK tesliminde doldurulacak kayıt

- APK dosyası ve SHA-256:
- Derleme tarihi / kaynak kimliği veya commit:
- versionName / versionCode:
- Önceki APK sürümü ve aynı imza kontrolü:
- Eklenenler:
- Düzeltilenler:
- HTML/mock testleri:
- Gerçek cihaz/model/Android sürümü ve test sonuçları:
- Bilinen sorunlar:
- Veri koruma / geçiş notu:

Bildirim düzenlemesi doğrulaması: Beş süre seçeneği, gece yarısı, geçmiş ön hatırlatma, ayrı sesler, tüm vakitlerin kapatılması, planlama hatasında eski alarmların korunması ve kontrol HTML eşitliği otomatik testte geçti. Bu sonuçlar mock testtir; gerçek Android teslim testi değildir.
