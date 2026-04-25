import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';

const CtaBanner = ({ t }) => {
  return (
    <section className="py-20 bg-[var(--secondary)] rounded-[3rem] mx-4 md:mx-10 my-20">
      <div className="container text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-[var(--text-dark)]"
        >
          {t.nav.donate}
        </motion.h2>
        <p className="text-xl text-gray-800 mb-10 max-w-2xl mx-auto">
          Your support directly impacts lives in Teso. Contact us to contribute to our ongoing campaigns.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="https://wa.me/256777676436?text=Hello%20TEWOYEI,%20I%20would%20like%20to%20donate%20to%20your%20campaign." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn bg-[var(--text-dark)] text-white flex items-center gap-3 px-8 py-5 text-lg hover:scale-105 transition-transform"
          >
            <MessageCircle size={24} /> WhatsApp Us to Donate
          </a>
          
          <a 
            href="mailto:tewoyeiuganda@gmail.com?subject=Donation%20Inquiry" 
            className="btn btn-outline border-[var(--text-dark)] text-[var(--text-dark)] flex items-center gap-3 px-8 py-5 text-lg hover:bg-[var(--text-dark)] hover:text-white transition-all"
          >
            <Mail size={24} /> Email Donation Inquiry
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
