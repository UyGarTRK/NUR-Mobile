# GitHub Üzerinden NUR APK Oluşturma

Bu yöntem Android Studio, Android SDK veya telefon kablosu gerektirmez. GitHub kendi sunucusunda APK üretir.

## 1. Projeyi hazırlayın

`NUR-Mobile-Android-Projesi.zip` dosyasını bilgisayarınızda bir klasöre çıkartın. ZIP dosyasını GitHub'a olduğu gibi yüklemeyin; içindeki proje dosyaları depoda görünmelidir.

## 2. GitHub Desktop ile yükleyin

1. `https://desktop.github.com/` adresinden GitHub Desktop'ı kurun ve GitHub hesabınızla giriş yapın.
2. **File → Add local repository** seçeneğine girin.
3. ZIP'ten çıkarttığınız `NUR-Mobile` proje klasörünü seçin.
4. Klasör henüz Git deposu değil uyarısında görünen **create a repository** bağlantısına basın.
5. Repository name alanını `NUR-Namaz-Uygulamasi` yapın ve **Create Repository** düğmesine basın.
6. Üst bölümde **Publish repository** düğmesine basın.
7. Kaynak kodunun herkese açık olmasını istemiyorsanız **Keep this code private** işaretli kalsın.
8. Yeniden **Publish Repository** diyerek yüklemeyi tamamlayın.

## 3. APK üretin

1. Tarayıcıdan GitHub deponuzu açın.
2. Üst menüden **Actions** sekmesine girin.
3. Sol taraftan **NUR Android APK** iş akışını seçin.
4. Sağ taraftaki **Run workflow** düğmesine, ardından açılan yeşil **Run workflow** düğmesine basın.
5. Yeni başlayan çalışmaya tıklayın ve yeşil onay işareti oluşana kadar bekleyin.

Proje `main` dalına ilk kez yüklendiğinde işlem kendiliğinden de başlayabilir; bu durumda tekrar **Run workflow** demeniz gerekmez.

## 4. APK'yı indirin

1. Tamamlanan çalışma sayfasının en altındaki **Artifacts** bölümüne gidin.
2. **NUR-debug-APK** bağlantısına basın.
3. GitHub küçük bir ZIP dosyası indirir.
4. ZIP'i açıp içindeki `app-debug.apk` dosyasını telefonunuza gönderin.
5. Telefonda APK'ya dokunun ve kurulum iznini onaylayın.

## Güvenlik notu

Bu iş akışı yalnızca test amaçlı debug APK üretir. `UyGar Medya` üretim anahtarı GitHub'a yüklenmez. Mağaza için imzalı AAB üretimine geçtiğimizde anahtar ve parolayı GitHub Environments/Secrets üzerinden ayrı bir güvenli iş akışına bağlayacağız.
