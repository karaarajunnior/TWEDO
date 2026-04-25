import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, TrendingUp, PlayCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';
import ImpactStats from '../components/ImpactStats';

const Home = ({ t }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  return (
    <div className="bg-white">
      <Hero t={t} />
      <ImpactStats t={t} />

      {/* Featured Testimonials */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit">Lives Transformed</h2>
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
                          "TEWOYEI changed my life. I learned tailoring and now I can support my children and pay their school fees from my own earnings. The support I received was a turning point for my family's future."
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden ring-4 ring-white shadow-lg">
                            <img src={`https://i.pravatar.cc/150?u=beneficiary${i}`} alt="Beneficiary" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">Beneficiary Name {i}</h4>
                            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Kapelebyong District</p>
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
      <section className="section-padding bg-teso-dark text-white rounded-[3rem] mx-4 md:mx-10 my-10 relative overflow-hidden px-6 md:px-16">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-10">
             <div className="max-w-2xl">
               <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Field Stories</span>
               <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 leading-tight">Seeing the <span className="text-secondary">Impact</span> in Motion</h2>
               <p className="text-gray-400 text-lg">
                 Experience the raw energy and dedication of our field teams and beneficiaries. Our video series highlights the daily transformations in Teso.
               </p>
             </div>
             
             {/* Slider Controls */}
             <div className="flex gap-4">
                <button 
                  onClick={() => setVideoIndex(prev => prev === 0 ? 2 : prev - 1)}
                  className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-teso-dark hover:border-secondary transition-all"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={() => setVideoIndex(prev => prev === 2 ? 0 : prev + 1)}
                  className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-teso-dark hover:border-secondary transition-all"
                >
                  <ChevronRight size={28} />
                </button>
             </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden pb-10">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${videoIndex * 33.33}%)` }}
              >
                {[
                  { img: '/assets/skilling.png', title: 'Watch: Tailoring Workshop (Atiira)', dur: '4:20' },
                  { img: '/assets/about-image.png', title: 'Watch: Savings Groups Success', dur: '5:45' },
                  { img: '/assets/hero-image.png', title: 'Watch: Community Outreach Program', dur: '3:12' },
                  { img: '/assets/skilling.png', title: 'Watch: Youth Entrepreneurship Summit', dur: '6:50' },
                  { img: '/assets/about-image.png', title: 'Watch: GBV Awareness Campaign', dur: '8:10' }
                ].map((vid, i) => (
                  <div key={i} className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-4">
                    <motion.div 
                      className="relative aspect-video bg-white/5 rounded-[2.5rem] overflow-hidden group cursor-pointer flex items-center justify-center border border-white/10"
                      whileHover={{ y: -10 }}
                    >
                      <div className={`absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000`} style={{ backgroundImage: `url('${vid.img}')` }}></div>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                      
                      <div className="relative z-10 w-20 h-20 rounded-full bg-secondary/20 backdrop-blur-md flex items-center justify-center border border-secondary/30 group-hover:bg-secondary group-hover:scale-110 transition-all text-secondary group-hover:text-teso-dark">
                        <PlayCircle size={40} className="ml-1" />
                      </div>
                      
                      <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex justify-between items-center">
                        <p className="text-xs md:text-sm font-bold truncate pr-4">{vid.title}</p>
                        <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-lg shrink-0">{vid.dur}</span>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-secondary transition-all duration-700"
                 style={{ width: `${((videoIndex + 1) / 3) * 100}%` }}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Field Activities Slider */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Field Activities</span>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit">Our Work in the Community</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActivityIndex(prev => prev === 0 ? 3 : prev - 1)}
                className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft />
              </button>
              <button 
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
                {[
                  { img: '/assets/skilling.png', title: 'Tailoring Program', loc: 'Atiira' },
                  { img: '/assets/about-image.png', title: 'Savings Groups', loc: 'Kapelebyong' },
                  { img: '/assets/hero-image.png', title: 'Leadership Summit', loc: 'Amuria' },
                  { img: '/assets/skilling.png', title: 'Baker Skills', loc: 'Orungo' }
                ].map((act, i) => (
                  <div key={i} className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-4">
                    <div className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl">
                      <img src={act.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={act.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <span className="px-3 py-1 bg-primary text-[10px] font-bold rounded-full uppercase tracking-widest mb-3 inline-block">{act.loc}</span>
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
          <p className="text-center text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs mb-10">Trusted By Global Partners</p>
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
