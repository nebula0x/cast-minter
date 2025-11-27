export interface FarcasterUser {
    fid: number;
    username: string;
    display_name: string;
    pfp_url: string;
    verified_addresses: {
        eth_addresses: string[];
    };
}

export interface Cast {
    hash: string;
    thread_hash: string;
    parent_hash: string | null;
    author: {
        fid: number;
        username: string;
        display_name: string;
        pfp_url: string;
    };
    text: string;
    timestamp: string;
    embeds: Array<{
        url?: string;
        metadata?: {
            image?: {
                url?: string;
            };
        };
    }>;
    reactions: {
        likes: Array<{ fid: number }>;
        recasts: Array<{ fid: number }>;
    };
}

export interface CastResponse {
    casts: Cast[];
    next?: {
        cursor: string;
    };
}

export interface NFTMetadata {
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: Array<{
        trait_type: string;
        value: string | number;
    }>;
}
