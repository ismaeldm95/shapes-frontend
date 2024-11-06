import { useContract, useAccount, useSendTransaction, useTransactionReceipt, useReadContract } from "@starknet-react/core"
import { CONTRACTS, GAME_CONFIG } from '@/config'
import { pendingTransactionsAtom } from '@/store'
import { useAtom } from "jotai"

export function useGameContract() {
  const { address } = useAccount()
  const [pendingTransactions] = useAtom(pendingTransactionsAtom)
  
  const { contract } = useContract({
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
  })

  const { data: compoundShapesData } = useReadContract({
    functionName: "getCurrentGameCompoundShapes",
    args: [],
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })

  const { data: gameIdData } = useReadContract({
    functionName: "getGame",
    args: [],
    abi: CONTRACTS.GAME.ABI,
    address: CONTRACTS.GAME.ADDRESS,
    watch: true,
  })


  const { send: sendTransaction, data: txData, status: txStatus } = useSendTransaction({
    calls: contract && address
      ? GAME_CONFIG.MODE === 'batched' ? 
        [contract.populate("solveAll", [pendingTransactions])]
      : pendingTransactions.map(shapes => contract.populate("solve", [shapes]))
      : undefined,
  })

  const { data: transactionReceipt } = useTransactionReceipt({
    hash: txData?.transaction_hash,
    watch: true
  })

  const send = async () => {
    await sendTransaction()
  }

  return {
    contract,
    address,
    compoundShapesData,
    txData,
    txStatus,
    transactionReceipt,
    gameIdData,
    send
  }
} 