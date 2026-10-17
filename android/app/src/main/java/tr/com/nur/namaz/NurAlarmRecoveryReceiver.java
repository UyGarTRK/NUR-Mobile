package tr.com.nur.namaz;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import com.capacitorjs.plugins.localnotifications.LocalNotificationRestoreReceiver;

/** Re-arm persisted future alarms without launching the WebView or fetching location. */
public class NurAlarmRecoveryReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context context, Intent intent) {
        if (intent == null) return;
        String action = intent.getAction();
        if (Intent.ACTION_MY_PACKAGE_REPLACED.equals(action) || Intent.ACTION_TIME_CHANGED.equals(action)
                || Intent.ACTION_TIMEZONE_CHANGED.equals(action)
                || "android.app.action.SCHEDULE_EXACT_ALARM_PERMISSION_STATE_CHANGED".equals(action)) {
            new LocalNotificationRestoreReceiver().onReceive(context, intent);
        }
    }
}
