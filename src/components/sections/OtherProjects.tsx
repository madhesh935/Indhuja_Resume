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
    <section className="py-28 sm:py-36 bg-[#080808] relative overflow-hidden border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="SECOND PROJECT"
          title="Gym Management System"
          subtitle="A specialized Python administrative application built to streamline member registration, queries, and record maintenance."
          align="left"
          theme="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-12">
          {/* Left Column: Details & Features */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg text-[#A9A59D] leading-relaxed font-light">
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
                  className="p-4 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#C6A15B]/40 transition-colors"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4F1EA] mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#77736C] leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs font-mono text-[#77736C]">Tech:</span>
              <span className="px-3 py-1 rounded-full bg-[#151515] text-[#DFC786] border border-white/[0.08] text-xs font-mono">
                Python
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-[#C6A15B] hover:text-[#F4F1EA] transition-colors ml-auto inline-flex items-center gap-1 cursor-pointer"
              >
                Project Details <ArrowRight className="w-3.5 h-3.5" />
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
              className="rounded-2xl bg-[#0D0D0D] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden text-[#F4F1EA] font-sans"
            >
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#141414] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-[#A9A59D] ml-3">
                    Gym Management System • Python Desktop Admin Console
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C6A15B]/20 text-[#DFC786] border border-[#C6A15B]/30">
                  DEMO INTERFACE
                </span>
              </div>

              {/* Console Toolbar */}
              <div className="p-4 border-b border-white/[0.06] bg-[#111111] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-[#181818] px-3 py-1.5 rounded-lg border border-white/[0.08] text-xs text-[#A9A59D] w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span className="text-xs font-mono">Search member name / ID...</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C6A15B] text-[#080808] text-xs font-medium hover:bg-[#DFC786] transition-colors"
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
                    <tr className="border-b border-white/[0.08] text-[10px] font-mono uppercase text-[#77736C]">
                      <th className="pb-2.5 font-normal">ID</th>
                      <th className="pb-2.5 font-normal">Member Name</th>
                      <th className="pb-2.5 font-normal">Age</th>
                      <th className="pb-2.5 font-normal">Plan Type</th>
                      <th className="pb-2.5 font-normal text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] font-sans">
                    {sampleMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 font-mono text-[#DFC786]">{member.id}</td>
                        <td className="py-3 font-medium text-[#F4F1EA]">{member.name}</td>
                        <td className="py-3 text-[#A9A59D]">{member.age}</td>
                        <td className="py-3 text-[#A9A59D]">{member.type}</td>
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

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#77736C]">
                  <span>Database: SQLite / Local Structured File</span>
                  <span>4 records indexed · DEMO VIEW</span>
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

