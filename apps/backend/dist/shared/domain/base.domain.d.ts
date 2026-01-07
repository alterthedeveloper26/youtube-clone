export declare abstract class BaseDomain {
    protected readonly id: string;
    protected readonly createdAt: Date;
    protected readonly updatedAt: Date;
    protected readonly deletedAt: Date | null;
    constructor(id: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date | null);
    getId(): string;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    getDeletedAt(): Date | null;
    isDeleted(): boolean;
}
