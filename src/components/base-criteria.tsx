'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Loader2, ExternalLink } from 'lucide-react';
import { useAccount } from 'wagmi';

type CriteriaStatus = {
  hasAppKit: boolean;
  hasVerifiedContract: boolean;
  hasGithubContributions: boolean;
  isEligible: boolean;
};

export function BaseCriteria() {
  const { address } = useAccount();
  const [githubUsername, setGithubUsername] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<CriteriaStatus | null>(null);

  const checkEligibility = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setChecking(true);
    setStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockStatus: CriteriaStatus = {
        hasAppKit: true,
        hasVerifiedContract: contractAddress.length > 0,
        hasGithubContributions: githubUsername.length > 0,
        isEligible: false,
      };

      mockStatus.isEligible =
        mockStatus.hasAppKit && mockStatus.hasVerifiedContract && mockStatus.hasGithubContributions;

      setStatus(mockStatus);
    } catch (error) {
      console.error('Error checking eligibility:', error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-950 border-2 border-black dark:border-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black dark:text-white">
          <img
            src="https://avatars.githubusercontent.com/u/108554348?s=280&v=4"
            alt="Base"
            className="h-6 w-6 rounded-full"
          />
          Base Builder Rewards
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Weekly rewards for builders using WalletConnect/Reown AppKit with verified contracts on
          Base
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contract-address">Verified Contract Address on Base</Label>
          <Input
            id="contract-address"
            placeholder="0x..."
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Enter your verified smart contract address deployed on Base chain
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-username">GitHub Username</Label>
          <Input
            id="github-username"
            placeholder="your-username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Your GitHub username for checking public repository contributions
          </p>
        </div>

        <Button onClick={checkEligibility} disabled={checking || !address} className="w-full">
          {checking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking Eligibility...
            </>
          ) : (
            'Check Base Eligibility'
          )}
        </Button>

        {status && (
          <div className="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-gray-900 border border-black dark:border-white rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">WalletConnect/AppKit Integration</span>
              {status.hasAppKit ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Verified Contract on Base</span>
              {status.hasVerifiedContract ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Public GitHub Contributions</span>
              {status.hasGithubContributions ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Eligibility Status</span>
                <Badge variant={status.isEligible ? 'default' : 'secondary'}>
                  {status.isEligible ? 'Eligible ✓' : 'Not Eligible'}
                </Badge>
              </div>
            </div>

            {status.isEligible && (
              <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white rounded-lg">
                <p className="text-sm text-black dark:text-white">
                  🎉 Congratulations! You meet all criteria for Base Builder Rewards.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white rounded-lg">
          <p className="text-xs text-black dark:text-white mb-2">
            📚 Documentation:
          </p>
          <div className="space-y-1">
            <a
              href="https://docs.reown.com/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 hover:underline"
            >
              Reown AppKit Docs <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://docs.walletconnect.network/wallet-sdk/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 hover:underline"
            >
              WalletConnect SDK Docs <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
