import { Wallet } from "ethers"

console.log(process.env.NEXT_PUBLIC_OPERATOR_PRIVATE_KEY)


const config = {
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
  operator: new Wallet(process.env.NEXT_PUBLIC_OPERATOR_PRIVATE_KEY as string),
  etherscan: {
    apiKey: {
      arbitrum: process.env.ETHERSCAN_ARBITRUM_API_KEY as string,
    },
  },
}


export default config
