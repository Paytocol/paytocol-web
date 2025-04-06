'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { sepolia, baseSepolia } from 'viem/chains'

// 引入合約 ABI
import PaytocolAbi from "../abi/Paytocol.json"
import network from "../utils/network"

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
    if (!address) {
      console.error('錢包未連接')
      return
    }

    try {
      setIsLoading(true)
      
      // 記錄當前連接的錢包地址
      console.log('使用錢包地址:', address)
      
      // 使用 AppKit 連接的錢包執行交易
      await writeContractAsync({
        address: paytocolAddress as `0x${string}`,
        abi: PaytocolAbi,
        functionName: 'openStreamViaCctp',
        args: [
          recipient as `0x${string}`,
          BigInt(0),
          BigInt(amount * 10**6), // 假設 USDC 有 6 位小數
          address,
          BigInt(baseSepolia.id), // 使用 Base Sepolia 的 chainId
          paytocolAddress as `0x${string}`, // 目標鏈上的地址
          network.sepolia.address.token.Usdc as `0x${string}`, // 使用配置中的 USDC 地址
          BigInt(1),
          BigInt(Math.floor(new Date().getTime() / 1000)),
          BigInt(frequency),
          BigInt(totalPayments),
        ],
        chainId: sepolia.id,
      })
      
      console.log('交易已提交')
    } catch (error) {
      console.error('訂閱失敗:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonText = isLoading || isPending || isConfirming
    ? '處理中...'
    : !isConnected
    ? '請先連接錢包'
    : '確認訂閱'

  return (
    <button
      onClick={handleSubscribe}
      disabled={!isConnected || isLoading || isPending || isConfirming}
      className={`w-full py-4 px-6 text-center text-lg text-white font-semibold 
        bg-[#7DDBB6] hover:bg-[#65C4A0] rounded-md transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {buttonText}
    </button>
  )
} 