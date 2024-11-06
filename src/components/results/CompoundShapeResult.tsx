import React from 'react'
import Image from 'next/image'

interface CompoundShapeResultProps {
  shapes: number[]
  userShapes: number[]
}

export default function CompoundShapeResult({ shapes, userShapes }: CompoundShapeResultProps) {
  const calculateScore = () => {
    let score = 0
    shapes.forEach(shape => {
      if (userShapes.includes(shape)) {
        score++ // Correct shape selection
      }
    })
    userShapes.forEach(shape => {
      if (!shapes.includes(shape)) {
        score-- // Incorrect shape selection
      }
    })
    return Math.max(score, 0) // Ensure the score is not negative
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 relative">
        {shapes.map((shape, index) => (
          <div 
            key={index} 
            className="absolute inset-0"
            style={{ zIndex: index }}
          >
            <Image
              src={`/media/shapes/shape_${shape}.png`}
              alt={`Shape ${shape}`}
              fill
              className={`object-contain ${userShapes.includes(shape) ? 'opacity-100' : 'opacity-50'}`}
              priority
            />
          </div>
        ))}
      </div>
      <span className="mt-2 text-sm text-muted-foreground font-semibold">
        {calculateScore()}/{shapes.length}
      </span>
    </div>
  )
}