// Encrypt the existing key to the owner's offline recovery key. Never log key material.
const fs = require('node:fs');
const crypto = require('node:crypto');
const secret = fs.readFileSync('android/debug.keystore');
const key = crypto.randomBytes(32), iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(secret), cipher.final()]);
const envelope = {
  format: 'nur-signing-backup-v1',
  wrappedKey: crypto.publicEncrypt({key:fs.readFileSync('scripts/nur-backup-public.pem'),oaepHash:'sha256',padding:crypto.constants.RSA_PKCS1_OAEP_PADDING}, key).toString('base64'),
  iv: iv.toString('base64'),
  tag: cipher.getAuthTag().toString('base64'),
  ciphertext: encrypted.toString('base64')
};
fs.writeFileSync('nur-signing-backup.encrypted.json', JSON.stringify(envelope));
secret.fill(0);key.fill(0);
