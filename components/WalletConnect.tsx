'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from './ui/Button';
import { Wallet, LogOut } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export function WalletConnect() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected && address) {
        return (
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm">{formatAddress(address)}</span>
                <button
                    onClick={() => disconnect()}
                    className="ml-2 p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={() => {
                const injectedConnector = connectors[0];
                if (injectedConnector) {
                    connect({ connector: injectedConnector });
                }
            }}
            icon={<Wallet className="w-5 h-5" />}
        >
            Connect Wallet
        </Button>
    );
}
