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
