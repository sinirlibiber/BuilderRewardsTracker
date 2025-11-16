import type { Metadata } from 'next';
import '@coinbase/onchainkit/styles.css';
import './globals.css';
import { Providers } from './providers';
import FarcasterWrapper from "@/components/FarcasterWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <html lang="en" suppressHydrationWarning>
          <body>
            <Providers>
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      </Providers>
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Crypto Builders Rewards",
        description: "Earn weekly rewards with WalletConnect by contributing to crypto projects on Base and GitHub. Deploy verified contracts, and start collecting your rewards today.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_205ea7a0-91ad-421d-8a21-fe4ed8f24f07-j5rAKP3rKy8r8sJmir70obmHCT7JrE","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Crypto Builders Rewards","url":"https://combine-children-274.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };
