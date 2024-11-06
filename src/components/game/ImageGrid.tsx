import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

type ImageState = {
  selected: boolean
  status: 'none' | 'right' | 'wrong' | 'missed'
}

type ImageGridProps = {
  shapes: number[]
  // eslint-disable-next-line no-unused-vars
  onShapeSelect: (shapeId: number) => void
  selectedShapes: number[]
  correctShapes: number[]
  incorrectShapes: number[]
  missedShapes: number[]
  clickEnabled: boolean
}

// eslint-disable-next-line no-unused-vars
const useNumberKeys = (callback: (num: number) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const num = parseInt(event.key)
      if (num >= 1 && num <= 9) {
        callback(num - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callback])
}

export default function ImageGrid({ shapes, onShapeSelect, selectedShapes, correctShapes, incorrectShapes, missedShapes, clickEnabled }: ImageGridProps) {
  const [images, setImages] = useState<ImageState[]>(
    Array(9).fill({ selected: false, status: 'none' })
  )

  useEffect(() => {
    setImages(shapes.map(shape => ({
      selected: selectedShapes.includes(shape),
      status: correctShapes.includes(shape) ? 'right' 
           : incorrectShapes.includes(shape) ? 'wrong'
           : missedShapes.includes(shape) ? 'missed'
           : 'none'
    })))
  }, [shapes, selectedShapes, correctShapes, incorrectShapes, missedShapes])

  const toggleImage = useCallback((index: number) => {
    onShapeSelect(shapes[index])
  }, [shapes, onShapeSelect])

  useNumberKeys(toggleImage)

  const handleClick = useCallback((index: number) => {
    if (!clickEnabled) return
    toggleImage(index)
  }, [toggleImage, clickEnabled])

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`
              relative aspect-square cursor-pointer overflow-hidden rounded-lg
              ${img.status === 'right' ? 'ring-4 ring-green-500' : ''}
              ${img.status === 'wrong' ? 'ring-4 ring-red-500' : ''}
              ${img.status === 'missed' ? 'ring-4 ring-yellow-500' : ''}
              ${img.selected && img.status === 'none' ? 'ring-4 ring-gray-300' : ''}
            `}
            onClick={() => handleClick(index)}
          >
            <Image
              src={`/media/shapes/shape_${shapes[index]}.png`}
              alt={`Shape ${shapes[index]}`}
              fill
              className="object-cover"
              priority
            />
            {/* <div className="absolute top-0 left-0 text-black text-xs">
              {"shape" + shapes[index]}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}
