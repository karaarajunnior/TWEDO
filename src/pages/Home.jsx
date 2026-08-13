import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, TrendingUp, PlayCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';
import ImpactStats from '../components/ImpactStats';
import { fieldStoryVideos, getAssetPath } from '../data/siteAssets';

const Home = ({ t }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const localVideos = fieldStoryVideos.map((video, index) => ({
    src: video.src,
    title: video.title || `TEWOYEI Field Story ${index + 1}`,
    label: index === 0 ? 'Community Outreach' : 'Field Story'
  }));
  const testimonials = [
    { image: 'activities/tailorig/amoni_tailor2.jpeg', location: t.home.kapelebyongDistrict },
    { image: 'activities/baking/bakingSkill (1).jpeg', location: 'Amuria District' },
    { image: 'activities/training on sanitary pads/sanitaryPadTraining1.jpg', location: t.home.kapelebyongDistrict },
    { image: 'activities/leadership/community leadership.png', location: 'Teso Sub-Region' },
    { image: 'activities/district_meeting/districtmeeting (12).jpeg', location: 'Amuria District' }
  ];

  return (
    <div className="bg-white">
      <Hero t={t} />
      <ImpactStats t={t} />

      {/* Featured Testimonials */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.home.testimonials}</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit">{t.home.livesTransformed}</h2>
          </div>

          <div className="relative -mx-6">
            <div className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6">
              {testimonials.map((testimonial, i) => (
                <motion.article
                  key={testimonial.image}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="grid w-[300px] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-gray-100 bg-teso-light shadow-lg sm:w-[440px] md:w-[620px] md:grid-cols-[12rem_1fr] md:rounded-[2.5rem]"
                >
                  <div className="relative min-h-52 overflow-hidden md:min-h-full">
                    <img src={getAssetPath(testimonial.image)} alt={t.home.beneficiaryAlt} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-teso-light/30" />
                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teso-dark md:hidden">TEWOYEI story</div>
                  </div>
                  <div className="relative flex min-h-[290px] flex-col justify-between p-6 sm:p-8">
                    <Quote className="absolute right-6 top-5 text-primary/10" size={64} />
                    <div>
                      <div className="mb-5 flex gap-1 text-secondary" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, star) => <span key={star} className="text-base">★</span>)}
                      </div>
                      <p className="relative z-10 text-base italic leading-relaxed text-gray-700 sm:text-lg">“{t.home.testimonialQuote}”</p>
                    </div>
                    <div className="mt-6 border-t border-teso-dark/10 pt-4">
                      <h4 className="font-bold font-outfit text-lg text-teso-dark">{t.home.beneficiaryName} {i + 1}</h4>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />
            <p className="px-6 pt-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Swipe or scroll to explore more stories</p>
          </div>
        </div>
      </section>

      {/* Videos Highlight / Field Stories Slider */}
      <section className="py-12 md:py-16 bg-teso-dark text-white rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-10 my-10 relative overflow-hidden px-4 md:px-10">
        <div className="container max-w-5xl relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">{t.home.fieldStories}</span>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 leading-tight">{t.home.impactMotion}</h2>
              <p className="text-gray-400 text-base md:text-lg">
                {t.home.fieldStoriesDescription}
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setVideoIndex(prev => (prev === 0 ? localVideos.length - 1 : prev - 1))}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-teso-dark hover:border-secondary transition-all"
                aria-label="Previous impact video"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => setVideoIndex(prev => (prev === localVideos.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-teso-dark hover:border-secondary transition-all"
                aria-label="Next impact video"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden pb-6">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${videoIndex * 100}%)` }}
              >
                {localVideos.map((vid, i) => (
                  <div key={i} className="w-full shrink-0 px-4">
                    <motion.div
                      className="relative rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden border border-white/10 shadow-2xl bg-black"
                      whileHover={{ y: -6 }}
                    >
                      {/* Label badge */}
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-secondary text-teso-dark text-xs font-bold rounded-full uppercase tracking-widest shadow">
                        {vid.label}
                      </div>
                      {/* Native video player */}
                      <video
                        src={vid.src}
                        controls
                        preload="metadata"
                        className="w-full aspect-video object-cover"
                        style={{ display: 'block' }}
                      />
                      {/* Title bar */}
                      <div className="px-6 py-4 bg-teso-dark/80 backdrop-blur-md border-t border-white/10 flex items-center gap-3">
                        <PlayCircle size={20} className="text-secondary shrink-0" />
                        <p className="text-sm font-bold text-white truncate">{vid.title}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-3 mt-3">
              {localVideos.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setVideoIndex(idx)}
                  aria-label={`Show impact video ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${videoIndex === idx ? 'w-8 bg-secondary' : 'w-2 bg-white/20'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Field Activities — Premium Staggered Grid */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">
                {t.home.fieldActivities}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit leading-tight">
                {t.home.communityWork}
              </h2>
              <p className="text-gray-500 mt-3 text-base max-w-lg">
                A glimpse into the real work happening across Teso — empowering lives, one community at a time.
              </p>
            </div>
            <a
              href="/gallery"
              className="btn btn-outline text-sm px-6 py-2.5 shrink-0"
            >
              View Full Gallery →
            </a>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

            {/* Card 1 — Tailoring (tall) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-3xl overflow-hidden shadow-lg sm:row-span-2 lg:row-span-1 aspect-[4/5] sm:aspect-auto sm:min-h-[420px] lg:aspect-[4/5]"
            >
              <img
                src="/assets/activities/tailorig/amoni_tailor2.jpeg"
                alt="Tailoring Program - Atiira"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
                  Atiira
                </span>
                <h4 className="text-white text-xl font-bold font-outfit">Tailoring Program</h4>
                <p className="text-white/70 text-xs mt-1">Vocational skills for economic independence</p>
              </div>
            </motion.div>

            {/* Card 2 — Leadership */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] sm:aspect-auto sm:min-h-[200px]"
            >
              <img
                src="/assets/activities/leadership/community%20leadership.png"
                alt="Leadership Summit - Amuria"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
                  Amuria
                </span>
                <h4 className="text-white text-lg font-bold font-outfit">Leadership Summit</h4>
              </div>
            </motion.div>

            {/* Card 3 — Baking */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] sm:aspect-auto sm:min-h-[200px]"
            >
              <img
                src="/assets/activities/baking/bakingSkill%20(1).jpeg"
                alt="Bakery Skills - Orungo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
                  Orungo
                </span>
                <h4 className="text-white text-lg font-bold font-outfit">Bakery Skills</h4>
              </div>
            </motion.div>

            {/* Card 4 — Sanitary Pads Training (tall) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-3xl overflow-hidden shadow-lg sm:row-span-2 lg:row-span-1 aspect-[4/5] sm:aspect-auto sm:min-h-[420px] lg:aspect-[4/5]"
            >
              <img
                src="/assets/activities/training%20on%20sanitary%20pads/sanitaryPadTraining1.jpg"
                alt="Health Training - Kapelebyong"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
                  Kapelebyong
                </span>
                <h4 className="text-white text-xl font-bold font-outfit">Health & Hygiene Training</h4>
                <p className="text-white/70 text-xs mt-1">Menstrual health for schoolgirls</p>
              </div>
            </motion.div>

            {/* Card 5 — Info Gathering / GBV Awareness */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] sm:aspect-auto sm:min-h-[200px]"
            >
              <img
                src="/assets/activities/info_gathering/info1%20(3).jpeg"
                alt="GBV Awareness Campaign"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
                  Obalanga
                </span>
                <h4 className="text-white text-lg font-bold font-outfit">GBV Awareness</h4>
              </div>
            </motion.div>

            {/* Card 6 — District Meeting */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] sm:aspect-auto sm:min-h-[200px]"
            >
              <img
                src="/assets/activities/district_meeting/districtmeeting%20(12).jpeg"
                alt="District Meeting"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
                  District
                </span>
                <h4 className="text-white text-lg font-bold font-outfit">District Coordination</h4>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-20">
        <div className="container">
          <p className="text-center text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs mb-10">{t.home.trustedBy}</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all text-center">
            <span className="text-2xl font-bold font-outfit">USAID</span>
            <span className="text-2xl font-bold font-outfit">Global Fund</span>
            <span className="text-2xl font-bold font-outfit">TASO</span>
            <span className="text-2xl font-bold font-outfit">CDFU</span>
            <span className="text-2xl font-bold font-outfit">Wizarts Foundation Uganda</span>
            <span className="text-2xl font-bold font-outfit">Local Governments</span>
            <span className="text-2xl font-bold font-outfit">Ministry of Health</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
