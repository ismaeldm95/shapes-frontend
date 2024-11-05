// src/components/WelcomeScreen.tsx

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { SECONDS_PER_SHAPE, SHAPES_CONFIG } from '@/config'

interface WelcomeScreenProps {
  onStartGame: () => void
  lastPlayedIndex: number | null
}

export default function WelcomeScreen({ onStartGame, lastPlayedIndex }: WelcomeScreenProps) {
  const [showRules, setShowRules] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-primary mb-6">Shapes</h1>
        <div className="space-y-4 ">
          <p className="text-xl text-primary">
            {lastPlayedIndex === null || lastPlayedIndex === 0
              ? "10 shapes, once a day"
              : `Welcome back! You completed ${lastPlayedIndex} rounds last time.`}
          </p>
          
          <div className="flex flex-col space-y-4">
            <Button
              onClick={onStartGame}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg 
                hover:bg-primary/90 transition-colors font-medium"
            >
              Start Game
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowRules(true)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              How to Play
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showRules && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setShowRules(false)}
            />
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: "-40%", x: "-50%" }}
              animate={{ scale: 1, opacity: 1, y: "-50%", x: "-50%" }}
              exit={{ scale: 0.7, opacity: 0, y: "-50%", x: "-50%" }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="fixed top-1/2 left-1/2 bg-background rounded-lg shadow-lg
                w-[min(calc(100vw-2rem),24rem)] overflow-hidden max-h-[calc(100vh-2rem)]"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src="/media/howto/gameplay.gif"
                  alt="Gameplay demonstration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="p-4 sm:p-6 overflow-y-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">How to Play</h2>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                  <p>1. Select the individual shapes from the grid that make up the big image.</p>
                  <div className="flex flex-col gap-2">
                    <p>3. You have {SECONDS_PER_SHAPE} seconds to make your selections. Then, you'll see outlined:</p>
                    <div className="flex items-center gap-2 pl-4">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Shape is correct, +1 point</span>
                    </div>
                    <div className="flex items-center gap-2 pl-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Shape is incorrect, -1 point</span>
                    </div>
                    <div className="flex items-center gap-2 pl-4">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Shape was not selected</span>
                    </div>
                  </div>
                  <p>5. Complete all the {SHAPES_CONFIG.SHAPES_PER_GAME} rounds of the daily challenge</p>
                  <p>6. Come back tomorrow for a new challenge!</p>

                </div>
                <Button
                  onClick={() => setShowRules(false)}
                  className="mt-4 sm:mt-6 w-full bg-primary text-primary-foreground"
                >
                  Got it!
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

