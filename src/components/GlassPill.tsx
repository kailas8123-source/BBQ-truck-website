import { type ReactNode } from 'react';

interface GlassPillProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function GlassPill({ children, className = '', icon }: GlassPillProps) {
  return (
    <div className={`glass-pill px-5 py-2.5 flex items-center gap-2 ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">{children}</span>
    </div>
  );
}
