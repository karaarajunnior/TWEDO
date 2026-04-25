import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';

const CtaBanner = ({ t }) => {
  return (
    <section className="py-20 bg-secondary rounded-[3rem] mx-4 md:mx-10 my-20">
      <div className="container text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-white"
        >
          {t.nav.donate}
        </motion.h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t.cta.supportText}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="https://wa.me/256777676436?text=Hello%20TEWOYEI,%20I%20would%20like%20to%20donate%20to%20your%20campaign." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn bg-primary text-white flex items-center gap-3 px-8 py-5 text-lg hover:scale-105 transition-transform"
          >
            <MessageCircle size={24} /> {t.cta.whatsappDonate}
          </a>
          
          <a 
            href="mailto:tewoyeiuganda@gmail.com?subject=Donation%20Inquiry" 
            className="btn btn-outline border-white text-white flex items-center gap-3 px-8 py-5 text-lg hover:bg-white hover:text-secondary transition-all"
          >
            <Mail size={24} /> {t.cta.emailDonation}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
