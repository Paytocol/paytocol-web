'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { sepolia, baseSepolia } from '@reown/appkit/networks'
import { ConnectButton } from '../components/ConnectButton'
// 1. Get projectId at https://cloud.reown.com
const projectId = '6657b829b4850eca2f1221d6c0d55a9f'

// 2. Create a metadata object
const metadata = {
  name: 'Paytocol',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [sepolia, baseSepolia],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKit() {
  return (
    <ConnectButton /> //make sure you have configured the <w3m-button> inside
  )
}