# İlk kurulum izin akışı — 5 Kasım 2026

Otomatik konum sekmesi artık yalnız panel açmak yerine requestLocation akışını başlatır. Konumumu kullan aynı akışta kalır. İşlem sürerken ikinci konum işlemi başlatılamaz. Güncel vakit verisi alınmadan kurulum tamamlandı sayılmaz. Manuel il listesi hatası otomatik konumun durum metnini ezmez.

Konum başarıyla tamamlanınca ekran kapanır. Yeni kurulumda ve mevcut bildirim tercihi yoksa nurFirstNotificationSetupV1=pending kaydedilir. Ana ekran çizildikten sonra Android bildirim izni istenir. İzin verilirse vakit girişleri ve 5 dakika ön hatırlatma etkinleşir; ses/titreşim açık, beş namaz seçili, güneş kapalıdır. Hazır vakitler mevcut alarm köprüsüne aktarılır. Ret halinde uygulama açık kalır, bildirimler açık gösterilmez. Mevcut kişiselleştirmeler ve kapalı bildirim tercihleri üzerine yazılmaz. Bekleyen ilk kurulum yeniden açılışta devam edebilir; tamamlanmış/ret verilmiş kurulum tekrar sorulmaz. Web önizlemede Android bildirim izni istenmez.

Konum köprüsündeki Android konum izinleri ve hizmet-kapalı ayarlardan dönüş akışı korunur. Android'in dakik alarm, pil ve bildirim kanalı izinleri bu değişiklikle otomatik olarak verilmez. Mevcut aygıt izin kontrolü ve alarm zamanlama altyapısı korunmuştur.

Doğrulama: tests/handoff/test-first-setup.cjs benzetilmiş yerel köprüyle tek tık, izin sırası, başarılı izin, bildirim reddi, konum reddi ve mevcut tercihlerin korunmasını denetler. test-notification-permissions.cjs mevcut ayrıntılı izin denetimi testidir. Her ikisi geçti. Gerçek Android izin penceresi/GPS/arka plan alarm teslimi henüz cihazda doğrulanmadı. APK oluşturulmadı.

Konum izinleri referansı: https://developer.android.com/develop/sensors-and-location/location/permissions/runtime

## Açılışta seyahat konumu yenileme

Yerel uygulamada otomatik konum kayıtlıysa soğuk açılış, görünür olma ve Android appStateChange güncel koordinat isteğini tetikler. Üç saniyelik tekrar engeli ve devam eden istek birleştirmesi vardır. Sürekli/arka plan GPS takibi eklenmedi. Yeni izin penceresi kendiliğinden açılmaz; mevcut izin yoksa kayıtlı konum korunup durum mesajı gösterilir. Başarılı vakit yanıtı mevcut applyPrayerResponse ve alarm eşitleme yoluna girer. GPS beklenirken konum tercihi değişirse eski sonuç uygulanmaz. Web açılış davranışı korunur. test-location-resume.cjs ve ilk kurulum testi geçti; gerçek seyahat/cihaz testi henüz yapılmadı.
