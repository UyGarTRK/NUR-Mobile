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

## 10 Ekim 2026 — 0.3.4-test (110) yayımlandı

GitHub run 38003274408 başarılı. Commit e8c10a988c525aef011d25fb83b5dc84420a8e14. Firebase nur-test dağıtımı tamamlandı.

Kurulum: https://appdistribution.firebase.google.com/testerapps/1:557016260273:android:1f0a581591c6656db08c90/releases/5a89u7h2c8qf8
Artifact: https://github.com/UyGarTRK/NUR-Mobile/actions/runs/38003274408/artifacts/11650067314
APK SHA256: 4d2275a67fa038907fa4e378dc018a2829c458c1c495a4e357289569c33ded62.

Yerel APK apksigner ile doğrulandı; sertifika SHA256 66970897005ea93450d83df45f59569b946422a88089050cca564aaa6db909ef. Paket tr.com.nur.namaz, versionCode 110, versionName 0.3.4-test. APK içindeki güncel web revizyonu, otomatik haber, kısayol ve kişiselleştirme kodları doğrulandı; eksik medya yok. Kullanıcının telefonda kurulum/test onayı henüz yok. Aşağıdaki bekliyor notları önceki yerel geliştirme aşamalarına aittir.

## 10 Ekim 2026 — Otomatik haberler ve ana sayfa kısayolu (yerel, APK bekliyor)

Dini Gündem, Diyanet Haber'in /rss/diyanet-haber ve /rss/tdv akışlarını doğrudan secureFetch üzerinden okur. Her iki uç 200 yanıtı, XML ve Access-Control-Allow-Origin:* ile doğrulandı. Genel haber akışı yerine yalnız bu iki kategori kullanılır. Akademik araştırma ve kültür anlatısı seçkileri korunur. Ana sayfa Keşfet ve Devam Et bölümünün ilk kartı Dini Gündem'dir; son haber başlığı ve yayın tarihi gösterilir.

Açılışta ertelenmiş kontrol, sayfaya giriş, uygulamanın tekrar görünür olması, bağlantının gelmesi ve görünür ana sayfa/gündem ekranında zamanlayıcı ile kontrol yapılır. Kaynak başına 30 dakika önbellek; başarısız denemelerde en az 60 saniye, manuel yenilemede 10 saniye aralık uygulanır. Kapalı uygulamada arka plan servisi yok. Yenileme sırasında var olan okuyucu ve arama korunur. Son kontrol bilgisi her kaynak için ayrı gösterilir; yayın tarihiyle karıştırılmaz. Kısmi hata, çevrimdışı durum ve kayıt alanı hatası açıklanır.

Son haberler localStorage'da kaynak bazlı saklanır. Hatalı/boş XML önceki veriyi silmez. RSS metinleri inert template ile düz metne dönüştürülür; başlık 180, kısa açıklama 240 karakterle sınırlıdır. Yalnız HTTPS Diyanet Haber bağlantıları kabul edilir; tarih doğrulama, tekilleştirme ve sınırlı liste uygulanır. Tam makaleler kopyalanmaz; kaynak bağlantısı açılır. Android geri tuşuna agenda-back eklendi.

Doğrulama: gerçek akışlardan tarayıcı üzerinden 40 haber + dört seçki alındı. Senaryolar: ilk yenileme, kısayol, TTL, zararlı bağlantı reddi, okuyucu, kısmi kaynak hatası, bozuk XML, yeniden açılışta çevrimdışı kayıt, 320/390/530 px. Mevcut bildirim planlama/sözdizimi/kopya eşitliği testi geçti. Android cihaz testi sonraki APK'da yapılmalı. APK/GitHub işlemi yapılmadı.

## 10 Ekim 2026 — Dini Gündem (yerel, APK bekliyor)

Ekstra menüsüne Dini Gündem eklendi. Kayıtlı eski menü düzenleri korunarak yeni öğe Ekstra’ya eklenir; mevcut menü düzenleyicisiyle taşınabilir. Ortak motif başlığı, Haber/Araştırma/Anlatı filtreleri, Türkçe arama, boş sonuç durumu, kaynak/tarih bilgisi, çevrimdışı özet okuma ve kaynak bağlantıları var. Okumayı kapatmaması için yüzen vakit kartı bu sayfada gizlenir; diğer sayfalarda mevcut davranış sürer.

İlk seçki: Diyanet 2 Ekim 2026 cami ve sosyal hayat hutbesi, 30 Eylül 2026 Mevlid-i Nebî sempozyum raporu; İSAM kütüphane duyurusuna dayanan araştırma rehberi; TDV Vakıf maddesine dayanan kültür anlatısı. Eski kaynakların tarihleri açıkça gösterilir. Haber özeti ile NUR rehber/anlatı metni ayrılır. Otomatik haber akışı yok; seçki tarihi 10 Ekim 2026. Kaynaklar Diyanet, TDV ve akademik kaynak kapsamındadır.

Doğrulama: JavaScript sözdizimi ve mevcut bildirim planlama testleri; tarayıcıda eski menü kaydı, navigasyon, kategori, Türkçe arama, boş sonuç, dört içerik okuma/kaynak/geri dönüş, 320/390/530 px ve 16/20 px yazı boyutları geçti. Kaynak ve kontrol HTML kopyası aynı. APK derlenmedi, GitHub’a yüklenmedi; gerçek cihaz kontrolü bekliyor.

## 9 Ekim 2026 — Bildirim kartı kişiselleştirme (yerel, APK bekliyor)

Ayarlar → Kişiselleştirme: 1 Sade liste, 2 Vakit tablosu, 3 Sıradaki vakit; varsayılan tasarım 3. Kart gösterimi ayrı anahtarla açılır (başlangıçta kapalı); etkinleştirme telefon bildirim iznini ister. Mevcut ezan/ön hatırlatma ayarları bağımsızdır. Web önizleme tercihi localStorage'da, Android tarafı kendi SharedPreferences kaydında tutulur. Native durum açılışta okunur; panelden Gizle veya Android'in izin verdiği sürükleyerek kaldırma tekrar zorla bildirim çıkarmaz.

NurPrayerCardPlugin ve NurPrayerCard receiver eklendi. Özel cami smallIcon hem vakit kartı hem yeni yerel test/ezan bildirimlerine bağlandı. Sessiz LOW kanalı ve çakışmayan 210000001 ID kullanılıyor. Tasarım 1 BigText, 2 altı hücreli RemoteViews, 3 native geri sayım + tüm vakitler; dar görünüm sistem şablonunu korur. Gece/açık renk kaynakları var. Dış görünüm OEM'e bağlı, çizim mockup ile birebir garanti edilmez.

Doğrulanmış takvim günleri ezan bildirimleri kapalı olsa da bağımsız aktarılır. Bugünün altı vakti yoksa eski veri gösterilmez; uygulamayı açma mesajı çıkar. Gün geçişi, vakit sınırı, yeniden başlatma, saat değişimi ve uygulama güncellemesi yenilemeye bağlandı. Sürekli servis yok. Mevcut kesin alarm erişimi varsa sınır güncellemesi kesin alarm ile, yoksa gecikebilen inexact alarm ile yapılır. Güç tasarrufu/force-stop durumları telefonda sınanmalı. İnternetsiz sınırsız takvim üretimi eklenmedi.

Doğrulama: test-prayer-card.cjs (varsayılan, kalıcılık, izin reddi, native sync/configure, kapatma, hata geri alma, native hide uzlaşması), mevcut notification-planning testleri ve HTML UI 320/390/530 px kontrolleri geçti. Android XML kaynakları aapt2 36.0.0 ile derlendi; NurPrayerCard Java sınıfı JDK21 / platform37 android.jar ile derlendi (R ve MainActivity için geçici kontrol sınıfları kullanıldı). Tam Capacitor/Gradle APK derlemesi ve gerçek cihaz davranışı henüz doğrulanmadı. APK veya GitHub yüklemesi başlatılmadı.

## 9 Ekim 2026 — Başlıklarda kelime bölünmesi (yerel, APK bekliyor)

Tesbihat dahil sayfa başlıklarında overflow-wrap:anywhere kaldırıldı; kelimeler harften bölünmüyor, çok kelimeli başlıklar gerektiğinde boşluklardan satıra geçiyor. Ortak motif panelinin yatay iç boşluğu azaltıldı, metne tam genişlik verildi; dekoratif çizgiler daralabilir, başlık en uzun kelime genişliğini korur.

14 sayfa başlığı; 320, 360, 390, 412 ve 530 px ekranlarda 16/20 px kök yazı boyutuyla kontrol edildi (140 başlık/ölçü birleşimi). Kelime içinde satır kırılması ve panel dışına taşma yok. Tesbihat başlığı görsel olarak da incelendi. Yeni APK henüz üretilmedi.

## 9 Ekim 2026 — Kur’an okuyucu üst/alt yerleşimi (yerel, APK bekliyor)

Üst güvenli alanın okuyucu ve üst çubukta iki kez eklenmesi kaldırıldı. Üst çubuk top:0 ile yapışkan; güvenli alan yalnız çubuğun içinde uygulanıyor. Alt araç düğmeleri en az 44 px dokunma alanını koruyarak küçültüldü; altta yalnız cihazın güvenli alanı ve .25rem iç boşluk var. Okuma içeriğinin alt boşluğu ve bildirim balonu, gerçek araç çubuğu yüksekliğine bağlı. ResizeObserver ile yazı boyutu, ekran yönü ve güvenli alan değişimleri izleniyor.

Yerel uzun metin testi: 320×568, 390×844, 412×915, büyük yazıyla 360×800 ve yatay 844×390; 0/24/44 px üst, 0/24/34 px alt güvenli alanlar. Üst çubuk başlangıçta ve kaydırma sonunda ekranın üstünde, alt menü ekran dibinde; yatay taşma yok ve düğmeler en az 44 px. Native sistem çubuğu davranışı sonraki APK'da gerçek cihazda doğrulanmalı.

## 9 Ekim 2026 — Sûre bilgileri arasında kaydırma (yerel, APK bekliyor)

Sûre bilgi kartında sola kaydırma sonraki, sağa kaydırma önceki sûreyi açıyor. Liste ve geçişler aynı sıralama işlevini kullanıyor: Mushaf veya seçili iniş sırası. İlk/son sûrede taşma veya başa dönme yok. Dikey kaydırma, iptal edilen/çok parmaklı dokunuşlar ve düğmelerde başlayan dokunuşlar sûre değiştirmiyor. Önceki/sonraki düğmeleri ve seçili sırayı belirten kısa ipucu eklendi. Geçişlerde Kur’an başlığı hizası ve asıl sûre listesine dönüş konumu korunuyor.

Yerel tarayıcı testinde 114 kayıtlı sentetik veriyle her iki sıranın tamamı, sol/sağ hareketler, sınırlar, dikey hareket, iptal, liste kaydırma hafızası ve başlık hizası geçti. Telefon dokunmatik testi sonraki APK'da yapılacak.

## 9 Ekim 2026 — Sûre bilgisi açılış hizası (yerel, APK bekliyor)

Sûre seçildiğinde genel sayfanın sıfır noktasına gitmek yerine Kur’an başlığı ekranın üstüne hizalanıyor. Sûre bilgi görünümüne en az ekran yüksekliği verildi; kısa içerikte de hizalama mümkün. Diğer görünümlerin yüksekliği ve sûre listesine geri dönüşte kayıtlı kaydırma davranışı korunuyor. Yerel testte ortak açılış işlevi 1–114 sûre numarasıyla üç telefon ölçüsünde çalıştırıldı (390×844, 320×700, 412×915); başlık üst kenarı farkı 0,15 pikselin altında. Gerçek APK/telefon testi bekliyor.

## 9 Ekim 2026 — İlk Kur’an girişinde meal seçimi (yerel, APK bekliyor)

İlk Kur’an girişinde altı mevcut kaynaktan birini seçip “Kaydet ve devam et” ile onaylamak zorunlu. Varsayılan seçenek onaylanmış sayılmıyor; Escape/arka plana dokunma seçimi geçmiyor. Sûre ve konu okuma yolları aynı seçim bekleyicisini kullanıyor. Seçim mevcut Kur’an tercih kaydına yazılıyor; kayıt başarısızsa hata gösteriliyor ve diyalog açık kalıyor. Önceki sürümden geçerli meal kaydı olanların tercihi korunuyor. Kullanıcı sonradan mevcut meal menüsünden değiştirebilir.

Yerel tarayıcı kontrolü: ana sayfada istem açılmaması, ilk giriş, seçmeden devam edememe, Escape, yeniden yüklemede tekrar sorulmaması, sonradan meal değiştirme, ana sayfa kısayolu ve verileri sıfırladıktan sonraki giriş geçti. Yeni APK henüz oluşturulmadı.

## 9 Ekim 2026 — Hikâye performansı (yerel, APK bekliyor)

- Aynı üç arka planın JSON çözümleme ve görsel decode işlemleri tekrar kullanılacak şekilde önbelleğe alındı. Başarısız yükleme yeniden denenebilir.
- 1080×1920 hikâye görüntüsü PNG dışa aktarımını beklemeden gösteriliyor. Paylaşım dosyası ilk çizimden sonra hazırlanıyor; hazır olunca paylaşım düğmesi etkinleşiyor.
- Tam çözünürlüklü hikâye önbelleği 12 yerine en fazla 3 kayıt tutuyor. Yalnız sıradaki hikâye 400 ms sonra hazırlanıyor; kapanmış/değişmiş hikâye için hazırlık başlatılmıyor.
- İlgisiz bütün fontları beklemek yerine yalnız Esmâ'nın kullandığı Arapça font yükleniyor. İlk Arapça çizimin geçici fontla yapılması önleniyor.
- 4 kat CPU yavaşlatılmış yerel Edge testinde 12 hikâyenin toplu hazırlama + karşılaştırma süresi 12.759 ms → 5.353 ms; arka plan decode sayısı 12 → 3, tutulan hikâye kaydı 12 → 3. Bu telefon açılış süresi ölçümü değildir.
- Fontlar eşit hazırken 12/12 hikâyenin PNG piksel çıktısı birebir aynı. Yapay 800 ms kodlama gecikmesinde hikâye 219 ms'de görünürken paylaşım 1.450 ms'de hazır: görüntüleme PNG kodlamasını beklemiyor. Paylaşım dosyası PNG/1080×1920. Hızlı geçiş-kapatma ve Esmâ'ya yeniden giriş geçti.
- Kaynak ve kontrol HTML aynı. 45 paketli medya referansı kayıpsız doğrulandı. Android telefonda kontrol ve yeni APK dağıtımı bekliyor.

## 9 Ekim 2026 — Açılış şeritleri ve ölçü geçişi (yerel, APK bekliyor)

- MainActivity tam ekran ve çentik yerleşimini WebView/video oluşturulmadan önce hazırlıyor. Video, gerçek en/boy oranı ölçülüp yerleşim tamamlandıktan sonra başlıyor.
- Açılış temasının pencere ve sistem çubuğu arka planları video bekleme rengiyle eşleştirildi. Eski, pencereye gerilen splash arka planı kaldırıldı.
- Video yüzeyi kaldırılmadan sistem çubuklarının geri gelmesi engellendi; SurfaceView üzerinde 250 ms alpha çıkışı kaldırıldı. Bitiş, hata, zaman aşımı ve arka plana geçiş aynı temizleme yolunu kullanıyor.
- Mevcut 1080×1920, 2,09 saniyelik video değişmedi. Video kareleri yerel tarayıcıda incelendi. XML dosyaları ayrıştırıldı; bu ortamda Android SDK/derleyici olmadığından native derleme ve telefon doğrulaması yapılmadı.
- GitHub'a aktarılmadı; 109 APK'sında bu düzenleme yok.

## 9 Ekim 2026 — 0.3.3-test (109) yayımlandı

Son vakit güvenilirliği ve kayıpsız medya düzeltmeleri GitHub main dalına 8fe120aa4ec7d3d92af56a0a88e5ac6ec44e6f3e commit olarak aktarıldı. Run 37899427837 başarılı; derleme, imza doğrulama ve Firebase nur-test dağıtımı geçti. Önceki 108 sürümüyle aynı imza korunuyor. Yeni sürümün telefon testi kullanıcı tarafından yapılacak.

APK SHA-256: 15ff6c05c160d1ac2b6b701b0c719532b742bd1f0edd98e63028c116ad7d03db. Yerel dosya: outputs/NUR-0.3.3-test-109/app-debug.apk. APK içindeki geliştirme kimliği ve 45 medya başvurusu doğrulandı; eksik dosya yok.

Firebase: https://appdistribution.firebase.google.com/testerapps/1:557016260273:android:1f0a581591c6656db08c90/releases/5mgrmqg6el5c8
GitHub artifact: https://github.com/UyGarTRK/NUR-Mobile/actions/runs/37899427837/artifacts/11601479309

Telefon testi: kaldırmadan güncelleme ve kayıtların korunması; vakit/konum doğruluğu; çevrimdışı ve tarih geçişi; ön hatırlatma + vakit sesi; hikâye paylaşımı ve ses önizlemesi. Aşağıdaki eski hazırlık notlarındaki “henüz APK’ya alınmadı” ifadeleri bu dağıtımdan önceki duruma aittir.

---

# Güncel değişiklik durumu

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

## Önceki kayıtlar (tarihsel)

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

## 2026-10-08 — 0.3.2-test (108) dağıtıldı
- Gradle versionCode ataması düzeltildi; Android APK ve aynı imza kontrolü başarılı.
- Firebase nur-test grubuna dağıtım başarılı.
- Açık onayla şifreli imza yedeği alındı ve yerelde kurtarılarak sertifikası doğrulandı.

## 9 Ekim — Ekstra menü birleşimi (yerel, henüz APK’da değil)
- Panelin alt konumu sabit varsayılan yükseklik yerine alt menünün gerçek üst kenarından hesaplanıyor. Güvenli alan, font ve ekran değişiminde yeniden ölçülüyor; birleşimde 1 px örtüşme var.
- Kontrol HTML kopyası eşitlendi.
