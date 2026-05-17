import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = ({ t }) => {
  const programs = t.programs.cards || [];

  return (
    <section className="section-padding bg-white overflow-hidden" id="about">
      <div className="container">
        {/* About Sub-section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.about.story}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-8">{t.about.title}</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-inter">
              {t.about.content}
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-primary shrink-0 mt-1" size={24} />
                <span className="text-lg font-semibold text-gray-800">{t.about.vision}</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="text-primary shrink-0 mt-1" size={24} />
                <span className="text-lg font-semibold text-gray-800">{t.about.pillars}</span>
              </div>
            </div>
            <Link to="/about" className="btn btn-outline">{t.hero.cta_learn}</Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] -rotate-3"></div>
            <img 
              src="/assets/about-image.png" 
              alt={t.about.title}
              className="relative rounded-[3rem] shadow-2xl w-full h-[500px] object-cover"
            />
          </motion.div>
        </div>

        {/* Programs Sub-section */}
        <div id="programs">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.programs.ourWork}</span>
            <h2 className="text-4xl font-bold font-outfit">{t.programs.socioEconomicInterventions}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group"
              >
                <div className="h-60 overflow-hidden">
                  <img src={`/assets/${program.img}`} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 font-outfit">{program.title}</h3>
                  <p className="text-gray-600 mb-6 font-inter">{program.desc}</p>
                  <Link to="/programs" className="text-primary font-bold hover:gap-4 transition-all inline-flex items-center gap-2">
                    {t.hero.cta_learn} <i className="fas fa-arrow-right text-xs"></i>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
