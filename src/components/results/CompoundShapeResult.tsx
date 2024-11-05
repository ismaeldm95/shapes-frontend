import React from 'react'

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
          <img
            key={index}
            src={`/media/shapes/shape_${shape}.png`}
            alt={`Shape ${shape}`}
            className={`absolute top-0 left-0 w-full h-full object-contain
              ${userShapes.includes(shape) ? 'opacity-100' : 'opacity-50'}`}
            style={{ zIndex: index }}
          />
        ))}
      </div>
      <span className="mt-2 text-sm text-muted-foreground font-semibold">
        {calculateScore()}/{shapes.length}
      </span>
    </div>
  )
}