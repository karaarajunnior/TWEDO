import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ t }) => {
  const titles = t.gallery.componentImages;
  const images = [
    { src: 'tailoring-atiira.jpg', title: titles[0] },
    { src: 'tailoring-kapelebyong.jpg', title: titles[1] },
    { src: 'bcp-orungo.jpg', title: titles[2] },
    { src: 'bcp-construction1.jpg', title: titles[3] },
    { src: 'bcp-construction2.jpg', title: titles[4] },
    { src: 'hero-image.png', title: titles[5] }
  ];

  return (
    <section className="section-padding bg-teso-light" id="gallery">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.gallery.ourGallery}</span>
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
              <div className="absolute inset-0 bg-teso-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
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
