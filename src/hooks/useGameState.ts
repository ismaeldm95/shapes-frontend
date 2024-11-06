import { useAtom } from 'jotai'
import { useState, useCallback, useEffect } from 'react'
import {
  gameDataAtom,
  currentCompoundShapeAtom,
  selectedShapesAtom,
  scoreAtom,
  currentRoundAtom,
  feedbackAtom,
  transactionStatusAtom,
  pendingTransactionsAtom
} from '@/store'
import { TRANSACTION_CONFIG } from '@/config'

export function useGameState(initialRound: number | null) {
  // Jotai atoms
  const [gameData, setGameData] = useAtom(gameDataAtom)
  const [currentCompoundShape, setCurrentCompoundShape] = useAtom(currentCompoundShapeAtom)
  const [selectedShapes, setSelectedShapes] = useAtom(selectedShapesAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const [currentRound, setCurrentRound] = useAtom(currentRoundAtom)
  const [feedback, setFeedback] = useAtom(feedbackAtom)
  const [transactionStatus, setTransactionStatus] = useAtom(transactionStatusAtom)
  const [pendingTransactions, setPendingTransactions] = useAtom(pendingTransactionsAtom)

  // Local state
  const [showFeedback, setShowFeedback] = useState(false)
  const [timerKey, setTimerKey] = useState(0)
  const [roundScore, setRoundScore] = useState(0)
  const [currentShapeOptions, setCurrentShapeOptions] = useState<number[]>([])
  const [isRoundEnded, setIsRoundEnded] = useState(false)
  const [isPreRoundCountdown, setIsPreRoundCountdown] = useState(true)
  const [isRoundActive, setIsRoundActive] = useState(false)

  // Initialize currentRound with initialRound if provided
  useEffect(() => {
    if (initialRound !== null && currentRound !== initialRound) {
      setCurrentRound(initialRound)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRound])

  const handleTimerEnd = useCallback(() => {
    setIsRoundEnded(true)
    const correct = currentCompoundShape.filter(shape => selectedShapes.includes(shape))
    const incorrect = selectedShapes.filter(shape => !currentCompoundShape.includes(shape))
    const missed = currentCompoundShape.filter(shape => !selectedShapes.includes(shape))
    
    setFeedback({ correct, incorrect, missed })
    setShowFeedback(true)

    const newScore = correct.length - incorrect.length
    setRoundScore(newScore)
    setScore(prevScore => prevScore + newScore)


    if (TRANSACTION_CONFIG.MODE == 'batched' && pendingTransactions.length === currentRound) {
      setPendingTransactions(prev => {
        return [...prev, selectedShapes]
      })
    } else if (TRANSACTION_CONFIG.MODE == 'immediate') {
      setPendingTransactions([selectedShapes])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCompoundShape, selectedShapes, currentRound, setFeedback, setPendingTransactions, setScore])

  const handleNextRound = useCallback(() => {
    setSelectedShapes([])
    setCurrentRound(prev => prev + 1)
    setTimerKey(prev => prev + 1)
    setTransactionStatus('idle')
    setShowFeedback(false)
    setIsRoundEnded(false)
    setIsPreRoundCountdown(true)
    setIsRoundActive(false)
  }, [setSelectedShapes, setCurrentRound, setTimerKey, setTransactionStatus, setShowFeedback, setIsRoundEnded, setIsPreRoundCountdown, setIsRoundActive])

  return {
    gameState: {
      gameData,
      currentCompoundShape,
      selectedShapes,
      score,
      currentRound,
      feedback,
      showFeedback,
      timerKey,
      roundScore,
      currentShapeOptions,
      pendingTransactions,
      isRoundEnded,
      isPreRoundCountdown,
      isRoundActive,
      transactionStatus
    },
    actions: {
      setGameData,
      setCurrentCompoundShape,
      setSelectedShapes,
      setCurrentShapeOptions,
      setTransactionStatus,
      handleTimerEnd,
      handleNextRound,
      setIsRoundActive,
      setIsPreRoundCountdown,
      setPendingTransactions
    }
  }
} 