'use client';

import React from 'react';
import { Compass, Code2, Cpu } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  const capabilities = [
    {
      num: '01',
      title: 'Product development',
      description:
        'From concept to launch, with considered architecture and a clear product focus.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Application engineering',
      description:
        'Bespoke applications shaped around your operations and your customers.',
      icon: Code2,
    },
    {
      num: '03',
      title: 'Systems & integrations',
      description:
        'APIs, data infrastructure, and integrations designed to work together.',
      icon: Cpu,
    },
  ];

  return (
    <section id="expertise" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Verbatim Section Header */}
      <div className="mb-16">
        <span className="text-xs font-mono tracking-widest text-[#E8A85C] uppercase block mb-3">
          CAPABILITIES & SERVICES
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F4F1EA]">
          Our expertise.
        </h2>
      </div>

      {/* 3 Capabilities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.num}
              className="glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-[#D98C4A] px-3 py-1 rounded-full border border-[#D98C4A]/25 bg-[#0B0E14]/40">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#D98C4A]/10 border border-[#D98C4A]/20 flex items-center justify-center text-[#E8A85C] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#F4F1EA] mb-4 group-hover:text-[#E8A85C] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[#94A3B8] text-base leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D98C4A]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#64748B]">Core Discipline</span>
                <div className="w-2 h-2 rounded-full bg-[#D98C4A] group-hover:shadow-[0_0_8px_#D98C4A] transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
