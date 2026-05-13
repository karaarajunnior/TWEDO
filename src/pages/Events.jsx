import React, { useState, useEffect, useCallback } from 'react';
import Pagination from '../components/Pagination';
import { Calendar, MapPin, Clock, PlayCircle, X, ChevronLeft, ChevronRight, Image } from 'lucide-react';

/* ─── Photo Gallery Modal ─── */
const PhotoGalleryModal = ({ event, onClose, getAssetPath }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = event.photos || [];

  const prev = useCallback(() =>
    setActiveIndex(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() =>
    setActiveIndex(i => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 md:px-8 py-4 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div>
          <h2 className="text-white font-outfit font-bold text-lg md:text-2xl leading-tight">{event.title}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{activeIndex + 1} / {photos.length} photos</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          aria-label="Close gallery"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image */}
      <div
        className="flex-1 flex items-center justify-center relative px-4 md:px-20 min-h-0"
        onClick={e => e.stopPropagation()}
      >
        {/* Prev Arrow */}
        {photos.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-2 md:left-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-primary/80 transition text-white shadow-xl"
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <img
          key={activeIndex}
          src={getAssetPath(photos[activeIndex])}
          alt={`${event.title} - Photo ${activeIndex + 1}`}
          className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
          style={{ maxHeight: 'calc(100vh - 220px)' }}
        />

        {/* Next Arrow */}
        {photos.length > 1 && (
          <button
            onClick={next}
            className="absolute right-2 md:right-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-primary/80 transition text-white shadow-xl"
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div
          className="flex gap-2 md:gap-3 justify-center px-4 py-4 overflow-x-auto shrink-0"
          onClick={e => e.stopPropagation()}
        >
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? 'border-primary scale-110 shadow-[0_0_16px_rgba(233,30,140,0.6)]'
                  : 'border-white/20 opacity-60 hover:opacity-90 hover:border-white/50'
              }`}
            >
              <img
                src={getAssetPath(photo)}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main Events Page ─── */
const Events = ({ t }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [galleryEvent, setGalleryEvent] = useState(null);
  const itemsPerPage = 3;

  const getAssetPath = (image) => {
    if (!image) return '';
    if (image.startsWith('/')) return image;
    // URL-encode each segment so filenames with spaces/parens work in <img src>
    return '/assets/' + image.split('/').map(encodeURIComponent).join('/');
  };

  const eventsData = t.events.data;
  const currentList = eventsData[activeTab];
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = currentList.slice(startIndex, startIndex + itemsPerPage);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (galleryEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [galleryEvent]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-image.png" alt={t.events.pageTitle} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/70 to-secondary-dark/50"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">{t.events.pageTitle}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium">{t.events.subtitle}</p>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding min-h-[60vh] bg-gray-50">
        <div className="container max-w-5xl">

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 mb-10 gap-4 md:gap-8">
            {['upcoming', 'latest', 'completed'].map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-4 text-base md:text-xl font-bold font-outfit transition-colors relative ${
                  activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t.events.tabs[tab]}
                {activeTab === tab && (
                  <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-xl" />
                )}
              </button>
            ))}
          </div>

          {/* Event List */}
          <div className="space-y-6 mb-12">
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map(event => (
                <div
                  key={`${event.title}-${event.date}`}
                  className="bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-44 h-52 md:h-36 shrink-0 bg-teso-light rounded-2xl overflow-hidden text-white">
                    <img
                      src={getAssetPath(event.image)}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/85 via-teso-dark/20 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider bg-primary px-3 py-1 rounded-full">
                      {event.type}
                    </span>
                    {/* Photo count badge */}
                    {event.photos && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold bg-black/60 text-white px-2 py-1 rounded-full">
                        <Images size={12} /> {event.photos.length}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold font-outfit mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">{event.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.impact && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {t.events.impact}: {event.impact}
                        </span>
                      )}
                      {event.partners && (
                        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-dark text-xs font-bold">
                          {t.events.partners}: {event.partners}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-inter">
                      <span className="flex items-center gap-1"><Calendar size={16} /> {event.date}</span>
                      <span className="flex items-center gap-1"><Clock size={16} /> {event.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={16} /> {event.location}</span>
                    </div>
                    {event.videoId && (
                      <a
                        href={`https://youtu.be/${event.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-4"
                      >
                        <PlayCircle size={18} /> {t.events.watchCampaign || t.events.watchVideo}
                      </a>
                    )}
                  </div>

                  {/* Action Button */}
                  {event.photos ? (
                    <button
                      onClick={() => setGalleryEvent(event)}
                      className="btn btn-primary shrink-0 w-full md:w-auto flex items-center justify-center gap-2"
                    >
                      <Images size={16} />
                      View Photos
                    </button>
                  ) : (
                    <a
                      href={`mailto:tewoyeiuganda@gmail.com?subject=${encodeURIComponent(event.title)}`}
                      className="btn btn-outline shrink-0 w-full md:w-auto text-center"
                    >
                      {t.common.viewDetails}
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400 font-medium text-lg">
                {t.events.noEventsPrefix} {t.events.tabs[activeTab].toLowerCase()} {t.events.noEventsSuffix}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center border-t border-gray-200 pt-8 mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                lastLabel={t.events.last}
              />
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Modal */}
      {galleryEvent && (
        <PhotoGalleryModal
          event={galleryEvent}
          onClose={() => setGalleryEvent(null)}
          getAssetPath={getAssetPath}
        />
      )}
    </div>
  );
};

export default Events;
