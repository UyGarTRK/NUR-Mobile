# Açılış kapanması incelemesi — 17 Ekim 2026

- Bildirim: 113 güncellemesinden sonra ana ekranda kapanma; cihazdan logcat yok, USB cihaz bağlı değil. Telefonun kesin kök nedeni doğrulanmadı.
- Bulgu: Eski ardışık alarm kimliklerinden tarih tabanlı kimliklere geçişte 360 eski + 360 yeni kayıt oluşabiliyordu. Capacitor, yakalanmamış eklenti istisnasını RuntimeException olarak tekrar atıyor.
- Android kaynak kanıtı: https://android.googlesource.com/platform/frameworks/base/+/refs/heads/android11-release/services/core/java/com/android/server/AlarmManagerService.java — MAX_ALARMS_PER_UID varsayılan 500; sınırda IllegalStateException. Üretici/sürüm sınırı değişebilir.
- Düzeltme: Aynı olay için kayıtlı kimliği koru; yeni olaylarda boşalan kayıtları yeniden kullan. Yarım kalan 113 geçişinin kayıt dışı tarih kimliklerini temizle. Başarılı Android kayıtlarını tek tek sakla. Android kayıt hatasını yakala, önceki alarmı mümkünse geri kur ve köprüye hata döndür.
- Test: 360 kayıtlı alarm + yeni 360 plan senaryosu düzeltme öncesi sınır testinde başarısız; düzeltme sonrası eski/yeni kimlikler, ters sıra, tamamen farklı tarihler ve 140 kayıt dışı alarm senaryoları doğrulanır.
- Android Java/Kotlin derlemesi başarılı. Telefon açılış/arka plan/alarm teslim testleri henüz doğrulanmadı.
- Ana ekran, tema, tipografi, açılış animasyonu değiştirilmedi.
