import React, { useEffect, useState } from 'react';
import { businessConfig } from '../data/config';

export const FoundryMap: React.FC = () => {
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' && !window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobileViewport(!e.matches);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const mapSrc = isMobileViewport
    ? businessConfig.mobileMapEmbedUrl
    : businessConfig.mapEmbedUrl;

  return (
    <div className="relative w-full h-[290px] sm:h-[330px] lg:absolute lg:inset-0 lg:h-full overflow-hidden">
      <iframe
        title="The Merch Foundry, Nashik - Google Maps"
        src={mapSrc}
        className="w-full h-[calc(100%+360px)] md:h-[calc(100%+250px)] -mt-[180px] border-0 block"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
