# NUR prayer alarm changes

Pinned upstream: `@capacitor/local-notifications` 8.3.1 (MIT, LICENSE included).
The three Kotlin files are upstream files with NUR-only changes. `manifest.json`
contains original and patched SHA-256 hashes. `npm run sync` applies the patch;
unknown upstream versions or modified inputs fail instead of silently losing it.

- `LocalNotificationManager`: NUR prayer notifications use `setAlarmClock`
  when exact alarm access is granted, including the optional 5-minute reminder.
  This avoids sharing the idle quota between the reminder and the prayer.
  Without access, existing inexact scheduling remains, with a visible warning.
  Stale NUR events are not immediately replayed during scheduling.
- `TimedNotificationPublisher`: read the stored original target time, reject
  cancelled/replaced events, consume one-shot records once, and drop delivery
  more than 2 minutes late. Record last delivery/drop/permission failure in
  `nur_alarm_health`. The 2-minute bound prevents a delayed 5-minute reminder
  from sounding together with the prayer. This is loss prevention, not a claim
  that missed notifications have been delivered.
- `LocalNotificationRestoreReceiver`: restore only future NUR alarms, including
  when invoked by the app's clock/package/exact-permission recovery receiver.
- `NurPrayerAlarmPolicy.java`: pure delivery timing predicate, tested separately.

No full-screen intent, foreground service, background location, or automatic
battery exemption is requested. Existing selected notification channels/sounds
remain in use and obey system volume, channel settings, and Do Not Disturb.

Physical verification is required: grant notification/exact-alarm access, test a
5-minute reminder and prayer with screen off and Doze, swipe app out of recents,
reboot, change exact permission, and confirm there is no replay after a delay.
Force-stop and an exhausted stored prayer calendar remain platform/data limits.

Sources:
- https://developer.android.com/develop/background-work/services/alarms
- https://developer.android.com/training/monitoring-device-state/doze-standby
