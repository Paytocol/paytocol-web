interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`relative w-[390px] h-[844px] ${className}`}>
      {/* iPhone Frame */}
      <div className="absolute inset-0 bg-white rounded-[50px] border-[14px] border-black">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[20px] z-20">
          <div className="absolute top-[8px] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#2A2A2A] rounded-full"></div>
        </div>
        {/* Screen Content */}
        <div className="relative h-full overflow-y-auto pt-8 px-4">
          {children}
        </div>
      </div>
    </div>
  )
} 