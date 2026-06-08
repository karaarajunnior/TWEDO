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

const ActivityCarousel = ({ title, items, images, theme = 'primary', label }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];
  const themeClasses = carouselThemes[theme];
  const prev = () => setActiveIndex(index => (index === 0 ? items.length - 1 : index - 1));
  const next = () => setActiveIndex(index => (index === items.length - 1 ? 0 : index + 1));

  return (
    <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-6 border border-gray-100 shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-3 ${themeClasses.soft}`}>
            {activeIndex + 1} / {items.length}
          </span>
          <h4 className={`text-2xl md:text-3xl font-bold font-outfit ${themeClasses.text}`}>{title}</h4>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={prev}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${themeClasses.border} ${themeClasses.text} ${themeClasses.hover}`}
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={next}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${themeClasses.border} ${themeClasses.text} ${themeClasses.hover}`}
            aria-label={`Next ${title}`}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6"
      >
        <div className="relative min-h-[22rem] rounded-[2rem] overflow-hidden bg-teso-light shadow-lg">
          <img
            src={getAssetPath(images[activeIndex % images.length], activeItem)}
            alt={activeItem}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/90 via-teso-dark/25 to-transparent" />
          <span className={`absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest ${themeClasses.badge}`}>
            {label} {activeIndex + 1}
          </span>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-2xl md:text-3xl font-bold font-outfit leading-tight">{activeItem}</p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-teso-light p-6 md:p-8 border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gray-400 mb-4">{title}</p>
            <h5 className="text-2xl font-bold font-outfit text-teso-dark mb-4">{label} Focus</h5>
            <p className="text-gray-600 leading-relaxed">{activeItem}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((offset) => {
              const itemIndex = (activeIndex + offset) % items.length;
              return (
                <button
                  type="button"
                  key={`${title}-${itemIndex}`}
                  onClick={() => setActiveIndex(itemIndex)}
                  className={`relative h-24 rounded-2xl overflow-hidden text-left border-2 transition-all ${itemIndex === activeIndex ? themeClasses.border : 'border-white hover:border-gray-300'}`}
                  aria-label={`Show ${label} ${itemIndex + 1}`}
                >
                  <img
                    src={getAssetPath(images[itemIndex % images.length], items[itemIndex])}
                    alt={items[itemIndex]}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-teso-dark/55" />
                  <span className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold line-clamp-2">
                    {items[itemIndex]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {items.map((item, i) => (
            <button
              type="button"
              key={`${title}-thumb-${i}`}
              onClick={() => setActiveIndex(i)}
              className={`group w-56 rounded-2xl p-2 border-2 bg-white text-left transition-all ${activeIndex === i ? themeClasses.border : 'border-gray-100 hover:border-gray-300'}`}
              aria-label={`Open ${label} ${i + 1}`}
            >
              <div className="relative h-24 rounded-xl overflow-hidden mb-3">
                <img src={getAssetPath(images[i % images.length], item)} alt={item} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${themeClasses.badge}`}>
                  {i + 1}
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{item}</p>
            </button>
          ))}
        </div>
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
  const objectiveImages = [
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.37.jpeg',
    'hero-image.png',
    'leadership.png',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.47.jpeg',
    'about-image.png',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.26.jpeg',
    'health.png',
    'tailoring-kapelebyong.jpg'
  ];
  const thematicImages = [
    'tailoring-atiira.jpg',
    'leadership.png',
    'hospital/hospital-visit-1.jpg',
    'others/other_1/WhatsApp Image 2026-05-11 at 19.29.02.jpeg',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.44.jpeg'
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

              <div className="grid md:grid-cols-2 gap-4">
                {objectives.map((obj, i) => (
                  <motion.div
                    key={obj}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="group rounded-[2rem] bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-36 bg-teso-dark overflow-hidden">
                      <img
                        src={getAssetPath(objectiveImages[i % objectiveImages.length], obj)}
                        alt={obj}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/85 via-teso-dark/15 to-transparent" />
                      <span className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-extrabold shadow-lg">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-700 leading-relaxed font-medium">{obj}</p>
                    </div>
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

      {/* Activities Grid */}
      <section className="section-padding bg-teso-light border-y border-gray-200 overflow-hidden">
        <div className="container">
           <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.programs.ourWork}</span>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit">{t.programs.projectActivities}</h2>
              <p className="text-gray-500 mt-4 text-lg">{t.programs.headerSubtitle}</p>
           </div>
           <div className="space-y-10 max-w-6xl mx-auto">
             <ActivityCarousel
               title={t.programs.currentActivitiesTitle}
               items={currentActivities}
               images={currentActivityImages}
               theme="primary"
               label="Current"
             />
             <ActivityCarousel
               title={t.programs.plannedActivitiesTitle}
               items={plannedActivities}
               images={plannedActivityImages}
               theme="secondary"
               label="Planned"
             />
           </div>
        </div>
      </section>

      {/* Achievements and Challenges */}
      <section className="section-padding">
        <div className="container">
           <div className="grid lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8">
                <h3 className="text-3xl font-bold font-outfit mb-8">{t.programs.successfullyImplemented}</h3>
                <ActivityCarousel
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
                    <img src={getAssetPath('hospital/hospital-visit-5.jpg', t.programs.challengesTitle)} alt={t.programs.challengesTitle} className="absolute inset-0 w-full h-full object-cover" />
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
