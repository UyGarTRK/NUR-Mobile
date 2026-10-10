package tr.com.nur.namaz;

import java.net.URL;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class UpdatePolicyTest {
    static void check(boolean value) { if (!value) throw new AssertionError(); }
    static void invalid(String pkg, long code, String name, String url, String sha, long size) {
        try { NurUpdatePolicy.validate(pkg, code, name, url, sha, size); }
        catch (IllegalArgumentException expected) { return; }
        throw new AssertionError("Invalid metadata was accepted");
    }
    public static void main(String[] args) throws Exception {
        String pkg = "tr.com.nur.namaz", url = "https://github.com/UyGarTRK/NUR-Mobile/releases/download/nur-test-112/NUR-test.apk";
        String hash = "a".repeat(64);
        NurUpdatePolicy.validate(pkg, 112, "0.3.6-test", url, hash, 1234);
        check(NurUpdatePolicy.newer(112,111)); check(!NurUpdatePolicy.newer(111,111)); check(!NurUpdatePolicy.newer(110,111));
        invalid("another.app",112,"test",url,hash,1234);
        invalid(pkg,0,"test",url,hash,1234); invalid(pkg,2147483648L,"test",url,hash,1234);
        invalid(pkg,112,"",url,hash,1234); invalid(pkg,112,"test",url,"xyz",1234);
        invalid(pkg,112,"test",url,hash,0); invalid(pkg,112,"test",url,hash,NurUpdatePolicy.MAX_APK+1);
        for (String bad : new String[]{url.replace("https:","http:"), url.replace("UyGarTRK", "someone"), url+"?another=apk", url.replace("NUR-test.apk", "../NUR-test.apk"), "https://evil.example/app.apk"})
            invalid(pkg,112,"test",bad,hash,1234);
        check(NurUpdatePolicy.trustedTransport(new URL(url)));
        check(NurUpdatePolicy.trustedTransport(new URL("https://release-assets.githubusercontent.com/github-production-release-asset/test?sig=example")));
        for (String bad : new String[]{"http://github.com/UyGarTRK/NUR-Mobile/releases/a", "https://github.com.evil.example/a", "https://release-assets.githubusercontent.com.evil.example/a", "https://github.com/another/repo/releases/a", "https://user@github.com/UyGarTRK/NUR-Mobile/releases/a", "https://release-assets.githubusercontent.com:444/a"})
            check(!NurUpdatePolicy.trustedTransport(new URL(bad)));
        byte[] digest = MessageDigest.getInstance("SHA-256").digest("abc".getBytes(StandardCharsets.UTF_8));
        check(NurUpdatePolicy.digestMatches(digest,"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"));
        check(!NurUpdatePolicy.digestMatches(digest,hash));
        System.out.println("PASS: update versions, metadata bounds, trusted HTTPS redirects, tampered hash rejection");
    }
}
