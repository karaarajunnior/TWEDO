import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { imageAssets, getAssetPath } from '../data/siteAssets';

const fieldPhotoPrefixes = [
  'activities/district_meeting/', 'activities/info_gathering/', 'activities/hospital/',
  'activities/leadership/', 'activities/tailorig/', 'activities/training on sanitary pads/',
  'activities/malaria awareness/', 'activities/baking/', 'activities/construction/',
  'activities/others/', 'others/'
];

const galleryExcludePrefixes = ['icons and logo/', 'leadership/board/'];

const galleryStories = [
  {
    match: (path) => path.includes('district_meeting'),
    title: 'District leadership engagement',
    caption: 'Community leaders and partners gathered around shared accountability.',
    tags: ['District Meeting', 'Advocacy']
  },
  {
    match: (path) => path.includes('info_gathering'),
    title: 'Listening in the community',
    caption: 'Field teams documenting voices, needs, and lived realities.',
    tags: ['Information Gathering', 'Field Work']
  },
  {
    match: (path) => path.includes('hospital'),
    title: 'Hospital visit documentation',
    caption: 'Health service realities captured during TEWOYEI field advocacy.',
    tags: ['Hospital Visit', 'Health']
  },
  {
    match: (path) => path.includes('tailoring') || path.includes('tailorig'),
    title: 'Skilling for livelihood',
    caption: 'Women and youth building practical skills for income and dignity.',
    tags: ['Skilling', 'Tailoring']
  },
  {
    match: (path) => path.includes('bcp'),
    title: 'Building and concrete practice',
    caption: 'Hands-on training opening new livelihood pathways.',
    tags: ['Construction', 'BCP']
  },
  {
    match: (path) => path.includes('baking'),
    title: 'Bakery and Pastry Skilling',
    caption: 'Equipping youth and women with practical baking skills.',
    tags: ['Skilling', 'Bakery']
  },
  {
    match: (path) => path.includes('health'),
    title: 'Health and hygiene outreach',
    caption: 'Community health work focused on prevention, care, and awareness.',
    tags: ['Health']
  },
  {
    match: (path) => path.includes('leadership'),
    title: 'Leadership profile',
    caption: 'The people guiding TEWOYEI work in the community.',
    tags: ['Leadership']
  },
  {
    match: (path) => path.includes('others'),
    title: 'Community field moment',
    caption: 'Every image is part of TEWOYEI work with families and communities.',
    tags: ['Community', 'Field Work']
  }
];
const formatImageTitle = (path) => {
  const filename = path.split('/').pop() || path;
  return filename
    .replace(/\.(jpe?g|png|webp)$/i, '')
    .replace(/^WhatsApp Image \d{4}-\d{2}-\d{2} at /, 'Field photo ')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getImageStory = (path) => galleryStories.find((story) => story.match(path)) || {
  title: 'TEWOYEI field story',
  caption: 'A moment from TEWOYEI community work in the Teso sub-region.',
  tags: ['TEWOYEI', 'Gallery']
};

const Gallery = ({ t }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activePhoto, setActivePhoto] = useState(null);
  const [isNearCollectionEnd, setIsNearCollectionEnd] = useState(false);
  const collectionStripRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, startLeft: 0 });
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

  const fullCollection = imageAssets
    .filter((asset) => (
      fieldPhotoPrefixes.some((prefix) => asset.path.startsWith(prefix))
      && !galleryExcludePrefixes.some((prefix) => asset.path.startsWith(prefix))
    ))
    .map((asset) => ({
    src: asset.src,
    path: asset.path,
    ...getImageStory(asset.path)
  }));

  const updateCollectionEnd = () => {
    const strip = collectionStripRef.current;
    if (strip) setIsNearCollectionEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 32);
  };

  const onCollectionWheel = (event) => {
    const strip = collectionStripRef.current;
    if (!strip || !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    strip.scrollLeft += event.deltaY;
  };

  const onCollectionPointerDown = (event) => {
    if (event.pointerType !== 'mouse') return;
    const strip = collectionStripRef.current;
    if (!strip) return;
    dragState.current = { active: true, startX: event.clientX, startLeft: strip.scrollLeft };
    strip.setPointerCapture?.(event.pointerId);
  };

  const onCollectionPointerMove = (event) => {
    const strip = collectionStripRef.current;
    if (!strip || !dragState.current.active) return;
    strip.scrollLeft = dragState.current.startLeft - (event.clientX - dragState.current.startX);
  };

  const onCollectionPointerUp = () => { dragState.current.active = false; };

  return (
    <div className="pt-20">
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-image.png" alt="Gallery Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/70 to-secondary-dark/50"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">{t.gallery.pageTitle}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">{t.gallery.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-teso-light">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold font-outfit">{t.gallery.featuredHighlights}</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setGalleryIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setGalleryIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
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
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary text-[10px] font-bold rounded-full uppercase">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-4xl font-bold font-outfit">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">Photo stories</span>
            <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark">Pictures that capture the unsaid</h3>
            <p className="text-gray-500 mt-3 max-w-3xl">
              Seec direct community engagement.
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
              <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark">{t.gallery.photoStories}</h3>
              <p className="text-gray-500 mt-2">
                {fullCollection.length} images from the field.
              </p>
            </div>
          </div>

          <div className="relative -mx-6">
            <div
              ref={collectionStripRef}
              onScroll={updateCollectionEnd}
              onWheel={onCollectionWheel}
              onPointerDown={onCollectionPointerDown}
              onPointerMove={onCollectionPointerMove}
              onPointerUp={onCollectionPointerUp}
              onPointerCancel={onCollectionPointerUp}
              className="scrollbar-none flex gap-6 overflow-x-auto px-6 pb-5 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            >
            {fullCollection.map((item, index) => (
              <motion.div
                key={item.src}
                onClick={() => setActivePhoto(item)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="group relative w-[260px] sm:w-[300px] md:w-[340px] shrink-0 snap-start rounded-3xl overflow-hidden shadow-lg cursor-zoom-in border-4 border-white aspect-square"
                aria-label={`Open ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/90 via-teso-dark/20 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white text-lg font-bold font-outfit leading-snug">{item.title}</h3>
                  <p className="text-white/80 text-xs mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.caption}</p>
                </div>
              </motion.div>
            ))}
            </div>
            {!isNearCollectionEnd && <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-teso-light via-teso-light/75 to-transparent" />}
          </div>
        </div>
      </section>

      {activePhoto && (
        <div className="fixed inset-0 z-[1200] bg-teso-dark/95 p-4 md:p-10 flex items-center justify-center" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-teso-dark transition-all"
            aria-label="Close photo"
          >
            <X size={24} />
          </button>
          <div className="max-w-6xl w-full">
            <img src={activePhoto.src} alt={activePhoto.title} className="w-full max-h-[78vh] object-contain rounded-3xl shadow-2xl bg-black" />
            <div className="mt-5 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {activePhoto.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary text-[10px] font-bold rounded-full uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <h3 className="text-3xl font-bold font-outfit">{activePhoto.title}</h3>
              <p className="text-white/70 mt-2">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
