# Çevrimdışı mealler — 4 Kasım 2026

İlk meal seçimi tamamlanınca Onayla ve indir / Daha sonra seçenekli bilgilendirme açılır. Hiçbir meal kendiliğinden indirilmez. Mevcut kullanıcılar Kur’an bölümündeki meal seçiminin altındaki Çevrimdışı mealler alanından tekli/toplu indirme yapabilir. İndirme durdurulabilir; indirilen meal kaldırılabilir. Ortak Arapça metin ve sûre dizini tekrar indirilmez.

src/quran-offline.js IndexedDB içinde tam sürümleri saklar. Bir meali kaydetmeden önce 114 sûre, sıralı âyetler, dolu metinler, kaynak kimliği, toplam 6236 âyet ve Arapça metinle sûre uzunluklarının uyumu denetlenir. Ortak dizinler ile ilk meal aynı işlemde kaydedilir. Eksik indirme tamamlandı sayılmaz. Toplu indirme kesilirse tamamlananlar korunur; tekrar işlem kalanlardan devam eder. Arka planda indirmeyi sürdürme garantisi yoktur; uygulama indirme tamamlanana kadar açık tutulmalıdır.

Kaynaklar: https://alquran.cloud/api ve mevcut sûre bilgisi kaynağı https://api.quran.com/api/v4/chapters?language=tr . Tam metin uçları /v1/quran/{edition}. Gerçek quran-simple ve mevcut altı Türkçe meal uçlarında 114 sûre/6236 âyet doğrulandı. Tam metin yanıtında numberOfAyahs bulunmadığından doğrulanmış âyet dizisinden üretilir.

secureFetch yalnız ilgili Kur’an isteklerinde yerel veri adaptörünü kullanır. Kayıtlı kaynaklar internetten istenmez; karşılaştırmada indirilmemiş kaynaklar normal ağ yolunu kullanır. Tefsir/dış bağlantılar bu indirmenin kapsamında değildir. Depolama kullanılamıyorsa normal çevrimiçi okuma korunur. Uygulama verileri silinirse indirmeler de silinir.

tests/handoff/test-quran-offline.cjs: onay öncesi indirme olmaması, tekli/toplu indirme, ortak Arapça verinin tekrar indirilmemesi, eksik yanıtın reddi, yeniden açılışta ağ kapalı sûre listesi/meal/âyet okuma. Test metinleri yapaydır. Gerçek uç kontrolü ayrıca yapılmıştır. Mushaf regresyon testi de çalıştırıldı. Bunlar telefon testinin yerine geçmez. APK oluşturulmadı.
