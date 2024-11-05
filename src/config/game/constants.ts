export const SHAPES_CONFIG = {
  TOTAL_SHAPES: 40,
  SHAPES_PER_GAME: 10,
  MIN_SHAPES_PER_ROUND: 4,
  MAX_SHAPES_PER_ROUND: 6,
} as const

export const ENVIRONMENT = {
  PROD_URL: 'https://shapes.starknet.io',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
} as const 