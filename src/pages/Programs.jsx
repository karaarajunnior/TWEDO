import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Target as TargetIcon, ArrowRight, AlertTriangle, ListChecks } from 'lucide-react';

const Programs = ({ t }) => {
  const {
    objectives,
    thematicAreas,
    currentActivities,
    plannedActivities,
    achievements,
    challenges
  } = t.programs;
  const getAssetPath = (image) => {
    if (!image) return '';
    if (image.startsWith('/')) return image;
    return '/assets/' + image.split('/').map(encodeURIComponent).join('/');
  };
  const currentActivityImages = [
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.41 (1).jpeg',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.23.jpeg',
    'hospital/hospital-visit-1.jpg',
    'tailoring-atiira.jpg',
    'skilling.png',
    'others/other_1/WhatsApp Image 2026-05-11 at 19.29.02.jpeg',
    'about-image.png',
    'health.png',
    'leadership.png',
    'others/other_2/WhatsApp Image 2026-05-11 at 19.29.24.jpeg',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.32.jpeg',
    'hospital/hospital-visit-3.jpg'
  ];
  const plannedActivityImages = [
    'health.png',
    'tailoring-kapelebyong.jpg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.47.jpeg',
    'hero-image.png',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.44.jpeg'
  ];
  const achievementImages = [
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.15.jpeg',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.44.jpeg',
    'hospital/hospital-visit-2.jpg',
    'health.png',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.26.jpeg',
    'tailoring-atiira.jpg',
    'tailoring-kapelebyong.jpg',
    'skilling.png',
    'others/other_3/WhatsApp Image 2026-05-11 at 19.29.14.jpeg',
    'bcp-construction1.jpg',
    'leadership.png',
    'bcp-orungo.jpg',
    'hospital/hospital-visit-4.jpg'
  ];

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
           <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
             <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200">
                <h4 className="text-2xl font-bold text-primary mb-6">{t.programs.currentActivitiesTitle}</h4>
                <div className="grid gap-4">
                  {currentActivities.map((act, i) => (
                    <div key={i} className="group grid sm:grid-cols-[8rem_1fr] gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all">
                      <div className="relative h-32 sm:h-full min-h-28 rounded-2xl overflow-hidden bg-teso-light">
                        <img
                          src={getAssetPath(currentActivityImages[i % currentActivityImages.length])}
                          alt={act}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600 py-1">
                        <ArrowRight size={16} className="text-primary shrink-0 mt-1" />
                        <span>{act}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200">
                <h4 className="text-2xl font-bold text-secondary-dark mb-6">{t.programs.plannedActivitiesTitle}</h4>
                <div className="grid gap-4">
                  {plannedActivities.map((act, i) => (
                    <div key={i} className="group rounded-2xl overflow-hidden border border-gray-100 bg-teso-light hover:border-secondary/30 hover:shadow-md transition-all">
                      <div className="relative h-40 bg-secondary-light">
                        <img
                          src={getAssetPath(plannedActivityImages[i % plannedActivityImages.length])}
                          alt={act}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/75 via-teso-dark/10 to-transparent" />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-secondary text-white text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                          Planned {i + 1}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600 p-4">
                        <ArrowRight size={16} className="text-secondary-dark shrink-0 mt-1" />
                        <span>{act}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="grid md:grid-cols-2 gap-5">
                  {achievements.map((ach, i) => (
                    <div key={i} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-green-200 hover:shadow-md transition-all">
                      <div className="relative h-36 bg-teso-light">
                        <img
                          src={getAssetPath(achievementImages[i % achievementImages.length])}
                          alt={ach}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                        <CheckCircle className="absolute bottom-3 left-3 text-white drop-shadow" size={24} />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed p-4">{ach}</p>
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
