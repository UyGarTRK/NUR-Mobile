package com.capacitorjs.plugins.localnotifications;

/** Delivery grace is bounded: old prayer/reminder alarms must never catch up in a burst. */
public final class NurPrayerAlarmPolicy {
    private NurPrayerAlarmPolicy() {}
    public static boolean deliverable(long scheduledAt, long now) {
        return scheduledAt > 0 && now >= scheduledAt && now - scheduledAt <= 120000L;
    }
}
