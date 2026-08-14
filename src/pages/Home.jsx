import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, TrendingUp, PlayCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';
import ImpactStats from '../components/ImpactStats';
import { fieldStoryVideos, getAssetPath } from '../data/siteAssets';

const Home = ({ t }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoSectionRef = useRef(null);
  const activitiesContainerRef = useRef(null);

  const localVideos = fieldStoryVideos.map((video, index) => ({
    src: video.src,
    title: video.title || `TEWOYEI Field Story ${index + 1}`,
    label: index === 0 ? 'Community Outreach' : 'Field Story'
  }));

  const testimonials = [
    {
      activity: 'Tailoring & Vocational Training',
      quote: 'TEWOYEI changed my life through the tailoring program. I learned tailoring and now I can support my children and pay their school fees from my own earnings. The support I received was a turning point for my family.',
      name: 'Amoni Beneficiary',
      image: 'activities/tailorig/amoni_tailor2.jpeg',
      location: t.home.kapelebyongDistrict
    },
    {
      activity: 'Bakery & Confectionery Skills',
      quote: 'The bakery skills workshop gave me practical expertise to start a small bread making enterprise. Producing pastries locally has provided steady daily income for my family.',
      name: 'Akello Maria',
      image: 'activities/baking/bakingSkill (1).jpeg',
      location: 'Amuria District'
    },
    {
      activity: 'Sanitary Pad & Menstrual Health',
      quote: 'Learning reusable sanitary pad production restored our confidence and independence. Now I train young adolescent girls to ensure they stay in school comfortably.',
      name: 'Akiteng Grace',
      image: 'activities/training on sanitary pads/sanitaryPadTraining1.jpg',
      location: t.home.kapelebyongDistrict
    },
    {
      activity: 'Community Leadership & Advocacy',
      quote: 'Participating in TEWOYEI leadership sessions empowered women in our community to speak up against domestic violence and engage local leaders directly.',
      name: 'Amoo Sarah',
      image: 'activities/leadership/community leadership.png',
      location: 'Teso Sub-Region'
    },
    {
      activity: 'District Stakeholder Engagement',
      quote: 'Collaborating with district administration through TEWOYEI has helped us address family neglect and ensure local support reaches vulnerable mothers.',
      name: 'Epuwat John',
      image: 'activities/district_meeting/districtmeeting (12).jpeg',
      location: 'Amuria District'
    }
  ];

  const fieldActivities = [
    {
      title: 'Tailoring Program',
      category: 'Atiira',
      description: 'Vocational skills for economic independence',
      image: '/assets/activities/tailorig/TAILORING 1.jpg',
      alt: 'Tailoring Program - Atiira'
    },
    {
      title: 'Leadership Summit',
      category: 'Amuria',
      description: 'Empowering local community leaders',
      image: '/assets/activities/leadership/community_leadership%20(2).jpeg',
      alt: 'Leadership Summit - Amuria'
    },
    {
      title: 'Bakery Skills',
      category: 'Orungo',
      description: 'Entrepreneurship & bread production',
      image: '/assets/activities/baking/bakingSkill%20(8).jpeg',
      alt: 'Bakery Skills - Orungo'
    },
    {
      title: 'Health & Hygiene Training',
      category: 'Kapelebyong',
      description: 'Menstrual health for schoolgirls',
      image: '/assets/activities/training%20on%20sanitary%20pads/sanitaryPadTraining2.jpg',
      alt: 'Health Training - Kapelebyong'
    },
    {
      title: 'District Coordination',
      category: 'District',
      description: 'Policy advocacy with local government',
      image: '/assets/activities/district_meeting/districtmeeting%20(24).jpeg',
      alt: 'District Meeting'
    }
  ];

  // Scroll Autoplay for Field Story Video
  useEffect(() => {
    const sectionNode = videoSectionRef.current;
    if (!sectionNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const vid = sectionNode.querySelector('video');
            if (vid) {
              vid.muted = true; // Auto-mute to bypass browser autoplay restrictions
              vid.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, [videoIndex]);

  const scrollActivities = (direction) => {
    if (activitiesContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      activitiesContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="grid w-[300px] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-gray-100 bg-teso-light shadow-lg sm:w-[440px] md:w-[620px] md:grid-cols-[14rem_1fr] md:rounded-[2.5rem]"
                >
                  <div className="relative min-h-52 overflow-hidden md:min-h-full">
                    <img src={getAssetPath(testimonial.image)} alt={testimonial.activity} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-teso-light/30" />
                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teso-dark md:hidden">TEWOYEI story</div>
                  </div>
                  <div className="relative flex min-h-[300px] flex-col justify-between p-6 sm:p-8">
                    <Quote className="absolute right-6 top-5 text-primary/10" size={64} />
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold uppercase tracking-wider mb-3">
                        {testimonial.activity}
                      </span>
                      <div className="mb-4 flex gap-1 text-secondary" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, star) => <span key={star} className="text-base">★</span>)}
                      </div>
                      <p className="relative z-10 text-base italic leading-relaxed text-gray-700 sm:text-lg">“{testimonial.quote}”</p>
                    </div>
                    <div className="mt-6 border-t border-teso-dark/10 pt-4">
                      <h4 className="font-bold font-outfit text-lg text-teso-dark">{testimonial.name}</h4>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />
            <p className="px-6 pt-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Swipe or scroll horizontally to explore more stories</p>
          </div>
        </div>
      </section>

      {/* Videos Highlight / Field Stories Slider */}
      <section ref={videoSectionRef} className="py-12 md:py-16 bg-teso-dark text-white rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-10 my-10 relative overflow-hidden px-4 md:px-10">
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

      {/* Field Activities — Horizontal Scroll */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
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
            
            {/* Scroll Navigation Buttons & Full Gallery Link */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollActivities('left')}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollActivities('right')}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <a
                href="/gallery"
                className="btn btn-outline text-sm px-5 py-2.5"
              >
                View Gallery →
              </a>
            </div>
          </div>

          {/* Activity Cards Horizontal Scroll Container */}
          <div className="relative -mx-4 px-4">
            <div
              ref={activitiesContainerRef}
              className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2"
            >
              {fieldActivities.map((act, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="group relative w-[280px] sm:w-[340px] md:w-[380px] shrink-0 snap-start rounded-3xl overflow-hidden shadow-lg aspect-[4/5]"
                >
                  <img
                    src={act.image}
                    alt={act.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2 shadow-sm">
                      {act.category}
                    </span>
                    <h4 className="text-white text-xl font-bold font-outfit">{act.title}</h4>
                    <p className="text-white/80 text-xs mt-1 leading-relaxed">{act.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
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
