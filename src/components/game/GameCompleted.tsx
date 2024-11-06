'use client'

import { Button } from "@/components/ui/button"
import { ENVIRONMENT } from "@/config"
import { Twitter } from 'lucide-react'
import Link from 'next/link'

interface GameCompletedProps {
  address?: string
  score: string | null
  gameIndex?: number | null
  className?: string
}

export default function GameCompleted({ 
  address, 
  score, 
  gameIndex,
  className = "flex flex-col items-center justify-center h-full" 
}: GameCompletedProps) {
  return (
    <div className={className}>
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">
        Game completed
      </h1>
      <p className="text-2xl font-bold mb-8 text-muted-foreground">
        Score: {score !== null ? score : 'Loading...'}
      </p>
      <p className="text-muted-foreground text-xl mb-4">
        Come back tomorrow to play again!
      </p>
      <div className="flex flex-col gap-3">
        {address && (
          <Link 
            href={`/results/${address}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View Past Results
          </Link>
        )}
        <Button
          variant="outline"
          size="default"
          className="flex items-center gap-2 text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          onClick={() => {
            const text = `Shapes${gameIndex? ' #'+gameIndex : ''}: ${score} points! Play this daily puzzle game on @Starknet at ${ENVIRONMENT.PROD_URL}`
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
          }}
        >
          <Twitter className="w-4 h-4" />
          Share Score
        </Button>
      </div>
    </div>
  )
} 