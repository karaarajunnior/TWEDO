import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, TrendingUp, PlayCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';
import ImpactStats from '../components/ImpactStats';

const Home = ({ t }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  // Local field-story videos from public/assets/video clips/
  const localVideos = [
    {
      src: '/assets/video%20clips/WhatsApp%20Video%202026-05-13%20at%2010.10.41.mp4',
      title: 'TEWOYEI Field Story',
      label: 'Community Outreach'
    },
    {
      src: '/assets/video%20clips/WhatsApp%20Video%202026-05-11%20at%2019.29.59.mp4',
      title: 'Hospital Visit Highlights',
      label: 'Health Advocacy'
    }
  ];
  const activityImages = ['/assets/skilling.png', '/assets/about-image.png', '/assets/hero-image.png', '/assets/skilling.png'];

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

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
               <div 
                 className="flex transition-transform duration-500 ease-out" 
                 style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
               >
                 {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="w-full shrink-0 px-4">
                     <div className="bg-teso-light p-10 md:p-16 rounded-[3rem] relative min-h-[400px] flex flex-col justify-center">
                        <Quote className="text-primary/10 absolute top-12 right-12" size={80} />
                        <div className="flex gap-1 text-secondary mb-8">
                           {[...Array(5)].map((_, star) => (
                             <i key={star} className="fas fa-star text-sm"></i>
                           ))}
                        </div>
                        <p className="text-xl md:text-2xl text-gray-700 mb-10 italic leading-relaxed relative z-10">
                          "{t.home.testimonialQuote}"
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden ring-4 ring-white shadow-lg">
                            <img src={`https://i.pravatar.cc/150?u=beneficiary${i}`} alt={t.home.beneficiaryAlt} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{t.home.beneficiaryName} {i}</h4>
                            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{t.home.kapelebyongDistrict}</p>
                          </div>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setTestimonialIndex(prev => prev === 0 ? 4 : prev - 1)}
              className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-20 border border-gray-100"
            >
              <i className="fas fa-chevron-left text-xl"></i>
            </button>
            <button 
              onClick={() => setTestimonialIndex(prev => prev === 4 ? 0 : prev + 1)}
              className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-20 border border-gray-100"
            >
              <i className="fas fa-chevron-right text-xl"></i>
            </button>
            
            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
               {[0, 1, 2, 3, 4].map(idx => (
                 <button 
                   key={idx}
                   onClick={() => setTestimonialIndex(idx)}
                   className={`w-3 h-3 rounded-full transition-all ${testimonialIndex === idx ? 'bg-primary w-8' : 'bg-gray-300'}`}
                 />
               ))}
            </div>
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
                    className={`h-2 rounded-full transition-all duration-300 ${
                      videoIndex === idx ? 'w-8 bg-secondary' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Field Activities Slider */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.home.fieldActivities}</span>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit">{t.home.communityWork}</h2>
            </div>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setActivityIndex(prev => prev === 0 ? 3 : prev - 1)}
                className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft />
              </button>
              <button 
                type="button"
                onClick={() => setActivityIndex(prev => prev === 3 ? 0 : prev + 1)}
                className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[3rem]">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activityIndex * 25}%)` }}
              >
                {t.home.activities.map((act, i) => (
                  <div key={i} className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-4">
                    <div className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl">
                      <img src={activityImages[i]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={act.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/95 via-teso-dark/25 to-transparent opacity-80" />
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <span className="px-3 py-1 bg-primary text-[10px] font-bold rounded-full uppercase tracking-widest mb-3 inline-block">{act.location}</span>
                        <h4 className="text-2xl font-bold font-outfit">{act.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-20">
        <div className="container">
          <p className="text-center text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs mb-10">{t.home.trustedBy}</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all">
             <span className="text-2xl font-bold font-outfit">USAID</span>
             <span className="text-2xl font-bold font-outfit">Global Fund</span>
             <span className="text-2xl font-bold font-outfit">TASO</span>
             <span className="text-2xl font-bold font-outfit">CDFU</span>
             <span className="text-2xl font-bold font-outfit">Ministry of Health</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
