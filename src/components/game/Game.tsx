'use client'

import { useCallback, useEffect } from 'react'
import { TIMING_CONFIG, TRANSACTION_CONFIG } from '@/config'
import { generateShapeOptions } from '@/utils/gameUtils'
import { useGameLayout } from '@/hooks/useGameLayout'
import { useGameState } from '@/hooks/useGameState'
import { useGameContract } from '@/hooks/useGameContract'
import GameBoard from './GameBoard'
import GameFooter from './GameFooter'
import GameHeader from '../GameHeader'
import IOSCountdown from './IOSCountdown'
import { AnimatePresence, motion } from 'framer-motion'
import GameCompleted from './GameCompleted'

interface GameProps {
  initialRound: number | null;
}

export default function Game({ initialRound }: GameProps) {
  const { gameState, actions } = useGameState(initialRound)
  const { 
    address, 
    compoundShapesData, 
    txData,
    txStatus,
    transactionReceipt,
    send,
    gameIdData
  } = useGameContract()
  
  const { 
    isVerticalLayout, 
    contentHeight, 
    componentSize, 
    horizontalContentStyle,
    contentComponentPadding 
  } = useGameLayout()

  useEffect(() => {
    actions.setTransactionStatus(txStatus)
  }, [txStatus, txData, actions])

  useEffect(() => {
    if (transactionReceipt && transactionReceipt.isSuccess()) {
      actions.setPendingTransactions([])
      actions.handleNextRound()
    }
  }, [transactionReceipt, actions])

  useEffect(() => {
    if (compoundShapesData) {
      actions.setGameData(compoundShapesData as number[][])
    }
  }, [compoundShapesData, actions])

  useEffect(() => {
    if (gameState.gameData.length > 0 && gameState.currentRound < gameState.gameData.length) {
      const newCompoundShape = gameState.gameData[gameState.currentRound].map(n => Number(n))
      actions.setCurrentCompoundShape(newCompoundShape)
      const shapeOptions = generateShapeOptions(newCompoundShape, gameIdData)
      actions.setCurrentShapeOptions(shapeOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.gameData, gameState.currentRound, gameIdData])

  const handleShapeSelection = useCallback((shapeId: number) => {
    actions.setSelectedShapes(prev => {
      if (prev.includes(shapeId)) {
        return prev.filter(id => id !== shapeId)
      } else {
        return [...prev, shapeId]
      }
    })
  }, [actions])

  const handleSubmitRound = async () => {
    if (TRANSACTION_CONFIG.MODE === 'batched') {
      if (gameState.currentRound === gameState.gameData.length - 1) {
        try {
          console.log("sending batched transactions")
          await send()
        } catch (error) {
          console.error('Transaction failed:', error)
          actions.setTransactionStatus('error')
        }
      } else {
        actions.handleNextRound()
      }
    } else {
      try {
        await send()
      } catch (error) {
        console.error('Transaction failed:', error)
        actions.setTransactionStatus('error')
      }
    }
  }

  const handlePreRoundCountdownComplete = useCallback(() => {
    actions.setIsPreRoundCountdown(false)
    actions.setIsRoundActive(true)
  }, [actions])

  if (gameState.gameData.length === 0) {
    return <div className="flex items-center justify-center h-screen">Loading game data...</div>
  }

  if (gameState.currentRound >= gameState.gameData.length) {
    return (
      <GameCompleted 
        address={address} 
        score={gameState.score.toString()}
        gameIndex={Number(gameIdData)}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <GameHeader 
        address={address || ''}
        rightText={`Round: ${gameState.currentRound + 1}/${gameState.gameData.length}`}
        style={horizontalContentStyle}
      />

      <main style={{ height: contentHeight }}>
        <AnimatePresence mode="popLayout">
          {gameState.isPreRoundCountdown ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-full h-full"
            >
              <IOSCountdown 
                onComplete={handlePreRoundCountdownComplete}
                duration={1000}
                className="w-64 h-64"
              />
            </motion.div>
          ) : (
            <GameBoard
              currentCompoundShape={gameState.currentCompoundShape}
              currentShapeOptions={gameState.currentShapeOptions}
              selectedShapes={gameState.selectedShapes}
              feedback={gameState.feedback}
              showFeedback={gameState.showFeedback}
              isRoundActive={gameState.isRoundActive}
              isRoundEnded={gameState.isRoundEnded}
              isVerticalLayout={isVerticalLayout}
              onShapeSelect={handleShapeSelection}
              componentSize={componentSize}
              contentComponentPadding={contentComponentPadding}
            />
          )}
        </AnimatePresence>
      </main>

      <GameFooter
        isRoundActive={gameState.isRoundActive}
        isRoundEnded={gameState.isRoundEnded}
        roundScore={gameState.roundScore}
        compoundShapeLength={gameState.currentCompoundShape.length}
        transactionStatus={gameState.transactionStatus}
        onTimerEnd={actions.handleTimerEnd}
        onSubmitRound={handleSubmitRound}
        timerDuration={TIMING_CONFIG.SECONDS_PER_SHAPE}
        timerKey={gameState.timerKey}
        horizontalContentStyle={horizontalContentStyle}
      />
    </div>
  )
}
