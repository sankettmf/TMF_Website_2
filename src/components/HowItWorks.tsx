import React from 'react';
import { howItWorksSteps } from '../data/merchData';
import { MessageSquareShare, FileCheck, Flame, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const stepIcons = [
    <MessageSquareShare key="1" className="w-6 h-6 text-[#E5382C] step-icon-svg step-icon-1" />,
    <FileCheck key="2" className="w-6 h-6 text-[#E5382C] step-icon-svg step-icon-2" />,
    <Flame key="3" className="w-6 h-6 text-[#E5382C] step-icon-svg step-icon-3" />,
    <Truck key="4" className="w-6 h-6 text-[#E5382C] step-icon-svg step-icon-4" />
  ];

  return (
    <section id="how-it-works" className="py-14 lg:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold text-[#E5382C] uppercase tracking-widest">
            WORKSHOP STEPS · PRECISION PROCESS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-display tracking-tight">
            HOW YOUR MERCH <span className="text-[#E5382C]">COMES TO LIFE</span>
          </h2>
          <p className="text-sm sm:text-base text-[#635F56] leading-relaxed">
            From your raw artwork sketch to doorstep delivery in 4 streamlined workshop milestones.
          </p>
        </div>

        {/* Steps Grid with Animated Flowing Connector Lines */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative z-10">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={step.step}
                className="relative bg-white border border-[#E8E4DC] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-atelier shadow-atelier-hover group"
              >
                {/* Continuous Flowing Dotted Connector to Next Step */}
                {idx < howItWorksSteps.length - 1 && (
                  <div
                    className={`hidden ${
                      idx === 1 ? 'lg:flex' : 'md:flex'
                    } step-connector-wrapper`}
                    aria-hidden="true"
                  >
                    <div className="step-connector-flow">
                      <div className="step-dotted-flow-line" />
                    </div>
                  </div>
                )}
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FAF6ED] border border-[#EBE3D3] flex items-center justify-center step-icon-badge group-hover:scale-110 transition-all duration-300">
                      {stepIcons[idx]}
                    </div>
                    <span className="font-display text-3xl font-extrabold step-number select-none">
                      {step.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#E5382C] uppercase tracking-wider block mb-1">
                    {step.tag}
                  </span>
                  <h3 className="text-lg font-bold font-display text-[#141414] mb-2 group-hover:text-[#E5382C] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#635F56] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0ECE4] flex items-center gap-1.5 text-xs text-[#8C867A] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5382C]" />
                  <span>Phase {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
