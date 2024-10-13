import * as crypto from "crypto";


// Constants
const ALGORITHM = "aes-256-cbc"; // Encryption algorithm
const IV_LENGTH = 16; // IV length for AES (16 bytes)

// Secure key generation
function generateKey(): Buffer {
  return crypto.randomBytes(32); // 256 bits (32 bytes)
}

// Encrypt function
export function encrypt(text: string): string {
  const key = generateKey();

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");

  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted + ":" + key.toString("hex");
}

export function decrypt(text: string, username?: string): string {
  const textParts = text.split(":");

  if (textParts.length !== 3)
    throw new Error("Invalid encrypted text format has user: " + username);

  try {
    const iv = Buffer.from(textParts[0], "hex");
    const encryptedText = Buffer.from(textParts[1], "hex");
    const key = Buffer.from(textParts[2], "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    // @ts-ignore
    let decrypted = decipher.update(encryptedText, "hex", "utf8");

    // @ts-ignore
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }
}