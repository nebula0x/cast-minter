'use client';

import sdk from '@farcaster/frame-sdk';
import React, { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { getUserCasts } from '@/lib/neynar';
import { Cast } from '@/lib/types';
import { CastCard } from '@/components/CastCard';
import { MintModal } from '@/components/MintModal';
import { WalletConnect } from '@/components/WalletConnect';
import { Button } from '@/components/ui/Button';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  const [fid, setFid] = useState<string>('');
  const [casts, setCasts] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCast, setSelectedCast] = useState<Cast | null>(null);
  const [mintingCast, setMintingCast] = useState<string | null>(null);
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string>();
  const [isFrameContext, setIsFrameContext] = useState(false);
  const { isConnected, address } = useAccount();

  const fetchCasts = useCallback(async (fidOverride?: string) => {
    const targetFid = fidOverride || fid;
    if (!targetFid) return;

    setLoading(true);
    try {
      const response = await getUserCasts(parseInt(targetFid), 1); // Fetch only last cast
      setCasts(response.casts || []);
    } catch (error) {
      console.error('Error fetching casts:', error);
    }
    setLoading(false);
  }, [fid]);

  // ... existing code ...

  useEffect(() => {
    const initFrame = async () => {
      try {
        console.log('Initializing Farcaster Frame SDK...');

        const context = await sdk.context;
        console.log('SDK context received:', context);

        if (context?.user?.fid) {
          setIsFrameContext(true);
          const userFid = context.user.fid.toString();
          console.log('User FID:', userFid);
          setFid(userFid);

          // Fetch only the last cast after SDK is initialized
          console.log('Fetching last cast for FID:', userFid);
          setLoading(true);
          try {
            const response = await getUserCasts(parseInt(userFid), 1); // Fetch only 1 cast
            console.log('Last cast response:', response);
            setCasts(response.casts || []);
          } catch (error) {
            console.error('Error fetching last cast:', error);
          } finally {
            setLoading(false);
          }
        } else {
          console.warn('No user FID found in SDK context');
        }

        // Prompt user to add the app
        try {
          await sdk.actions.addFrame();
        } catch (error) {
          console.log('User declined to add app or already added:', error);
        }

        // Signal that the frame is ready - MUST be called last
        console.log('Calling sdk.actions.ready()');
        sdk.actions.ready();
      } catch (error) {
        console.error('Error initializing frame:', error);
      }
    };
    initFrame();
  }, []); // Empty dependency array - only run once on mount

  const handleMintClick = (cast: Cast) => {
    setSelectedCast(cast);
    setShowMintModal(true);
    setMintSuccess(false);
  };

  const handleConfirmMint = async (metadata: any) => {
    if (!selectedCast) return;

    setMintingCast(selectedCast.hash);

    // Simulate minting process (in a real app, this would interact with Zora contracts)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66);
      setTxHash(mockTxHash);
      setMintSuccess(true);
    } catch (error) {
      console.error('Minting error:', error);
    } finally {
      setMintingCast(null);
    }
  };

  const handleCloseModal = () => {
    setShowMintModal(false);
    setSelectedCast(null);
    setMintSuccess(false);
    setTxHash(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/20">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Cast Minter</h1>
                <p className="text-xs text-muted-foreground">Mint your Farcaster casts as NFTs</p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
            Turn Your Casts Into NFTs
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Preserve your memorable Farcaster moments as unique NFTs on Base
          </p>

          {/* FID Input - Only show if not in Frame context */}
          {!isFrameContext && (
            <div className="glass rounded-2xl p-6 max-w-xl mx-auto">
              <label className="block text-left mb-2 font-semibold">
                Enter Farcaster ID (FID)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={fid}
                  onChange={(e) => setFid(e.target.value)}
                  placeholder="e.g., 3"
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  variant="primary"
                  onClick={() => fetchCasts()}
                  loading={loading}
                  disabled={!fid || !isConnected}
                >
                  Load Last Cast
                </Button>
              </div>
              {!isConnected && (
                <p className="text-sm text-amber-500 mt-3 text-left">
                  ⚠️ Please connect your wallet first
                </p>
              )}
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">Loading your last cast...</p>
          </div>
        )}

        {/* Last cast display */}
        {!loading && casts.length > 0 && (
          <div className="max-w-2xl mx-auto">
            {casts.map((cast) => (
              <CastCard
                key={cast.hash}
                cast={cast}
                onMint={handleMintClick}
                minting={mintingCast === cast.hash}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && casts.length === 0 && fid && (
          <div className="text-center py-12 glass rounded-2xl">
            <p className="text-muted-foreground">No cast found for this user</p>
          </div>
        )}
      </main>

      {/* Mint Modal */}
      <MintModal
        cast={selectedCast}
        isOpen={showMintModal}
        onClose={handleCloseModal}
        onConfirmMint={handleConfirmMint}
        minting={mintingCast === selectedCast?.hash}
        success={mintSuccess}
        txHash={txHash}
      />

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ for Farcaster • Powered by Zora on Base</p>
        </div>
      </footer>
    </div>
  );
}
