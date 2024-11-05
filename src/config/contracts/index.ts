import { GAME_ABI } from './game-abi'

const GAME_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS

export const CONTRACTS = {
  GAME: {
    ADDRESS: GAME_CONTRACT_ADDRESS, // Your current GAME_CONTRACT_ADDRESS
    ABI: GAME_ABI
  }
} as const

export { GAME_ABI } 