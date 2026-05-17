import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Hammer, HeartPulse, GraduationCap, CheckCircle, Target as TargetIcon, ArrowRight, AlertTriangle, ListChecks } from 'lucide-react';

const Programs = ({ t }) => {
  const {
    objectives,
    thematicAreas,
    currentActivities,
    plannedActivities,
    achievements,
    challenges
  } = t.programs;

  return (
    <div className="pt-20">
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/skilling.png" alt={t.programs.headerTitle} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/70 to-primary/30"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">{t.programs.headerTitle}</h1>
            <p className="text-xl text-gray-200 leading-relaxed font-inter">
              {t.programs.headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Core Objectives & Thematic Areas */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
               <h3 className="text-3xl font-bold font-outfit mb-8 flex items-center gap-3">
                 <TargetIcon className="text-primary" size={32} /> {t.programs.coreObjectivesTitle}
               </h3>
               <ul className="space-y-4">
                 {objectives.map((obj, i) => (
                   <li key={i} className="flex gap-3 text-gray-700">
                     <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">{i+1}</span>
                     <span>{obj}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <div className="bg-teso-dark p-10 rounded-[3rem] shadow-xl text-white">
               <h3 className="text-3xl font-bold font-outfit mb-8 flex items-center gap-3 text-secondary">
                 <ListChecks size={32} /> {t.programs.thematicAreasTitle}
               </h3>
               <ul className="space-y-4">
                 {thematicAreas.map((area, i) => (
                   <li key={i} className="flex gap-3 items-center text-gray-300">
                     <CheckCircle className="text-secondary shrink-0" size={20} />
                     <span className="text-lg">{area}</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-padding bg-teso-light border-y border-gray-200">
        <div className="container">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-outfit">{t.programs.projectActivities}</h2>
           </div>
           <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <div className="bg-white rounded-3xl p-8 border border-gray-200">
                <h4 className="text-2xl font-bold text-primary mb-6">{t.programs.currentActivitiesTitle}</h4>
                <ul className="space-y-3">
                  {currentActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 border-b border-gray-50 pb-2">
                       <ArrowRight size={16} className="text-primary shrink-0 mt-1" />
                       <span>{act}</span>
                    </li>
                  ))}
                </ul>
             </div>
             
             <div className="bg-white rounded-3xl p-8 border border-gray-200">
                <h4 className="text-2xl font-bold text-secondary-dark mb-6">{t.programs.plannedActivitiesTitle}</h4>
                <ul className="space-y-3">
                  {plannedActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 border-b border-gray-50 pb-2">
                       <ArrowRight size={16} className="text-secondary-dark shrink-0 mt-1" />
                       <span>{act}</span>
                    </li>
                  ))}
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Achievements and Challenges */}
      <section className="section-padding">
        <div className="container">
           <div className="grid lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8">
                <h3 className="text-3xl font-bold font-outfit mb-8">{t.programs.successfullyImplemented}</h3>
                <div className="space-y-6">
                  {achievements.map((ach, i) => (
                    <div key={i} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl">
                      <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                      <p className="text-gray-700">{ach}</p>
                    </div>
                  ))}
                </div>
             </div>

             <div className="lg:col-span-4">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 sticky top-24">
                  <h3 className="text-2xl font-bold font-outfit mb-6 text-red-900 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" /> {t.programs.challengesTitle}
                  </h3>
                  <ul className="space-y-4">
                    {challenges.map((chal, i) => (
                      <li key={i} className="text-sm text-red-800 leading-relaxed border-l-2 border-red-300 pl-3">
                        {chal}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-primary text-white text-center">
        <div className="container">
           <h2 className="text-4xl font-bold font-outfit mb-8">{t.programs.supportTitle}</h2>
           <Link to="/get-involved#partner" className="btn btn-primary bg-secondary text-teso-dark hover:scale-105">{t.common.partnerWithUs}</Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;
