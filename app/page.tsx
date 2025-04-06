'use client'
import Image from "next/image";
import { PaymentHistoryItem } from "./components/PaymentHistoryItem";
import { PhoneFrame } from "./components/PhoneFrame";
import { ProfileHeader } from "./components/ProfileHeader";
import { ConfirmSubscriptionButton } from "./components/ConfirmSubscriptionButton";

import { sepolia, baseSepolia } from "viem/chains"
import network from "./utils/network"

// 定義合約地址
const sepoliaPaytocolAddress = "0x059f1d6Aaa4Aaf4138968c245A290819e9118EcE" as const
const baseSepoliaPaytocolAddress = "0x38080FaF738075F605d99AA48b7F25291AE394C6" as const

export default function Home() {
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

            <ConfirmSubscriptionButton
              amount={10}
              frequency={30}
              totalPayments={12}
              paytocolAddress={sepoliaPaytocolAddress}
              recipient="0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa"
            />
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
