"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorUtil = void 0;
class CursorUtil {
    static encode(id, timestamp) {
        const cursor = `${id}:${timestamp.getTime()}`;
        return Buffer.from(cursor).toString('base64');
    }
    static decode(cursor) {
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
        }
        catch {
            return null;
        }
    }
    static encodeId(id) {
        return Buffer.from(id).toString('base64');
    }
    static decodeId(cursor) {
        try {
            return Buffer.from(cursor, 'base64').toString('utf-8');
        }
        catch {
            return null;
        }
    }
}
exports.CursorUtil = CursorUtil;
//# sourceMappingURL=cursor.util.js.map