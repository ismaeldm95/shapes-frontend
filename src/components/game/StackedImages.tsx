import React from 'react'
import Image from 'next/image'

interface StackedImagesProps {
  shapes: number[]
  borderColor?: string
  shadowColor?: string
}

export default function StackedImages({
  shapes = [],
  borderColor = 'border-gray-300',
  shadowColor = 'shadow-gray-400'
}: StackedImagesProps) {
  return (
    <div className={`relative aspect-square w-full ${borderColor} ${shadowColor} 
                    rounded-lg shadow-lg flex items-center justify-center overflow-hidden`}>
      {shapes.length > 0 ? (
        shapes.map((shape, index) => (
          <div key={index} className="absolute inset-0" style={{ zIndex: index }}>
            <Image
              src={`/media/shapes/shape_${shape}.png`}
              alt={`Stacked image ${index + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-center p-4">
          <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No images</p>
        </div>
      )}
      {/* <div className="absolute top-0 left-0 text-black text-xs" >
              {"shapes:" + shapes.map(shape => shape)}
      </div> */}
    </div>
  )
}
