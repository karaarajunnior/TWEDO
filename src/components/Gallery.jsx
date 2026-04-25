import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ t }) => {
  const images = [
    { src: 'tailoring-atiira.jpg', title: t.gallery.atiira },
    { src: 'tailoring-kapelebyong.jpg', title: t.gallery.kapelebyong },
    { src: 'bcp-orungo.jpg', title: t.gallery.orungo },
    { src: 'bcp-construction1.jpg', title: 'Construction Training' },
    { src: 'bcp-construction2.jpg', title: 'Community Project' },
    { src: 'hero-image.png', title: 'Teso Region' }
  ];

  return (
    <section className="section-padding bg-[var(--bg-muted)]" id="gallery">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-[var(--primary)] font-bold uppercase tracking-widest text-sm mb-4 block">Our Gallery</span>
          <h2 className="text-4xl font-bold font-outfit">{t.gallery.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-md group border-4 border-white"
            >
              <img 
                src={`/assets/${img.src}`} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-bold">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
