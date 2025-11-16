# Builder Rewards Tracker 🏆

A comprehensive dashboard for tracking eligibility for **Base Builder Rewards** and **Celo Proof of Ship** programs.

## 🎯 Overview

This application helps blockchain builders track their eligibility for two major reward programs:

### 1. Base Builder Rewards (Weekly)
WalletConnect distributes weekly rewards to Base builders who:
- ✅ Build with WalletConnect, WalletKit SDK, or Reown AppKit
- ✅ Own verified contracts on Base blockchain
- ✅ Contribute to public crypto repositories on GitHub

**Documentation:**
- [Reown AppKit](https://docs.reown.com/overview)
- [WalletConnect SDK / WalletKit](https://docs.walletconnect.network/wallet-sdk/overview)

### 2. Celo Proof of Ship (Monthly)
Earn monthly rewards by:
- ✅ Deploying verified contracts on Celo network
- ✅ Contributing to public GitHub repositories
- ✅ Shipping meaningful projects

## 🚀 Features

- **Wallet Integration**: Built with OnchainKit and Wagmi for seamless Base smart wallet connection
- **Eligibility Checker**: Verify if you meet criteria for both reward programs
- **Real-time Status**: Check your contract verification and GitHub contributions
- **Multi-Chain Support**: Track rewards across Base and Celo networks
- **Farcaster Integration**: Works seamlessly inside Warpcast with automatic wallet connection

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Blockchain**: OnchainKit v1.1.1 (Base), Wagmi, Viem
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui with Radix UI primitives
- **Wallet**: Coinbase Smart Wallet (via OnchainKit)

## 📋 Prerequisites

- Node.js 18+ and pnpm
- A Base smart wallet (automatically provided in Warpcast)
- GitHub account for contribution tracking
- Verified smart contracts on Base or Celo (optional for testing)

## 🏃 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Create a `.env.local` file (optional - defaults are provided):

```env
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
```

## 📱 Usage

1. **Connect Wallet**: Open the app in Warpcast for automatic smart wallet connection
2. **Enter Contract Address**: Provide your verified contract address on Base or Celo
3. **Add GitHub Username**: Enter your GitHub username for contribution verification
4. **Check Eligibility**: Click the check button to see if you meet the criteria
5. **View Status**: Get instant feedback on your eligibility for rewards

## 🎨 Key Components

- `WalletSection`: Displays wallet connection status and network info
- `BaseCriteria`: Checks Base Builder Rewards eligibility
- `CeloCriteria`: Validates Celo Proof of Ship requirements
- `ProgramInfo`: Provides detailed information about both programs

## 🔐 Security & Privacy

- No private keys are stored or transmitted
- Only public blockchain and GitHub data is accessed
- Wallet operations use secure OnchainKit integration
- All external links are properly secured

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Resources

### Base Resources
- [Base Documentation](https://docs.base.org)
- [OnchainKit Docs](https://onchainkit.xyz)
- [Base Builder Rewards](https://base.org/builder-rewards)

### Celo Resources
- [Celo Developer Docs](https://docs.celo.org)
- [Celo Proof of Ship](https://celo.org/developers)

### Integration Guides
- [Reown AppKit Integration](https://docs.reown.com/overview)
- [WalletConnect SDK](https://docs.walletconnect.network/wallet-sdk/overview)

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Built with [OnchainKit](https://onchainkit.xyz) by Coinbase
- Powered by [Base](https://base.org) and [Celo](https://celo.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Wallet integration via [WalletConnect](https://walletconnect.com)

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Join the Base Discord
- Check Celo developer forums

---

Built with ❤️ for the Base and Celo builder communities
