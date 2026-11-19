import React from 'react';
import { whyChooseUsCards } from '../data/merchData';
import { ShieldCheck, Sparkle, PackageCheck, Zap, BadgePercent, Palette } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string, idx: number) => {
    const delayClass = `step-icon-${(idx % 6) + 1}`;
    const baseClass = `w-6 h-6 text-[#E5382C] step-icon-svg ${delayClass}`;
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className={baseClass} />;
      case 'Sparkles': return <Sparkle className={baseClass} />;
      case 'PackageCheck': return <PackageCheck className={baseClass} />;
      case 'Zap': return <Zap className={baseClass} />;
      case 'BadgePercent': return <BadgePercent className={baseClass} />;
      case 'Palette': return <Palette className={baseClass} />;
      default: return <ShieldCheck className={baseClass} />;
    }
  };

  return (
    <section className="py-14 lg:py-16 bg-transparent relative overflow-hidden border-t border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold text-[#E5382C] uppercase tracking-widest">
            THE FOUNDRY STANDARD · BENCHMARK
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-display tracking-tight">
            WHY CREATORS & BRANDS <span className="text-[#E5382C]">CHOOSE US</span>
          </h2>
          <p className="text-sm sm:text-base text-[#635F56] leading-relaxed">
            We blend traditional manual print dedication with Japanese DTF automation for unmatched texture and colorfastness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUsCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E4DC] rounded-2xl p-5 sm:p-6 shadow-atelier shadow-atelier-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#FAF6ED] border border-[#EBE3D3] flex items-center justify-center mb-4 step-icon-badge group-hover:scale-110 transition-all duration-300">
                  {getIcon(card.icon, idx)}
                </div>
                <h3 className="text-lg font-bold font-display text-[#141414] mb-2 group-hover:text-[#E5382C] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#635F56] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE4] flex items-center gap-2 text-[11px] text-[#8C867A] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5382C]" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
