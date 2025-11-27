'use client';

import React, { useState, useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';
import { Button } from './ui/Button';
import { Wallet, Loader2 } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export function WalletConnect() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initWallet = async () => {
            try {
                console.log('WalletConnect: Initializing SDK...');

                // Wait for SDK context
                const context = await sdk.context;
                console.log('WalletConnect: SDK context received', context);

                if (context?.user) {
                    const userContext = context.user as any;
                    console.log('WalletConnect: User context', userContext);

                    // Try multiple possible property names for the wallet address
                    const address = userContext?.custody_address ||
                        userContext?.custodyAddress ||
                        userContext?.verified_addresses?.eth_addresses?.[0];

                    console.log('WalletConnect: Wallet address', address);

                    if (address) {
                        setWalletAddress(address);
                        setIsConnected(true);
                    } else {
                        console.warn('WalletConnect: No wallet address found in user context');
                    }
                } else {
                    console.warn('WalletConnect: No user in SDK context');
                }
            } catch (error) {
                console.error('WalletConnect: Error getting wallet:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initWallet();
    }, []);

    if (isLoading) {
        return (
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Connecting...</span>
            </div>
        );
    }

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
