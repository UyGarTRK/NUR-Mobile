package tr.com.nur.namaz;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.firebase.appdistribution.FirebaseAppDistribution;

/** Test distribution only. The full Firebase SDK is excluded from release builds. */
@CapacitorPlugin(name = "NurUpdates")
public class NurUpdatesPlugin extends Plugin {
    private boolean checking;
    private long lastAutomaticCheck;

    private boolean configured() {
        boolean debug = (getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        return debug && getContext().getResources().getIdentifier("google_app_id", "string", getContext().getPackageName()) != 0;
    }

    @PluginMethod
    public void status(PluginCall call) {
        try {
            PackageInfo info = getContext().getPackageManager().getPackageInfo(getContext().getPackageName(), 0);
            JSObject result = new JSObject();
            result.put("configured", configured());
            result.put("versionName", info.versionName);
            result.put("versionCode", android.os.Build.VERSION.SDK_INT >= 28 ? info.getLongVersionCode() : info.versionCode);
            call.resolve(result);
        } catch (Exception e) { call.reject("Sürüm bilgisi okunamadı.", e); }
    }

    @PluginMethod
    public void check(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (!configured()) { resolve(call, "not_configured"); return; }
            if (checking) { resolve(call, "busy"); return; }
            boolean interactive = Boolean.TRUE.equals(call.getBoolean("interactive", false));
            long now = android.os.SystemClock.elapsedRealtime();
            if (!interactive && lastAutomaticCheck != 0 && now - lastAutomaticCheck < 3600000) { resolve(call, "throttled"); return; }
            try {
                FirebaseAppDistribution distribution = FirebaseAppDistribution.getInstance();
                // Automatic checks must not open a Google sign-in prompt without a user gesture.
                if (!interactive && !distribution.isTesterSignedIn()) { resolve(call, "sign_in_required"); return; }
                checking = true;
                lastAutomaticCheck = now;
                distribution.updateIfNewReleaseAvailable()
                    .addOnSuccessListener(result -> { checking = false; resolve(call, "checked"); })
                    .addOnFailureListener(error -> { checking = false; call.reject("Güncelleme kontrol edilemedi. İnternet bağlantınızı ve test hesabınızın erişimini kontrol edin.", error); });
            } catch (Exception error) {
                checking = false;
                call.reject("Güncelleme bağlantısı hazır değil.", error);
            }
        });
    }

    private void resolve(PluginCall call, String state) {
        JSObject result = new JSObject(); result.put("state", state); call.resolve(result);
    }
}
