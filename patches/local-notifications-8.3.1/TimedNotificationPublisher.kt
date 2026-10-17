package com.capacitorjs.plugins.localnotifications

import android.app.AlarmManager
import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import com.getcapacitor.Logger
import java.text.SimpleDateFormat
import java.util.Date

/**
 * Creates a notification from a timer event. Registered as a broadcast receiver
 * in AndroidManifest.
 */
class TimedNotificationPublisher : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        val notification: Notification? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            intent.getParcelableExtra(NOTIFICATION_KEY, Notification::class.java)
        } else {
            @Suppress("DEPRECATION")
            intent.getParcelableExtra(NOTIFICATION_KEY)
        }
        if (notification == null) return

        notification.`when` = System.currentTimeMillis()

        val id = intent.getIntExtra(LocalNotificationManager.NOTIFICATION_INTENT_KEY, Int.MIN_VALUE)
        if (id == Int.MIN_VALUE) {
            Logger.error(Logger.tags("LN"), "No valid id supplied", null)
        }
        val storage = NotificationStorage(context)
        val notificationJson = storage.getSavedNotificationAsJSObject(id.toString())
        // NUR: late/cancelled/replaced prayer events must not burst when the device wakes.
        if (id in 100000000 until 200000000) {
            val saved = storage.getSavedNotification(id.toString()) ?: return
            if ((saved.extra as? org.json.JSONObject)?.optBoolean("nurPrayer", false) == true) {
                val expected = saved.schedule?.at?.time ?: 0L
                val firedAt = intent.getLongExtra("nurPrayerAt", expected)
                if (firedAt != expected || saved.cancelled) return
                storage.deleteNotification(id.toString())
                val health = context.getSharedPreferences("nur_alarm_health", Context.MODE_PRIVATE)
                if (!NurPrayerAlarmPolicy.deliverable(expected, System.currentTimeMillis())) {
                    health.edit().putLong("lastDroppedAt", System.currentTimeMillis()).apply()
                    return
                }
                try {
                    notificationManager.notify(id, notification)
                    health.edit().putLong("lastDeliveredAt", System.currentTimeMillis()).apply()
                } catch (error: SecurityException) {
                    health.edit().putLong("lastBlockedAt", System.currentTimeMillis()).apply()
                }
                return
            }
        }
        LocalNotificationsPlugin.fireReceived(notificationJson)
        notificationManager.notify(id, notification)
        rescheduleNotificationIfNeeded(context, intent, id)
        // The notification's record stays in storage after firing (matching the
        // legacy plugin) so a triggered notification's full data — sound, extra,
        // badge, at — remains queryable via getByIds()/getAll(). It's removed only
        // by an explicit cancel/clear call, or by the user dismissing it from the
        // shade (NotificationDismissReceiver).
    }

    private fun rescheduleNotificationIfNeeded(context: Context, intent: Intent, id: Int): Boolean {
        val dateString = intent.getStringExtra(CRON_KEY) ?: return false

        val date = DateMatch.fromMatchString(dateString)
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        val trigger = date.nextTrigger(Date())
        val clone = intent.clone() as Intent
        var flags = PendingIntent.FLAG_CANCEL_CURRENT
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            flags = flags or PendingIntent.FLAG_MUTABLE
        }
        val pendingIntent = PendingIntent.getBroadcast(context, id, clone, flags)
        val storedNotification = NotificationStorage(context).getSavedNotificationAsJSObject(id.toString())
        val wantsExact = storedNotification?.getBoolean("isExactNotification", true) ?: true
        val canExact = Build.VERSION.SDK_INT < Build.VERSION_CODES.S || alarmManager.canScheduleExactAlarms()
        if (wantsExact && canExact) {
            alarmManager.setExact(AlarmManager.RTC, trigger, pendingIntent)
        } else {
            if (wantsExact) {
                Logger.warn("Capacitor/LocalNotification", "Exact alarms not allowed in user settings.  Notification scheduled with non-exact alarm.")
            }
            alarmManager.set(AlarmManager.RTC, trigger, pendingIntent)
        }
        val sdf = SimpleDateFormat("yyyy/MM/dd HH:mm:ss")
        Logger.debug(Logger.tags("LN"), "notification " + id + " will next fire at " + sdf.format(Date(trigger)))
        return true
    }

    companion object {
        const val NOTIFICATION_KEY = "NotificationPublisher.notification"
        const val CRON_KEY = "NotificationPublisher.cron"
    }
}
