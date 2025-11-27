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
        <div className="glass-hover rounded-2xl p-6 group">
            {/* Author info */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={cast.author.pfp_url}
                    alt={cast.author.display_name}
                    className="w-12 h-12 rounded-full ring-2 ring-primary/20"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-white">{cast.author.display_name}</h3>
                    <p className="text-sm text-muted-foreground">@{cast.author.username}</p>
                </div>
            </div>

            {/* Cast content */}
            <p className="text-foreground mb-4 leading-relaxed">{cast.text}</p>

            {/* Image if exists */}
            {imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                        src={imageUrl}
                        alt="Cast embed"
                        className="w-full h-auto"
                    />
                </div>
            )}

            {/* Engagement metrics */}
            <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{cast.reactions?.likes?.length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Repeat2 className="w-4 h-4" />
                    <span>{cast.reactions?.recasts?.length || 0}</span>
                </div>
                <span className="ml-auto">{formatTimestamp(cast.timestamp)}</span>
            </div>

            {/* Mint button */}
            <Button
                variant="primary"
                className="w-full group-hover:shadow-xl group-hover:shadow-primary/30"
                onClick={() => onMint(cast)}
                loading={minting}
                icon={!minting && <Sparkles className="w-5 h-5" />}
            >
                {minting ? 'Minting...' : 'Mint as NFT'}
            </Button>
        </div>
    );
}
