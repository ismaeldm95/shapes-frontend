'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Game from '@/components/game/Game'
import WelcomeScreen from '@/components/WelcomeScreen'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import AnimatedImageBackground from '@/components/AnimatedImageBackground'
import { useAccount, useReadContract, useNetwork } from '@starknet-react/core'
import { CONTRACTS } from '@/config'
import { useGameTimestamp } from '@/hooks/useGameTimestamp'
import { Button } from "@/components/ui/button"
import { useGameIndex } from '@/hooks/useGameIndex'
import { MOBILE_LANDING_IMAGES, TABLET_LANDING_IMAGES, DESKTOP_LANDING_IMAGES, LandingImage } from '@/config'
import { mainnet, sepolia, devnet } from '@starknet-react/chains'
import GameCompleted from '@/components/game/GameCompleted'

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const { address } = useAccount()
  const [canPlay, setCanPlay] = useState<boolean | null>(null)
  const [lastPlayedIndex, setLastPlayedIndex] = useState<number | null>(null)
  const [gameId, setGameId] = useState<string | null>(null)
  const [todayScore, setTodayScore] = useState<string | null>(null)
  const [showBackgroundAnimation, setShowBackgroundAnimation] = useState(true)
  const [landingImages, setLandingImages] = useState<LandingImage[]>(DESKTOP_LANDING_IMAGES)
  const { needsUpdate, isCheckingTimestamp, updateGame } = useGameTimestamp()
  const { gameIndex } = useGameIndex()
  const { chain } = useNetwork()
  
 

  const { data: canPlayData, isLoading: isCheckingCanPlay } = useReadContract({
    functionName: "canPlayGame",
    args: address ? [address] : undefined,
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })

  const { data: lastPlayedIndexData, isLoading: isCheckingLastPlayedIndex } = useReadContract({
    functionName: "getLastPlayedIndex",
    args: address ? [address] : undefined,
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })

  const { data: gameIdData, isLoading: isLoadingGameId } = useReadContract({
    functionName: "getGame",
    args: [],
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })


  const { data: getScoreData} = useReadContract({
    functionName: "getScore",
    args: address && gameId
      ? [address.toString(), gameId.toString()] // Convert gameId to string
      : undefined,
      abi: CONTRACTS.GAME.ABI,
      address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })

  useEffect(() => {
    if (canPlayData !== undefined) {
      setCanPlay(canPlayData as boolean)
    }
  }, [canPlayData])

  useEffect(() => {
    if (lastPlayedIndexData !== undefined) {
      setLastPlayedIndex(Number(lastPlayedIndexData))
    }
  }, [lastPlayedIndexData])

  useEffect(() => {
    if (gameIdData !== undefined) {
      setGameId(gameIdData.toString()); // Convert to string before storing
    }
  }, [gameIdData])

  useEffect(() => {
    if (getScoreData !== undefined) {
      setTodayScore(getScoreData.toString())
    }
  }, [getScoreData])

  useEffect(() => {
    // Start animation when component mounts
    setShowBackgroundAnimation(true)
  }, [])

  useEffect(() => {
    // Function to update images based on window size
    const updateImages = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setLandingImages(MOBILE_LANDING_IMAGES)
        } else if (window.innerWidth < 1024) {
          setLandingImages(TABLET_LANDING_IMAGES)
        } else {
          setLandingImages(DESKTOP_LANDING_IMAGES)
        }
      }
    }

    // Initial call
    updateImages()

    // Add event listener for window resize
    window.addEventListener('resize', updateImages)

    // Cleanup
    return () => window.removeEventListener('resize', updateImages)
  }, [])

  const handleStartGame = async () => {
    // First trigger the exit animations
    setShowBackgroundAnimation(false)
    
    // Wait for background and content animations
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Then start the game
    setGameStarted(true)
  }

  const renderContent = () => {
    let content;

    if (address && chain && !isChainSupported(chain.id)) {
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-primary mb-6">Wrong Network</h1>
          <p className="text-xl mb-8 text-muted-foreground text-center max-w-md">
            Please switch to {process.env.NEXT_PUBLIC_STARKNET_NETWORK || 'sepolia'} network to play Shapes
          </p>
        </div>
      );
    } else if (!address) {
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-bold text-primary mb-6">Shapes</h1>
          <p className="text-xl mb-8 text-primary">A Starknet exploration</p>
          <ConnectWalletButton />
        </div>
      );
    } else if (isCheckingCanPlay || isCheckingLastPlayedIndex || isLoadingGameId || isCheckingTimestamp) {
      content = (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-6xl font-bold text-primary mb-6">Shapes</h1>

            <p className="text-xl mb-8 text-primary">Checking game availability...</p>
        </div>
      );
    } else if (needsUpdate) {
        content = (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-muted-foreground text-xl font-bold">New game available</p>
            <p className="text-muted-foreground text-xl text-center max-w-md">Shapes needs to be updated every 24 hours by submitting a transaction.</p>
            <p className="text-muted-foreground text-xl text-center max-w-md">This only needs to be done once per day, and it will update the game for everyone.</p>
            <Button 
              onClick={() => updateGame()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Update Game
            </Button>
          </div>
        );
      } else if (canPlay === false) {
      content = (
        <GameCompleted 
          address={address} 
          score={todayScore} 
          gameIndex={gameIndex}
        />
      );
    } else if (!gameStarted) {
      content = <WelcomeScreen onStartGame={handleStartGame} lastPlayedIndex={lastPlayedIndex} />;
    } else {
      content = <Game initialRound={lastPlayedIndex} />;
    }

    return (
      <motion.div
        key={getContentKey()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        {content}
      </motion.div>
    );
  }

  const isChainSupported = (chainId: bigint): boolean => {
    const network = process.env.NEXT_PUBLIC_STARKNET_NETWORK || 'sepolia';
    
    switch (network) {
      case 'mainnet':
        return chainId === mainnet.id;
      case 'sepolia':
        return chainId === sepolia.id;
      case 'devnet':
        return chainId === devnet.id;
      default:
        return false;
    }
  };

  const getContentKey = () => {
    if (!address) return 'connect';
    if (!isChainSupported(chain?.id)) return 'wrong-network';
    if (canPlay === false) return 'completed';
    return gameStarted ? 'game' : 'welcome';
  };

  return (
    <div className="relative w-screen h-screen bg-background">
      {/* Background layer */}
      <div className="fixed inset-0">
        {!gameStarted && (
          <AnimatedImageBackground
            images={landingImages} // Use dynamic images here
            triggerAnimation={showBackgroundAnimation}
            className="w-full h-full"
          />
        )}
      </div>
      {/* Content layer */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  )
}
