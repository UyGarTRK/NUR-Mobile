# v162 — mobil hata düzeltmeleri

Bu paket v161 üzerine uygulanmış düzeltmeleri içerir. Android versionCode 4 / versionName 0.3.1-test.

1. Bildirim anahtarında izin beklenirken kullanıcı tercihi sabit tutulur; izin sonucu ekranı yenilese de eski kapalı değer geri kaydedilmez.
2. NurLocationAccessPlugin Android konum iznini konum hizmeti kapalıyken de isteyebilir. Hizmet kapalıysa ayarlar düğmesi gösterilir, uygulamaya dönüşte tekrar konum alınır. MainActivity bu eklentiyi kaydeder. npm run sync tek başına özel eklentiyi üretmez; Java dosyasını mutlaka projeye aktarın.
3. Şehir adı çözümleme vakit verisini engellemez; hava durumu koordinat alınır alınmaz bağımsız başlatılır. Şehir adı alınamazsa uyarı gösterilir.
4. Açılış videosu merkezden cover ölçekleme ve sistem çubuklarını geçici gizleme ile ekranı doldurur. İlk açılış kuralı korunur.

Tarayıcıda izin sonucunun anahtarı yanlış kapatması senaryosu ve yenileme sonrası kayıt testi geçti. Mock native izin/ses kanalları testi geçti. Şehir adı servisi başarısızken vakit verisinin uygulanması testi geçti. npm run sync başarılı.

Yeni APK derlenmedi; gerçek Android izin diyalogları, konum hizmeti kapalı/açık akışı ve farklı ekran oranlarında video cihazda test edilmeli. Kurulu uygulamayla aynı imza korunmalı. Kullanıcının verisini silmeyin.

Derleme: npm ci --ignore-scripts, npm run sync, ardından android klasöründe ./gradlew assembleDebug. Node 22+, Java 21 ve SDK 36 gerekir. GitHub Actions tanımı pakette bulunur.

Dokuz bildirim sesi ve açılış videosu paket içinde. Mevcut ekran ve içerikler korunmuştur.
