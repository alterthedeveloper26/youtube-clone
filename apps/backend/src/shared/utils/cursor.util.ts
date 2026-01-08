/**
 * Cursor utility for pagination
 * Encodes/decodes cursors using base64
 */

export class CursorUtil {
  /**
   * Encode a cursor from an ID and timestamp
   * Format: base64(id:timestamp)
   */
  static encode(id: string, timestamp: Date): string {
    const cursor = `${id}:${timestamp.getTime()}`;
    return Buffer.from(cursor).toString('base64');
  }

  /**
   * Decode a cursor to get ID and timestamp
   */
  static decode(cursor: string): { id: string; timestamp: Date } | null {
    try {
      const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
      const [id, timestampStr] = decoded.split(':');
      if (!id || !timestampStr) {
        return null;
      }
      return {
        id,
        timestamp: new Date(parseInt(timestampStr, 10)),
      };
    } catch {
      return null;
    }
  }

  /**
   * Encode cursor from just an ID (for simple cases)
   */
  static encodeId(id: string): string {
    return Buffer.from(id).toString('base64');
  }

  /**
   * Decode cursor to get just the ID
   */
  static decodeId(cursor: string): string | null {
    try {
      return Buffer.from(cursor, 'base64').toString('utf-8');
    } catch {
      return null;
    }
  }
}
