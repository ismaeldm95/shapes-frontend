'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

interface CountdownTimerProps {
  duration: number
  onTimerEnd: () => void
  fillColor?: string
}

export default function CountdownTimer({
  duration,
  onTimerEnd,
  fillColor = 'bg-primary',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const endTimeRef = useRef<number>(Date.now() + duration * 1000)

  const calculateProgress = useCallback(() => {
    return ((duration - timeLeft) / duration) * 100
  }, [duration, timeLeft])

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000))
      
      if (remaining <= 0) {
        setTimeLeft(0)
        if (timerRef.current) clearInterval(timerRef.current)
        onTimerEnd()
      } else {
        setTimeLeft(remaining)
      }
    }

    timerRef.current = setInterval(updateTimer, 100)  // Update more frequently for smoother progress

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [duration, onTimerEnd])

  return (
    <div className="w-full h-16 relative">
      <div className="absolute inset-0 bg-muted" />
      <div 
        className={`absolute inset-y-0 left-0 ${fillColor} transition-all duration-100 ease-linear`} 
        style={{ width: `${calculateProgress()}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-primary-foreground">
          {timeLeft}
        </span>
      </div>
    </div>
  )
}