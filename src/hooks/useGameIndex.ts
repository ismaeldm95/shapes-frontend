import { useReadContract } from '@starknet-react/core'
import { CONTRACTS } from '@/config'

export function useGameIndex() {
  const { data: gameIndex, isLoading, error } = useReadContract({
    functionName: "getGameIndex",
    args: [],
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })

  return {
    gameIndex: gameIndex ? Number(gameIndex) : null,
    isLoading,
    error
  }
} 