import React from 'react'

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
          <img
            key={index}
            src={`/media/shapes/shape_${shape}.png`}
            alt={`Stacked image ${index + 1}`}
            className="absolute max-w-full max-h-full w-full h-full object-contain"
            style={{ zIndex: index }}
          />
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

function StackedImagesExample() {
  const exampleImages = [
    '/placeholder.svg?height=200&width=200&text=Layer%201',
    '/placeholder.svg?height=200&width=200&text=Layer%202',
    '/placeholder.svg?height=200&width=200&text=Layer%203',
  ]

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Stacked Images Example</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StackedImages images={exampleImages} />
        <StackedImages images={exampleImages} borderColor="border-blue-300" shadowColor="shadow-blue-400" />
        <StackedImages images={exampleImages} borderColor="border-green-300" shadowColor="shadow-green-400" />
        <StackedImages borderColor="border-red-300" shadowColor="shadow-red-400" />
      </div>
    </div>
  )
}

function Component() {
  const myImages = [
    '/placeholder.svg?height=200&width=200&text=Custom%201',
    '/placeholder.svg?height=200&width=200&text=Custom%202',
    '/placeholder.svg?height=200&width=200&text=Custom%203',
  ]

  return (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Custom Stacked Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StackedImages images={myImages} borderColor="border-purple-300" shadowColor="shadow-purple-400" />
          <StackedImages borderColor="border-yellow-300" shadowColor="shadow-yellow-400" />
          <StackedImages images={myImages.slice(0, 2)} borderColor="border-indigo-300" shadowColor="shadow-indigo-400" />
        </div>
      </div>
      <StackedImagesExample />
    </div>
  )
}
