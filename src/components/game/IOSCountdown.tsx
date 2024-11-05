'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRE_ROUND_COUNTDOWN } from '@/config'

interface CountdownProps {
  onComplete?: () => void
  duration?: number
  className?: string
}

export default function Component({
  onComplete,
  duration = 1000,
  className = '',
}: CountdownProps) {
  const [count, setCount] = useState(PRE_ROUND_COUNTDOWN)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), duration)
      return () => clearTimeout(timer)
    } else if (count === 0 && onComplete) {
      onComplete()
    }
  }, [count, duration, onComplete])

  return (
    <div className={`relative h-64 w-64 flex items-center justify-center overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout">
        {count > 0 && (
          <motion.div
            key={count}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-9xl font-bold text-primary">{count}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}