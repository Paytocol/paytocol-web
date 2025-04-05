import Image from "next/image";

interface ProfileHeaderProps {
  avatarUrl: string
  title: string
  description: string
  className?: string
}

export function ProfileHeader({ 
  avatarUrl, 
  title, 
  description, 
  className = '' 
}: ProfileHeaderProps) {
  return (
    <div className={`content-card pb-8 border-b border-[rgba(125,219,182,0.15)] ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-lg bg-[rgba(125,219,182,0.1)] relative overflow-hidden">
          <Image
            src={avatarUrl}
            alt={`${title} Avatar`}
            fill
            className="object-cover opacity-90"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1 text-[#4DAF90]">{title}</h2>
          <p className="text-sm text-[rgba(77,175,144,0.8)]">{description}</p>
        </div>
      </div>
    </div>
  )
} 