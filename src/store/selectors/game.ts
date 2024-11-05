import { atom } from 'jotai'
import { scoreAtom, feedbackAtom } from '../atoms/game'

export const roundScoreSelector = atom((get) => {
  const feedback = get(feedbackAtom)
  return feedback.correct.length - feedback.incorrect.length
})

export const isGameCompleteSelector = atom((get) => {
  const score = get(scoreAtom)
  // Add your game completion logic here
  return false
})
