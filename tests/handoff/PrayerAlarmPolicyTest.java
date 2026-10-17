import com.capacitorjs.plugins.localnotifications.NurPrayerAlarmPolicy;

public class PrayerAlarmPolicyTest {
    static void expect(boolean expected, long at, long now) {
        if (NurPrayerAlarmPolicy.deliverable(at, now) != expected) throw new AssertionError(at + " / " + now);
    }
    public static void main(String[] args) {
        long prayer = 2000000000000L;
        expect(true, prayer, prayer);
        expect(true, prayer, prayer + 119999);
        expect(true, prayer, prayer + 120000);
        expect(false, prayer, prayer + 120001);
        expect(false, prayer, prayer + 5 * 60000);
        expect(false, prayer, prayer + 86400000);
        expect(false, prayer, prayer - 1);
        expect(false, 0, prayer);
        // A blocked 5-minute reminder must not sound together with the prayer.
        expect(false, prayer - 300000, prayer);
        expect(true, prayer, prayer);
        System.out.println("PASS: on-time prayer allowed; late, future and invalid delivery rejected; delayed reminder does not catch up with prayer.");
    }
}
