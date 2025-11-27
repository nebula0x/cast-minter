'use client';

import React, { useState, useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';
import { Button } from './ui/Button';
import { Wallet, LogOut } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export function WalletConnect() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const initWallet = async () => {
            try {
                const context = await sdk.context;
                const userContext = context?.user as any;
                const address = userContext?.custody_address || userContext?.custodyAddress;
                if (address) {
                    setWalletAddress(address);
                    setIsConnected(true);
                }
            } catch (error) {
                console.error('Error getting wallet:', error);
            }
        };
        initWallet();
    }, []);

    if (isConnected && walletAddress) {
        return (
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm">{formatAddress(walletAddress)}</span>
            </div>
        );
    }

    return (
        <Button
            variant="secondary"
            size="sm"
            icon={<Wallet className="w-5 h-5" />}
            disabled
        >
            Connect in Farcaster
        </Button>
    );
}
