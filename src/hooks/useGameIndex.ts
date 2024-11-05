import { useReadContract } from '@starknet-react/core'
import { gameAbi } from '@/config/contracts'
import { GAME_CONTRACT_ADDRESS } from '@/config/contracts'

export function useGameIndex() {
  const { data: gameIndex, isLoading, error } = useReadContract({
    functionName: "getGameIndex",
    args: [],
    abi: gameAbi,
    address: GAME_CONTRACT_ADDRESS,
    watch: true,
  })

  return {
    gameIndex: gameIndex ? Number(gameIndex) : null,
    isLoading,
    error
  }
} 