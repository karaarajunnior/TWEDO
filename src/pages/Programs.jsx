import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Target as TargetIcon, AlertTriangle, ListChecks, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetPath } from '../data/siteAssets';

const carouselThemes = {
  primary: {
    text: 'text-primary',
    badge: 'bg-primary text-white',
    border: 'border-primary',
    soft: 'bg-primary/10 text-primary',
    hover: 'hover:bg-primary hover:text-white hover:border-primary'
  },
  secondary: {
    text: 'text-secondary-dark',
    badge: 'bg-secondary text-white',
    border: 'border-secondary',
    soft: 'bg-secondary/10 text-secondary-dark',
    hover: 'hover:bg-secondary hover:text-white hover:border-secondary'
  },
  success: {
    text: 'text-green-700',
    badge: 'bg-green-600 text-white',
    border: 'border-green-600',
    soft: 'bg-green-50 text-green-700',
    hover: 'hover:bg-green-600 hover:text-white hover:border-green-600'
  }
};

const ActivityHorizontalSection = ({ title, items, images, theme = 'primary', label, isPlanned = false }) => {
  const containerRef = React.useRef(null);
  const themeClasses = carouselThemes[theme];

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 border border-gray-100 shadow-xl overflow-hidden mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-2 ${themeClasses.soft}`}>
            {items.length} {label} Items
          </span>
          <h4 className={`text-2xl md:text-3xl font-bold font-outfit ${themeClasses.text}`}>{title}</h4>
        </div>
        <div className="flex gap-2 shrink-0 z-10">
          <button
            type="button"
            onClick={() => scroll('left')}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer active:scale-95 touch-manipulation ${themeClasses.border} ${themeClasses.text} ${themeClasses.hover}`}
            aria-label={`Scroll left ${title}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer active:scale-95 touch-manipulation ${themeClasses.border} ${themeClasses.text} ${themeClasses.hover}`}
            aria-label={`Scroll right ${title}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative -mx-2 px-2">
        <div
          ref={containerRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-1"
        >
          {items.map((item, i) => {
            if (isPlanned) {
              // PLANNED ACTIVITIES: NO IMAGES! Text-based cards only.
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-3xl bg-white border border-gray-200/80 p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${themeClasses.badge}`} />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${themeClasses.soft}`}>
                        {label} {String(i + 1).padStart(2, '0')}
                      </span>
                      <TargetIcon size={18} className={themeClasses.text} />
                    </div>
                    <h5 className="text-gray-800 font-bold font-outfit text-base sm:text-lg leading-snug">
                      {item}
                    </h5>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-400">
                    <span>TEWOYEI Planned Initiative</span>
                    <span className={`w-2 h-2 rounded-full ${themeClasses.badge}`} />
                  </div>
                </motion.div>
              );
            }

            // CURRENT & IMPLEMENTED ACTIVITIES: Cards with matching images
            const imagePath = images && images[i % images.length] ? images[i % images.length] : 'hero-image.png';
            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative w-[280px] sm:w-[320px] shrink-0 snap-start rounded-3xl overflow-hidden shadow-lg aspect-[4/5]"
              >
                <img
                  src={getAssetPath(imagePath, item)}
                  alt={item}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${themeClasses.badge} shadow`}>
                    {label} {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-sm sm:text-base font-bold font-outfit leading-snug line-clamp-4">
                    {item}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
};

const Programs = ({ t }) => {
  const {
    objectives,
    thematicAreas,
    currentActivities,
    plannedActivities,
    achievements,
    challenges
  } = t.programs;

  const currentActivityImages = [
    'activities/info_gathering/info1 (3).jpeg',
    'menstrual.jpg',
    'activities/district_meeting/districtmeeting (12).jpeg',
    'activities/tailorig/TAILORING 1.jpg',
    'activities/construction/CONSTRUCTION.jpg',
    'activities/leadership/community leadership.png',
    'activities/hospital/counselling.jpeg',
    'activities/leadership/home visit.png',
    'menstrual2.jpg',
    'activities/baking/bakingSkill (1).jpeg',
    'activities/leadership/activism.png',
    'menstrual.jpg',
    'activities/malaria awareness/malaria awareness.jpeg'
  ];

  const achievementImages = [
    'menstrual.jpg',
    'activities/district_meeting/districtmeeting (3).jpeg',
    'activities/district_meeting/districtmeeting (24).jpeg',
    'activities/malaria awareness/WhatsApp Image 2026-05-11 at 19.30.49 (1).jpeg',
    'menstrual2.jpg',
    'activities/tailorig/TAILORING 2.jpg',
    'activities/tailorig/amoni_tailor4.jpeg',
    'activities/baking/bakingSkill (8).jpeg',
    'activities/leadership/activism_campaign1.jpeg',
    'activities/construction/bcp1.jpg',
    'activities/leadership/community_leadership (1).jpeg',
    'activities/baking/bakingSkill (12).jpeg',
    'activities/malaria awareness/malariaAwareness.jpeg'
  ];

  const objectiveImages = [];
  const thematicImages = [
    'activities/tailorig/TAILORING 1.jpg',
    'activities/leadership/community leadership.png',
    'activities/hospital/hospital1.jpg',
    'activities/info_gathering/info1 (1).jpeg',
    'activities/training on sanitary pads/sanitaryPadTraining1.jpg'
  ];

  return (
    <div className="pt-20">
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/activities/leadership/community%20leadership.png" alt={t.programs.headerTitle} className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/75 to-primary/40"></div>
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
      <section className="section-padding bg-white overflow-hidden">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.programs.ourWork}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-teso-dark">Strategy at a Glance</h2>
            <p className="text-gray-500 mt-4 text-lg">{t.programs.headerSubtitle}</p>
          </div>

          <div className="grid xl:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-10 items-start">
            <div className="rounded-[3rem] bg-teso-light p-5 md:p-8 border border-primary/10 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="inline-flex items-center gap-2 text-primary font-extrabold uppercase tracking-widest text-xs mb-3">
                    <TargetIcon size={18} /> Core Focus
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark">{t.programs.coreObjectivesTitle}</h3>
                </div>
                <span className="w-fit px-4 py-2 rounded-full bg-white text-primary font-bold shadow-sm">
                  {objectives.length} objectives
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {objectives.map((obj, i) => (
                  <motion.div
                    key={obj}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="group relative rounded-[2rem] bg-white border border-gray-150/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top gradient accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-start gap-4 mb-4">
                      <span className="shrink-0 w-11 h-11 rounded-2xl bg-primary/10 text-primary font-outfit font-extrabold text-base flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="pt-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-1">Objective {i + 1}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed font-medium text-base sm:text-lg">
                      {obj}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-teso-dark text-white sticky top-24">
              <img src={getAssetPath('skilling.png', t.programs.thematicAreasTitle)} alt={t.programs.thematicAreasTitle} className="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-teso-dark via-teso-dark/95 to-secondary-dark/90" />
              <div className="relative p-6 md:p-8">
                <span className="inline-flex items-center gap-2 text-secondary font-extrabold uppercase tracking-widest text-xs mb-3">
                  <ListChecks size={18} /> Intervention Pillars
                </span>
                <h3 className="text-3xl md:text-4xl font-bold font-outfit mb-8">{t.programs.thematicAreasTitle}</h3>

                <div className="grid gap-4">
                  {thematicAreas.map((area, i) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="group grid grid-cols-[5.5rem_1fr] gap-4 items-center rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 p-3 hover:bg-white/15 transition-all"
                    >
                      <div className="relative h-20 rounded-2xl overflow-hidden bg-white/10">
                        <img src={getAssetPath(thematicImages[i % thematicImages.length], area)} alt={area} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-secondary-dark/30" />
                        <CheckCircle className="absolute bottom-2 left-2 text-secondary" size={20} />
                      </div>
                      <div>
                        <span className="text-secondary font-extrabold text-xs uppercase tracking-widest">Area {i + 1}</span>
                        <p className="text-white/90 font-semibold leading-relaxed mt-1">{area}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education for Life Highlight Section */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[3rem] border border-primary/10 p-8 md:p-12 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
            
            {/* Left side: Image and description */}
            <div className="relative z-10 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                Special Program
              </span>
              <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark leading-tight">
                Education for Life (Soft Skills)
              </h3>
              <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={getAssetPath('activities/leadership/educ for life.png')} 
                  alt="Education for Life" 
                  className="absolute inset-0 w-full h-full object-cover animate-fade-in" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/60 via-transparent to-transparent" />
              </div>
              <p className="text-gray-600 leading-relaxed font-inter text-base">
                Alongside vocational training, our unique <strong>Education for Life</strong> curriculum focuses on the mindset shifts and soft skills necessary to prepare beneficiaries for the future, build critical thinking, and help them establish successful paths to income-generation.
              </p>
            </div>

            {/* Right side: Core focus points stack */}
            <div className="relative z-10 space-y-5">
              {[
                { title: "Mindset Change", desc: "Shifting perspectives from dependency to proactive planning, self-reliance, and community leadership." },
                { title: "Financial Literacy", desc: "Understanding savings, household budgeting, resource mobilization, and financial planning." },
                { title: "Critical Thinking", desc: "Building decision-making and problem-solving skills for business growth and sustainable livelihood." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-outfit">
                      {idx + 1}
                    </span>
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed pl-8">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-padding bg-teso-light border-y border-gray-200 overflow-hidden">
        <div className="container">
           <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.programs.ourWork}</span>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit">{t.programs.projectActivities}</h2>
              <p className="text-gray-500 mt-4 text-lg">{t.programs.headerSubtitle}</p>
           </div>
           <div className="space-y-10 max-w-6xl mx-auto">
             <ActivityHorizontalSection
               title={t.programs.currentActivitiesTitle}
               items={currentActivities}
               images={currentActivityImages}
               theme="primary"
               label="Current"
             />
             <ActivityHorizontalSection
               title={t.programs.plannedActivitiesTitle}
               items={plannedActivities}
               images={[]}
               theme="secondary"
               label="Planned"
               isPlanned={true}
             />
           </div>
        </div>
      </section>

      {/* Achievements and Challenges */}
      <section className="section-padding">
        <div className="container">
           <div className="grid lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8">
                <ActivityHorizontalSection
                  title={t.programs.successfullyImplemented}
                  items={achievements}
                  images={achievementImages}
                  theme="success"
                  label="Completed"
                />
             </div>

             <div className="lg:col-span-4">
                <div className="bg-red-50 p-6 md:p-8 rounded-3xl border border-red-100 sticky top-24 overflow-hidden">
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-6 bg-red-100">
                    <img src={getAssetPath('challenge.jpeg')} alt={t.programs.challengesTitle} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-950/70 to-transparent" />
                    <AlertTriangle className="absolute bottom-4 left-4 text-white" size={28} />
                  </div>
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
