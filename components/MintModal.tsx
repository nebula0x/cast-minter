'use client';

import React from 'react';
import { Cast } from '@/lib/types';
import { generateNFTMetadata } from '@/lib/web3';
import { Button } from './ui/Button';
import { X, ExternalLink, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MintModalProps {
    cast: Cast | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirmMint: (metadata: any) => void;
    minting: boolean;
    success: boolean;
    txHash?: string;
}

export function MintModal({
    cast,
    isOpen,
    onClose,
    onConfirmMint,
    minting,
    success,
    txHash,
}: MintModalProps) {
    if (!isOpen || !cast) return null;

    const metadata = generateNFTMetadata(cast, cast.author);
    const imageUrl = cast.embeds?.[0]?.metadata?.image?.url || cast.author.pfp_url;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold gradient-text">
                        {success ? 'NFT Minted Successfully!' : 'Mint Cast as NFT'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {success ? (
                    <div className="text-center py-8">
                        <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <p className="text-lg mb-6">Your cast has been minted as an NFT!</p>
                        {txHash && (
                            <a
                                href={`https://basescan.org/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                            >
                                View on BaseScan
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                ) : (
                    <>
                        {/* NFT Preview */}
                        <div className="mb-6">
                            <div className="aspect-square rounded-xl overflow-hidden mb-4 ring-2 ring-primary/20">
                                <img
                                    src={imageUrl}
                                    alt="NFT Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Metadata */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Name</h3>
                                    <p className="text-lg">{metadata.name}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Description</h3>
                                    <p className="text-base">{metadata.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Attributes</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {metadata.attributes.map((attr, idx) => (
                                            <div key={idx} className="glass rounded-lg p-3">
                                                <p className="text-xs text-muted-foreground">{attr.trait_type}</p>
                                                <p className="font-semibold">{attr.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                className="flex-1"
                                onClick={onClose}
                                disabled={minting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="flex-1"
                                onClick={() => onConfirmMint(metadata)}
                                loading={minting}
                            >
                                {minting ? 'Minting...' : 'Confirm & Mint'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
