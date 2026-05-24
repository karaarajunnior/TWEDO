import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { imageAssets } from '../data/siteAssets';
import { leadershipPhotos } from '../data/leadership';

const collectionPageSize = 12;

const formatImageTitle = (path) => {
  if (path.includes('district_meeting')) return 'District meeting in action';
  if (path.includes('info_gathering')) return 'Community voices in the field';
  if (path.includes('hospital')) return 'Health service visit';
  if (path.includes('tailoring')) return 'Skilling and livelihood training';
  if (path.includes('bcp')) return 'Building and concrete practice';
  if (path.includes('leadership')) return 'TEWOYEI leadership';
  if (path.includes('others')) return 'Community field moment';
  if (path.includes('health')) return 'Health and dignity outreach';
  if (path.includes('hero') || path.includes('about')) return 'TEWOYEI community work';
  return 'TEWOYEI field photo';
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
    { src: '/assets/district_meeting/WhatsApp%20Image%202026-05-11%20at%2019.29.45.jpeg', ...galleryItems[0] },
    { src: '/assets/info_gathering/WhatsApp%20Image%202026-05-11%20at%2019.30.23.jpeg', ...galleryItems[1] },
    { src: '/assets/hospital/hospital-visit-1.jpg', ...galleryItems[2] },
    { src: '/assets/leadership/grace.png', ...galleryItems[3] },
    { src: '/assets/tailoring-atiira.jpg', ...galleryItems[4] },
    { src: '/assets/bcp-construction1.jpg', ...galleryItems[5] }
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

          <div className="relative h-[560px] mb-20 overflow-hidden rounded-[3rem] shadow-2xl bg-teso-dark">
             {images.map((item, index) => (
               <div
                 key={index}
                 className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${galleryIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
               >
                 <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/80 via-teso-dark/10 to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white">
                    <div className="flex gap-2 mb-4">
                       {item.tags.map(tag => <span key={tag} className="px-3 py-1 bg-primary text-[10px] font-bold rounded-full uppercase">{tag}</span>)}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold font-outfit max-w-3xl">{item.title}</h3>
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
          <div className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">Leadership</span>
                <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark">Leadership in Photos</h3>
                <p className="text-gray-500 mt-2">Founder members and board leadership profiles.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipPhotos.map((member, index) => (
                <motion.article
                  key={`${member.name}-${member.role}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg font-outfit uppercase">{member.name}</h4>
                    <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">{t.gallery.fullCollection}</span>
              <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark">{t.gallery.photoStories}</h3>
              <p className="text-gray-500 mt-2">
                {t.gallery.photoStoriesIntro} Showing {collectionStart + 1}-{Math.min(collectionStart + visibleCollection.length, fullCollection.length)} of {fullCollection.length} images.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCollection.map((item, index) => (
              <motion.div
                key={`${item.src}-${collectionPage}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg aspect-square border-4 border-white"
                className={`group relative rounded-3xl overflow-hidden shadow-lg cursor-zoom-in border-4 border-white bg-white ${index % 7 === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[4/5]'}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/90 via-teso-dark/20 to-transparent flex flex-col justify-end p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teso-dark/85 via-teso-dark/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 min-h-40">
                  <div className="flex flex-wrap gap-2 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
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
