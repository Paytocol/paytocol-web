'use client'
import Image from "next/image";
import { PaymentHistoryItem } from "./components/PaymentHistoryItem";
import { PhoneFrame } from "./components/PhoneFrame";
import { ProfileHeader } from "./components/ProfileHeader";

import {
  Contract,
  JsonRpcProvider,
  keccak256,
  TransactionResponse,
  Wallet,
  zeroPadValue,
} from "ethers"

import PaytocolAbi from "./abi/Paytocol.json"
import UsdcAbi from "./abi/USDC.json"
import MessageTransmitterAbi from "./abi/cctp/MessageTransmitter.json"
import config from "./utils/config"
import network from "./utils/network"

const sepoliaPaytocolAddress = "0x059f1d6Aaa4Aaf4138968c245A290819e9118EcE"
const baseSepoliaPaytocolAddress = "0x38080FaF738075F605d99AA48b7F25291AE394C6"

const sepoliaProvider = new JsonRpcProvider(
  network.sepolia.url,
  network.sepolia.chainId,
)
const baseSepoliaProvider = new JsonRpcProvider(
  network.baseSepolia.url,
  network.baseSepolia.chainId,
)

const sepoliaCaller = new Wallet(config.operator.privateKey, sepoliaProvider)
const sepoliaUsdc = new Contract(
  network.sepolia.address.token.Usdc,
  UsdcAbi,
  sepoliaCaller,
)
const sepoliaPaytocol = new Contract(
  sepoliaPaytocolAddress,
  PaytocolAbi,
  sepoliaCaller,
)

export default function Home() {

  async function submitSubscription(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    
    const sepoliaPaytocolAddress = "0x059f1d6Aaa4Aaf4138968c245A290819e9118EcE"
    const baseSepoliaPaytocolAddress =
      "0x38080FaF738075F605d99AA48b7F25291AE394C6"
  
    const sepoliaProvider = new JsonRpcProvider(
      network.sepolia.url,
      network.sepolia.chainId,
    )
    const baseSepoliaProvider = new JsonRpcProvider(
      network.baseSepolia.url,
      network.baseSepolia.chainId,
    )
  
    /* Source domain */
  
    const sepoliaCaller = new Wallet(config.operator.privateKey, sepoliaProvider)
    const sepoliaUsdc = new Contract(
      network.sepolia.address.token.Usdc,
      UsdcAbi,
      sepoliaCaller,
    )
    const sepoliaPaytocol = new Contract(
      sepoliaPaytocolAddress,
      PaytocolAbi,
      sepoliaCaller,
    )
    // console.log("Approve USDC to Paytocol...")
    // const approveTx: TransactionResponse = await sepoliaUsdc.approve(
    //   await sepoliaPaytocol.getAddress(),
    //   10000000,
    // )
    // await approveTx.wait()
  
    console.log("Open stream via CCTP on Sepolia...")
    const openTx: TransactionResponse = await sepoliaPaytocol.openStreamViaCctp(
      "0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa",
      0,
      1000,
      sepoliaCaller.address,
      network.baseSepolia.chainId,
      baseSepoliaPaytocolAddress,
      network.sepolia.address.token.Usdc,
      1,
      Math.floor(new Date().getTime() / 1000),
      10,
      10,
    )
    await openTx.wait()
    console.log("Open stream tx hash", openTx.hash)
  
    console.log("Fetching attestation...")
    const url = `https://iris-api-sandbox.circle.com/v2/messages/${network.sepolia.domain}?transactionHash=${openTx.hash}`
  
    let attestation: {
      message: string
      attestation: string
    }
    let round = 0
    while (true) {
      try {
        const response = await (await fetch(url)).json()
        console.log("Attestation", response)
        if (response.messages?.[0]?.status === "complete") {
          attestation = {
            message: response.messages?.[0]?.message,
            attestation: response.messages?.[0]?.attestation,
          }
          break
        }
        console.log(`Waiting for next round ${++round}`)
        await new Promise((resolve) => setTimeout(resolve, 5000))
      } catch (error) {
        throw error
      }
    }
  
    const baseSepoliaCaller = new Wallet(
      config.operator.privateKey,
      baseSepoliaProvider,
    )
    const basePaytocol = new Contract(
      baseSepoliaPaytocolAddress,
      PaytocolAbi,
      baseSepoliaCaller,
    )
    console.log("Relay stream via CCTP on Base Sepolia...")
    const relayTx: TransactionResponse = await basePaytocol.relayStreamViaCctp(
      "0xe737e5cebeeba77efe34d4aa090756590b1ce275",
      "0xb43db544e2c27092c107639ad201b3defabcf192",
      attestation.message,
      attestation.attestation,
    )
    await relayTx.wait()
    console.log("Relay stream tx hash", relayTx.hash)
  }

  return (
    <div className="p-12 bg-[#F7F3F0]">
      <div className="appkit-buttons-container fixed top-4 right-4 z-50">
        <appkit-button />
      </div>

      <div className="flex space-x-12 overflow-x-auto">
        {/* Subscription Page */}
        <PhoneFrame>
          <section className="space-y-8">
            <ProfileHeader
              avatarUrl="/nic-ghipli.png"
              title="Subscription Plan"
              description="Set up your recurring payment plan"
            />

            <div className="space-y-6">
              <div className="content-card py-6 border-b border-[rgba(125,219,182,0.15)]">
                <h3 className="text-sm text-[rgba(77,175,144,0.8)] mb-2">Total Payment Amount</h3>
                <p className="text-3xl font-bold text-[#65C4A0]">120 USDC</p>
              </div>

              <div className="content-card py-6 border-b border-[rgba(125,219,182,0.15)]">
                <h3 className="text-sm text-[rgba(77,175,144,0.8)] mb-2">Payment Schedule</h3>
                <p className="text-[#4DAF90]">10 USDC monthly, 12 payments in total</p>
              </div>

              <div className="content-card py-6 border-b border-[rgba(125,219,182,0.15)]">
                <h3 className="text-sm text-[rgba(77,175,144,0.8)] mb-2">Execution Time</h3>
                <p className="text-[#4DAF90]">Automatic execution on the 1st of each month</p>
              </div>
            </div>

            <button onClick={(e) => submitSubscription(e)} className="w-full py-4 px-6 text-center text-lg text-white font-semibold bg-[#7DDBB6] hover:bg-[#65C4A0] rounded-md transition-all duration-200">
              Confirm Subscription
            </button>
          </section>
        </PhoneFrame>

        {/* Author Page */}
        <PhoneFrame>
          <section className="space-y-8">
            <ProfileHeader
              avatarUrl="/nic-ghipli.png"
              title="Author Dashboard"
              description="View your payment status"
            />

            <div className="space-y-6">
              <div className="content-card py-6 border-b border-[rgba(125,219,182,0.15)]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm text-[rgba(77,175,144,0.8)] mb-2">Monthly Income</h3>
                    <p className="text-3xl font-bold text-[#65C4A0]">0 USDC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[rgba(77,175,144,0.8)] mb-2">From 3 chains</p>
                    <div className="flex space-x-3">
                      <span className="text-xs text-[#65C4A0] border-b border-[#7DDBB6]">Ethereum</span>
                      <span className="text-xs text-[#65C4A0] border-b border-[#7DDBB6]">Polygon</span>
                      <span className="text-xs text-[#65C4A0] border-b border-[#7DDBB6]">Arbitrum</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-card py-6 border-b border-[rgba(125,219,182,0.15)]">
                <h3 className="text-sm text-[rgba(77,175,144,0.8)] mb-4">Upcoming Payments</h3>
                <div className="space-y-4">
                  <PaymentHistoryItem txId="tx1" />
                  <PaymentHistoryItem txId="tx2" />
                </div>
              </div>
            </div>
          </section>
        </PhoneFrame>
      </div>
    </div>
  );
}
