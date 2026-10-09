import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Preserve original bytes while moving repeated base64 media out of the APK HTML.
export async function extractMedia(html, webRoot) {
  const files = new Map();
  const extensions = { 'image/png':'png', 'image/webp':'webp', 'image/jpeg':'jpg', 'audio/mpeg':'mp3', 'audio/wav':'wav', 'audio/ogg':'ogg' };
  const output = html.replace(/data:(image\/(?:png|webp|jpeg)|audio\/(?:mpeg|wav|ogg));base64,([A-Za-z0-9+/=]+)/g, (match, mime, encoded) => {
    const bytes = Buffer.from(encoded, 'base64');
    const name = createHash('sha256').update(bytes).digest('hex') + '.' + extensions[mime];
    files.set(name, bytes);
    return 'assets/media/' + name;
  });
  const destination = resolve(webRoot, 'assets/media');
  await mkdir(destination, { recursive:true });
  for (const [name, bytes] of files) await writeFile(resolve(destination, name), bytes);
  return output;
}
