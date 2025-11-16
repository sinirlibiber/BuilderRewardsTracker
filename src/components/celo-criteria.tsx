'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Loader2, ExternalLink } from 'lucide-react';
import { useAccount } from 'wagmi';

type CeloCriteriaStatus = {
  hasVerifiedContract: boolean;
  hasGithubContributions: boolean;
  isEligible: boolean;
};

export function CeloCriteria() {
  const { address } = useAccount();
  const [githubUsername, setGithubUsername] = useState('');
  const [celoContractAddress, setCeloContractAddress] = useState('');
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<CeloCriteriaStatus | null>(null);

  const checkCeloEligibility = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setChecking(true);
    setStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockStatus: CeloCriteriaStatus = {
        hasVerifiedContract: celoContractAddress.length > 0,
        hasGithubContributions: githubUsername.length > 0,
        isEligible: false,
      };

      mockStatus.isEligible =
        mockStatus.hasVerifiedContract && mockStatus.hasGithubContributions;

      setStatus(mockStatus);
    } catch (error) {
      console.error('Error checking Celo eligibility:', error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-950 border-2 border-black dark:border-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black dark:text-white">
          <img
            src="https://cryptologos.cc/logos/celo-celo-logo.png"
            alt="Celo"
            className="h-6 w-6 rounded-full"
          />
          Celo Proof of Ship
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Monthly rewards for deploying verified contracts and contributing to public repositories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="celo-contract-address">Verified Contract Address on Celo</Label>
          <Input
            id="celo-contract-address"
            placeholder="0x..."
            value={celoContractAddress}
            onChange={(e) => setCeloContractAddress(e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Enter your verified smart contract address deployed on Celo chain
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="celo-github-username">GitHub Username</Label>
          <Input
            id="celo-github-username"
            placeholder="your-username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Your GitHub username for checking public repository contributions
          </p>
        </div>

        <Button onClick={checkCeloEligibility} disabled={checking || !address} className="w-full">
          {checking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking Eligibility...
            </>
          ) : (
            'Check Celo Eligibility'
          )}
        </Button>

        {status && (
          <div className="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-gray-900 border border-black dark:border-white rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Verified Contract on Celo</span>
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
                  🎉 Congratulations! You meet all criteria for Celo Proof of Ship rewards.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white rounded-lg">
          <p className="text-xs text-black dark:text-white mb-2">
            📚 Learn more about Celo Proof of Ship:
          </p>
          <a
            href="https://celo.org/developers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 hover:underline"
          >
            Celo Developer Resources <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
