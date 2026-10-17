package tr.com.nur.namaz;

import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import androidx.core.app.NotificationManagerCompat;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "NurNotificationAccess")
public class NurNotificationAccessPlugin extends Plugin {
    @PluginMethod public void state(PluginCall call) {
        Context context = getContext();
        AlarmManager alarms = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        PowerManager power = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        ActivityManager activity = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        JSObject result = new JSObject();
        result.put("notifications", NotificationManagerCompat.from(context).areNotificationsEnabled());
        result.put("exact", Build.VERSION.SDK_INT < 31 || alarms.canScheduleExactAlarms());
        result.put("batteryUnrestricted", power.isIgnoringBatteryOptimizations(context.getPackageName()));
        result.put("backgroundRestricted", Build.VERSION.SDK_INT >= 28 && activity.isBackgroundRestricted());
        result.put("doNotDisturb", manager.getCurrentInterruptionFilter() != NotificationManager.INTERRUPTION_FILTER_ALL);
        JSArray channels = new JSArray();
        if (Build.VERSION.SDK_INT >= 26) for (NotificationChannel channel : manager.getNotificationChannels()) {
            if (!channel.getId().startsWith("nur-v3-")) continue;
            JSObject item = new JSObject(); item.put("id", channel.getId());
            item.put("blocked", channel.getImportance() == NotificationManager.IMPORTANCE_NONE);
            item.put("silent", channel.getSound() == null); channels.put(item);
        }
        result.put("channels", channels);
        android.content.SharedPreferences health = context.getSharedPreferences("nur_alarm_health", Context.MODE_PRIVATE);
        for (String key : new String[]{"lastDeliveredAt", "lastDroppedAt", "lastBlockedAt"}) result.put(key, health.getLong(key, 0));
        call.resolve(result);
    }

    @PluginMethod public void openSettings(PluginCall call) {
        String kind = call.getString("kind", "notifications");
        Intent intent;
        if ("battery".equals(kind)) {
            // Open the system list; no automatic exemption or new exemption permission.
            intent = new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS);
        } else if (Build.VERSION.SDK_INT >= 26) {
            intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE, getContext().getPackageName());
        } else {
            intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, android.net.Uri.parse("package:" + getContext().getPackageName()));
        }
        try { getActivity().startActivity(intent); call.resolve(); }
        catch (Exception error) { call.reject("Telefon ayarları açılamadı.", error); }
    }
}
