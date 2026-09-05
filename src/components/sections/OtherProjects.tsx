import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, ArrowRight } from 'lucide-react';
import { OTHER_PROJECT } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectModal } from '../ui/ProjectModal';

export const OtherProjects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Sample data strictly for UI representation
  const sampleMembers = [
    { id: 'MEM-104', name: 'A. Ramanathan', age: 28, type: 'Annual Gold', status: 'Active' },
    { id: 'MEM-105', name: 'P. Sneha', age: 24, type: 'Quarterly', status: 'Active' },
    { id: 'MEM-106', name: 'K. Karthik', age: 31, type: 'Monthly', status: 'Pending Renewal' },
    { id: 'MEM-107', name: 'R. Divya', age: 26, type: 'Annual Gold', status: 'Active' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F7F4EE] relative overflow-hidden border-t border-[#11110F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="OTHER PROJECTS"
          title="Gym Management System"
          subtitle="A specialized Python administrative application built to streamline member registration, queries, and record maintenance."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Details & Features */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg text-[#55524B] leading-relaxed font-light">
              “{OTHER_PROJECT.description}”
            </p>

            <div className="space-y-4 pt-2">
              {OTHER_PROJECT.features?.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-[#EFEAE1]/70 border border-[#11110F]/8"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#11110F] mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#706D67] leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs font-mono text-[#706D67]">Stack:</span>
              <span className="px-3 py-1 rounded-full bg-[#161513] text-[#F7F4EE] text-xs font-mono">
                Python
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-[#B89152] hover:text-[#11110F] transition-colors ml-auto inline-flex items-center gap-1"
              >
                Details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Dark Gym Administration UI Mockup */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl bg-[#141311] border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden text-[#F7F4EE] font-sans"
            >
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#1B1A17] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-[#A09D96] ml-3">
                    Gym Management System • Python Desktop Admin Console
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B89152]/20 text-[#D3B679]">
                  Admin Mode
                </span>
              </div>

              {/* Console Toolbar */}
              <div className="p-4 border-b border-white/8 bg-[#161513] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-[#1E1D1A] px-3 py-1.5 rounded-lg border border-white/8 text-xs text-[#A09D96] w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#B89152]" />
                  <span className="text-xs font-mono">Search member name / ID...</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B89152] text-[#11110F] text-xs font-medium hover:bg-[#A68042] transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Add Member
                  </button>
                </div>
              </div>

              {/* Console Data Table */}
              <div className="p-4 sm:p-5 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] font-mono uppercase text-[#706D67]">
                      <th className="pb-2.5 font-normal">ID</th>
                      <th className="pb-2.5 font-normal">Member Name</th>
                      <th className="pb-2.5 font-normal">Age</th>
                      <th className="pb-2.5 font-normal">Plan Type</th>
                      <th className="pb-2.5 font-normal text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {sampleMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 font-mono text-[#D3B679]">{member.id}</td>
                        <td className="py-3 font-medium text-[#F7F4EE]">{member.name}</td>
                        <td className="py-3 text-[#A09D96]">{member.age}</td>
                        <td className="py-3 text-[#A09D96]">{member.type}</td>
                        <td className="py-3 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${
                              member.status === 'Active'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-[10px] font-mono text-[#706D67]">
                  <span>Database: SQLite / Local Storage</span>
                  <span>4 records indexed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ProjectModal
        project={OTHER_PROJECT}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
