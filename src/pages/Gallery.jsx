import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = ({ t }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const images = [
    { src: '/assets/tailoring-atiira.jpg', title: t.gallery.atiira, tags: ['Skilling', 'Atiira'] },
    { src: '/assets/tailoring-kapelebyong.jpg', title: t.gallery.kapelebyong, tags: ['Skilling', 'Kapelebyong'] },
    { src: '/assets/bcp-orungo.jpg', title: t.gallery.orungo, tags: ['BCP', 'Orungo'] },
    { src: '/assets/bcp-construction1.jpg', title: 'Construction Training', tags: ['BCP'] },
    { src: '/assets/bcp-construction2.jpg', title: 'Community Project', tags: ['BCP'] },
    { src: '/assets/about-image.png', title: 'Savings Group', tags: ['Community'] }
  ];

  return (
    <div className="pt-20">
      <section className="relative py-32 bg-[#1a1a1a] text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-image.png" alt="Gallery Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-black/30"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">Field Gallery</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Witness the real transformations happening on the ground in the Teso sub-region.
          </p>
        </div>
      </section>

      <section className="section-padding bg-teso-light">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold font-outfit">Featured Highlights</h2>
            <div className="flex gap-3">
               <button 
                 onClick={() => setGalleryIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                 className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
               >
                 <ChevronLeft size={20} />
               </button>
               <button 
                 onClick={() => setGalleryIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                 className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
               >
                 <ChevronRight size={20} />
               </button>
            </div>
          </div>

          <div className="relative h-[500px] mb-20 overflow-hidden rounded-[3rem] shadow-2xl">
             {images.map((item, index) => (
               <div 
                 key={index}
                 className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${galleryIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
               >
                 <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 <div className="absolute bottom-12 left-12 right-12 text-white">
                    <div className="flex gap-2 mb-4">
                       {item.tags.map(tag => <span key={tag} className="px-3 py-1 bg-primary text-[10px] font-bold rounded-full uppercase">{tag}</span>)}
                    </div>
                    <h3 className="text-4xl font-bold font-outfit">{item.title}</h3>
                 </div>
               </div>
             ))}
          </div>

          <div className="text-center mb-16">
             <h3 className="text-2xl font-bold font-outfit text-gray-400 uppercase tracking-widest text-sm">Full Collection</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg aspect-square cursor-zoom-in border-4 border-white"
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="flex gap-2 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                     {item.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-primary text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                         {tag}
                       </span>
                     ))}
                  </div>
                  <h3 className="text-white text-xl font-bold font-outfit transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
