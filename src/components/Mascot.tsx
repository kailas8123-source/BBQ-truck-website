interface MascotProps {
  className?: string;
  bubbleText?: string;
  bubblePosition?: 'left' | 'right' | 'top';
}

export default function Mascot({ className = '', bubbleText, bubblePosition = 'right' }: MascotProps) {
  const bubbleClass =
    bubblePosition === 'left'
      ? 'right-full mr-3 top-1/2 -translate-y-1/2'
      : bubblePosition === 'top'
      ? 'bottom-full mb-3 left-1/2 -translate-x-1/2'
      : 'left-full ml-3 top-1/2 -translate-y-1/2';

  return (
    <div className={`relative inline-block ${className}`}>
      {bubbleText && (
        <div
          className={`absolute ${bubbleClass} glass-pill px-4 py-2 whitespace-nowrap z-10`}
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          <span className="font-body text-sm text-[#243329]">{bubbleText}</span>
          <div
            className="absolute w-3 h-3 bg-white/78 rotate-45"
            style={{
              ...(bubblePosition === 'right'
                ? { left: '-6px', top: '50%', marginTop: '-6px' }
                : bubblePosition === 'left'
                ? { right: '-6px', top: '50%', marginTop: '-6px' }
                : { bottom: '-6px', left: '50%', marginLeft: '-6px' }),
            }}
          />
        </div>
      )}
      <img
        src="/assets/mascot.png"
        alt="Milo mascot"
        decoding="async"
        className="w-full h-full object-contain drop-shadow-lg"
        style={{ animation: 'float 4s ease-in-out infinite' }}
      />
    </div>
  );
}
