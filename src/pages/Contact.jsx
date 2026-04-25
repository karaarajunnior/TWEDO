import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = ({ t }) => {
  return (
    <div className="pt-20">
      <section className="relative py-32 bg-[#1a1a1a] text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-image.png" alt="Contact Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-black/30"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">We'd love to hear from you. Reach out for partnerships, inquiries, or support.</p>
        </div>
      </section>

      <section className="section-padding bg-teso-light relative">
        <div className="absolute top-0 w-full h-1/2 bg-primary"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-teso-dark text-white rounded-[3rem] p-12 shadow-2xl"
            >
              <h3 className="text-3xl font-bold font-outfit mb-8 pb-8 border-b border-white/10">Get in Touch</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex gap-6">
                  <div className="mt-1 text-secondary"><MapPin size={28} /></div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-300">Headquarters</h5>
                    <p className="text-gray-400">Amuria / Kapelebyong District<br/>Teso Sub-Region, Uganda</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="mt-1 text-secondary"><Phone size={28} /></div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-300">Call Us</h5>
                    <p className="text-gray-400">+256 777 676 436<br/>+256 789 789 806</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="mt-1 text-secondary"><Mail size={28} /></div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-300">Email</h5>
                    <p className="text-secondary break-all">tewoyeiuganda@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                <h5 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-2">Project Coordinator</h5>
                <p className="font-outfit text-xl font-bold mb-1">Among Dinah Grace</p>
                <a href="mailto:dinahgraceabel@gmail.com" className="text-secondary text-sm hover:underline">dinahgraceabel@gmail.com</a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100"
            >
              <h3 className="text-3xl font-bold font-outfit mb-8">Send a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 ml-2">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 ml-2">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 ml-2">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 ml-2">Message</label>
                  <textarea rows="5" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="How can we collaborate?"></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full py-4 text-lg flex justify-center items-center gap-2">
                  Send Message <Send size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
