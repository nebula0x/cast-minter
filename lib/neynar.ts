import axios from 'axios';
import { NEYNAR_API_BASE } from './constants';
import type { FarcasterUser, CastResponse } from './types';

const neynarClient = axios.create({
    baseURL: NEYNAR_API_BASE,
    headers: {
        'api_key': process.env.NEXT_PUBLIC_NEYNAR_API_KEY || '',
    },
});

export async function getUserByFid(fid: number): Promise<FarcasterUser | null> {
    try {
        const response = await neynarClient.get(`/farcaster/user/bulk?fids=${fid}`);
        return response.data.users[0] || null;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function getUserCasts(
    fid: number,
    limit: number = 25,
    cursor?: string
): Promise<CastResponse> {
    try {
        const params: any = {
            fid,
            limit,
        };

        if (cursor) {
            params.cursor = cursor;
        }

        const response = await neynarClient.get('/farcaster/feed/user/casts', {
            params,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching casts:', error);
        return { casts: [] };
    }
}

export async function getCastByHash(hash: string) {
    try {
        const response = await neynarClient.get(`/farcaster/cast?identifier=${hash}&type=hash`);
        return response.data.cast;
    } catch (error) {
        console.error('Error fetching cast:', error);
        return null;
    }
}
