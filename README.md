# 🎨 Cast Minter - Farcaster NFT Minter

Transform your memorable Farcaster moments into unique NFTs on Base using Zora.

![Cast Minter](./screenshot.png)

## ✨ Features

- 🔗 **Wallet Connection** - Seamless Web3 wallet integration
- 📱 **Farcaster Integration** - Fetch casts using Farcaster API (Neynar)
- 🎭 **NFT Minting** - Mint your casts as NFTs on Base using Zora
- 💎 **Premium UI** - Beautiful glassmorphism design with smooth animations
- ⚡ **Real-time Preview** - See your NFT before minting
- 📊 **Cast Metrics** - View likes, recasts, and engagement

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Neynar API key ([Get one here](https://neynar.com))
- MetaMask or another Web3 wallet

### Installation

1. Clone the repository and navigate to the project:
```bash
cd cast-minter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example env file
cp env.example .env.local

# Edit .env.local and add your API key
NEXT_PUBLIC_NEYNAR_API_KEY=your_neynar_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

1. **Connect Wallet** - Click "Connect Wallet" in the top right
2. **Enter FID** - Input a Farcaster ID (e.g., 3 for @dwr)
3. **Browse Casts** - View the user's recent casts
4. **Select & Preview** - Click "Mint as NFT" to preview
5. **Mint** - Confirm and mint your NFT to Base chain

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Web3**: Wagmi + Viem for blockchain interaction
- **API**: Neynar for Farcaster data
- **NFT Protocol**: Zora on Base
- **State Management**: TanStack Query

## 📁 Project Structure

```
cast-minter/
├── app/
│   ├── globals.css        # Premium design system
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main application page
├── components/
│   ├── ui/
│   │   └── Button.tsx     # Reusable button component
│   ├── CastCard.tsx       # Cast display card
│   ├── MintModal.tsx      # NFT minting modal
│   ├── WalletConnect.tsx  # Wallet connection
│   └── Providers.tsx      # Web3 providers
└── lib/
    ├── constants.ts       # App constants & configs
    ├── neynar.ts          # Farcaster API client
    ├── types.ts           # TypeScript types
    ├── utils.ts           # Utility functions
    └── web3.ts            # Web3 configuration
```

## 🎨 Design Features

- **Dark Theme** - Beautiful dark mode with Farcaster purple accents
- **Glassmorphism** - Frosted glass effects throughout
- **Smooth Animations** - Micro-interactions for better UX
- **Gradient Text** - Eye-catching gradient effects
- **Responsive** - Mobile-first responsive design

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_NEYNAR_API_KEY` - Your Neynar API key
- `NEXT_PUBLIC_BASE_RPC_URL` - Base RPC endpoint (default: public Base RPC)
- `NEXT_PUBLIC_APP_URL` - Your app URL (for production)

### Network Support

Currently configured for **Base** (Chain ID: 8453). To change networks, edit `lib/constants.ts` and `lib/web3.ts`.

## 🚧 Future Enhancements

- [ ] Actual Zora smart contract integration
- [ ] IPFS metadata storage  
- [ ] Multiple chain support
- [ ] Cast search and filtering
- [ ] Gallery of minted NFTs
- [ ] Farcaster Frame version
- [ ] Share minted NFTs to Farcaster

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Credits

Built with ❤️ for the Farcaster community

- Powered by [Neynar](https://neynar.com)
- Minting via [Zora](https://zora.co)
- Deployed on [Base](https://base.org)
