import React from 'react';
import { businessConfig } from '../data/config';

export const FoundryMap: React.FC = () => {
  return (
    <div className="relative w-full h-[290px] sm:h-[330px] lg:absolute lg:inset-0 lg:h-full overflow-hidden">
      <iframe
        title="The Merch Foundry, Nashik - Google Maps"
        src={businessConfig.mapEmbedUrl}
        className="w-full h-[calc(100%+250px)] -mt-[180px] border-0 block"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
