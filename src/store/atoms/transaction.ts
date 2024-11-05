import { atom } from 'jotai'

export const transactionStatusAtom = atom<'idle' | 'pending' | 'success' | 'error'>('idle')
export const pendingTransactionsAtom = atom<number[][]>([])
