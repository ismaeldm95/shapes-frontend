import { motion } from 'framer-motion'
import StackedImages from './StackedImages'
import ImageGrid from './ImageGrid'

interface GameBoardProps {
  currentCompoundShape: number[]
  currentShapeOptions: number[]
  selectedShapes: number[]
  feedback: {
    correct: number[]
    incorrect: number[]
    missed: number[]
  }
  showFeedback: boolean
  isRoundActive: boolean
  isRoundEnded: boolean
  isVerticalLayout: boolean
  onShapeSelect: (shapeId: number) => void
  componentSize: { width: number | string, height: string }
  contentComponentPadding: number
}

export default function GameBoard({
  currentCompoundShape,
  currentShapeOptions,
  selectedShapes,
  feedback,
  showFeedback,
  isRoundActive,
  isRoundEnded,
  isVerticalLayout,
  onShapeSelect,
  componentSize,
  contentComponentPadding
}: GameBoardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isVerticalLayout ? 'flex-col' : 'flex-row gap-12 p-8'} 
                items-center justify-center w-full h-full`}
    >
        
      <div className={`flex p-${contentComponentPadding}`} style={componentSize}>
        <div className="relative flex items-center w-full h-full max-w-full max-h-full">
          <StackedImages shapes={currentCompoundShape} />
        </div>
      </div>
      <div className="flex" style={componentSize}>
        <div className="flex items-center w-full h-full max-w-full max-h-full">
          <ImageGrid 
            shapes={currentShapeOptions} 
            onShapeSelect={onShapeSelect}
            selectedShapes={selectedShapes}
            correctShapes={showFeedback ? feedback.correct : []}
            incorrectShapes={showFeedback ? feedback.incorrect : []}
            missedShapes={showFeedback ? feedback.missed : []}
            clickEnabled={isRoundActive && !isRoundEnded}
          />
        </div>
      </div>
    </motion.div>
  )
}
