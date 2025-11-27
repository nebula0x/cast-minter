import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';

export const config = createConfig({
    chains: [base],
    transports: {
        [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'),
    },
});

export const queryClient = new QueryClient();

// Zora protocol helpers
export function generateNFTMetadata(cast: any, author: any) {
    return {
        name: `Cast by @${author.username}`,
        description: cast.text,
        image: cast.embeds?.[0]?.metadata?.image?.url || author.pfp_url,
        external_url: `https://warpcast.com/${author.username}/${cast.hash}`,
        attributes: [
            {
                trait_type: 'Author',
                value: author.display_name,
            },
            {
                trait_type: 'Username',
                value: `@${author.username}`,
            },
            {
                trait_type: 'Timestamp',
                value: cast.timestamp,
            },
            {
                trait_type: 'Likes',
                value: cast.reactions?.likes?.length || 0,
            },
            {
                trait_type: 'Recasts',
                value: cast.reactions?.recasts?.length || 0,
            },
        ],
    };
}
