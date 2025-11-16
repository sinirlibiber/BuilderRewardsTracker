'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Copy, Check } from 'lucide-react';
import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { useState } from 'react';

export function WalletSection() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black dark:text-white">
          <Wallet className="h-5 w-5" />
          Wallet Connection
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Connect your wallet to check reward eligibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect your wallet to start tracking your builder rewards on Base and Celo networks.
            </p>
            <Button
              onClick={() => open()}
              className="w-full bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border-2 border-black dark:border-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Connected Address
                </span>
                <button
                  onClick={handleCopy}
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="font-mono text-sm text-black dark:text-white break-all">
                {address}
              </p>
            </div>

            {chain && (
              <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border-2 border-black dark:border-white">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Network
                </span>
                <p className="font-medium text-black dark:text-white">
                  {chain.name}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => open({ view: 'Networks' })}
                variant="outline"
                className="flex-1 border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Switch Network
              </Button>
              <Button
                onClick={() => disconnect()}
                variant="outline"
                className="flex-1 border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Disconnect
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
