'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

// 引入合約 ABI
import PaytocolAbi from "../abi/Paytocol.json"

interface ConfirmSubscriptionButtonProps {
  amount: number
  frequency: number
  totalPayments: number
  className?: string
  recipient?: string
  paytocolAddress?: string
}

export function ConfirmSubscriptionButton({
  amount,
  frequency,
  totalPayments,
  recipient = "0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa",
  paytocolAddress = "0x059f1d6Aaa4Aaf4138968c245A290819e9118EcE",
  className = ''
}: ConfirmSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected, address } = useAccount()

  // 使用 wagmi 的合約寫入 hook
  const { writeContractAsync, data: hash, isPending } = useWriteContract()

  // 等待交易確認
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubscribe = async () => {
    if (!address) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: paytocolAddress as `0x${string}`,
        abi: PaytocolAbi,
        functionName: 'openStreamViaCctp',
        args: [
          recipient,
          0,
          amount * 10**6, // 假設 USDC 有 6 位小數
          address,
          1, // chainId - 根據需要調整
          paytocolAddress, // 目標鏈上的地址
          "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC 地址 - 根據需要調整
          1,
          Math.floor(new Date().getTime() / 1000),
          frequency,
          totalPayments,
        ],
      })
    } catch (error) {
      console.error('訂閱失敗:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonText = isLoading || isPending || isConfirming
    ? 'Processing...'
    : !isConnected
    ? 'Please connect your wallet'
    : 'Confirm Subscription'

  return (
    <button
      onClick={handleSubscribe}
      className={`w-full py-4 px-6 text-center text-lg text-white font-semibold 
        bg-[#7DDBB6] hover:bg-[#65C4A0] rounded-md transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {buttonText}
    </button>
  )
} 