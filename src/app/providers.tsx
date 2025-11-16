'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider, cookieStorage, createStorage } from 'wagmi';
import { base, celo } from 'wagmi/chains';
import { ThemeProvider, useTheme } from 'next-themes';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { useEffect, useState } from 'react';
import { ONCHAINKIT_API_KEY, ONCHAINKIT_PROJECT_ID } from './config/onchainkit';

// Reown AppKit project ID
const projectId = 'b5df89ad07ada55c69fe70e6a6b01b12';

// Wagmi Adapter with SSR support and cookie storage
const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks: [base, celo],
});

// Create Reown AppKit modal instance globally
if (typeof window !== 'undefined') {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [base, celo],
    defaultNetwork: base,
    metadata: {
      name: 'Builder Rewards Tracker',
      description: 'Track your Base and Celo builder rewards',
      url: 'https://builderrewards.app',
      icons: ['https://avatars.githubusercontent.com/u/108554348?s=280&v=4'],
    },
    features: {
      analytics: false,
      email: false,
      socials: false,
      swaps: false,
      onramp: false,
    },
    allowUnsupportedChain: false,
    allWallets: 'SHOW',
    featuredWalletIds: [
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
      'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase Wallet
    ],
    themeMode: 'light',
    themeVariables: {
      '--w3m-z-index': 9999,
      '--w3m-accent': '#000000',
    },
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5_000,
    },
  },
});

function AppKitThemeSync() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined' && theme) {
      // Use AppKit's setThemeMode method directly on window
      try {
        const appKitInstance = (window as unknown as { reownAppKit?: { setThemeMode: (mode: 'light' | 'dark') => void } }).reownAppKit;
        if (appKitInstance && appKitInstance.setThemeMode) {
          appKitInstance.setThemeMode(theme === 'dark' ? 'dark' : 'light');
        }
      } catch (error) {
        // Silently fail if AppKit not ready
        console.debug('AppKit theme sync pending:', error);
      }
    }
  }, [theme, mounted]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={ONCHAINKIT_API_KEY}
            projectId={ONCHAINKIT_PROJECT_ID}
            chain={base}
            config={{
              appearance: {
                name: 'Builder Rewards',
                logo: 'https://avatars.githubusercontent.com/u/108554348?s=280&v=4',
                mode: 'auto',
                theme: 'default',
              },
            }}
          >
            <AppKitThemeSync />
            {children}
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
