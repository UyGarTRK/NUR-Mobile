# NUR Mobil Uygulaması

Bu proje mevcut NUR HTML uygulamasını Android ve ileride iOS üzerinde çalıştırmak için güvenli bir Capacitor kabuğuna taşır.

Android Studio kurmadan GitHub üzerinden test APK'sı üretmek için [GITHUB-APK-KILAVUZU.md](GITHUB-APK-KILAVUZU.md) dosyasını izleyin.

## Gereksinimler

- Node.js 22 veya üzeri
- Android Studio Otter 2025.2.1 veya üzeri
- JDK 21 (Android Studio ile birlikte gelir)
- Android SDK

## Android'de açma

```bash
npm ci
npm run android:open
```

Android Studio açıldıktan sonra bağlı telefonu seçip **Run** düğmesine basın. Telefonda geliştirici seçenekleri ve USB hata ayıklama açık olmalıdır.

## Sonraki güncellemeler

Bu test paketi son HTML sürümünü içerir: Nur asistanı, Profil, eğitimler ve diğer mevcut bölümler. Yayıncı **UyGar Medya**, uygulama kimliği `tr.com.nur.namaz` olarak korunmuştur. Test sürümü `0.2.0-test`.

Telefon üzerinde konum için Android izin akışı ve fiziksel geri tuşu bağlandı. Nur baloncuğu 30 saniye etkileşim olmadığında sağ kenara çekilir; dokunulduğunda açılır. Bunlar gerçek cihazda test edilmelidir.

E-posta hesap sunucusu henüz bağlı değildir. Nur yerel rehberdir; harici yapay zekâ modeli bağlı değildir. Ezan bildirimlerinin arka planda zamanlanması bu pakette tamamlanmış değildir; uygulama kapalıyken bildirim garantisi verilmez. Ayrıntılı kontrol listesi `TELEFON-TESTI.md` içindedir.

Supabase bağlantısı hazır olduğunda sadece public proje bilgileriyle:

```bash
NUR_SUPABASE_URL=https://PROJE.supabase.co NUR_SUPABASE_PUBLIC_KEY=PUBLIC_KEY npm run sync
```

Veritabanı şeması `src/index.html` içindeki `nur-account-deployment-schema` şablonunda bulunur. Şema ve OTP e-posta ayarları sunucuda uygulanmadan hesap işlemleri açılmamalıdır.

Ana HTML dosyası `src/index.html` olarak tutulur. Değişikliklerden sonra:

```bash
npm run sync
```

komutu web dosyalarını güvenli mobil pakete hazırlar ve Android projesine aktarır.

## Üretim güvenliği

- Üretim anahtarı veya parolası projeye eklenmez.
- HTTP trafik ve karma içerik kapalıdır.
- Üretim WebView hata ayıklaması kapalıdır.
- Uygulama yalnızca ön planda konum izni ister; arka plan konum izni kullanılmaz.
- Mağaza sürümü oluşturulmadan önce imzalı AAB, Play Integrity ve güvenli yerel depolama aşamaları tamamlanmalıdır.

## UyGar Medya üretim imzası

Sertifika sahibi ve kuruluş adı **UyGar Medya**, anahtar takma adı ise `uygar-medya` olarak hazırlanmıştır. Windows üzerinde Android Studio terminalinde:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/create-release-keystore.ps1
```

macOS veya Linux üzerinde:

```bash
bash scripts/create-release-keystore.sh
```

Komut parolayı gizli biçimde sorar, `android/keys/uygar-medya-release.jks` anahtarını ve yerel `android/keystore.properties` dosyasını oluşturur. Bu iki dosya paylaşılabilir proje paketine ve Git'e alınmaz.

İmzalı mağaza paketi için:

```bash
npm run android:build:release
```

Anahtar dosyası ve parola kaybolursa aynı uygulama kimliğiyle güncelleme yayınlamak mümkün olmayabilir. İkisini birbirinden ayrı en az iki güvenli yerde yedekleyin. Google Play üzerinde görünen geliştirici adı ayrıca Play Console hesabında **UyGar Medya** olarak ayarlanmalıdır.

## Marka görsellerini yeniden üretme

Ana logo `branding/app-logo-source.png` dosyasında korunur. Android launcher ve açılış görsellerini yeniden üretmek için:

```bash
bash scripts/generate-brand-assets.sh
```
