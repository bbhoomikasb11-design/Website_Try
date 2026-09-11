'use client';

import React from 'react';
import { ExternalLink, Layers, Smartphone, Sparkles, Box } from 'lucide-react';

export const WorkSection: React.FC = () => {
  const projects = [
    {
      id: 'relay',
      title: 'Relay',
      category: 'RETAIL SOFTWARE',
      description: 'An offline retail platform for billing, inventory, and customer accounts.',
      status: 'active',
      icon: Box,
      tag: 'Full Product & Engineering',
    },
    {
      id: 'peerflow',
      title: 'PeerFlow',
      category: 'PEER-TO-PEER TRANSFER',
      description: 'Direct file transfer between devices, with no account required.',
      status: 'active',
      icon: Smartphone,
      tag: 'Web & Desktop App',
    },
    {
      id: 'project-03',
      title: 'Project 03',
      category: 'COMING SOON',
      description: 'Coming soon',
      status: 'coming-soon',
      icon: Layers,
      tag: 'In Development',
    },
    {
      id: 'project-04',
      title: 'Project 04',
      category: 'COMING SOON',
      description: 'Coming soon',
      status: 'coming-soon',
      icon: Sparkles,
      tag: 'In Development',
    },
  ];

  return (
    <section id="work" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Verbatim Section Header */}
      <div className="mb-16">
        <span className="text-xs font-mono tracking-widest text-[#E8A85C] uppercase block mb-3">
          PORTFOLIO & CASE STUDIES
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F4F1EA]">
          Selected work.
        </h2>
      </div>

      {/* Grid of Work Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projects.map((project) => {
          const Icon = project.icon;
          const isActive = project.status === 'active';

          return (
            <div
              key={project.id}
              className={`glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group ${
                !isActive ? 'opacity-70' : ''
              }`}
            >
              {/* Subtle copper gradient accent inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D98C4A]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#D98C4A]/20 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D98C4A]/10 border border-[#D98C4A]/20 flex items-center justify-center text-[#E8A85C]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono tracking-widest text-[#E8A85C] uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#D98C4A]/20 bg-[#0B0E14]/40 text-[#94A3B8]">
                    {project.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F1EA] mb-4 group-hover:text-[#E8A85C] transition-colors">
                  {project.title}
                </h3>

                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D98C4A]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#94A3B8]">
                  {isActive ? 'Product design & development' : 'Status: In stealth / refinement'}
                </span>
                {isActive && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8A85C] group-hover:translate-x-1 transition-transform">
                    View project details
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verbatim Item 5: Figma designs & prototypes */}
      <div className="glass-panel rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-[#D98C4A]/20 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D98C4A]/10 text-xs font-mono text-[#E8A85C] uppercase tracking-wider mb-3">
            EXPLORATIONS
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F1EA] mb-2">
            Figma designs & prototypes
          </h3>
          <p className="text-[#94A3B8] text-base">Coming soon</p>
        </div>
        <div className="px-5 py-2.5 rounded-full border border-[#D98C4A]/30 text-xs font-mono text-[#E8A85C] bg-[#0B0E14]/50 w-fit">
          Archive in production
        </div>
      </div>
    </section>
  );
};
