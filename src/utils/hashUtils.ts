/**
 * Generates a cryptographic hash simulation for ticket authenticity.
 * Uses the Web Crypto API (SHA-256) to create a deterministic, verifiable hash.
 */
export async function generateTicketHash(data: {
  passengerName: string;
  origin: string;
  destination: string;
  travelDate: string;
  travelTime: string;
  ticketType: string;
  issuedAt: string;
}): Promise<string> {
  const payload = JSON.stringify(data);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(payload);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

/**
 * Formats a hash string into readable segments for display on a ticket.
 * e.g. "A1B2C3D4-E5F6G7H8-..."
 */
export function formatHashForDisplay(hash: string): string {
  return hash
    .substring(0, 32)
    .match(/.{1,8}/g)
    ?.join('-') ?? hash.substring(0, 32);
}

/**
 * Generates a short ticket ID from the hash.
 */
export function generateTicketId(hash: string): string {
  return `MR-${hash.substring(0, 6)}-${hash.substring(6, 10)}`.toUpperCase();
}

/**
 * Simulates a QR code-like barcode string derived from the hash.
 * Returns a compact representation for display.
 */
export function generateBarcodeData(hash: string): string {
  return hash.substring(0, 24).toUpperCase();
}
