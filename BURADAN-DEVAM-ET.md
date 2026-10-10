## 10 Ekim 2026 — Hesapsız test güncellemesi (0.3.6-test adayı)

Kullanıcı APK bağlantısına erişen herkesin indirebilmesine açıkça onay verdi; e-posta ve test kodu kullanılmayacak. Firebase App Distribution oturumuna bağlı güncelleme kaldırıldı. GitHub Releases üzerinde APK ve sürüm bilgisi beraber yayımlanır; uygulama 8 saniye sonra ve ön plana döndüğünde yeni sürümü kontrol eder (başarılı otomatik kontroller en fazla saatte bir; elle kontrol serbest). Yeni sürüm için Güncelle / Daha sonra, indirme ilerlemesi ve iptal, SHA-256/boyut/paket/sürüm/imza kontrolü, Android kaynak izni ve kurulum onayı eklendi. İndirme HTTPS ve NUR deposunun sürüm dosyaları ile sınırlı. İnternet yokken uygulama kullanılmaya devam eder.

Mevcut kurulu 111 sürümü bu akışı içermediği için geçiş APK’sı bir kez bağlantıdan, uygulamayı kaldırmadan kurulmalıdır. İmza anahtarı aynı kalır. CI bundan sonra anonim GitHub sürümü yayımlar; Firebase bulut kaynakları ve eski dağıtımlar silinmedi. Tasarım, animasyon ve diğer sayfalarda değişiklik yok; güncellemeler sayfasının yalnız açıklama/durum metinleri yenilendi.

Yerel JS/planlama/kart/haber testleri ve Java sürüm/metadata/URL/hash politika testleri geçti. Tam APK derlemesi ve telefon güncelleme akışı doğrulaması bekleniyor. Kullanıcı 111 sürümünün kendi telefonundaki önceki sorunlarının düzeldiğini bildirdi; başka cihazların onayı yok.

## 10 Ekim 2026 — Kullanıcı 111 sürümünün telefon testini onayladı

Kullanıcı tüm bildirdiği sorunların ve açılış animasyonunun kendi telefonunda düzeldiğini bildirdi. Başka telefonlarda test yapacağını belirtti; çoklu cihaz onayı henüz yok. Yeni istek: Firebase test hesabı/e-posta zorunluluğu olmadan uygulama açılışında yeni test sürümü için güncelleme teklifi. Mevcut NurUpdatesPlugin FirebaseAppDistribution tester oturumuna bağlı. E-postasız dağıtım için ayrı sürüm metadatası ve imzası doğrulanan APK indirme/Android kurulum onayı akışı gerekir. Dağıtımın herkese açık mı yoksa tek seferlik test koduyla sınırlı mı olacağı netleştirilmeli. Henüz güncelleme sistemi değiştirilmedi.

## 10 Ekim 2026 — 0.3.5-test (111) telefon testine yayımlandı

Commit cf7782b841ba7af1640b321409553b9ca2ddea91, run 38041890605 başarılı. Firebase nur-test dağıtımı tamamlandı: https://appdistribution.firebase.google.com/testerapps/1:557016260273:android:1f0a581591c6656db08c90/releases/1olrogkq8obn0 . Artifact 11665967465.

Yerel dosya outputs/NUR-0.3.5-test-111/app-debug.apk. APK SHA256 c0a37de2c1b4cf5f10e3e64838f768020cec2f15fba1bc1dc657c7cda20b5a4a. APK paketi tr.com.nur.namaz, sürüm 111/0.3.5-test; aynı signer 66970897005ea93450d83df45f59569b946422a88089050cca564aaa6db909ef apksigner ile doğrulandı. Güncel revizyon, yeni Ayarlar başlık düzeni, görünür geliştirme etiketinin kaldırılması, haber kaydırma ve medya dosyaları APK içinde kontrol edildi. Eksik medya yok.

Bu derleme cihaz doğrulaması değildir. Kullanıcının açılış/başlık/boşluk ve haber kaydırma telefon testi sonucu bekleniyor. Aşağıdaki yerel APK bekliyor kayıtları bu dağıtımdan önceki aşamalardır.

## 10 Ekim 2026 — 0.3.5-test telefon testi adayı

Açılış geçişi, başlık çubuğu/Besmele boşluğu, Ayarlar başlıkları ve Dini Gündem ikon/font/kaydırma düzenlemeleri bu adayda. Kullanıcının cihaz onayı yok; önceki yerel test sonuçları sorunun telefonda çözüldüğü anlamına gelmez. İmza ve uygulama kimliği korunarak CI dağıtımı hazırlanıyor.

## 10 Ekim 2026 — Ayarlar başlık uyumu (yerel, APK bekliyor)

Kullanıcı Ayarlar ve alt sayfalarındaki başlıkların diğer sayfalarla uyumlu olmasını, geliştirme etiketlerinin kaldırılmasını istedi. Ayarlar ana başlığı ortak motif-page-heading/quran-title-panel düzenine alındı. Mevcut dinamik başlık aynı panelde Profil, Kişiselleştirme, Bildirim Ayarları, Konum Ayarları ve Uygulama Güncellemeleri adlarını gösterir. Alt kısımdaki tekrarlanan sayfa başlıkları yerine Ayarlar listesine dönüş korunur. Ana sayfaya dönüş yalnız ayarlar ana listesinde görünür.

Ayarlar içindeki h3 ve kategori kartı başlıkları sistemin Playfair Display fontuna bağlandı; kişiselleştirmedeki Georgia kaldırıldı. Gövde/ayar etiketleri ve kontroller korunur. Geliştirme satırı görünen DOM'dan kaldırıldı; revizyon yalnız görünmez meta bilgisi olarak tutulur. Bu ortak satır alt panellerde de görünüyordu; ayrı geliştirme etiketi bulunmadı. Gerçek uygulama sürüm bilgisi güncellemeler ekranında korundu.

Kontrol: tüm ayar kontrol kimliklerinin korunduğu, beş alt başlığın işlendiği, JS/kopya eşitliği ve bildirim/kişiselleştirme/güncelleme davranış testleri geçti. Mobil medya hazırlığı kayıpsız geçti. Gerçek cihaz görünümü henüz doğrulanmadı; APK/GitHub işlemi yapılmadı.

## 10 Ekim 2026 — Ana sayfa Dini Gündem kartında haber kaydırma (yerel, APK bekliyor)

Keşfet ve Devam Et'teki mevcut Dini Gündem kartında sola sonraki, sağa önceki haber; sınırda döngü, sıra/toplam sayacı ve seçili habere dokunarak okuyucuyu doğrudan açma eklendi. Kartın ikonu, renkleri ve fontları korundu. Başlık/özet alanı iki satır için sabitlendi; yalnız bu karta hareket ve kısa yönlendirme eklendi. Otomatik kayan slayt yok. İnternet yokken kayıtlı/paket haberleri kullanılabilir; veri yenilenince seçili haber hâlâ varsa korunur.

Yatay hareket eşiği 40px ve yön oranı 1.5. Dikey sürükleme, pointercancel ve çoklu dokunma haber açmaz; kaydırmanın ardından sentetik tıklama bastırılır. touch-action:pan-y pinch-zoom ile sayfa kaydırma ve yakınlaştırma korunur; klavye okları da geçiş yapar. Mevcut genel kısayol click işleyicisi yalnız Dini Gündem için özel işleyiciye bırakıldı; diğer kartlara dokunulmadı.

Gerçek kontrol koduyla VM davranış testi geçti: ileri/geri/döngü, yanlış açılma engeli, dikey/iptal/çoklu dokunma, seçili haber, klavye, yenilemede seçim koruma, tek/boş liste. Bu bir fiziksel dokunma/cihaz doğrulaması değildir. APK veya GitHub işlemi yapılmadı.

## 10 Ekim 2026 — Dini Gündem yazı tipi ve ikon uyumu (yerel, APK bekliyor)

Kullanıcının isteğiyle yalnız Dini Gündem kart/okuyucu başlıklarının Georgia tanımı sistemdeki Playfair Display ile değiştirildi; gövde DM Sans olarak korunur. Başlık boyutu, yerleşim, tema, metinler ve diğer sayfaların stilleri değiştirilmedi.

Hadisler, Eğitim ve Siyer ikonları görsel referans alınarak şeffaf lacivert-altın kabartmalı gazete ikonu üretildi. Orijinali branding/icons/dini-gundem-original.png, mobil varlık branding/icons/dini-gundem.webp. Ekstra'daki eski çizgi SVG yerine ortak ai-menu-icon yapısı kullanıldı; ana sayfa da aynı ikona bağlandı. Menü düzenleyicisiyle alt menüye taşınırsa ortak ikon ölçülerini kullanır.

Doğrulama: iki konumun aynı gömülü görseli kullandığı, yeni görselin alpha kanalı, kaynak/kontrol kopyası eşitliği ve inline JS/bildirim regresyonu kontrol edildi. Mobil hazırlıkta 47 medya başvurusu kayıpsız çıkarıldı; tekrarlanan ikon aynı hash'li tek dosyaya dönüşür. Bu kontrol cihazda görsel onay değildir. APK/GitHub işlemi yapılmadı.

## 10 Ekim 2026 — Android başlık çubuğu ve Besmele üst boşluğu (yerel, APK bekliyor)

Kullanıcı ekran görüntüsünde tüm sayfalarda görünen NUR Namaz Uygulaması Android başlık çubuğunun kaldırılmasını ve camili başlığın üst sınırının Besmele olması isteğini belirtti. MainActivity, AppCompat pencereyi kurmadan önce AppTheme.NoActionBar temasını seçer; sonrasında varsa ActionBar gizlenir. Temel ve launch temalarında başlıksız pencere açıkça tanımlandı. Uygulama adı/launcher etiketi değiştirilmedi.

HTML'de yalnız .night-header üst padding değeri 1rem + safe-top yerine .5rem + safe-top yapıldı. Besmele ilk içerik olmaya devam ediyor; güvenli alan korunuyor. Görsel, metin, font, renk ve diğer aralıklar değiştirilmedi. Önceki açılış adayı korunuyor; onun cihaz doğrulaması da hâlâ bekliyor.

Kontrol: Java Android API37 ile geçici BridgeActivity/R stub'ları kullanılarak derlendi; Android XML aapt2 ile derlendi; JS sözdizimi/bildirim testi ve kaynak-kontrol HTML eşitliği geçti. 45 gömülü medya kayıpsız çıkarıldı. Yeni tarayıcı ölçüm testi hazırlandı ancak bu oturumdaki tarayıcı başlatma kısıtları yüzünden çalışmadı; farklı ekranlarda görsel doğrulama yapılmış sayılmaz. Tam Android APK/cihaz testi yapılmadı; GitHub'a yüklenmedi.

## 10 Ekim 2026 — Açılış geçişi yeniden ele alındı (yerel; cihaz doğrulaması bekliyor)

Kullanıcı 110 sürümünde açılış beyaz şerit/ölçek sorununun sürdüğünü bildirdi. Telefon: Xiaomi 11T; Android/MIUI sürümü henüz bilinmiyor.

Yalnız MainActivity.java ve açılış temasının styles.xml kaydı değiştirildi. Tam ekran işlemi BridgeActivity kurulumundan sonraya alındı; pencere odağında tekrar uygulanıyor. API30+ WindowInsetsController ile sistem çubukları gizleniyor. Video başlaması için iki ardışık sabit tam pencere ölçüsü, odak ve gizli çubuklar bekleniyor. Hazır olmayan video yüzeyi ilk görüntüye kadar mevcut krem zeminle örtülüyor. Bitiş/hata/duraklamada pencere geri alınıyor; activity recreation durumunda launch-only fullscreen bayrağı temizleniyor. 7 saniyelik hata çıkışı korunuyor.

Video SHA256 9ac3ea62f7a795e97855ffe9f54a0a1c0d63bf61af77e20086e8eded0df0743d ve HTML SHA256 285b541172cc845a889b0f9d9d577bdbd6140eebb987218912107d1f73af6321 önceki sürümle aynı. Animasyon, ana tema, metin ve sayfa düzeni değiştirilmedi.

Doğrulama sınırı: MainActivity gerçek API37 android.jar ile JDK21'de derlendi; Capacitor BridgeActivity/R/diğer plugin sınıfları için geçici stub kullanıldı. Android kaynakları aapt2 ile derlendi. Bu kontrol tam APK/cihaz davranışı doğrulaması DEĞİLDİR. GitHub'a gönderilmedi, APK üretilmedi. Xiaomi 11T'de soğuk açılış, hareket/üç tuş gezinme, tekrar açma ve açılış sırasında arka plana alma testleri bekliyor.

## Kullanıcının bağlayıcı tasarım koruma talimatı — 10 Ekim 2026

Bir şeyi değiştirirken veya tasarlarken uygulamanın ana şema hatları, tasarımı, teması ve metin yapısı değiştirilmeyecek. Kullanıcı açıkça istemedikçe ana düzen, tipografi, metin hiyerarşisi ve tasarım dili korunacak. Hata düzeltmeleri yalnız ilgili sorunla sınırlı olacak; yeni özellikler mevcut yapıya uyacak.

Kullanıcı 110 sürümünde bazı önceki hataların sürdüğünü, bazılarının kötüleştiğini ve bildirim tasarımlarının gösterilen görsellerle uyuşmadığını bildirdi. Önceki “test geçti” kayıtları cihaz onayı değildir. Sorunlar tek tek ele alınacak; gerçek cihaz sonucu doğrulanmadan kesin çözüm iddiasında bulunulmayacak. Şimdiki talep yalnız bu kuralın kaydedilmesidir.

## 10 Ekim 2026 — 0.3.4-test (110) yayımlandı

GitHub run 38003274408 başarılı. Commit e8c10a988c525aef011d25fb83b5dc84420a8e14. Firebase nur-test dağıtımı tamamlandı.

Kurulum: https://appdistribution.firebase.google.com/testerapps/1:557016260273:android:1f0a581591c6656db08c90/releases/5a89u7h2c8qf8
Artifact: https://github.com/UyGarTRK/NUR-Mobile/actions/runs/38003274408/artifacts/11650067314
APK SHA256: 4d2275a67fa038907fa4e378dc018a2829c458c1c495a4e357289569c33ded62.

Yerel APK apksigner ile doğrulandı; sertifika SHA256 66970897005ea93450d83df45f59569b946422a88089050cca564aaa6db909ef. Paket tr.com.nur.namaz, versionCode 110, versionName 0.3.4-test. APK içindeki güncel web revizyonu, otomatik haber, kısayol ve kişiselleştirme kodları doğrulandı; eksik medya yok. Kullanıcının telefonda kurulum/test onayı henüz yok. Aşağıdaki bekliyor notları önceki yerel geliştirme aşamalarına aittir.

## 10 Ekim 2026 — 0.3.4-test (110) derleniyor

Commit: e8c10a988c525aef011d25fb83b5dc84420a8e14. GitHub Actions: https://github.com/UyGarTRK/NUR-Mobile/actions/runs/38003274408 . Dini Gündem otomatik haberler, ana sayfa kısayolu, bildirim kartı tasarımları ve bekleyen mobil düzeltmeler bu derlemede. Sonuç henüz doğrulanmadı.

## 9 Ekim 2026 — 0.3.3-test (109) yayımlandı

Son vakit güvenilirliği ve kayıpsız medya düzeltmeleri GitHub main dalına 8fe120aa4ec7d3d92af56a0a88e5ac6ec44e6f3e commit olarak aktarıldı. Run 37899427837 başarılı; derleme, imza doğrulama ve Firebase nur-test dağıtımı geçti. Önceki 108 sürümüyle aynı imza korunuyor. Yeni sürümün telefon testi kullanıcı tarafından yapılacak.

APK SHA-256: 15ff6c05c160d1ac2b6b701b0c719532b742bd1f0edd98e63028c116ad7d03db. Yerel dosya: outputs/NUR-0.3.3-test-109/app-debug.apk. APK içindeki geliştirme kimliği ve 45 medya başvurusu doğrulandı; eksik dosya yok.

Firebase: https://appdistribution.firebase.google.com/testerapps/1:557016260273:android:1f0a581591c6656db08c90/releases/5mgrmqg6el5c8
GitHub artifact: https://github.com/UyGarTRK/NUR-Mobile/actions/runs/37899427837/artifacts/11601479309

Telefon testi: kaldırmadan güncelleme ve kayıtların korunması; vakit/konum doğruluğu; çevrimdışı ve tarih geçişi; ön hatırlatma + vakit sesi; hikâye paylaşımı ve ses önizlemesi. Aşağıdaki eski hazırlık notlarındaki “henüz APK’ya alınmadı” ifadeleri bu dağıtımdan önceki duruma aittir.

---

# Güncel devam noktası — 8 Ekim 2026

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

---

Aşağıdaki önceki devir kayıtlarının “henüz” ifadeleri kendi yazıldıkları aşamaya aittir; güncel durum yukarıdadır.

# NUR — Yeni sohbet için ana devam kaydı

Devir tarihi: 8 Ekim 2026, Türkiye saati. Web geliştirme kimliği: `2026.10.08-hikayeler-1`.
Bu belge, eski sohbetin yerine geçecek teknik ve ürün devam kaydıdır. Önce bunu, sonra CHANGELOG.md ve TELEFON-TESTI.md dosyalarını okuyun.

## 8 Ekim ek çalışma — uygulama içi güncelleme hazırlığı

Kullanıcı Firebase üzerinden test APK güncellemelerini hazırlamayı onayladı. Güncel kaynakta ayarlar güncelleme ekranı, NurUpdates Android köprüsü ve imza koruma iş akışı hazırlanmıştır; henüz GitHub'a gönderilmedi, Android derlemesi/dağıtımı yapılmadı. Yerel JS testleri geçti. Bildirim ayarları bu çalışmadan önce düzenlendi, korunmalıdır.

Firebase projesi `NUR Mobile` / `nur-mobile-ec382` kullanıcının hesabında ücretsiz Spark planında oluşturuldu. Android uygulaması `NUR` / `tr.com.nur.namaz` kaydedildi. Kullanıcının indirdiği google-services.json dosyasının proje, uygulama kimliği ve paket adı doğrulandı; `android/app/google-services.json` konumuna eklendi. Firebase uygulama kimliği `1:557016260273:android:1f0a581591c6656db08c90`. Kullanıcı iletişim adresi ve test davetini açıkça onayladı. App Distribution etkinleştirildi; onaylanan adres test kullanıcıları listesine eklendi (1 tester). Henüz release yok; sürüm daveti gönderildiği doğrulanmadı. Firebase App Testers API konsolda Enabled olarak doğrulandı. GitHub dağıtımı için `nur-github-distribution@nur-mobile-ec382.iam.gserviceaccount.com` hizmet hesabı oluşturuldu. Kullanıcı `Firebase App Distribution Admin` rolünü işlem anında onayladı; rol uygulandı ve konsol Policy updated sonucunu verdi. Kalıcı anahtar oluşturulmadı. Kullanıcı sınırlı GitHub WIF bağlantısını ve hizmet hesabı erişimini açıkça onayladı. Provider kaydedildi, yeniden açılarak koşul ve eşleme doğrulandı. Hizmet hesabına repository_id=1405828889 için erişim verildi, Policy updated doğrulandı. Yapılandırma: pool `nur-github`, provider `github`, issuer `https://token.actions.githubusercontent.com`, `google.subject=assertion.sub`, `attribute.repository_id=assertion.repository_id`. Koşul: repository_id 1405828889, repository_owner_id 334603043, ref refs/heads/main, workflow_ref UyGarTRK/NUR-Mobile/.github/workflows/build-android-apk.yml@refs/heads/main, event_name push veya workflow_dispatch. Havuz/sağlayıcı etkin. Firebase `nur-test` grubu oluşturuldu ve onaylanan tek test kullanıcısı gruba eklendi. CI Firebase CLI 15.33.0 ve google-github-actions/auth@v3 ile dağıtım için hazırlandı; henüz çalıştırılarak doğrulanmadı. Proje kimliğini değiştirip ikinci bir proje oluşturmayın.

Kurulu dosya kullanıcı beyanıyla `NUR-v162-0.3.1-test`. Aynı adlı yerel APK'nın v2 bloğundan okunan sertifika SHA-256 değeri CHANGELOG'da kayıtlıdır; bu inceleme kriptografik APK doğrulaması veya telefondan imza okuma değildir. GitHub'daki mevcut `nur-debug-signing-v1` önbelleğinin yolu `android/debug.keystore`; anahtarın kurtarılıp aynı sertifikayla doğrulanması ve korumalı kalıcı yedeklenmesi gerekir. Anahtar bulunmazsa yeni anahtar üretilmez. Özel anahtarı depoya/loga/artifact'a açık koymayın. `NUR_TEST_KEYSTORE_BASE64` secret desteği yalnız hazırlanmıştır; secret henüz oluşturulmadı.


## 1. Tek doğru proje ve çalışma kuralı

Bu paketteki `NUR-Mobile/src/index.html` esas uygulama kaynağıdır. Eski v161/v163 ZIP veya HTML dosyaları ile üzerine yazmayın. `www/` npm run sync ile üretilir; doğrudan düzenlenmez. Paket kökündeki NUR-Namaz-Uygulamasi-v6-Kuran.html kontrol kopyasıdır; kaynak ile aynı içeriktedir. Yeni değişiklikleri önce src/index.html üzerinde yapın, sonra kontrol kopyasını yenileyin.

Marka NUR, yayıncı/imza görünen adı UyGar Medya. Android applicationId: tr.com.nur.namaz. Kullanıcının deposu https://github.com/UyGarTRK/NUR-Mobile.git . Bu devirde GitHub'a yükleme, commit veya APK derleme yapılmadı. Başka sohbet de depoyu kullanıyor olabilir; uzaktaki sürümü kontrol etmeden üzerine yazmayın.

## 2. Sürüm ayrımı — kritik

- package.json: 0.3.0.
- Android kaynak ayarı: versionName 0.3.2-test, versionCode 5.
- Web geliştirme kimliği: 2026.10.08-hikayeler-1.
- Bu Android sayıları SON KURULU APK'nın doğrulanmış sürümü değildir. Kurulu APK dosyası, hash'i ve imzası bu devirde tespit edilmedi.
- Son çalışmalardan sonra yeni APK ÜRETİLMEDİ. HTML'nin güncellenmesi telefona kurulu APK'yı güncellemez.
- Eski sohbetin v161/v162/v163 adları dosya/çalışma etiketleridir; Android sürüm numaraları ve Library sürümleriyle karıştırmayın.
- Yeni APK öncesi kurulu sürümü/imzayı doğrulayın; sürüm kodunu uygun artırın. Aynı imza korunmalı. Kullanıcı verisini silerek kurulum önermeyin.

## 3. Kullanıcının kalıcı ürün ve iletişim kuralları

- Türkçe iletişim. İstenen işi tamamla; her adımda tekrar onay isteme.
- Her ekran mobil öncelikli; 320 px dahil yatay taşma olmamalı. Uzun metinlerde kaydırma ve okunabilirlik korunmalı.
- Ana tema krem (#fbf7ed), lacivert ve altın. Otomatik koyu tema görünümü istenmiyor.
- Yeni görsel gerekiyorsa gerçek AI görseli kullan; CSS çizimiyle sahte görsel üretme. Mevcut ikon sistemini koru.
- Motifli ana sayfa başlıkları ortalı; kullanıcı istemedikçe bu başlıklara geri tuşu ekleme. Okuyucuların geri dönüşü ayrı ihtiyaçtır.
- Geri dönüşte önceki dikey konumu koru; ana sekmeye giriş başlığın olduğu konumdan başlasın.
- Ana Sayfa alt menünün ortasında yuvarlak, Ekstra en sağda; bu ikisi sabit. Diğer üç sekme Ekstra ile sürüklenerek değiştirilebilir. Ayarlar ve Düzenle Ekstra'nın en altında sabit.
- Ayarla ilgili her yeni seçenek Ekstra > Ayarlar altında, başlıklar halinde açılan alt bölümde olsun.
- Her işlem sonrası ZIP/HTML/APK verme ve dosya adı değiştirme. Kullanıcı istediğinde teslim et. Ana HTML adı NUR-Namaz-Uygulamasi-v6-Kuran.html.
- Her yeni APK'da önceki APK'dan sonraki değişiklik listesini, testleri ve bekleyen cihaz kontrollerini bildir.
- Eğitimde geliştirme için açılmış kilitleri kullanıcı tekrar onay vermeden kapatma.
- Harf eğitimini kullanıcı kendi sesiyle seslendirecek. Projenin sonuna doğru kendi kayıtlarını uygulamaya gömme işi HATIRLATILACAK; kayıtlar henüz teslim edilmedi.

## 4. En son bitirilen iş: hikâyeler

Ana sayfada Ayet / Hadis / Dua / Esmâül Hüsnâ. Her başlıkta günlük üç içerik; toplam 12. Gün Türkiye (Europe/Istanbul) tarihine göre belirlenir. Aynı gün seçimler sabittir; açık okuyucunun içeriği gece yarısında ortasında değiştirilmez, yeniden açılışta yeni gün seçilir.

İçerik seçimleri uygulamanın mevcut kayıtlarından yapılır; yeni dış servis yok. Ayet havuzu DUA_RECORDS içindeki Kur'an kayıtlarıdır; şu anda tüm Kur'an'dan serbest ayet seçimi değildir. Bazıları kısmi ayettir: AYETTEN MEÂL ALINTISI etiketi kullanılır. Hadis havuzu HADITH_RECORDS içindeki Buhârî ve Müslim, kaynaklı ve kısa kayıtlardır. Dua havuzu kaynaklı kısa dua kayıtlarıdır; aynı gün Ayet ile aynı metin seçilmez, numaralı alt parça başlıkları elenir. Esma havuzu ESMA_RECORDS; Arapça isim, Türkçe ad ve kısa anlam gösterilir. Mevcut içeriklerin tamamı bu iş sırasında bağımsız kaynak doğrulamasından geçirilmedi; kullanıcı çeviri yanlışları bildirdiği için ileride içerik denetimi önemlidir.

Görseller: aynı kompozisyonun gece / seher / gündüz versiyonları. AI tarafından üretilmiş raster arka planlardır. HTML içindeki nur-ayet-backgrounds JSON'unda base64 gömülü. Paylaşım, Canvas üzerinde metin+arka plan+kaynak+NUR etiketiyle 1080x1920 PNG üretir; ekran kontrolleri paylaşılmaz. Ekranda da aynı Canvas görünür. Uzun metin boyutu alana göre ayarlanır. Arapça metin AI görsele yazdırılmamış, gerçek uygulama metnidir.

Davranış:
- Sola kaydır: kalan içerikleri atlayıp sonraki KÜMENİN ilk hikâyesine geç.
- Sağa kaydır: önceki KÜMENİN ilk hikâyesine geç.
- Kısa sağ/sol dokunma: aynı kümede sonraki/önceki içerik; sınırda mevcut standart grup geçişi.
- İlk kümede sağa / son kümede sola sürükleme mevcut kümede kalır.
- Dikey sürükleme küme değiştirmez. Yatay eşik genişliğin %14'ü, 44–72 px; yatay hareket dikeyden baskın olmalı.
- Basılı tutma süreyi durdurur; bırakma devam ettirir. İçerik yüklenirken ve paylaşımdayken süre ilerlemez. Her içerik 5 saniye.
- Küme değişiminde kısa başlık bildirimi görünür. Atlanan küme sırf kaydırıldığı için izlenmiş işaretlenmez.
- Beğeni/izlenme günlük olarak localStorage nurDailyStoryState içinde saklanır.
- Web Share dosya paylaşımı varsa kullanılır; yoksa birleşik PNG indirilir. Yerel dosya URL'si arkadaşlara gönderilmez.
- Android için @capacitor/filesystem CACHE ve @capacitor/share dosya URI'si kullanılır. Gerçek telefon testi bekliyor.

Kod girişleri: prepareAyetDay, createAyetArtwork, renderAyetStory, shareAyetStory, initializeStoryViewer. Fonksiyonların eski Ayet isimleri dört kategoriyi de yönetir; yalnız Ayet'e ait sanıp diğerlerine yeni paralel sistem kurmayın.

## 5. Son APK sonrası diğer düzeltmeler

### Bildirim
Ayrı uygulama içi izin satırı kaldırıldı; sistem izni gerektiğinde istenir. Master anahtar izin sonucu beklenirken hedef değer sabit tutulur; UI yenilenmesiyle kapalıya geri dönme yarış durumu düzeltildi. Varsayılan genel ses bildirim_sesi_4, öncesi ezan_oncesi_1, vakit ezan_vakti_2. Önceden seçilmiş özel tercihler korunur; eski sistem varsayılanı bir defalık migrate edilir. Dinle/Durdur ve kategori başına telefona test gönderme var. Android kanalları nur-v3 ile ses tercihini içeren kimlikler kullanır. Ön hatırlatma ve vakit girişi ayrı planlanır; ön hatırlatma vakit bildirimini iptal etmez. Yeni plan yazılmadan eskisi silinmez; pending plan sayısı kontrol edilir. HTML sistem bildirim izni istemez; ses önizleme sunar. Native servis src içindeki dosyalarda ve prepare-web çıktılarında bulunur.

Genel ses seçiminin bulunması, günün ayeti/duası/yeni hutbe için sunucu bildirimi sisteminin kurulmuş olduğu anlamına gelmez: bu tetikleyiciler ve sunucu altyapısı HENÜZ YOK.

### Konum ve hava durumu
Özel NurLocationAccessPlugin.java Android konum iznini GPS kapalıyken de sorabilmek için var. MainActivity içinde super.onCreate öncesi kaydı korunmalı. İzin ile konum servisinin açık olması ayrı kontrol edilir; kapalıysa telefon ayarına yönlendirme ve dönüşte tekrar deneme vardır. Reverse geocoding/şehir adı gecikmesi vakitleri engellemez; hava durumu koordinatlarla bağımsız başlar. İlk açılış otomatik/manuel; ayarlarda manuel konum tercihi ürün kuralıdır.

### Açılış
MainActivity CoverVideoView merkezden cover ölçekler; bazı kenarlar kırpılabilir, boşluk kalmaması amaçlanır. Sistem çubukları video süresince gizlenip geri açılır. nur_intro.mp4 yaklaşık 2,09 sn, 1080x1920. Sekme değiştirirken video tekrar oynatılmaz. Gerçek cihazda oran/yaşam döngüsü testi bekliyor.

### Sıradaki Vakit kartı
Mevcut davranış test edildi; son aşamada yeniden kodlanmadı. Başka sayfaya animasyonla küçülür, 5 saniye sonra .22 opaklığa iner, dokununca belirginleşir, sürüklenir ve normalize konumunu nurPrayerFloatingPosition ile saklar; eve dönüşte yerine gelir. NurPrayerCardControls end-body controller ile ana float/restore fonksiyonları birlikte çalışır. Kaynak controller etiketi 153 eski tarihsel etikettir. Kullanıcı önceki HTML'de sorun bildirmişti; güncel file:// mobil dokunma testi geçti.

## 6. Uygulamanın diğer bölümlerini koru

Kur'an: meal seçimi ve karşılaştırma, mushaf/iniş sırası, sure/ayet seçici, konu fihristi, tam ekran okuma, not, yer imi, kopyala/paylaş, besmele ayrımı. Tefsir kullanıcı talebiyle GİZLİ kalmalı; meal yerine tefsir uydurulmamalı. Kıble: mobil sensör/izin ve Kâbe motifi. Hutbe: güncel ve önceki beş hafta, tam metin; canlı kaynak metin/fetch çalışması ayrıca denetlenmeli. Hicri takvim: dini/resmi günler ve anlamları, miladi tarih seçimi, gelecek iki yıllık liste. Siyer: hayat, adetler, Kur'an'da Peygamber ve ayet bağlantıları. Dualar/hadisler: konu fihristi ve kaynaklı Arapça/Türkçe kayıtlar. Tesbihat/Zikirmatik: kayıt/ilerleme ve yarım kayıt silme. Eğitim: harfler, birleşimler, harekeler, diğer okuma konuları; quiz yanlışlarını tamamlama ve ilerleme. İslam tarihi, müfessirler, Esma, profil ve NUR asistanı mevcut. Bu devirde bunların tümü baştan denetlenmedi.

NUR asistanı mevcut uygulama içi konu/niyet eşleştirme ve kısayol rehberidir; tam bir uzak LLM/RAG servisi kurulduğu iddia edilmemeli. Profil alanının bulunması gerçek e-posta doğrulama/sunucu senkronizasyonunun tamamlandığını kanıtlamaz; backend durumu ayrı doğrulanmalı. Tüm verilere erişim için kullanıcı mahremiyeti korunmalı, gizli anahtar HTML'ye gömülmemeli.

## 7. Derleme ve dosyalar

Node 22+, Java 21, Android SDK 36. Proje içinde:
```
npm ci --ignore-scripts
npm run sync
cd android
./gradlew assembleDebug
```
Windows'ta son komut gradlew.bat assembleDebug. Derleme ağ üzerinden npm/Gradle bağımlılıklarını gerektirir. node_modules, www ve Android oluşturulmuş web assets yeniden üretilir. Android özel Java dosyalarını ve res/raw ses/video dosyalarını KORUYUN. GitHub Actions tanımı varsa pakette korunur; çalıştırmak için repo ve yetki ayrıca doğrulanır.

Keystore, parolalar, local.properties, APK ve makineye özgü SDK yolları pakette yok. İmza anahtarını yeniden oluşturup güncelleme diye sunmayın. Aynı imza olmadan kurulu APK üzerine güncelleme yapılamayabilir. Paket kaynak kodudur, APK değildir.

## 8. Doğrulama düzeyi ve sıradaki adım

Hikâyelerde gerçek Chromium mobil dokunma benzetimi ve file:// testleri: 12 çıktı/indirme, aynı gün seçim, beğeni kalıcılığı, 320 px taşmasız görünüm, yatay grup kaydırma, kısa dokunma, dikey hareket/sınırlar geçti. npm run sync önceki aşamalarda başarılı; son kaydırma sonrası paket hazırlanırken tekrar çalıştırılır. Testler canlı API ve gerçek Android yerine yerel HTML/uyarlanmış ortam kullanır. Test yardımcıları tests/handoff altında referans olarak bulunur; çalışma ortamına özel mutlak yolları yerel makinenize uyarlayın.

Sıradaki öncelik: kullanıcı HTML kontrolünü bitirdikten sonra cihazdaki sürüm/imza tespiti, uygun yeni APK derleme, TELEFON-TESTI.md kontrol listesi. APK talebi gelmedikçe APK üretmeye başlamayın. Bir hata giderildiyse kaynak + değişiklik kaydı + gerekirse istenen HTML eşitlenmeli. Yeni sohbet geçmişi otomatik biliyor varsayılmamalı.

## Son derleme durumu

8 Ekim 2026: Kullanıcı şifreli imza yedeğinin aktarımını açıkça onayladı. Main commit: 3850713293fbbc896988fa3a3585bc3158e06b71. GitHub Actions run 37753675265 başarıyla tamamlandı. Önceki versionCode hatası düzeltildi. NUR 0.3.2-test (108) APK üretildi; güncelleme davranış testleri, Android derlemesi ve APK imza doğrulaması geçti. İmza v162 dosyasıyla eşleşiyor; telefon üzerinden imza henüz okunmadı.

Firebase App Distribution dağıtımı nur-test grubuna başarıyla yapıldı. Tester bağlantısı: https://appdistribution.firebase.google.com/testerapps/1:557016260273:android:1f0a581591c6656db08c90/releases/7gc5p0nn57860
APK artifact: https://github.com/UyGarTRK/NUR-Mobile/actions/runs/37753675265/artifacts/11539595605
Yerel APK: çalışma alanı outputs/NUR-0.3.2-test-108/app-debug.apk.

Şifreli imza yedeği artifact 11539231420 indirildi, ZIP SHA256 doğrulandı, yerelde RSA-OAEP/AES-GCM ile kurtarıldı. Kurtarılan sertifika SHA256: 66970897005ea93450d83df45f59569b946422a88089050cca564aaa6db909ef. Kurtarma özel anahtarı, şifreli ZIP ve kurtarılan keystore proje DIŞINDA work/signing-recovery altında tutulur; bunları Git'e eklemeyin. GitHub NUR_TEST_KEYSTORE_BASE64 secret henüz oluşturulmadı; CI mevcut cache kullanıyor ve yoksa duruyor. Yerel yedek kurtarma için hazır.

Telefonda ilk kez bu sürüm eskisinin üzerine kurulmalı, ardından Firebase tester hesabıyla giriş yapılıp güncelleme kontrolü denenmeli. Gelecek sürümün uygulama içinden indirilip kurulması henüz gerçek telefonda uçtan uca test edilmedi. Android kurulum onayı kullanıcı tarafından verilir.

## 8 Ekim — Sistem analizi ve telefon testi başlangıcı

Kullanıcı 0.3.2-test (108) kurulumunu tamamladığını ve telefon testine başladığını bildirdi; testlerin geçtiği henüz bildirilmedi. Güncel mimari, ekran/içerik envanteri, tasarım, animasyon, kaynaklar ve doğrulanmış bulgular docs/NUR-SISTEM-ANALIZI-2026-10-08.md dosyasına kaydedildi. Görsel atlas çalışma alanı outputs/nur-sistem-analizi/index.html. Vakit başlangıç/önbellek güncelliği ve scheduleFromTimings içindeki window.location karışıklığı öncelikli bulgular; uygulama koduna bu analizde düzeltme uygulanmadı. Yeni APK veya GitHub yüklemesi başlatılmadı.
