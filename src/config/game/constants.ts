export const SHAPES_CONFIG = {
  TOTAL_SHAPES: 40,
  SHAPES_PER_GAME: 10,
  MIN_SHAPES_PER_ROUND: 4,
  MAX_SHAPES_PER_ROUND: 6,
} as const

export const ENVIRONMENT = {
  PROD_URL: process.env.NEXT_PUBLIC_PROD_URL || 'https://shapes-game.xyz',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
} as const 