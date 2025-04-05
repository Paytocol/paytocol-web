import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { txId: string } }
) {
  // 這裡應該是實際的數據庫查詢或區塊鏈查詢
  // 目前返回模擬數據
  const mockData = {
    amount: "500000000000000000", // 0.5 ETH in wei
    timestamp: Math.floor(Date.now() / 1000),
    from: "@user1"
  }

  return NextResponse.json(mockData)
} 