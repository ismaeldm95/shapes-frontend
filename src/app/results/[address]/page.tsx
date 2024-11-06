// src/app/results/[address]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useReadContract } from '@starknet-react/core'
import { CONTRACTS } from '@/config'
import GameResultCard from '@/components/results/GameResultsCard'
import GameHeader from '@/components/GameHeader'

interface GameResult {
  gameId: string;
  gameIndex: string;
  timestamp: string;
  gameSolution: number[][];
  accountSolution: number[][];
  score: string;
}

type GameData = [
  bigint | number,  // gameId
  bigint | number,  // gameIndex
  bigint | number,  // timestamp
  number[][],       // gameSolution
  number[][],       // accountSolution
  bigint | number  // score
]

export default function ResultsPage() {
  const { address } = useParams<{ address: string }>()
  const [results, setResults] = useState<GameResult[]>([])

  const { data: allGamesData, isLoading: isLoadingGames, error } = useReadContract({
    functionName: "getAllGamesForAccount",
    args: address ? [address] : undefined,
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })

  useEffect(() => {
    if (allGamesData) {
      const formattedResults = allGamesData.map((game: GameData) => ({
        gameId: game[0].toString(),
        gameIndex: game[1].toString(),
        timestamp: new Date(Number(game[2]) * 1000).toLocaleString(),
        gameSolution: game[3],
        accountSolution: game[4],
        score: game[5].toString()
      }));
      console.log("formattedResults", formattedResults)
      setResults(formattedResults);
    }
  }, [allGamesData])

  const content = isLoadingGames ? (
    <div className="container mx-auto px-4 py-8">Loading results...</div>
  ) : error ? (
    <div className="container mx-auto px-4 py-8">Error loading results: {error.message}</div>
  ) : (
    <div className="space-y-8">
      {results.length > 0 ? (
        results.map((result, index) => (
          <GameResultCard key={index} result={result} />
        ))
      ) : (
        <p>No results found for this address.</p>
      )}
    </div>
  )

  return (
    <div className="flex flex-col h-screen">
      <GameHeader 
        address={address}
        rightText={isLoadingGames ? "" : `Games Played: ${results.length}`}
        style={{ maxWidth: '672px', width: '100%', margin: '0 auto' }}
      />
      <main className="container mx-auto px-4 py-8">
        {content}
      </main>
    </div>
  )
}
