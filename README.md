# Shapes

<div align="center">
  <img src="public/og/og-default.png" alt="Shapes Game" width="600"/>
</div>

A daily puzzle game built on Starknet where players identify individual shapes that make up compound images. Each day brings a new set of challenging puzzles where you'll need quick thinking and pattern recognition to score high!

## How to Play
1. Connect your Starknet wallet
2. Look at the compound shape on the left
3. Select the individual shapes from the grid that make up the compound shape
4. Score points for correct selections, lose points for incorrect ones
5. Complete all rounds to get your daily score
6. Share your score and come back tomorrow for a new challenge!

## Features
- 🎮 Daily challenges with unique puzzles
- ⏱️ Time-based gameplay
- 🌐 Built on Starknet
- 🏆 Track your progress
- 🔄 New puzzles every 24 hours

## Development

### Prerequisites
- Node.js 16.8 or later
- Yarn package manager
- Starknet wallet (ArgentX or Braavos)

### Environment Setup
Create a `.env` file:
```env
NEXT_PUBLIC_STARKNET_NETWORK=sepolia
NEXT_PUBLIC_STARKNET_RPC_URL=your_rpc_url
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=your_contract_address
```

### Installation
```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## License
MIT