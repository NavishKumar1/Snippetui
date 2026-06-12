import React, { useEffect, useRef } from 'react';

export default function LiquidMercuryRipple() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const select = <T extends HTMLElement = HTMLElement>(selector: string) => container.querySelector<T>(selector);
    const selectAll = <T extends HTMLElement = HTMLElement>(selector: string) => container.querySelectorAll<T>(selector);

    // TypeScript Implementation
    const mercBtn = select<HTMLButtonElement>('.mercury-ripple-btn');
    if (mercBtn) {
      mercBtn.addEventListener('click', () => {
        const rings = mercBtn.querySelectorAll<HTMLSpanElement>('.mercury-wave-ring');
        rings.forEach(ring => {
          ring.style.animation = 'none';
          ring.offsetHeight; // trigger reflow
          ring.style.animation = 'mercury-ripple-wave 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)';
        });
      });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      <!-- Tailwind CSS Implementation -->
      <div className="p-[30px] inline-flex">
        <button className="bg-gradient-to-br from-[#e1e4e8] via-[#a1a8b3] to-[#717883] border border-white/30 px-9 py-4 rounded-full text-[#0d0d15] font-extrabold text-sm tracking-widest cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] hover:scale-105 hover:translate-y-[-2px] transition-all duration-300">
          SUBMIT
        </button>
      </div>
    </div>
  );
}