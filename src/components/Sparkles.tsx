export default function Sparkles({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animate-[sparkle_3s_ease-in-out_infinite]">
        <circle cx="30" cy="8" r="3" fill="white" opacity="0.9" />
        <circle cx="52" cy="30" r="2.5" fill="white" opacity="0.8" />
        <circle cx="30" cy="52" r="3" fill="white" opacity="0.9" />
        <circle cx="8" cy="30" r="2.5" fill="white" opacity="0.8" />
        <path d="M30 2L32 8L30 14L28 8L30 2Z" fill="#B3E0FF" opacity="0.9" />
        <path d="M58 30L52 32L46 30L52 28L58 30Z" fill="#B3E0FF" opacity="0.8" />
        <path d="M30 58L28 52L30 46L32 52L30 58Z" fill="#B3E0FF" opacity="0.9" />
        <path d="M2 30L8 28L14 30L8 32L2 30Z" fill="#B3E0FF" opacity="0.8" />
      </svg>
    </div>
  );
}
