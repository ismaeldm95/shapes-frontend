'use client'

import { CONTRACTS } from "@/config"
import { useReadContract, useSendTransaction, useContract } from "@starknet-react/core"
import { useEffect, useState } from 'react'

export function useGameTimestamp() {
  const [needsUpdate, setNeedsUpdate] = useState(false)

  const { data: timestamp, isLoading: isCheckingTimestamp } = useReadContract({
    functionName: "getGameTimestamp",
    args: [],
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })

  const { contract } = useContract({
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
  })

  const { send: updateGame } = useSendTransaction({
    calls: contract ? [
      contract.populate("updateGame", [BigInt(Math.floor(Date.now() / 1000))])
    ] : undefined,
  })

  useEffect(() => {
    if (timestamp) {
      const timestampInMs = Number(timestamp) * 1000
      const now = Date.now()
      const diff = now - timestampInMs
      let hoursDiff = diff / (1000 * 60 * 60)
      setNeedsUpdate(hoursDiff >= 24)
    }
  }, [timestamp])

  return {
    timestamp,
    needsUpdate,
    updateGame,
    isCheckingTimestamp
  }
} 