const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const {execFileSync} = require('node:child_process');

const apk = 'android/app/build/outputs/apk/debug/app-debug.apk';
const aapt = path.join(process.env.ANDROID_HOME, 'build-tools/36.0.0/aapt');
const info = execFileSync(aapt, ['dump', 'badging', apk], {encoding:'utf8'});
const match = info.match(/package: name='([^']+)' versionCode='(\d+)' versionName='([^']+)'/);
if (!match || match[1] !== 'tr.com.nur.namaz') throw Error('Unexpected APK identity');
const versionCode = Number(match[2]), versionName = match[3];
if (versionCode !== 100 + Number(process.env.GITHUB_RUN_NUMBER)) throw Error('Unexpected APK version');
const tag = `nur-test-${versionCode}`;
const bytes = fs.readFileSync(apk);
const metadata = {
  schemaVersion: 1, packageName: match[1], versionCode, versionName,
  apkUrl: `https://github.com/UyGarTRK/NUR-Mobile/releases/download/${tag}/NUR-test.apk`,
  sha256: createHash('sha256').update(bytes).digest('hex'), size: bytes.length,
  commit: process.env.GITHUB_SHA
};
fs.mkdirSync('public-release', {recursive:true});
fs.copyFileSync(apk, 'public-release/NUR-test.apk');
fs.writeFileSync('public-release/nur-update.json', JSON.stringify(metadata, null, 2)+'\n');
fs.writeFileSync('public-release/notes.txt', `NUR ${versionName} (${versionCode}) — telefon testi sürümü.\n\nGoogle hesabı veya test kodu gerekmez. Mevcut NUR uygulamasını kaldırmadan APK’yı kurun. Bu sürüm uygulama açılışında yeni sürüm kontrolü, Güncelle / Daha sonra seçimi ve Android onaylı kurulumu içerir. Mevcut tema ve sayfa düzeni korunmuştur.\n\nKaynak: ${process.env.GITHUB_SHA}\nAPK SHA-256: ${metadata.sha256}\n`);
fs.appendFileSync(process.env.GITHUB_ENV, `NUR_RELEASE_TAG=${tag}\nNUR_RELEASE_TITLE=NUR ${versionName} (${versionCode})\n`);
console.log(`Prepared ${tag}: ${metadata.sha256}`);
