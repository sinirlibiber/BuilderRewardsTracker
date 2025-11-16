'use client'
import dynamic from 'next/dynamic';
import { BaseCriteria } from '@/components/base-criteria';
import { CeloCriteria } from '@/components/celo-criteria';
import { ProgramInfo } from '@/components/program-info';
import { ThemeToggle } from '@/components/theme-toggle';
import { useEffect } from "react";

// Dynamic import to avoid SSR issues with Reown AppKit
const WalletSection = dynamic(() => import('@/components/wallet-section').then(mod => ({ default: mod.WalletSection })), {
  ssr: false,
  loading: () => (
    <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 rounded-lg animate-pulse">
      <div className="h-20 bg-gray-200 dark:bg-zinc-800 rounded"></div>
    </div>
  ),
});
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

export default function HomePage() {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
            Builder Rewards Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track your eligibility for Base and Celo builder reward programs. Connect your wallet
            and check if you meet the criteria for weekly and monthly distributions.
          </p>
        </header>

        <div className="grid gap-6 mb-6">
          <WalletSection />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <BaseCriteria />
          <CeloCriteria />
        </div>

        <div className="grid gap-6">
          <ProgramInfo />
        </div>

        <footer className="mt-12 pb-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>
            Built with OnchainKit on Base •{' '}
            <a
              href="https://github.com/sinirlibiber"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Add to GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
