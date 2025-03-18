import crypto from 'crypto';

function isValidIPAddress(ip: string): boolean {
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,6}|:):(([0-9a-fA-F]{1,4}:){1,5}|:):(([0-9a-fA-F]{1,4}:){1,4}|:):(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:)|:):([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export function encryptIPAddress(ip: string): string | null {
  const ips = ip.split(",").map((ip) => ip.trim());
  const validIP = ips.find(isValidIPAddress);

  if (!validIP) {
    return null;
  }

  const saltKey = process.env.SALT_KEY;
  if (!saltKey) {
    throw new Error('SALT_KEY environment variable is not set');
  }

  const iv = crypto.randomBytes(16); // IV musí byť 16 bajtov
  const key = crypto.createHash('sha256').update(saltKey).digest(); // 32 bajtový kľúč pre aes-256-cbc

  // Pretypovanie argumentov, aby boli kompatibilné s TS definíciami.
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    key as unknown as crypto.CipherKey,
    iv as unknown as crypto.BinaryLike
  );
  
  let encrypted = cipher.update(validIP, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // IV ukladáme na začiatok šifrovaného reťazca, aby bolo možné dešifrovať.
  return iv.toString('hex') + encrypted;
}
