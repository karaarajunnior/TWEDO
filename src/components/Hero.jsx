import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

// Picked from real project images across different activity categories for variety
const HERO_SLIDES = [
  {
    src: '/assets/activities/leadership/community%20leadership.png',
    alt: 'TEWOYEI community leadership session'
  },
  {
    src: '/assets/activities/leadership/activism.png',
    alt: 'TEWOYEI activism campaign'
  },
  {
    src: '/assets/activities/training%20on%20sanitary%20pads/sanitaryPadTraining1.jpg',
    alt: 'TEWOYEI health training session'
  },
  {
    src: '/assets/activities/tailorig/amoni_tailor2.jpeg',
    alt: 'TEWOYEI tailoring and vocational skills'
  },
  {
    src: '/assets/activities/leadership/lc3%20launch.png',
    alt: 'TEWOYEI community launch event'
  },
  {
    src: '/assets/activities/info_gathering/info1%20(1).jpeg',
    alt: 'TEWOYEI field information gathering'
  }
];

const SLIDE_DURATION = 5000; // ms each slide stays
const FADE_DURATION = 1.5;   // seconds for crossfade

const Hero = ({ t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" style={{ background: '#0f1e3a' }}>

      {/* ── Sliding Background Images (Ken Burns) ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={HERO_SLIDES[currentSlide].src}
            alt={HERO_SLIDES[currentSlide].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: FADE_DURATION, ease: 'easeInOut' },
              scale: { duration: SLIDE_DURATION / 1000 + FADE_DURATION, ease: 'linear' }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </AnimatePresence>

        {/* Multi-layer overlay for readable text over transparent images */}
        {/* Layer 1: dark navy base — keeps background very transparent */}
        <div className="absolute inset-0 bg-[#0f1e3a]/60" />
        {/* Layer 2: gradient from bottom so content area is clearer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e3a] via-[#0f1e3a]/30 to-transparent" />
        {/* Layer 3: very subtle left-side darkening to help left-aligned text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e3a]/50 via-transparent to-transparent" />
      </div>

      {/* ── Hero Content — centered ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-32 text-center flex flex-col items-center">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } }
          }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow tag */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 backdrop-blur-sm text-primary text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Teso Sub-Region, Uganda
          </motion.div>

          {/* Main Heading — sensible size, centered */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
            className="font-outfit font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6 max-w-3xl"
          >
            {t.hero.title || 'Empowering Women,\nTransforming Teso.'}
          </motion.h1>

          {/* Thin accent rule */}
          <motion.div
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
            className="h-0.5 w-16 rounded-full bg-primary mb-6 origin-center"
          />

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
            className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            {t.hero.subtitle || 'A women-led initiative dedicated to social, economic, and political transformation in Uganda.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full"
          >
            <Link
              to="/programs"
              className="btn btn-primary text-sm md:text-base px-8 py-3.5 shadow-[0_8px_30px_rgba(233,30,140,0.35)] hover:shadow-[0_8px_40px_rgba(233,30,140,0.55)] transition-all duration-300"
            >
              {t.hero.cta_programs || 'Our Programs'}
            </Link>
            <Link
              to="/about"
              className="btn bg-white/10 backdrop-blur-md border border-white/25 text-white text-sm md:text-base px-8 py-3.5 hover:bg-white hover:text-[#0f1e3a] transition-all duration-300"
            >
              {t.hero.cta_learn || 'Learn More'}
            </Link>
          </motion.div>
        </motion.div>

        {/* Slide Dots */}
        <div className="flex gap-2 mt-14">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-white transition-colors duration-200 focus:outline-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.button>

      {/* ── Brand accent bottom line ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-[3px] z-20"
        style={{ background: 'linear-gradient(90deg, #e91e8c 0%, #1565C0 100%)' }}
      />
    </section>
  );
};

export default Hero;
