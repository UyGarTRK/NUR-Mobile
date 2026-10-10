## Üst başlık ve Besmele — sonraki APK

- [ ] Soğuk açılış/arka plandan dönüş/ekran döndürmede Android uygulama başlık çubuğu görünmez.
- [ ] Ana sayfa ve tüm menü sayfalarında üstte NUR Namaz Uygulaması yazısı yok.
- [ ] Camili başlık Besmele ile başlar; uzun boşluk kalmaz, metin saat/çentik altında kalmaz.
- [ ] Farklı ekran oranları, büyük yazı, hareketli ve üç tuşlu gezinmede kontrol edilir.

## Otomatik Dini Gündem — sonraki APK

- [ ] Ana sayfa kısayolu Dini Gündem'i açar; güncellemeden sonra son haber başlığı görünür.
- [ ] İlk çevrimiçi girişte iki kaynak yüklenir; yeniden giriş gereksiz istek üretmez.
- [ ] Uygulama açıkken 30 dakika sonra haberler yeniden kontrol edilir; Şimdi yenile çalışır.
- [ ] Uçak modunda ve kapat/aç son haberler kalır; eski kontrol zamanı korunur.
- [ ] Okurken yenileme okuyucuyu kapatmaz; telefon geri tuşu listeye döner.
- [ ] Kaynağında oku doğru web sayfasını açar; dar ekran/büyük yazı taşmaz.

## Dini Gündem — sonraki APK

- [ ] Önceden kaydedilmiş Ekstra düzeninde Dini Gündem görünür; eski sıralama korunur.
- [ ] Haber / Araştırma / Anlatı filtreleri, Türkçe arama ve sonuç bulunamadı mesajı çalışır.
- [ ] Dört içerik internetsiz okunur; geri dönüş arama ve kategori seçimini korur.
- [ ] Kaynağında oku bağlantıları çevrimiçiyken doğru resmî sayfayı açar.
- [ ] Küçük ekran ve büyük yazıda başlık, kartlar ve okuyucu taşmaz; alt menü metinleri örtmez.
- [ ] Sayfa değiştirme ve geri dönüş mevcut Kur’an/bildirim ayarlarını etkilemez.

## İlk Kur’an girişinde meal seçimi — sonraki APK

- [ ] Temiz kurulumda Kur’an'a ilk girişte seçim zorunlu; seçmeden devam edilemiyor.
- [ ] Kaydetme sonrası kapat/aç ve APK güncellemesinde tekrar sorulmuyor.
- [ ] Sonradan meal değiştirme ve ayet bağlantılarından Kur’an'a giriş çalışıyor.
- [ ] Telefonun geri tuşu seçilmemiş mealle okumayı açmıyor.

## Bekleyen hikâye optimizasyonu — sonraki APK

- [ ] Eski telefonda dört grubu ilk açılışta ve yeniden açılışta dene; metin/arka plan birlikte doğru görünmeli.
- [ ] Hızlı ileri-geri geçiş ve hazırlanırken kapatma yanlış hikâye göstermemeli.
- [ ] Beğeni, 5 saniyelik ilerleme, basılı tutarak duraklatma ve grup geçişi çalışmalı.
- [ ] Paylaşım hazır olduğunda 1080×1920 PNG telefonun paylaşım ekranına gelmeli.
- [ ] Çevrimdışı hikâyeler, Esmâ'nın Arapça yazısı ve uygulama yeniden açılınca günlük beğeniler kontrol edilmeli.

## Bekleyen açılış düzeltmesi — sonraki APK

- [ ] Uygulamayı tamamen kapatıp aç: ilk video karesinde üst/alt beyaz şerit veya ekran ölçüsü sıçraması olmamalı.
- [ ] Hareketle gezinme ve üç tuşlu gezinmede; çentikli ekranda kontrol et.
- [ ] Animasyon bittiğinde ana sayfa, durum çubuğu ve alt menü normal yerleşimine dönmeli.
- [ ] Animasyon sürerken ana ekrana çıkıp geri dön: boş katman kalmamalı, video yeniden başlamamalı.
- [ ] Ekstra menü ile alt menü arasında ana sayfa görünmemeli.

## Güncel durum

Kullanıcı 108 APK’sını kurduğunu bildirdi. Aşağıdaki yeni vakit düzeltmeleri henüz telefondaki APK’da yok; yeni dağıtımdan sonra sınanmalı. Veri koruma ve tüm cihaz senaryoları geçti kabul edilmedi.

- [ ] İlk kurulum ve çevrimdışı açılışta örnek saat görünmüyor.
- [ ] Gece yarısında ve yatsı sonrasında doğru günün vakti gösteriliyor.
- [ ] Ay geçişinde bildirim planı dolu; plan bitiş tarihi doğru.
- [ ] Konum değiştirilince eski yere ait alarm kalmıyor.
- [ ] Paketli hikâye görselleri, ses önizlemesi ve paylaşım çalışıyor.

# APK öncesi ve sonrası kontrol listesi

Bu liste tamamlandı demek değildir. [ ] işaretleri cihaz doğrulaması bekler.

## Uygulama içi test güncellemeleri (108 dağıtımı etkin)
- [x] Firebase Android yapılandırması ve App Testers API tamamlandı.
- [x] GitHub dağıtım yetkisi yalnız NUR test dağıtımı için yapılandırıldı.
- [x] Mevcut v162 imza anahtarı kurtarıldı, şifreli yedeği alındı; 108 APK sertifikası eşleşti.
- [ ] İlk güncelleme mevcut uygulamanın üzerine kuruldu; ayarlar ve kullanıcı verisi korundu.
- [ ] İlk test hesabı bağlantısı yalnız kullanıcı düğmeye bastığında açıldı.
- [ ] Daha yüksek versionCode ile ikinci test sürümü uygulamadan bulundu, indirildi ve Android onayıyla kuruldu.
- [ ] Çevrimdışı, daveti olmayan hesap, iptal ve yeni sürüm bulunmaması durumları denendi.

## Kurulum
- [ ] Kurulu uygulamanın versionName/versionCode bilgisi kaydedildi.
- [ ] Güncelleme imzası kurulu APK ile aynı; mevcut kullanıcı verisi korunuyor.
- [ ] Yeni APK dosya adı, SHA-256, kaynak kimliği ve tarih CHANGELOG'a işlendi.

## Bildirimler (kritik)
- [ ] İlk izin isteği kabul edilince uygulama anahtarı kapanmıyor; reddetme sonrası açıklama doğru.
- [ ] Genel varsayılan Bildirim Sesi 4; öncesi 1; vakit 2.
- [ ] Dokuz sesin her biri Dinle/Durdur ile doğru kaydı oynatıyor.
- [ ] Üç kategorinin telefona test bildirimi panelde görünüyor ve seçili ses duyuluyor.
- [ ] Ses değiştirildikten sonra yeni kanal/plan seçimi kullanıyor.
- [ ] Vakit öncesi hatırlatma ve vakit girişi ayrı ayrı geliyor.
- [ ] Ekran kilitli, uygulama arka planda, uygulama normal kapalı ve yeniden başlatma senaryoları denendi.
- [ ] Bildirim/kanal sessizliği, Rahatsız Etmeyin, alarm izni ve pil kısıtları ayrı kontrol edildi.
- [ ] Konum değişince eski yere ait bildirimler kalmıyor; günlük yenileme çalışıyor.
- [ ] Telefon yeniden başlatıldıktan sonra planın durumu doğrulandı.
Not: Android'de kullanıcı tarafından zorla durdurulmuş uygulamanın davranışı normal arka planla aynı kabul edilmez.

## Konum / vakit / hava durumu
- [ ] GPS kapalı ilk açılışta uygulama izni isteniyor; ardından uygun servis açıklaması var.
- [ ] GPS açılıp uygulamaya dönünce otomatik seçim tamamlanıyor.
- [ ] Yaklaşık/kesin konum ve izin reddi akışları çalışıyor.
- [ ] Şehir adı servisi başarısızken vakit/hava yüklemesi engellenmiyor.
- [ ] Manuel il/ilçe seçimi kalıcı; ayarlarda manuel değişiklik akışı doğru.
- [ ] Gerçek ilçe/tarih için altı vakit güvenilir kaynakla karşılaştırıldı.
- [ ] Yatsı sonrası ertesi gün imsak hesabı ve tarih geçişi doğrulandı.

## Açılış ve ekran
- [ ] Intro tam ekran, üst-alt boşluk yok; kırpma kabul edilebilir.
- [ ] Video bitince sistem çubukları düzeliyor; sekme değiştirince tekrar başlamıyor.
- [ ] Çentik, güvenli alan, alt gezinme ve 320 px görünüm kontrol edildi.

## Hikâyeler
- [ ] Dört grup ve her grupta üç içerik.
- [ ] Sola/sağa çekme küme değiştiriyor; kalan içerikleri göstermeden hedef ilk içeriğe gidiyor.
- [ ] Kısa dokunma içerik değiştiriyor; basılı tutma durduruyor.
- [ ] Dikey hareket ve ilk/son grup sınırları yanlış geçiş yapmıyor.
- [ ] Paylaşım ekranında görsel+metin+kaynak tek dosya; mevcut hikâyeyle aynı.
- [ ] Paylaşımı iptal etme, uygulamadan çıkıp dönme, hızlı geçişte eski görsel gelmemesi.
- [ ] Türkiye gece yarısı sonrasında yeniden açıldığında günlük içerik değişiyor.
- [ ] Uzun metin/kaynaklar ve Arapça isimler taşmadan okunuyor.

## Diğer kritik geri dönüş kontrolleri
- [ ] Okuyuculardan geri dönüşte scroll korunuyor.
- [ ] Sıradaki Vakit kartı 5 saniye sonra soluyor, sürükleniyor, konumu korunuyor.
- [ ] Yeni sürümde profil/yer imi/dua/not/eğitim/zikirmatik yerel kayıtları kaybolmadı.

## 8 Ekim — ek hatırlatma ve vakit girişi
- [ ] 5 dakika önce seçiliyken iki bildirim de seçilen ayrı seslerle geliyor.
- [ ] Ön hatırlatma sesi kapalıyken vakit girişinde Ezan Vakti sesi korunuyor.
- [ ] Ek hatırlatma Yok seçilince yalnız vakit girişi kalıyor.
- [ ] Tüm vakitler kapatılınca eski vakit planları iptal ediliyor.

## Kur’an okuyucu ekran ölçüsü

- [ ] Üst çubuk çentiğin/durum çubuğunun altında tek güvenli alanla yerleşiyor.
- [ ] Alt araç menüsü hareket çubuğu/üç tuşlu gezinmenin üstünde; gereksiz boşluk yok.
- [ ] Büyük yazı, uzun ayet ve yatay ekranda metnin sonu alt menü altında kalmıyor.

## Günlük bildirim kartı

- [ ] Varsayılan tasarım 3; üç tasarım değiştirilip yeniden açıldığında korunuyor.
- [ ] İzin reddi, izin verilmesi, kanalın Android ayarından kapatılması doğru mesajla karşılanıyor.
- [ ] Panelde genişlet/daralt, büyük yazı, açık/koyu tema, 3 tasarım taşmadan okunuyor.
- [ ] Gizle ve desteklenen cihazda sürükleyerek kaldırma kartı kapatıyor; uygulama zorla geri getirmiyor.
- [ ] Vakit sınırı/gece yarısı/yeniden başlatma/saati değiştirme testleri; uyku modunda gecikme gözlenmeli.
- [ ] Eksik gün ve konum değişiminde eski saatler gösterilmiyor. Ezan uyarıları bağımsız çalışıyor.
- [ ] Kart ve ezan uyarısında cami simgesi doğru görünüyor.
