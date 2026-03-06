'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { createHeroScene } from '@/lib/threeHeroScene';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threeReady, setThreeReady] = useState(false);

  useEffect(() => {
    if (!threeReady || !canvasRef.current) {
      return;
    }

    const controller = createHeroScene(canvasRef.current);
    return () => controller.dispose();
  }, [threeReady]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0b0b0f]">
      <Script
        src="https://unpkg.com/three@0.173.0/build/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setThreeReady(true)}
      />
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(168,85,247,0.14),transparent_36%),linear-gradient(to_bottom,rgba(11,11,15,0.08),rgba(11,11,15,0.4)_70%,rgba(11,11,15,0.7))]" />
    </div>
  );
}
