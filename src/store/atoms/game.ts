import { atom } from 'jotai'

// Game state atoms
export const gameDataAtom = atom<number[][]>([])
export const currentCompoundShapeAtom = atom<number[]>([])
export const selectedShapesAtom = atom<number[]>([])
export const scoreAtom = atom(0)
export const currentRoundAtom = atom(0)

// Feedback state
export const feedbackAtom = atom<{
  correct: number[]
  incorrect: number[]
  missed: number[]
}>({
  correct: [],
  incorrect: [],
  missed: []
})
