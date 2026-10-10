package tr.com.nur.namaz;

import java.net.URL;
import java.security.MessageDigest;

/** Limits for the public NUR test update channel. */
final class NurUpdatePolicy {
    static final String PACKAGE = "tr.com.nur.namaz";
    static final String MANIFEST = "https://github.com/UyGarTRK/NUR-Mobile/releases/latest/download/nur-update.json";
    static final long MAX_APK = 250L * 1024 * 1024;

    static boolean trustedTransport(URL url) {
        if (!"https".equals(url.getProtocol()) || url.getUserInfo() != null
                || (url.getPort() != -1 && url.getPort() != 443)) return false;
        return ("github.com".equals(url.getHost()) && url.getPath().startsWith("/UyGarTRK/NUR-Mobile/releases/"))
                || "release-assets.githubusercontent.com".equals(url.getHost());
    }

    static void validate(String packageName, long code, String name, String url, String sha, long size) {
        if (!PACKAGE.equals(packageName) || code <= 0 || code > Integer.MAX_VALUE
                || name == null || name.length() > 80 || name.trim().isEmpty()
                || url == null || !url.matches("https://github\\.com/UyGarTRK/NUR-Mobile/releases/download/nur-test-[0-9]+/NUR-test\\.apk")
                || sha == null || !sha.matches("[a-f0-9]{64}") || size <= 0 || size > MAX_APK)
            throw new IllegalArgumentException("Geçersiz güncelleme bilgisi.");
    }

    static boolean newer(long candidate, long installed) { return candidate > installed; }
    static String hex(byte[] data) {
        StringBuilder out = new StringBuilder();
        for (byte b : data) out.append(String.format(java.util.Locale.ROOT, "%02x", b & 255));
        return out.toString();
    }
    static boolean digestMatches(byte[] digest, String expected) {
        return MessageDigest.isEqual(hex(digest).getBytes(java.nio.charset.StandardCharsets.US_ASCII),
                expected.getBytes(java.nio.charset.StandardCharsets.US_ASCII));
    }
}
