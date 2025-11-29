'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { Button } from './ui/Button';
import { Wallet, Loader2 } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export function WalletConnect() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleConnect = () => {
        // Prefer injected connector (which Farcaster provides)
        const injectedConnector = connectors.find(c => c.id === 'injected');
        if (injectedConnector) {
            connect({ connector: injectedConnector });
        } else if (connectors.length > 0) {
            connect({ connector: connectors[0] });
        }
    };

    if (!mounted) {
        return (
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
        );
    }

    if (isConnected && address) {
        return (
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm">{formatAddress(address)}</span>
            </div>
        );
    }

    return (
        <Button
            variant="secondary"
            size="sm"
            icon={<Wallet className="w-5 h-5" />}
            onClick={handleConnect}
        >
            Connect Wallet
        </Button>
    );
}
