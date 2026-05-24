import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Eye, Heart, UserRound, ChevronUp } from 'lucide-react';

const About = ({ t }) => {
  const [activeSubSection, setActiveSubSection] = useState('leadership');
  const getAssetPath = (image) => '/assets/' + image.split('/').map(encodeURIComponent).join('/');

  const fallbackLeaderImages = [
    'leadership/grace.png',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.41.jpeg',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.26.jpeg'
  ];
  const getLeaderImage = (leader, index) => {
    if (/dinah|grace/i.test(leader.name)) {
      return getAssetPath('leadership/grace.png');
    }

    return getAssetPath(fallbackLeaderImages[index % fallbackLeaderImages.length]);
  };

  const leaders = t.about.team.map((leader, i) => ({
    ...leader,
    image: getLeaderImage(leader, i),
    fallbackImage: getAssetPath(fallbackLeaderImages[i % fallbackLeaderImages.length])
  }));
  const boardMembers = t.about.boardMembers || [];

  const subSections = [
    { id: 'about', label: t.about.tabs.about },
    { id: 'history', label: t.about.tabs.history },
    { id: 'leadership', label: t.about.tabs.leadership }
  ];

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Sidebar Layout */}
      <div className="container py-20">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 lg:top-32 z-20 bg-white/95 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-0 pb-3 lg:pb-0">
              <div className="flex items-center justify-between mb-0 border-b border-gray-200 pb-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-outfit uppercase tracking-tighter text-gray-800">{t.about.pageTitle}</h2>
                <ChevronUp className="text-primary stroke-[3]" size={24} />
              </div>
              <nav className="flex flex-wrap lg:flex-col gap-2 lg:gap-0 border-t-2 border-primary pt-3 lg:pt-0">
                {subSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSubSection(section.id)}
                    className={`text-left py-3 px-5 lg:py-6 lg:px-8 text-base lg:text-2xl font-bold font-outfit transition-all border border-gray-200 lg:border-x-0 lg:border-t-0 rounded-full lg:rounded-none relative ${
                      activeSubSection === section.id 
                      ? 'bg-primary text-white lg:bg-gray-50 lg:text-teso-dark lg:border-l-[6px] lg:border-l-primary'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeSubSection === 'about' && (
                <motion.div 
                  key="about"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="bg-teso-light rounded-[3rem] overflow-hidden border border-gray-100 grid lg:grid-cols-[1fr_18rem]">
                    <div className="p-8 md:p-12">
                      <h3 className="text-4xl font-bold font-outfit mb-8">{t.about.introTitle}</h3>
                      <p className="text-xl text-gray-600 leading-relaxed font-inter mb-8">
                        {t.about.intro}
                      </p>
                      <p className="text-lg text-gray-500 leading-relaxed font-inter">
                        {t.about.introSecond}
                      </p>
                    </div>
                    <div className="relative min-h-72 lg:min-h-full">
                      <img src={getAssetPath('info_gathering/WhatsApp Image 2026-05-11 at 19.30.26.jpeg')} alt={t.about.introTitle} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/45 to-transparent" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                       <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                         <Eye size={28} className="text-primary" /> {t.about.visionTitle}
                       </h4>
                       <p className="text-gray-600">{t.about.visionText}</p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                       <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                         <Heart size={28} className="text-primary" /> {t.about.missionTitle}
                       </h4>
                       <p className="text-gray-600">{t.about.missionText}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubSection === 'history' && (
                <motion.div 
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-4xl font-bold font-outfit mb-8 border-l-4 border-primary pl-6 uppercase">{t.about.historyTitle}</h3>
                  <div className="grid lg:grid-cols-[18rem_1fr] gap-8 items-start">
                    <div className="relative h-80 rounded-[2rem] overflow-hidden shadow-xl bg-teso-light">
                      <img src={getAssetPath('district_meeting/WhatsApp Image 2026-05-11 at 19.29.41.jpeg')} alt={t.about.historyTitle} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/55 to-transparent" />
                    </div>
                    <div className="prose prose-xl text-gray-600 font-inter">
                      <p className="mb-6">
                        {t.about.historyFirst}
                      </p>
                      <p>
                        {t.about.historySecond}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubSection === 'leadership' && (
                <motion.div 
                  key="leadership"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Leadership Hero Header */}
                  <div className="relative rounded-[3rem] overflow-hidden mb-16 aspect-[21/9] group">
                    <img src="/assets/skilling.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt={t.about.leadershipImageAlt} />
                    <div className="absolute inset-0 bg-gradient-to-r from-teso-dark/70 to-transparent flex items-end p-16">
                       <h2 className="text-primary text-6xl font-bold font-outfit bg-white px-8 py-4 uppercase">{t.about.leadershipTitle}</h2>
                    </div>
                  </div>

                  <div className="mb-12">
                     <div className="w-16 h-1 bg-primary mb-4" />
                     <h3 className="text-3xl font-bold font-outfit uppercase tracking-tight">{t.about.executiveTeam}</h3>
                     <p className="text-gray-500 mt-3 max-w-2xl">{t.about.leadershipIntro}</p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-20">
                     {leaders.map((leader, i) => (
                       <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
                         <div className="relative h-80">
                               <img
                                 src={leader.image}
                                 onError={(e) => {
                                   e.currentTarget.onerror = null;
                                   e.currentTarget.src = leader.fallbackImage;
                                 }}
                                 className="absolute inset-0 w-full h-full object-cover"
                                 alt={leader.name}
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/80 via-transparent to-transparent" />
                               <div className="absolute bottom-6 left-6 right-6">
                                 <span className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-3">
                                   <UserRound size={14} /> {leader.title}
                                 </span>
                                 <h4 className="text-3xl font-bold font-outfit text-white uppercase">{leader.name}</h4>
                               </div>
                         </div>
                         <div className="p-8">
                           {leader.credential && (
                             <p className="flex items-start gap-3 text-secondary font-bold mb-4">
                               <Award size={20} className="shrink-0 mt-0.5" /> {leader.credential}
                             </p>
                           )}
                           <p className="text-gray-600 leading-relaxed font-inter">
                             {leader.bio}
                           </p>
                         </div>
                       </div>
                     ))}
                  </div>

                  <div className="bg-teso-light rounded-[3rem] p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                      <div>
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">{t.about.boardEyebrow}</span>
                        <h3 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark mt-2">{t.about.boardTitle}</h3>
                      </div>
                      <p className="text-gray-500 max-w-xl">{t.about.boardIntro}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {boardMembers.map((member) => (
                        <div key={`${member.name}-${member.role}`} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">{member.role}</p>
                          <h4 className="text-xl font-bold font-outfit text-teso-dark">{member.name}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default About;
