import { Button } from "@/components/ui/button"
import CountdownTimer from './CountdownTimer'

interface GameFooterProps {
  isRoundActive: boolean
  isRoundEnded: boolean
  roundScore: number
  compoundShapeLength: number
  transactionStatus: 'idle' | 'pending' | 'success' | 'error'
  onTimerEnd: () => void
  onSubmitRound: () => void
  timerDuration: number
  timerKey: number
  horizontalContentStyle: React.CSSProperties
}

export default function GameFooter({
  isRoundActive,
  isRoundEnded,
  roundScore,
  compoundShapeLength,
  transactionStatus,
  onTimerEnd,
  onSubmitRound,
  timerDuration,
  timerKey,
  horizontalContentStyle
}: GameFooterProps) {
  return (
    <footer className="h-16">
      {isRoundActive && !isRoundEnded ? (
        <div className="w-full h-full">
          <CountdownTimer 
            key={timerKey} 
            duration={timerDuration} 
            onTimerEnd={onTimerEnd} 
          />
        </div>
      ) : isRoundEnded ? (
        <div className="w-full h-full flex items-center justify-center">
          <div style={horizontalContentStyle} className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-4 text-primary">
              <span className="font-bold">Score:</span>
              <span className="text-lg font-bold">{roundScore}/{compoundShapeLength}</span>
              {transactionStatus === 'error' && (
                <span className="text-destructive-foreground bg-destructive px-3 py-1 rounded-md text-sm">
                  Transaction failed
                </span>
              )}
            </div>
            
            <Button
              onClick={onSubmitRound}
              disabled={transactionStatus === 'pending'}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg 
                hover:bg-primary/90 transition-colors font-medium"
            >
              {transactionStatus === 'pending' ? 'Processing...' : 'Continue'}
            </Button>
          </div>
        </div>
      ) : null}
    </footer>
  )
}
