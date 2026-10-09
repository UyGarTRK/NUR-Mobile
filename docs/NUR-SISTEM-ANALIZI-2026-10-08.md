# NUR — Sistem, içerik ve tasarım haritası

8 Ekim 2026 · İncelenen APK: 0.3.2-test (108) · Kaynak commit: 3850713293fbbc896988fa3a3585bc3158e06b71.

Kullanıcı bu APK’yı kurduğunu ve telefon testine başladığını bildirdi. Bu çalışma kaynak analizi ve yerel tarayıcı incelemesidir; Android sensör, bildirim teslimi veya telefon testinin tamamlandığı anlamına gelmez. Uygulama kaynak kodu değiştirilmedi; yeni APK/dağıtım başlatılmadı.

## 1. Kaynak ve mimari

Esas dosya NUR-Mobile/src/index.html: 14.405.871 bayt, 5.441 satır. SHA-256: 4b754e10f7a5d988d7ab47637d78257322f2a4eae65f92340c8c6c1060165db4.

React/Vue bileşenleri veya bir yönlendirme kütüphanesi kullanılmıyor. Düz JavaScript, DOM olayları, HTML şablon dizeleri ve hidden/CSS sınıfı değişimleriyle çalışan tek sayfalı uygulama. Büyük ana script ile dosya sonundaki ayrı denetleyiciler birlikte çalışıyor. 6 style bloğu, 18 script etiketi var; bunların arasında JSON veri blokları ve ön izleme SDK etiketleri de bulunuyor.

| Katman | Görevi | Değişiklik yeri |
|---|---|---|
| Ana web kaynak | Ekran, tasarım, içerik, etkileşim, kayıtlar | src/index.html |
| Android web uyarlaması | Geri tuşu sırası, klavye yüksekliği, yerel konum uyarlaması, asistanın kenara çekilmesi | src/native-runtime.js |
| Paket hazırlama | Ön izleme SDK’larını çıkarır; font/ikon/CSS ve Capacitor dosyalarını yerelleştirir; sesleri raw kaynaklarına çıkarır | scripts/prepare-web.mjs |
| Üretilen web | Derleme çıktısı, doğrudan düzenlenmez | www/ ve APK assets/public/ |
| Android açılış | Video, cover ölçekleme, sistem çubukları, köprü kayıtları | MainActivity.java |
| Konum köprüsü | İzin ile GPS servis durumunu ayırır, ayarlara yönlendirir | NurLocationAccessPlugin.java |
| Güncelleme köprüsü | Sürüm bilgisi ve Firebase test güncellemesi | NurUpdatesPlugin.java |
| Dağıtım | Testler → derleme → imza kontrolü → APK → Firebase | .github/workflows/build-android-apk.yml |

Akış: kaynak HTML → prepare-web + Tailwind → www → Capacitor/Android → imzalı test APK → Firebase test grubu → kullanıcı kurulum onayı.

Android applicationId tr.com.nur.namaz; ad NUR; yayıncı UyGar Medya. Capacitor 8, Java 21, Android SDK 36. iOS ayarları var, bu kaynakta tamamlanmış iOS projesi yok. npm sürümü 0.3.0, Android adı 0.3.2-test, CI sürüm kodu 108 ve web geliştirme etiketi farklı kavramlar; sürüm kaydı tekleştirilmeli.

## 2. Menü ve ekran ağacı

Alt menü 5 yuvadan oluşuyor: varsayılan Kur’an, Kıble, ortada Ana Sayfa, Cuma Hutbesi, en sağda Ekstra. Ana Sayfa ve Ekstra sabit; kalan üç yuva 14 içerik bölümünden seçilip sürüklenerek değiştiriliyor. Tercih nurMenuPlacements içinde saklanıyor. Ekstra’nın altındaki Ayarlar ve Düzenle sabit. Kaynak: MENU_KEYS satır 2529, normalizeMenuLayout 2680, showPage 4439.

| Bölüm | İçinde neler var? | Verinin niteliği |
|---|---|---|
| Ana Sayfa | Zamana göre karşılama/manzara, konum, hava, sıradaki vakit ve ilerleme, bugünün imsakiyesi, önceki/sonraki gün, aylık görünüm, dört hikâye kümesi, Keşfet ve Devam Et kartları | Canlı vakit/hava + yerel içerik ve kayıt |
| Kur’an | 114 sûre için liste, mushaf/iniş sırası, sûre bilgisi, Arapça ve meal, 6 meal seçeneği/karşılaştırma, 188 konuluk fihrist, sûre/ayet atlama, yazı boyutu, Arapça/meal görünürlüğü, not, kaldığım yer, kopyalama/paylaşım | Sûre/ayetler ağdan; konu referansları ve tercihler yerel |
| Kıble | Konuma göre Kâbe açısı, pusula başlatma, telefon yönü, hizalanma, sensör/izin açıklamaları | Konum + cihaz yön sensörü |
| Cuma Hutbesi | Son doğrulanan hutbe, tam metin okuyucu, geçmiş 5 hutbe, güncellik uyarısı, Şimdi yenile | Gömülü başlangıç arşivi + canlı yayın ve yerel önbellek |
| Zikirmatik | Serbest veya tesbihattan hedefli sayaç, günlük/aylık özet, tamamlanan ve yarım kalan oturumlar, devam/sil/sıfırla | Yerel; geçmiş en çok 300 oturum |
| Hicri Takvim | Ay/yıl seçimi, bugün, miladi tarihe git, gün detayı, dini ve resmî gün işaretleri | Intl islamic-umalqura + yerel tarih listeleri |
| Dini Günler | Dini/resmî gün sekmeleri, yaklaşan günler, açıklama kartları | Kaynağa gömülü tarih/içerik; görünen liste 2026–2028 |
| Siyer | Kronolojik hayat 16 başlık, günlük hayat/âdetler 15, Kur’an’da Peygamber 5; arama, detay okuyucu, ayete geçiş | Yerel anlatımlar ve kaynak atıfları |
| Dualar | 300 kayıt; Kur’an/Hadis kategorileri, 12 konu + Tümü, arama, Arapça/okunuş/anlam/kaynak, Kur’an bağlantısı | Yerel; ilk 35 + 115 Hisn ek kaydı + 150 ek kayıt |
| Hadisler | Kütüb-i Sitte: Buhârî, Müslim, Tirmizî, Ebû Dâvûd, Nesâî, İbn Mâce; her biri 50, toplam 300 kayıt; kaynak/konu fihristi, âlim bilgisi, okuyucu | Seçilmiş yerel derleme; kitapların tam metni değil |
| İslam Tarihi | Câhiliye, Hz. Muhammed, Dört Halife, Emevî, Abbâsî, Selçuklu, Osmanlı, modern dönem; bölüm içi gezinme | 3 statik + 5 veriyle oluşturulan dönem; kaynak bağlantıları |
| Müfessirler | 10 biyografi; yaklaşım filtreleri, eserler, önem, arama | Yerel biyografi/kitap kayıtları |
| Eğitim | 4 kurs, 31 ders; anlatım, örnek, belirli derslerde quiz, tekrar, ilerleme ve okuyucu | Yerel durum makineleri ve kayıtlar |
| Tesbihat | 15 kayıt; namaz sonrası, sabah-akşam, günlük, istiğfar, uyku öncesi; Arapça, anlam, kaynak, tekrar sayısı, Zikirmatik’e aktar | Yerel |
| Esmâül Hüsnâ | 99 isim, arama, Arapça/Türkçe anlam ve ayrıntı okuyucu | Yerel |
| Ayarlar | Profil; Bildirim Ayarları; Konum Ayarları; Uygulama Güncellemeleri; Kıble ve Pusula kısayolu | Yerel tercihler + seçilen yerel/uzak köprü |
| NUR asistanı | Sürüklenebilir balon, konu rehberi, yerel arama, ekran kısayolu, ilerleme/not bilgisi, son 40 mesaj | Kural tabanlı; uzak yapay zekâ modeline bağlı değil |

Tefsir kodu ve bazı şablonlar dosyada bulunuyor fakat QURAN_TAFSIR_ENABLED=false. Kullanıcı kararıyla kapalı; görünür çalışan özellik sayılmıyor.

## 3. Eğitim ve içerik ayrıntıları

### Kur’an Okumayı Öğreniyorum

- Arapça Harfleri Tanıyalım
- Harflerin Başta, Ortada ve Sonda Yazılışı
- Harekeler: Üstün, Esre ve Ötre
- Harfleri Birleştirerek Okuma
- Cezm, Şedde ve Tenvin
- Uzatma Harfleri ve Med
- Kısa Kelime ve Ayet Alıştırmaları

### Kur’an Okuma Eğitimi II

- Mahreçlere Giriş
- Kalın ve İnce Okunan Harfler
- Şemsî ve Kamerî Harfler
- Medd-i Tabii ve Uzatma Ölçüsü
- Kalkale Harfleri
- Sakin Nûn ve Tenvin
- Sakin Mîm Kuralları
- Mushaf Üzerindeki Özel Okuma İşaretleri
- Allah Lafzındaki Lâm ve Râ Harfi
- Durak İşaretleri ve Kontrollü Okuma

### Peygamberimizin Hayatını Öğreniyorum

- Doğumu, Ailesi ve Çocukluğu
- Gençliği ve el-Emîn Oluşu
- İlk Vahiy ve Tebliğin Başlaması
- Mekke Dönemi ve Sabır
- Hicret ve Medine Toplumunun Kuruluşu
- Vedâ Haccı, Son Günler ve Vefatı

### Kur’an’dan İslam’ın Temel İlkeleri

- Tevhid ve Allah’a Kulluk
- İman Esaslarının Kur’an’daki Çerçevesi
- İbadet ve Sorumluluk
- Adalet ve Şahitlik
- Ahlak, Dil ve İnsan Onuru
- Mal, Ticaret ve Kul Hakkı
- Paylaşma ve Toplumsal Dayanışma
- Yeryüzü, Emanet ve Bozgunculuktan Kaçınma

Birinci kursun harf, harf biçimleri, hareke, birleştirme ve üç rehberli dersinde tanıtım → öğrenme → quiz → sonuç → tekrar/tamamlama akışları bulunuyor. Harf listesinde 29 eğitim girdisi var; bunu bağımsız bir dilbilimsel alfabe sayısı diye yorumlamamak gerekir. Başarı eşiği ilgili motorlarda %80; zayıf başlık/harf kalmaması ayrıca aranıyor. Her 31 ders aynı quiz motoruyla çalışmıyor. EDUCATION_DEVELOPMENT_MODE=true; geliştirme için açık bırakılmış kilitleri kendiliğinden kapatmamak gerekir. Kullanıcının harf ses kayıtları hâlâ bekliyor.

Müfessirler: İmam Taberî, İmam Mâtürîdî, Zemahşerî, Fahreddin er-Râzî, İmam Kurtubî, Kādî Beyzâvî, Ebû Hayyân el-Endelüsî, İbn Kesîr, Şehâbeddin el-Âlûsî, Elmalılı Hamdi Yazır.

Meal seçenekleri: Elmalılı Hamdi Yazır Kur'an Meâli; Diyanet İşleri Kur'an Meâli; Süleyman Ateş Kur'an Meâli; Abdülbaki Gölpınarlı Kur'an Meâli; Yaşar Nuri Öztürk Kur'an Meâli; Ali Bulaç Kur'an Meâli. Seçeneklerin katalogda bulunması, her uzak servisin bugün eksiksiz yanıt verdiğinin kanıtı değildir.

İçerikte TDV İslâm Ansiklopedisi, Diyanet/Kur’an Yolu, temel hadis kitapları ve Hisnü’l-Müslim atıfları bulunuyor. Bunlar kaynak kodundaki atıfların envanteridir; bu çalışma metinleri tek tek bu kaynaklarla karşılaştırarak doğrulamadı. VERIFIED gibi değişken adları editoryal doğrulama belgesi sayılmaz. Bazı dua okunuşlarında Latin aktarım kalıntıları ve bazı hadis çevirilerinde bozuk Türkçe görüldü; içerik denetimi ayrı iş olmalı.

## 4. Tasarım sistemi

| Öğe | Mevcut değer/yöntem | Kullanım |
|---|---|---|
| Ana zemin | #fbf7ed | Krem/parşömen görünümü |
| Koyu ana renk | #07192d | Başlık, alt menü merkezi, büyük kartlar |
| Metin | #10253f | Gövde ve başlık |
| Vurgu | #d9a847 | Altın kenarlık, aktif durum, ana eylemler |
| Kart | #fffdf8 | Açık okuma/kütüphane yüzeyi |
| İkincil metin | #6f7781 | Açıklama ve durum |
| Gövde fontu | DM Sans, 400–700 | Arayüz, alanlar ve açıklamalar |
| Başlık fontu | Playfair Display, 600/700 | Edebî başlıklar ve okuyucu hiyerarşisi |
| Arapça | Noto Naskh Arabic, 400–700 | Ayet, dua ve Arapça eğitim |
| Yerleşim | Flex/Grid + Tailwind yardımcı sınıfları + özel CSS | Mobil öncelikli; yaklaşık 530 px okuyucu sınırı |
| Sayfa boşluğu | clamp(1rem,4vw,1.4rem) | Ekrana uyarlanan yan boşluk |
| Alt gezinme | --nav-height:5.15rem + safe-area | Sabit alt menü ve içerik alt payı |
| Kart dili | İnce altın sınır, yuvarlak köşe, lacivert degrade, yumuşak gölge | Büyük vakit kartı 1.4rem köşe; küçük kartlar farklı ölçüler |
| İkonlar | Lucide SVG + özel gömülü raster menü ikonları | İşlev ikonları ve marka ikonları ayrı |
| Motifler | CSS pseudo-element, çizgiler, geometrik/conic-gradient ve ۞ benzeri işaretler | Dekoratif zemin ve başlık |

Tema açık renge sabitlenmiş: color-scheme light ve mobil krem zemin zorlaması var. Sistem koyu moduna otomatik geçiş tasarlanmamış. Ekranların çoğu motifli ortalı başlık → tanıtım kartı → arama/filtre → liste → ayrı okuyucu düzenini izliyor. Ayarlar kategori merkezi ve alt panel yapısını kullanıyor. Zikirmatik tam alanlı büyük sayaç tasarımına sahip.

Tam bir merkezi tasarım sistemi henüz yok: altı CSS bloğu, satır içi stiller ve bölüme özel benzer sınıflar bulunuyor. Yeni bileşen eklerken mevcut kart, başlık, filtre, okuyucu, modal kalıplarını kullanmak; daha sonra görünümü değiştirmeden ortaklaştırmak en az riskli yol.

Katmanlar: alt menü, sabit okuyucular, hikâye/modal, asistan ve yüzen vakit kartı farklı z-index değerleriyle ayrılıyor. Vakit kartı z-index 1400 ile bazı başlıkların üstüne gelebiliyor; ekran atlasında bu örtüşme görülüyor. Bu tasarlanmış yüzen davranış, fakat ilk konum ve okunabilirlik telefon testinde değerlendirilmelidir.

## 5. Görseller, sesler ve hareketler

HTML içinde 34 benzersiz raster görsel ve 9 benzersiz ses bulunuyor. Tekrarlı iki görsel kullanımıyla birlikte 36 gömülü görsel başvurusu var. Görsel/ses data URL’leri yaklaşık 12,77 MB metin, HTML’nin yaklaşık %88,6’sı. Üç hikâye PNG’sinin toplam ham boyutu yaklaşık 6,60 MB; bunlar tek başına HTML’de yaklaşık 8,80 MB base64 yer kaplıyor.

| Varlık grubu | Sayı / biçim | İşlev |
|---|---|---|
| Hikâye arka planı | 3 PNG, 941×1672 | Gece, seher/gün batımı tonları, gündüz; belgeye göre AI üretimi |
| Ana manzara | 6 WebP, 1024×768 | Gece, şafak, sabah, öğle, ikindi, akşam; kandil/cami/deniz kompozisyonu |
| Vakit sembolleri | 6 WebP, 256×256 | Hilal, güneş ve ufuk varyasyonları |
| Menü/yardımcı ikonlar | 18 PNG | Kur’an, Kâbe/pusula, cami, minber, tesbih, takvim, kandil, kitap/tüy, dua, hadis, tarih, müfessir, eğitim, Esmâ, ayar/düzenleme |
| NUR asistan balonu | 1 WebP, 192×192 | Lacivert-altın konuşma/ışık motifi |
| Marka | branding/app-logo-source.png ve Android mipmap/splash çıktıları | Başlatıcı simgesi/açılış görselleri |
| Bildirim sesi | 4 genel + 2 öncesi + 3 vakit MP3 | HTML ön dinleme ve Android raw ses kanalları |
| Sessizlik | nur_silent.wav | Ön hatırlatmanın sessiz kanalı |
| Açılış videosu | nur_intro.mp4 | Yerel Android VideoView; belgede yaklaşık 2,09 sn, 1080×1920 |

Görsellerin çoğunun dosya kaynağı/üretim tarihi/lisans manifesti kodda bulunmuyor. Görselin neyi gösterdiği gözle incelendi; hikâye dışındaki bütün rasterların üretim yöntemi yalnız görünüşten kesinleştirilmedi.

| Hareket | Nasıl uygulanmış? |
|---|---|
| Ana manzara geçişi | Görsel ön yükleme, 170 ms bekleme, opacity .34s |
| Vakit ilerleme | Her saniye güncelleme; genişlik/işaret 1s linear, 3s parlama |
| Yüzen vakit | Konum/boyut .52s cubic-bezier; köşe/padding .42s; 5 sn hareketsizlikte .22 opaklık, sürüklenebilir ve konumu kayıtlı |
| Hikâyeler | requestAnimationFrame ile 5 sn süre, basılı tutma durdurur; yatay sürükleme küme, kısa dokunma içerik değiştirir |
| Hikâye eylemleri | Beğenmede ölçek/ring, paylaşımda kısa uçuş/rotasyon |
| Kıble | Dönüş .16s linear; doğru yönde altın pulse |
| Liste/modal | Kur’an listesinin hafif dikey giriş/solma animasyonu, aylık detay scale .97→1 |
| Menü düzenleme | İç gölge pulse ve sürükleme geri bildirimi |
| Asistan | Selamlama .4s, sohbet .18s giriş; Android’de 30 sn sonra kenara çekilme |
| Native intro çıkışı | Video bitişi/hata/arka plana geçişte kapanır; .25s alpha; 7 sn güvenlik zaman aşımı |

prefers-reduced-motion bazı bileşenlerde destekleniyor; tüm hareketlerin kapsamlı azaltılmış hareket denetimi henüz yapılmadı. Başlık/okuyucu geri dönüşü scroll hafızası ve çift requestAnimationFrame ile düzenleniyor. Android geri tuşu, önce açık modal/okuyucuyu, sonra ana sayfayı, sonra çıkış onayını ele alıyor.

Hikâyede gösterilen görsel ve paylaşılan 1080×1920 PNG aynı Canvas kompozisyonundan geliyor. Arapça/meal/kaynak metni görsele çalışma anında çiziliyor. Android Filesystem CACHE + Share; webde dosya paylaşımı veya indirme yedeği. Günlük seçim İstanbul tarihine göre sabit; dört kümede üçer içerik. Ayet havuzu tüm Kur’an değil, mevcut dua kayıtlarının Kur’an alıntıları. Bazıları kısmi ayet olarak etiketleniyor.

## 6. Veri kaynakları ve çevrimdışı davranış

| Kaynak | Kodda kullanım | İnternet yokken |
|---|---|---|
| api.aladhan.com | Günlük/aylık namaz vakitleri; method=13, school=0 | Yerel kayıt/başlangıç verisi; güncellik problemi aşağıda |
| api.turkiyeapi.dev | İl/ilçe listeleri; bazı koordinatlar | İlk seçim listesi yüklenemeyebilir |
| api.bigdatacloud.net → nominatim.openstreetmap.org | Koordinatı şehir/ilçe adına çevirme | Vakit koordinatla çalışabilir; ad çözümü bekler |
| geocoding-api.open-meteo.com / api.open-meteo.com | Yer adı koordinatı ve güncel hava | Saklanan hava veya hata durumu |
| api.alquran.cloud | Sûre listesi, Arapça ayet ve 6 meal | Yeni sûre/ayet yüklenemez; tam çevrimdışı Kur’an yok |
| api.quran.com | Bölüm metadata/iniş sırası | İlk sûre yüklemesi bu isteğe de bağımlı |
| www.diyanethaber.com.tr | Hutbe RSS ana kaynağı | Saklanan/gömülü hutbe ve güncellik uyarısı |
| api.rss2json.com / r.jina.ai | Hutbe yedek RSS dönüşümü ve metin tamamlama | Ağ hatası, arşiv korunur |
| kuran.diyanet.gov.tr | Kapalı tefsir akışının resmî bağlantısı | Şu an ürün özelliği kapalı |
| Firebase App Distribution | APK test dağıtımı/güncelleme | Güncelleme kontrolü yapılamaz; normal yerel içerik bağımsız |
| Supabase hazırlığı | E-posta OTP, profil, ilerleme yedeği | Yapılandırma boş; hizmet etkin değil |

Bu adresler kaynak koddan çıkarıldı; canlı uç noktaların çalışırlığı bu analizde sınanmadı. Kodda Diyanet yöntemine ilişkin etiket bulunması doğrudan resmî Diyanet vakit servisi kullanıldığı anlamına gelmez; gerçek veri Aladhan üzerinden geliyor.

Yerel içerikler (dua, hadis, tarih, eğitim, Esmâ, tesbihat), paketli font/ikon/görseller ağdan bağımsız. Tüm uygulama bütünüyle çevrimdışı değildir. APK hazırlanırken CDN ve /_sdk ön izleme bağımlılıkları çıkarılıyor; kodda bunları görmek APK’nın aynı uzak scriptleri çalıştırdığını göstermez.

## 7. Bildirim sistemi

Kontrol noktası Ekstra → Ayarlar → Bildirim Ayarları. Anahtar varsayılan kapalı; Güneş hariç beş vakit seçili. Ek ön hatırlatma 0/5/10/15/30 dakika; 0 yalnız vakit girişi. Ön hatırlatma ses anahtarı vakit girişini sessize almıyor. Genel/öncesi/vakit sesleri ayrı; varsayılanlar 4/1/2.

buildAdhanPlan, prayerCalendarDays üzerinden gelecekteki 30 günün planını çıkarıyor. Tarih saat oluşturma +03:00 sabit; Android aktarımı en fazla 360 kayıt alıyor. NurNativeNotifications kuyruğu yeni planı yazıp sonra eskide kalanları siliyor. Başarısız yazımdan önce mevcut alarmları kaldırmıyor. Kanal kimliği kategori + ses + titreşime bağlı; Android’de kanal davranışı için tasarlanmış.

Gerçek teslim LocalNotifications eklentisine, bildirim iznine ve varsa dakik alarm iznine bağlı. Genel ses menüsü günün ayeti/duası veya hutbe için sunucu push sisteminin hazır olduğu anlamına gelmez. FCM tetikleyicisi/uzak push sistemi bu kaynakta yok. Planın süre sonrasında yenilenmesi uygulamanın tekrar veri yüklemesine bağlı; kesintisiz 30 gün ötesi arka plan yenilemesi varsayılmamalı.

## 8. Kayıtlar, hesap ve güvenlik sınırları

localStorage: zikir sayacı/oturumları, menü, konum, günlük/aylık vakit ve hava önbelleği, bildirim/ses tercihleri, Kur’an okuma ayarları/not/yer imi, eğitim ilerlemesi, hikâye beğeni/izlenme, asistan mesajları/konumu, profil taslağı. Android Preferences bağımlılığı bulunması bu verilerin Preferences veya şifreli kasaya taşındığını göstermiyor.

Profil sisteminde Supabase OTP ve SQL/RLS şeması hazırlanmış; NUR_ACCOUNT_CONFIG boş. Firebase test hesabı ile NUR profil hesabı aynı sistem değil. Hazırlanmış bulut yedeği yalnız izin verilen eğitim/Kur’an notu/yer imi/zikir kayıtlarını içeriyor; tüm ayarların yedeği değil. Session değişkeni bellekte tutuluyor; kalıcı güvenli hesap oturumu tamamlanmış sayılmaz.

secureFetch HTTPS alan adı listesi, 15 sn zaman aşımı, credentials omit ve referrer yok kullanıyor. APK’da unsafe-eval kaldırılıyor; inline script yapısı sürüyor. Android açık HTTP ve mixed content kapalı; allowBackup=false. Bunlar tam güvenlik denetimi veya saldırıya dayanıklılık garantisi değildir. Güvenlik planındaki imzalı içerik manifesti, Integrity/App Attest ve şifreli kişisel depolama hedefleri mevcut uygulama diye sunulmamalı.

İmza yedeği ve kurtarma özel anahtarı kaynak proje dışında tutuluyor. Analiz dosyalarına veya görsel atlasa özel anahtar/parola eklenmedi.

## 9. Doğrulanmış bulgular ve geliştirme sırası

| Öncelik | Bulgu / kanıt | Etki ve sonraki iş |
|---|---|---|
| Yüksek | Başlangıç prayerSchedule gerçek görünümlü 05:21/06:45/13:09/16:42/19:25/20:43 içeriyor (2298–2301). Ağ kapalı/konum yokken atlas çekiminde sayaç devam etti. Cache yükleme 3347 satırında tarih denetimi yok. | Veri yok/eski ise saatleri güncel gibi sunmamak; doğrulanmış tarih+konum durumunu UI ve bildirim planına taşımak |
| Yüksek | scheduleFromTimings 2954 satırında parametre olmayan location kullanılıyor; tarayıcı window.location ile kayıtlı konum karşılaştırılıp takvim Map’i temizleniyor. İzole testte 1 kayıt → 0 kayıt. | Ay sınırında/başka ay yüklemesinde önceki ay kaybolabilir; temizlik yalnız gerçek konum değişimine taşınmalı |
| Yüksek | Yerel dua/hadis eklerinde düzensiz Türkçe ve transliterasyon örnekleri var; 300’lük sayılar tam kitap arşivi değil. | Kaynak–Arapça–meal–okunuş–atıf–editör durumu içeren kayıt bazlı içerik denetimi |
| Orta | Bildirim planı 30 gün/360 kayıtla sınırlı; ayın gelecek günleri ancak takvim veri yüklemesinin kapsamı kadar var. | Plan bitişini görünür kılmak, ay geçişi/ağ yok/uzun süre açılmama/yeniden başlatma testleri |
| Orta | Asıl dosyanın %88,6’sı gömülü görsel/ses data URL metni. | Aynı görüntüyü koruyarak kaynak varlıkları dosyalara çıkarmak; hikâye PNG optimizasyonunu görsel kaliteyle ölçmek |
| Orta | Kapsamlı UI tek dosyada, farklı CSS/denetleyici blokları ve global köprüler arasında bağlılık var. | Davranış testleriyle bölüm bölüm modülerleştirmek; toplu yeniden yazmamak |
| Orta | Yüzen vakit kartı bazı başlıklara örtüşüyor; tüm sayfalar overflow-x hidden ile taşmayı bastırıyor. | Sadece scrollWidth ölçümü yeterli değil; 320 px dokunma/hedef/okunabilirlik ve örtüşme testi |
| Orta | Profil taslağı, not, konum ve sohbet localStorage içinde; tam bulut yedeği yok. | Veri koruma, dışa aktarım ve hesap kapsamını ayrı tasarlamak |
| Orta | Hicri Intl takvimi ile gömülü dini gün listeleri ayrı kaynaklar; cihaz yerel tarihi ile İstanbul tarihi farklı yerlerde kullanılıyor. | Tek zaman politikası, farklı saat dilimi/gece yarısı ve takvim tutarlılığı testi |
| Düşük | Devir ve telefon testi belgelerinde önceki “henüz APK yok/dağıtım yok” ifadeleri yeni başarı kaydıyla birlikte duruyor. | Eski notları tarihsel kayıt olarak ayırıp güncel durum tablosu tutmak |

Önce vakit doğruluğu/ay geçişi ve gerçek bildirim teslimi; sonra içerik kalitesi; ardından okunabilirlik ve ortak tasarım bileşenleri; sonra dosya modülerleştirmesi ve boyut optimizasyonu. Profil bulutu ve uzak asistan ayrı ürün işleri olarak ele alınmalı.

## 10. Yapılan inceleme ve sınırlar

- Kaynak HTML, prepare-web, native runtime, Android manifest/ayarlar/özel köprüler, dağıtım akışı ve devir belgeleri incelendi.
- Kurulan 108 APK’sının assets/public dosyaları ayrı inceleme klasörüne çıkarıldı; uygulama projesine geri yazılmadı.
- Paketli web, izole tarayıcıda dış ağ kapalıyken 16 ana ekranda açıldı; yakalanan JavaScript sayfa hatası 0.
- 390 px ve 320 px için 32 sayfa genişliği kontrolünde belge scrollWidth’i ekranı aşmadı. İç öğelerin kırpılmadığını veya tüm alt ekranların erişilebilirliğini tek başına kanıtlamaz.
- 16 ekran görüntüsü, 34 görselin küçük ön izlemesi, varlık envanteri, içerik sayıları ve ay takvimi sorunu için yeniden üretim kaydı alındı.
- Telefonun konumu, pusulası, ses teslimi, pil kısıtları, canlı Kur’an/hutbe servisleri ve tüm alt okuyucular bu çalışmada uçtan uca test edilmedi.

## 11. Geliştirme için kod girişleri

| Konu | src/index.html başlangıç satırı / dosya |
|---|---|
| Renk, tipografi, ana CSS | 19 |
| Statik ekranlar | 1553–2166 |
| Menü ikonları | 2177–2211 |
| Ağ güvenli erişimi | 2283 |
| Vakit ikonları/manzara | 2303 / 2307 |
| Veri/kayıt anahtarları ve içerik | 2315–2679 |
| Hicri takvim | 2693 çevresi |
| Bildirim tercih/planı | 2888–2904 |
| Vakit gösterimi/aylık takvim | 2919–3005 |
| Hikâyeler | 3076 çevresi; prepareAyetDay, createAyetArtwork, renderAyetStory, shareAyetStory |
| Konum/hava/vakit verisi | 3170–3354 |
| Kur’an katalog/okuyucu | 3433–3880 |
| Hutbe senkronizasyonu | 3881–4125 |
| Gezinme/yüzen kart | 4344–4463 |
| Eğitim | 4481–4735 |
| Siyer/tarih | 4736–4939 |
| NurAppBridge / asistan | 5021 / 5070 çevresi |
| Profil ve SQL taslağı | 5173–5294 |
| Android bildirim/konum JS köprüsü | 5295–5359 |
| Yüzen kart ek denetleyici | 5360 çevresi |
| Ses kataloğu/ayarları | 5392 çevresi |
| Güncelleme ekranı denetleyici | Dosyanın sonundaki nur-updates-controller |

Satırlar bu analizdeki kaynak sürümüne aittir. Eski Ayet fonksiyon adları dört hikâye kümesini birlikte yönetir. www çıktısını, eski ZIP’i veya önceki sürüm HTML’sini esas kaynak yerine kullanmayın. Yeni değişiklikte ilgili bölümün yerel kayıt anahtarlarını ve okuyucudan geri dönüş davranışını koruyun.
