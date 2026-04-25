import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, FileText, BookOpen } from 'lucide-react';

const Resources = ({ t }) => {
  const [videoIndex, setVideoIndex] = useState(0);

  const videos = t.resources.videos;

  const maxIndex = videos.length - 1;

  return (
    <div className="pt-20 bg-white">
      {/* Page Header */}
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/skilling.png" alt={t.resources.pageTitle} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/70 to-teso-dark/40"></div>
        </div>
        <div className="container relative z-10">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4 block">{t.resources.media}</span>
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">{t.resources.pageTitle}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t.resources.subtitle}</p>
        </div>
      </section>

      {/* Video Resources Slider */}
      <section className="section-padding">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">{t.resources.videoLibrary}</span>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit">{t.resources.educationalVideos}</h2>
              <p className="text-gray-500 mt-2 text-lg">{t.resources.videoIntro}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-400">{videoIndex + 1} / {videos.length}</span>
              <button
                onClick={() => setVideoIndex(prev => prev === 0 ? maxIndex : prev - 1)}
                className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setVideoIndex(prev => prev === maxIndex ? 0 : prev + 1)}
                className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Featured video — large embed */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${videoIndex * 100}%)` }}
              >
                {videos.map((video, i) => (
                  <div key={i} className="w-full shrink-0 px-0 md:px-2">
                    <div className="grid lg:grid-cols-5 gap-8 items-start">
                      {/* Video Embed */}
                      <div className="lg:col-span-3">
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-teso-dark">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      {/* Video Info */}
                      <div className="lg:col-span-2 flex flex-col justify-center">
                        <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-extrabold rounded-full uppercase tracking-widest w-fit mb-4">{video.category}</span>
                        <h3 className="text-2xl md:text-3xl font-bold font-outfit mb-4">{video.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-lg mb-6">{video.description}</p>
                        <a
                          href={`https://youtu.be/${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-fit flex items-center gap-2"
                        >
                          <Play size={18} /> {t.common.watchOnYoutube}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-3 mt-10">
              {videos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setVideoIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${videoIndex === idx ? 'bg-primary w-10' : 'bg-gray-200 w-2.5'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Videos Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <h3 className="text-2xl font-bold font-outfit mb-10">{t.resources.allVideos}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:-translate-y-2 transition-transform"
              >
                <div className="aspect-video relative">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-teso-dark/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer"
                      className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      <Play size={28} className="ml-1" />
                    </a>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-extrabold rounded-full uppercase">{video.category}</span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold font-outfit mb-2">{video.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Resources Placeholder */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold font-outfit">{t.resources.moreComing}</h3>
            <p className="text-gray-500 mt-2">{t.resources.moreComingText}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, ...t.resources.future[0] },
              { icon: BookOpen, ...t.resources.future[1] },
              { icon: Play, ...t.resources.future[2] }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border-2 border-dashed border-gray-200 text-center opacity-60">
                <item.icon size={40} className="text-gray-300 mx-auto mb-4" />
                <h4 className="font-bold font-outfit mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
