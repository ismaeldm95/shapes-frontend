'use client'

import { useState, useEffect } from 'react'
import { LAYOUT_CONFIG } from '@/config'

export function useGameLayout() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isVerticalLayout, setIsVerticalLayout] = useState(true)
  
  const contentComponentPadding = LAYOUT_CONFIG.COMPONENT_PADDING
  const headerHeight = LAYOUT_CONFIG.HEADER_HEIGHT
  const footerHeight = LAYOUT_CONFIG.FOOTER_HEIGHT

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      setWindowSize({ width: innerWidth, height: innerHeight })
      
      const contentHeight = innerHeight - headerHeight - footerHeight
      const isVertical = contentHeight > innerWidth
      
      setIsVerticalLayout(isVertical)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const contentHeight = windowSize.height - 128
  const contentWidth = windowSize.width

  const getContentComponentWidth = (isVertical: boolean, contentHeight: number, contentWidth: number) => {
    const isContentWidthLessThanHalf = contentWidth < contentHeight/2
    return isVertical 
      ? isContentWidthLessThanHalf 
        ? contentWidth - contentComponentPadding*2 
        : (contentHeight/2) - contentComponentPadding*2 
      : contentHeight/2
  }

  const componentSize = { 
    width: getContentComponentWidth(isVerticalLayout, contentHeight, contentWidth), 
    height: `${contentHeight / 2}px` 
  }

  const horizontalContentStyle = {
    width: isVerticalLayout ? '100%' : `${contentHeight}px`,
    margin: isVerticalLayout ? undefined : '0 auto'
  }

  return {
    isVerticalLayout,
    contentHeight,
    componentSize,
    horizontalContentStyle,
    contentComponentPadding
  }
} 