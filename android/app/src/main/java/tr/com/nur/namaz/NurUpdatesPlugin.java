package tr.com.nur.namaz;

import android.app.AlertDialog;
import android.content.ClipData;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.net.Uri;
import android.os.Build;
import android.os.SystemClock;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import org.json.JSONObject;
import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Anonymous test updates. Android retains the final installation decision. */
@CapacitorPlugin(name = "NurUpdates")
public class NurUpdatesPlugin extends Plugin {
    private final ExecutorService worker = Executors.newSingleThreadExecutor();
    private boolean checking, downloading, active = true, waitingForPermission;
    private volatile boolean destroyed, cancelled;
    private long lastAutomaticCheck;
    private Update pendingOffer, readyUpdate;
    private File readyApk;
    private AlertDialog dialog;

    private static final class Update {
        final long code, size;
        final String name, url, sha;
        Update(JSONObject json) throws Exception {
            if (json.getInt("schemaVersion") != 1) throw new IOException("Güncelleme biçimi desteklenmiyor.");
            code = json.getLong("versionCode"); name = json.getString("versionName");
            size = json.getLong("size"); url = json.getString("apkUrl"); sha = json.getString("sha256");
            NurUpdatePolicy.validate(json.getString("packageName"), code, name, url, sha, size);
        }
    }

    private PackageInfo installed() throws Exception {
        return getContext().getPackageManager().getPackageInfo(getContext().getPackageName(), signatureFlags());
    }
    private int signatureFlags() { return Build.VERSION.SDK_INT >= 28 ? PackageManager.GET_SIGNING_CERTIFICATES : PackageManager.GET_SIGNATURES; }
    private long code(PackageInfo info) { return Build.VERSION.SDK_INT >= 28 ? info.getLongVersionCode() : info.versionCode; }
    private void ui(Runnable action) { if (!destroyed) getActivity().runOnUiThread(() -> { if (!destroyed) action.run(); }); }

    @PluginMethod public void status(PluginCall call) {
        try {
            PackageInfo info = installed(); JSObject out = new JSObject();
            out.put("configured", true); out.put("versionName", info.versionName); out.put("versionCode", code(info));
            call.resolve(out);
        } catch (Exception e) { call.reject("Sürüm bilgisi okunamadı.", e); }
    }

    @PluginMethod public void check(PluginCall call) {
        ui(() -> {
            if (checking || downloading || (dialog != null && dialog.isShowing()) || waitingForPermission) { resolve(call, "busy"); return; }
            boolean interactive = Boolean.TRUE.equals(call.getBoolean("interactive", false));
            long now = SystemClock.elapsedRealtime();
            if (!interactive && lastAutomaticCheck != 0 && now - lastAutomaticCheck < 3600000) { resolve(call, "throttled"); return; }
            checking = true;
            worker.execute(() -> {
                try {
                    Update update = fetchUpdate();
                    boolean newer = NurUpdatePolicy.newer(update.code, code(installed()));
                    ui(() -> {
                        checking = false; lastAutomaticCheck = SystemClock.elapsedRealtime();
                        resolve(call, newer ? "available" : "current");
                        if (newer) { pendingOffer = update; offerWhenActive(); }
                    });
                } catch (Exception e) {
                    ui(() -> { checking = false; call.reject("Güncelleme kontrol edilemedi. İnternet bağlantınızı kontrol edip tekrar deneyin.", e); });
                }
            });
        });
    }

    private void offerWhenActive() {
        if (!active || pendingOffer == null || downloading || getActivity().isFinishing()) return;
        Update update = pendingOffer; pendingOffer = null;
        dialog = new AlertDialog.Builder(getActivity()).setTitle("Yeni NUR sürümü hazır")
                .setMessage(update.name + " (" + update.code + ")\n\nGüncellemeyi şimdi indirmek ister misiniz? Mevcut ayarlarınız korunur.")
                .setNegativeButton("Daha sonra", (d, w) -> {})
                .setPositiveButton("Güncelle", (d, w) -> download(update)).create();
        dialog.show();
    }

    private HttpURLConnection connect(String address) throws Exception {
        URL url = new URL(address);
        for (int hops = 0; hops < 5; hops++) {
            if (!NurUpdatePolicy.trustedTransport(url)) throw new IOException("Güncelleme adresi doğrulanamadı.");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setInstanceFollowRedirects(false); connection.setConnectTimeout(15000); connection.setReadTimeout(30000);
            connection.setUseCaches(false); connection.setRequestProperty("User-Agent", "NUR-Android-Updater");
            int status;
            try { status = connection.getResponseCode(); } catch (Exception error) { connection.disconnect(); throw error; }
            if (status >= 300 && status <= 399) {
                String target = connection.getHeaderField("Location"); connection.disconnect();
                if (target == null) throw new IOException("İndirme adresi bulunamadı.");
                url = new URL(url, target); continue;
            }
            if (status != 200) { connection.disconnect(); throw new IOException("Sunucu yanıtı: " + status); }
            return connection;
        }
        throw new IOException("İndirme yönlendirmesi tamamlanamadı.");
    }

    private Update fetchUpdate() throws Exception {
        HttpURLConnection connection = connect(NurUpdatePolicy.MANIFEST);
        try (InputStream input = connection.getInputStream(); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096]; int n;
            while ((n = input.read(buffer)) != -1) {
                if (destroyed || output.size() + n > 32768) throw new IOException("Güncelleme bilgisi okunamadı.");
                output.write(buffer, 0, n);
            }
            return new Update(new JSONObject(output.toString(StandardCharsets.UTF_8.name())));
        } finally { connection.disconnect(); }
    }

    private void download(Update update) {
        downloading = true; cancelled = false; readyApk = null; readyUpdate = null;
        dialog = new AlertDialog.Builder(getActivity()).setTitle("NUR güncellemesi")
                .setMessage("İndiriliyor… %0").setNegativeButton("İptal", (d, w) -> cancelled = true).create();
        dialog.setCancelable(false); dialog.show();
        worker.execute(() -> {
            File file = new File(getContext().getCacheDir(), "nur-updates/NUR-test.apk");
            try {
                if (!file.getParentFile().isDirectory() && !file.getParentFile().mkdirs()) throw new IOException("Depolama alanına erişilemiyor.");
                HttpURLConnection connection = connect(update.url);
                try (InputStream input = connection.getInputStream(); OutputStream output = new FileOutputStream(file)) {
                    byte[] buffer = new byte[65536]; long total = 0, lastProgress = 0; int n;
                    while ((n = input.read(buffer)) != -1) {
                        if (cancelled || destroyed) throw new InterruptedIOException();
                        total += n;
                        if (total > update.size) throw new IOException("APK boyutu eşleşmiyor.");
                        output.write(buffer, 0, n);
                        if (SystemClock.elapsedRealtime() - lastProgress > 400) {
                            lastProgress = SystemClock.elapsedRealtime(); int percent = (int) (100 * total / update.size);
                            ui(() -> { if (dialog != null) dialog.setMessage("İndiriliyor… %" + percent); });
                        }
                    }
                } finally { connection.disconnect(); }
                verify(file, update);
                if (cancelled || destroyed) throw new InterruptedIOException();
                ui(() -> { downloading = false; dismiss(); readyApk = file; readyUpdate = update; if (active) installOrAskPermission(); });
            } catch (Exception e) {
                file.delete();
                ui(() -> { downloading = false; dismiss(); if (!cancelled) error("Güncelleme indirilemedi veya doğrulanamadı. Bağlantınızı ve boş alanı kontrol edip yeniden deneyin."); });
            }
        });
    }

    private Signature[] signers(PackageInfo info) {
        return Build.VERSION.SDK_INT >= 28 && info.signingInfo != null ? info.signingInfo.getApkContentsSigners() : info.signatures;
    }

    private void verify(File file, Update update) throws Exception {
        if (file.length() != update.size) throw new IOException("Eksik APK.");
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        try (InputStream input = new FileInputStream(file)) {
            byte[] buffer = new byte[65536]; int n;
            while ((n = input.read(buffer)) != -1) digest.update(buffer, 0, n);
        }
        if (!NurUpdatePolicy.digestMatches(digest.digest(), update.sha)) throw new IOException("Dosya özeti eşleşmiyor.");
        PackageInfo candidate = getContext().getPackageManager().getPackageArchiveInfo(file.getAbsolutePath(), signatureFlags());
        PackageInfo current = installed();
        if (candidate == null || !current.packageName.equals(candidate.packageName)
                || code(candidate) != update.code || !NurUpdatePolicy.newer(code(candidate), code(current))) throw new IOException("APK sürümü eşleşmiyor.");
        Signature[] a = signers(current), b = signers(candidate);
        if (a == null || b == null || a.length != 1 || b.length != 1 || !Arrays.equals(a[0].toByteArray(), b[0].toByteArray()))
            throw new IOException("NUR imzası eşleşmiyor.");
    }

    private void installOrAskPermission() {
        if (readyApk == null || !active || waitingForPermission || (dialog != null && dialog.isShowing())) return;
        if (Build.VERSION.SDK_INT >= 26 && !getContext().getPackageManager().canRequestPackageInstalls()) {
            dialog = new AlertDialog.Builder(getActivity()).setTitle("Güncelleme izni")
                    .setMessage("Android ayarlarında NUR için ‘Bu kaynaktan izin ver’ seçeneğini açın. Geri döndüğünüzde kurulum ekranı açılır.")
                    .setNegativeButton("Daha sonra", (d, w) -> { readyApk = null; readyUpdate = null; })
                    .setPositiveButton("Ayarları aç", (d, w) -> {
                        try { waitingForPermission = true; getActivity().startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getContext().getPackageName()))); }
                        catch (Exception e) { waitingForPermission = false; error("Android kurulum izni ekranı açılamadı."); }
                    }).create();
            dialog.setCancelable(false); dialog.show(); return;
        }
        File file = readyApk; Update update = readyUpdate; readyApk = null; readyUpdate = null;
        downloading = true;
        worker.execute(() -> {
            try {
                // Revalidate after returning from settings, before handing the file to Android.
                verify(file, update);
                ui(() -> {
                    downloading = false;
                    if (!active) { readyApk = file; readyUpdate = update; return; }
                    try {
                        Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", file);
                        Intent intent = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/vnd.android.package-archive");
                        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                        intent.setClipData(ClipData.newRawUri("NUR güncellemesi", uri));
                        getActivity().startActivity(intent);
                    } catch (Exception e) { error("Android kurulum ekranı açılamadı. Güncellemeyi yeniden deneyin."); }
                });
            } catch (Exception e) { file.delete(); ui(() -> { downloading = false; error("APK doğrulanamadı. Güncellemeyi yeniden indirin."); }); }
        });
    }

    private void dismiss() { if (dialog != null) { dialog.dismiss(); dialog = null; } }
    private void error(String message) { if (active && !getActivity().isFinishing()) { dialog = new AlertDialog.Builder(getActivity()).setTitle("NUR güncellemesi").setMessage(message).setPositiveButton("Tamam", null).show(); } }
    private void resolve(PluginCall call, String state) { JSObject out = new JSObject(); out.put("state", state); call.resolve(out); }

    @Override protected void handleOnPause() { active = false; }
    @Override protected void handleOnResume() {
        active = true;
        if (waitingForPermission) {
            waitingForPermission = false;
            if (Build.VERSION.SDK_INT >= 26 && !getContext().getPackageManager().canRequestPackageInstalls()) {
                readyApk = null; readyUpdate = null; error("Kurulum izni verilmedi. Daha sonra Ayarlar → Uygulama Güncellemeleri bölümünden yeniden deneyebilirsiniz."); return;
            }
        }
        if (readyApk != null) installOrAskPermission(); else offerWhenActive();
    }
    @Override protected void handleOnDestroy() { destroyed = true; cancelled = true; dismiss(); worker.shutdownNow(); }
}
