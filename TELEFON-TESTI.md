# APK öncesi ve sonrası kontrol listesi

Bu liste tamamlandı demek değildir. [ ] işaretleri cihaz doğrulaması bekler.

## Uygulama içi test güncellemeleri (henüz etkin değil)
- [ ] Firebase Android yapılandırması ve App Testers API tamamlandı.
- [ ] GitHub dağıtım yetkisi yalnız NUR test dağıtımı için yapılandırıldı.
- [ ] Mevcut v162 imza anahtarı kurtarıldı, korumalı kalıcı yedeği alındı; yeni APK sertifikası eşleşti.
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
