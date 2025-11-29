'use client';

import React from 'react';
import { Cast } from '@/lib/types';
import { cn, formatTimestamp } from '@/lib/utils';
import { Heart, Repeat2, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface CastCardProps {
    cast: Cast;
    onMint: (cast: Cast) => void;
    minting?: boolean;
}

export function CastCard({ cast, onMint, minting = false }: CastCardProps) {
    const imageUrl = cast.embeds?.find(e => e.metadata?.image?.url)?.metadata?.image?.url;

    return (
        <div className="glass-hover rounded-xl p-4 sm:p-5 group">
            {/* Author info */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <img
                    src={cast.author.pfp_url}
                    alt={cast.author.display_name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-primary/20"
                />
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{cast.author.display_name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">@{cast.author.username}</p>
                </div>
            </div>

            {/* Cast content */}
            <p className="text-foreground text-sm sm:text-base mb-3 leading-relaxed line-clamp-6">{cast.text}</p>

            {/* Image if exists */}
            {imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden">
                    <img
                        src={imageUrl}
                        alt="Cast embed"
                        className="w-full h-auto max-h-64 sm:max-h-96 object-cover"
                    />
                </div>
            )}

            {/* Engagement metrics */}
            <div className="flex items-center gap-4 sm:gap-6 mb-3 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{cast.reactions?.likes?.length || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Repeat2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{cast.reactions?.recasts?.length || 0}</span>
                </div>
                <span className="ml-auto text-[11px] sm:text-xs">{formatTimestamp(cast.timestamp)}</span>
            </div>

            {/* Mint button */}
            <Button
                variant="primary"
                className="w-full group-hover:shadow-xl group-hover:shadow-primary/30 text-sm sm:text-base"
                onClick={() => onMint(cast)}
                loading={minting}
                icon={!minting && <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
            >
                {minting ? 'Minting...' : 'Mint as NFT'}
            </Button>
        </div>
    );
}
