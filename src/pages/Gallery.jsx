import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { imageAssets } from '../data/siteAssets';

const collectionPageSize = 12;

const formatImageTitle = (path) => {
  const filename = path.split('/').pop() || path;
  return filename
    .replace(/\.(jpe?g|png|webp)$/i, '')
    .replace(/^WhatsApp Image \d{4}-\d{2}-\d{2} at /, 'Field photo ')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getImageTags = (path) => {
  if (path.includes('district_meeting')) return ['District Meeting', 'Advocacy'];
  if (path.includes('info_gathering')) return ['Information Gathering', 'Field Work'];
  if (path.includes('hospital')) return ['Hospital Visit', 'Health'];
  if (path.includes('tailoring')) return ['Skilling', 'Tailoring'];
  if (path.includes('bcp')) return ['Construction', 'BCP'];
  if (path.includes('health')) return ['Health'];
  if (path.includes('leadership')) return ['Leadership'];
  if (path.includes('others')) return ['Community', 'Field Work'];
  return ['TEWOYEI', 'Gallery'];
};

const Gallery = ({ t }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [collectionPage, setCollectionPage] = useState(0);
  const getAssetPath = (image) => '/assets/' + image.split('/').map(encodeURIComponent).join('/');
  const galleryItems = t.gallery.images;
  const images = [
    { src: '/assets/tailoring-atiira.jpg', ...galleryItems[0] },
    { src: '/assets/tailoring-kapelebyong.jpg', ...galleryItems[1] },
    { src: '/assets/bcp-orungo.jpg', ...galleryItems[2] },
    { src: '/assets/bcp-construction1.jpg', ...galleryItems[3] },
    { src: '/assets/bcp-construction2.jpg', ...galleryItems[4] },
    { src: '/assets/about-image.png', ...galleryItems[5] }
  ];
  const photoStories = [
    {
      image: 'district_meeting/WhatsApp Image 2026-05-11 at 19.29.41.jpeg',
      title: 'Leadership and community dialogue',
      text: 'District-level and community conversations remain central to TEWOYEI advocacy work.'
    },
    {
      image: 'info_gathering/WhatsApp Image 2026-05-11 at 19.30.26.jpeg',
      title: 'Listening in the field',
      text: 'Photos from information gathering sessions show the team staying close to real community concerns.'
    },
    {
      image: 'hospital/hospital-visit-1.jpg',
      title: 'Advocacy through presence',
      text: 'Field visits and service follow-up help turn lived experience into action and response.'
    }
  ];
  const fullCollection = imageAssets.map((asset) => ({
    src: asset.src,
    title: formatImageTitle(asset.path),
    tags: getImageTags(asset.path)
  }));
  const totalCollectionPages = Math.ceil(fullCollection.length / collectionPageSize);
  const collectionStart = collectionPage * collectionPageSize;
  const visibleCollection = fullCollection.slice(collectionStart, collectionStart + collectionPageSize);

  const previousCollectionPage = () => {
    setCollectionPage(prev => (prev === 0 ? totalCollectionPages - 1 : prev - 1));
  };

  const nextCollectionPage = () => {
    setCollectionPage(prev => (prev === totalCollectionPages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-20">
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-image.png" alt="Gallery Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/70 to-secondary-dark/50"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">{t.gallery.pageTitle}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-teso-light">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold font-outfit">{t.gallery.featuredHighlights}</h2>
            <div className="flex gap-3">
               <button
                 type="button"
                 onClick={() => setGalleryIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                 className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
               >
                 <ChevronLeft size={20} />
               </button>
               <button
                 type="button"
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
                 <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/90 via-transparent to-transparent" />
                 <div className="absolute bottom-12 left-12 right-12 text-white">
                    <div className="flex gap-2 mb-4">
                       {item.tags.map(tag => <span key={tag} className="px-3 py-1 bg-primary text-[10px] font-bold rounded-full uppercase">{tag}</span>)}
                    </div>
                    <h3 className="text-4xl font-bold font-outfit">{item.title}</h3>
                 </div>
               </div>
             ))}
          </div>

          <div className="mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">Photo stories</span>
            <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark">Pictures that speak for themselves</h3>
            <p className="text-gray-500 mt-3 max-w-3xl">
              These selected images add context to the field gallery by showing leadership, listening, and direct community engagement.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {photoStories.map((story) => (
              <div key={story.title} className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={getAssetPath(story.image)} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold font-outfit">{story.title}</h4>
                  <p className="text-gray-600 mt-3 leading-relaxed">{story.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">{t.gallery.fullCollection}</span>
              <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark">All Field Images</h3>
              <p className="text-gray-500 mt-2">
                Showing {collectionStart + 1}-{Math.min(collectionStart + visibleCollection.length, fullCollection.length)} of {fullCollection.length} images from assets.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-400">{collectionPage + 1} / {totalCollectionPages}</span>
              <button
                type="button"
                onClick={previousCollectionPage}
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Previous gallery page"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextCollectionPage}
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Next gallery page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCollection.map((item, index) => (
              <motion.div
                key={`${item.src}-${collectionPage}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg aspect-square border-4 border-white"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/90 via-teso-dark/20 to-transparent flex flex-col justify-end p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                     {item.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-primary text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                         {tag}
                       </span>
                     ))}
                  </div>
                  <h3 className="text-white text-xl font-bold font-outfit max-w-sm">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              type="button"
              onClick={previousCollectionPage}
              className="btn btn-outline flex items-center gap-2"
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <span className="text-sm font-bold text-gray-400">{collectionPage + 1} / {totalCollectionPages}</span>
            <button
              type="button"
              onClick={nextCollectionPage}
              className="btn btn-primary flex items-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
