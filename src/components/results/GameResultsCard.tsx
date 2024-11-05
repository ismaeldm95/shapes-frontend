import React from 'react'
import CompoundShapeResult from './CompoundShapeResult'

interface GameResult {
  gameId: string
  gameIndex: string
  timestamp: string
  gameSolution: number[][]
  accountSolution: number[][]
  score: string
}

interface GameResultCardProps {
  result: GameResult
}

export default function GameResultCard({ result }: GameResultCardProps) {
  const { gameIndex, timestamp, gameSolution, accountSolution, score } = result

  return (
    <div className="bg-background rounded-lg border border-border p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-primary">Game {gameIndex}</h2>
          <p className="text-sm text-muted-foreground">{timestamp}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-2xl font-bold text-primary">Score: {score}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {gameSolution.map((shapes, index) => (
          <CompoundShapeResult
            key={index}
            shapes={shapes}
            userShapes={accountSolution[index] || []}
          />
        ))}
      </div>
    </div>
  )
}