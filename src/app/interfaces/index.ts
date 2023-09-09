export interface RekomendasiType {
    title?: string;
    endpoint?: string;
    image?: string;
    url?: string;
}

export interface AnimeType {
    title: string;
    release: string;
    genres: string[];
    link: {
        endpoint?: string;
        url?: string;
        image?: string;
    };
}

export interface DownloadType {
    title: string;
    link_download: DownloadLinkType[];
}

export interface DownloadLinkType {
    resolusi: string;
    link: PlatformType[];
}

export interface PlatformType {
    platform: string;
    url: string | undefined;
}

export interface GenreType {
    name: string;
    url?: string;
    endpoint?: string;
}

export interface SeasonType {
    name: string;
    endpoint?: string;
    url?: string;
}
