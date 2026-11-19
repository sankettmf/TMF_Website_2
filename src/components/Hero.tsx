import React from 'react';
import { getWhatsAppLink } from '../data/config';
import { TShirt3DViewer } from './TShirt3DViewer';
import { MessageSquare, ArrowDownRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-5.5rem)] pt-8 sm:pt-10 lg:pt-12 pb-12 flex items-center justify-center overflow-hidden bg-transparent">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            {/* Unboxed Quiet Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#736E65] tracking-wider uppercase">
              <span className="text-[#E5382C]">NASHIK ATELIER</span>
              <span aria-hidden="true">·</span>
              <span>DTF & SUBLIMATION PRINTING</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl xl:text-[68px] font-extrabold text-[#141414] font-display tracking-tight leading-[0.98]">
                WHERE MERCH <br />
                <span className="text-[#E5382C] underline decoration-[#E5382C]/30 decoration-wavy underline-offset-8">
                  IS CRAFTED.
                </span>
              </h1>
            </div>

            {/* Subline */}
            <p className="text-base sm:text-lg lg:text-[19px] text-[#524E46] max-w-xl font-medium leading-[1.65]">
              Custom T-shirts, caps, mugs, bottles & more, printed in Nashik. 
              Master craftsmanship, industrial-grade washproof inks, and premium combed cotton silhouettes built for brands, colleges, and streetwear culture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto">
              <a
                href={getWhatsAppLink('Hi The Merch Foundry, I want to order custom merchandise for my brand/event.')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#E5382C] text-white font-extrabold text-sm sm:text-[15px] tracking-wider uppercase shadow-[0_6px_20px_rgba(229,56,44,0.3)] hover:bg-[#CC2F24] hover:shadow-[0_8px_25px_rgba(229,56,44,0.4)] active:scale-95 transition-all"
              >
                <MessageSquare size={19} />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white border border-[#E8E4DC] text-[#141414] font-bold text-sm sm:text-[15px] tracking-wider uppercase hover:border-[#E5382C] hover:bg-[#f8fafc] shadow-sm transition-all group"
              >
                <span>Explore Catalog</span>
                <ArrowDownRight size={19} className="text-[#736E65] group-hover:text-[#E5382C] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* 3-Column Quick Trust Strip */}
            <div className="pt-5 grid grid-cols-3 gap-3 sm:gap-6 border-t border-[#E8E4DC] w-full text-xs sm:text-[13px] text-[#635F56] font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#E5382C] flex-shrink-0" />
                <span className="truncate">MOQ: 1 Piece</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 -ml-3">
                <Clock size={16} className="text-[#E5382C] flex-shrink-0" />
                <span className="truncate">24h Express Ready</span>
              </div>
              <div className="flex items-center justify-end sm:justify-start gap-2 ml-1.5">
                <Sparkles size={16} className="text-[#E5382C] flex-shrink-0" />
                <span className="truncate">Design Preview</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive T-shirt Daylight Studio Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <TShirt3DViewer />
          </div>
        </div>
      </div>
    </section>
  );
};
