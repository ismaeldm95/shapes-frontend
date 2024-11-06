import { atom } from 'jotai'
import { feedbackAtom } from '../atoms/game'

export const roundScoreSelector = atom((get) => {
  const feedback = get(feedbackAtom)
  return feedback.correct.length - feedback.incorrect.length
})


