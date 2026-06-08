import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAssetPath } from '../data/siteAssets';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    
    // Start typing after initial delay
    const startTyping = setTimeout(() => {
      timeoutId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timeoutId);
        }
      }, 70); // typing speed
    }, delay);

    return () => {
      clearTimeout(startTyping);
      clearInterval(timeoutId);
    };
  }, [text, delay]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

const Hero = ({ t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: getAssetPath('hero-image.png'),
      alt: t.hero.slides.womenTraining
    },
    {
      image: getAssetPath('skilling.png'),
      alt: t.hero.slides.youthSkilling
    },
    {
      image: getAssetPath('about-image.png'),
      alt: t.hero.slides.communityOutreach
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-teso-dark pb-32 md:pb-40">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 z-0 bg-teso-dark">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-secondary-dark/60 to-transparent opacity-80"></div>
      </div>

      <div className="container relative z-10 pt-32 lg:pt-40">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight font-outfit min-h-[180px] md:min-h-[250px] lg:min-h-[280px]">
            <TypewriterText text={t.hero.title || "Empowering Women, Transforming Teso."} delay={500} />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2, ease: "easeOut" }} // Delays until typing is somewhat done
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/programs" className="btn btn-primary text-lg px-10">{t.hero.cta_programs}</Link>
            <Link to="/about" className="btn btn-outline text-white border-white text-lg px-10 hover:bg-white hover:text-teso-dark">
              {t.hero.cta_learn}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
