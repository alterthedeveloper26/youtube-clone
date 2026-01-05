export type BannerUrl = string & {
    readonly __brand: 'BannerUrl';
};
export type AvatarUrl = string & {
    readonly __brand: 'AvatarUrl';
};
export declare function isBannerUrl(url: string | null | undefined): url is BannerUrl;
export declare function isAvatarUrl(url: string | null | undefined): url is AvatarUrl;
export declare function createBannerUrl(url: string | null | undefined): BannerUrl | null;
export declare function createAvatarUrl(url: string | null | undefined): AvatarUrl | null;
