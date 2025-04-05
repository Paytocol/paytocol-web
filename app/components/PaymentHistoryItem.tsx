'use client'

import { useEffect, useState } from 'react'
import { formatEther } from 'viem'

interface Transaction {
  amount: string  // amount in wei (10^18)
  timestamp: number
  from: string
}

interface PaymentHistoryItemProps {
  txId: string
}

export function PaymentHistoryItem({ txId }: PaymentHistoryItemProps) {
  const [tx, setTx] = useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const response = await fetch(`/api/tx/${txId}`)
        const data = await response.json()
        setTx(data)
      } catch (error) {
        console.error('Failed to fetch transaction:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransaction()
  }, [txId])

  if (isLoading) {
    return <div className="animate-pulse h-16 bg-gray-100 rounded"></div>
  }

  if (!tx) {
    return null
  }

  const formattedAmount = formatEther(BigInt(tx.amount))
  const formattedDate = new Date(tx.timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="pb-4 border-b border-[rgba(125,219,182,0.15)]">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-[#65C4A0]">{formattedAmount} ETH</p>
          <p className="text-sm text-[rgba(77,175,144,0.8)] mt-1">From {tx.from}</p>
        </div>
        <p className="text-sm text-[#4DAF90]">{formattedDate}</p>
      </div>
    </div>
  )
} 