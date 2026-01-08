export declare class CursorUtil {
    static encode(id: string, timestamp: Date): string;
    static decode(cursor: string): {
        id: string;
        timestamp: Date;
    } | null;
    static encodeId(id: string): string;
    static decodeId(cursor: string): string | null;
}
