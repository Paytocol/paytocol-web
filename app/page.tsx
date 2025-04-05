import Image from "next/image";
import { PaymentHistoryItem } from "./components/PaymentHistoryItem";

export default function Home() {
  return (
    <div className="p-12 bg-[#F7F3F0]">
            <div className="appkit-buttons-container">
        <appkit-button />
      </div>
      <div className="flex space-x-12 overflow-x-auto">
        {/* Subscription Page with iPhone Frame */}
        <div className="relative w-[390px] h-[844px]">
          {/* iPhone Frame */}
          <div className="absolute inset-0 bg-white rounded-[50px] border-[14px] border-black">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[20px] z-20">
              <div className="absolute top-[8px] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#2A2A2A] rounded-full"></div>
            </div>
            {/* iPhone Buttons */}
            {/* <div className="absolute top-[120px] -left-[24px] w-[3px] h-[60px] bg-black rounded-l-sm"></div>
            <div className="absolute top-[190px] -left-[24px] w-[3px] h-[60px] bg-black rounded-l-sm"></div>
            <div className="absolute top-[120px] -right-[24px] w-[3px] h-[100px] bg-black rounded-r-sm"></div> */}
            {/* Screen Content */}
            <div className="relative h-full overflow-y-auto pt-8 px-4">
              <section className="space-y-8">
                <div className="content-card pb-8 border-b border-[rgba(125,219,182,0.15)]">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg bg-[rgba(125,219,182,0.1)] relative overflow-hidden">
                      <Image
                        src="/nic-ghipli.png"
                        alt="User Avatar"
                        fill
                        className="object-cover opacity-90"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-1 text-[#4DAF90]">Subscription Plan</h2>
                      <p className="text-sm text-[rgba(77,175,144,0.8)]">Set up your recurring payment plan</p>
                    </div>
                  </div>
                </div>

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

                <button className="w-full py-4 px-6 text-center text-lg text-white font-semibold bg-[#7DDBB6] hover:bg-[#65C4A0] rounded-md transition-all duration-200">
                  Confirm Subscription
                </button>
              </section>
            </div>
          </div>
        </div>

        {/* Author Page with iPhone Frame */}
        <div className="relative w-[390px] h-[844px]">
          {/* iPhone Frame */}
          <div className="absolute inset-0 bg-white rounded-[50px] border-[14px] border-black">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[20px] z-20">
              <div className="absolute top-[8px] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#2A2A2A] rounded-full"></div>
            </div>
            {/* iPhone Buttons */}
            {/* <div className="absolute top-[120px] -left-[24px] w-[3px] h-[60px] bg-black rounded-l-sm"></div>
            <div className="absolute top-[190px] -left-[24px] w-[3px] h-[60px] bg-black rounded-l-sm"></div>
            <div className="absolute top-[120px] -right-[24px] w-[3px] h-[100px] bg-black rounded-r-sm"></div> */}
            {/* Screen Content */}
            <div className="relative h-full overflow-y-auto pt-8 px-4">
              <section className="space-y-8">
                <div className="content-card pb-8 border-b border-[rgba(125,219,182,0.15)]">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg bg-[rgba(125,219,182,0.1)] relative overflow-hidden">
                      <Image
                        src="/nic-ghipli.png"
                        alt="Author Avatar"
                        fill
                        className="object-cover opacity-90"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-1 text-[#4DAF90]">Author Dashboard</h2>
                      <p className="text-sm text-[rgba(77,175,144,0.8)]">View your payment status</p>
                    </div>
                  </div>
                </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
