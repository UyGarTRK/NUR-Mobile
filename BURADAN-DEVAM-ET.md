# NUR — yeni sohbet için devir notu

Bu paket 5 Ekim 2026 tarihinde hazırlanan güncel Android kaynak projesidir. Kullanıcı bu ZIP üzerinden diğer sohbette APK hazırlanmasını istiyor. Öncelik bu dosyadaki bilgiler ve `src/index.html` dosyasıdır; eski README belgeleri önceki aşamaları anlatabilir.

## Güncel sürüm
- HTML: v161, `src/index.html`. Tek başına tarayıcıda da açılabilir.
- Android: `tr.com.nur.namaz`, versionCode 3, versionName `0.3.0-test`.
- Yayıncı: UyGar Medya.
- Depo: https://github.com/UyGarTRK/NUR-Mobile
- APK henüz derlenmedi. Android üzerinde yeni değişiklikler fiziksel cihazda test edilmedi.
- Bu sohbetten başarılı bir GitHub commit/push veya yeni APK çıktısı doğrulanmadı. Depoya aktarım yapmadan önce mevcut main dalını kontrol edip diğer sohbetin değişikliklerini koruyun.

## Paketin içeriği
- HTML'de son ekran düzenlemeleri, hareket ettirilebilir/solan sıradaki vakit kartı, saate göre karşılama ve NUR baloncuğunun 5 saniye gecikmeli karşılaması bulunuyor.
- NUR asistanı v3: konuya göre uygulama içi açıklamalar, Kur’an kısayolları, hadis fihristi ve altı kaynak kısayolu; devam sorularında konu bağlamı. Harici LLM bağlantısı yok; mevcut içerik ve yerel kurallarla çalışıyor.
- Bildirim Sesleri: 4 MP3; Ezan Öncesi: 2 MP3; Ezan Vakti: 3 MP3. Sesler HTML kataloğuna gömülü ve Android res/raw altında mevcut. Seçimler `nurNotificationSoundsV1` anahtarında bağımsız saklanıyor. Dinle/Durdur ön izlemesi var.
- `prepare-web.mjs`, katalogdaki sesleri her build sırasında native kaynaklara da yazar. Sessiz kayıt `nur_silent.wav` ayrıca korunur. `keep.xml` dinamik seçilen kaynakların release sırasında silinmesini engeller.
- LocalNotifications 8.3.1 bağımlılığı ve gerekli izinler eklendi. Vakit öncesi veya vakit girişi seçimine göre doğru ses kanalı oluşturulur. Mevcut zamanlama ayarı tek bir zamanı seçer; hem öncesi hem vakit girişini birlikte planlama henüz ayrı bir özellik olarak yapılmadı.
- Genel dua/ayet/hutbe bildirimlerinin sunucu gönderimi henüz yok. Genel ses seçimi hazır; gerçek bildirim kaynağına ayrıca bağlanacak.
- Native konum izin isteme ve bildirim izin/planlama köprüsü HTML içinde bulunuyor.

## Açılış animasyonu — unutmayın
- Kullanıcının onayladığı özgün video `android/app/src/main/res/raw/nur_intro.mp4`.
- H.264/AAC, 1080×1920, yaklaşık 2.09 saniye.
- `MainActivity.java` ilk açılışta VideoView katmanında gösterir, bitince 250 ms ile kapanır. Sekme değişimi/arka plandan dönüşte tekrar oynatılmaz. Video hatasında veya 7 saniyelik üst sınırda ana ekranı serbest bırakır.
- Kaynak entegrasyonu yapıldı; native görünüm, ses, ekran oranı ve yaşam döngüsü cihazda kontrol edilmeli.

## Derleme
Node 22+, Java 21, Android SDK 36 ve gerekli build-tools gerekir.

```sh
npm ci --ignore-scripts
npm run sync
cd android
chmod +x gradlew
./gradlew assembleDebug --no-daemon
```

Çıktı: `android/app/build/outputs/apk/debug/app-debug.apk`.

GitHub Actions iş akışı `.github/workflows/build-android-apk.yml` içinde. main push veya elle çalıştırma ile başlar. SDK kurulumunda emekliye ayrılmış `tools` paketini istememek için `packages: platform-tools` ayarı bulunuyor.

## Doğrulama durumu
- `npm run sync` başarılı: web paketi, yerel font/ikonlar ve 5 Capacitor eklentisi aktarıldı.
- Tarayıcıda üç ses kategorisi, dokuz sesin çözülmesi, seçimlerin yenileme sonrası korunması ve dar mobil ekran kontrol edildi.
- Mock testte native konum izin isteği ile Ezan Öncesi/Ezan Vakti/sessiz kanal eşlemesi geçti.
- NUR konu yönlendirmesi, Kur’an ve hadis kısayolları tarayıcıda denendi.
- Gradle/Android derlemesi ve fiziksel cihaz testi henüz yapılmadı. Başarılı APK üretmeden tamamlandı demeyin.

## İmza ve kurulmuş uygulama
Mevcut telefondaki APK'nın imza anahtarı bu pakette yok. Yeni APK'nın mevcut uygulama üzerine kurulabilmesi için aynı imza gerekir. Yeni iş akışı debug.keystore için önbellek kullanır; bu geçmiş APK'nın anahtarını geri getirmez. Mevcut uygulamayı kaldırmayı önermeden önce kullanıcı verilerinin korunmasını ve eski imza erişimini değerlendirin. Pakette özel anahtar veya şifre bulunmaz.

## Kullanıcı çalışma tercihi
Tane tane ilerleyin. İlk hedef bu paketten güncel APK'yı üretmek ve açılış animasyonu/dokuz sesi cihazda kontrol etmek. Kullanıcı açıkça APK istemediği sonraki geliştirmelerde HTML teslimi tercih ediyor. Tüm sayfalar mobil uyumlu olmalı. Yeni bir özellik eklemek yerine bu aktarımı tamamlayın.
