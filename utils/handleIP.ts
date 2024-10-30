import crypto from 'crypto';

function isValidIPAddress(ip: string): boolean {
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,6}|:):(([0-9a-fA-F]{1,4}:){1,5}|:):(([0-9a-fA-F]{1,4}:){1,4}|:):(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:)|:):([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export function encryptIPAddress(ip: string): string | null {
  if (!isValidIPAddress(ip)) {
    return null;
  }

  const saltKey = process.env.SALT_KEY;

  if (!saltKey) {
    throw new Error('SALT_KEY environment variable is not set');
  }

  const saltedIP = ip + saltKey;
  const cipher = crypto.createCipher('aes-256-cbc', saltKey);
  let encrypted = cipher.update(saltedIP, 'utf8', 'hex');

  encrypted += cipher.final('hex');

  return encrypted;
}