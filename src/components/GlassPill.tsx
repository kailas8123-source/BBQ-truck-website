import { type ReactNode } from 'react';

interface GlassPillProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function GlassPill({ children, className = '', icon }: GlassPillProps) {
  return (
    <div className={`glass-pill px-4 sm:px-5 py-2.5 flex items-center justify-center gap-2 ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="font-label text-[11px] sm:text-xs uppercase tracking-widest text-[#243329] leading-tight">{children}</span>
    </div>
  );
}
