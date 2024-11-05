import { SHAPES_CONFIG } from './game/constants'
import { TIMING_CONFIG } from './game/timing'
import { TRANSACTION_CONFIG } from './game/transactions'
import { LAYOUT_CONFIG } from './layout/dimensions'

export * from './game/constants'
export * from './game/transactions'
export * from './game/timing'
export * from './contracts'
export * from './layout/landing-images'
export * from './layout/dimensions'

// Merged game config for backward compatibility
export const GAME_CONFIG = {
  ...SHAPES_CONFIG,
  ...TRANSACTION_CONFIG,
  ...TIMING_CONFIG,
  ...LAYOUT_CONFIG, 
  ...TRANSACTION_CONFIG
} as const

// Re-export commonly used values for convenience
export const {
  SECONDS_PER_SHAPE,
  PRE_ROUND_COUNTDOWN,
} = TIMING_CONFIG 