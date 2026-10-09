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
