'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageObject {
  src: string
  position: {
    top: number | string
    left: number | string
  }
  size?: {
    width: number | string
    height: number | string
  }
  rotation?: number
}

interface AnimatedImageBackgroundProps {
  images: ImageObject[]
  triggerAnimation: boolean
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedImageBackground({
  images,
  triggerAnimation,
  className = '',
  style = {},
}: AnimatedImageBackgroundProps) {
  const [visibleImages, setVisibleImages] = useState<ImageObject[]>([])

  useEffect(() => {
    if (triggerAnimation) {
      setVisibleImages(images)
    } else {
      setVisibleImages([])
    }
  }, [triggerAnimation, images])

  const getOffscreenPosition = (image: ImageObject) => {
    const centerX = 50
    const centerY = 50
    const imageX = parseFloat(image.position.left as string)
    const imageY = parseFloat(image.position.top as string)
    
    const angle = Math.atan2(imageY - centerY, imageX - centerX)
    const distance = 250 // Adjust this value to change how far off-screen the images start/end

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }

  const imageVariants = {
    hidden: (image: ImageObject) => {
      const { x, y } = getOffscreenPosition(image)
      return {
        opacity: 0,
        x,
        y,
        rotate: 0,
      }
    },
    visible: (image: ImageObject) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: image.rotation || 0,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 2,
      },
    }),
    exit: (image: ImageObject) => {
      const { x, y } = getOffscreenPosition(image)
      return {
        opacity: 0,
        x,
        y,
        rotate: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          mass: 1,
        },
      }
    },
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
      <AnimatePresence>
        {visibleImages.map((image, index) => (
          <motion.img
            key={`${image.src}-${index}`}
            src={image.src}
            alt={`Background element ${index + 1}`}
            className="absolute"
            style={{
              top: image.position.top,
              left: image.position.left,
              width: image.size?.width || '100px',
              height: image.size?.height || '100px',
            }}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={image}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}