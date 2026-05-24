import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, ChevronUp } from 'lucide-react';
import { boardOfDirectors, founderMembers, leadershipPhotoStories } from '../data/organization';

const About = ({ t }) => {
  const [activeSubSection, setActiveSubSection] = useState('leadership');
  const getAssetPath = (image) => '/assets/' + image.split('/').map(encodeURIComponent).join('/');

  const subSections = [
    { id: 'about', label: t.about.tabs.about },
    { id: 'history', label: t.about.tabs.history },
    { id: 'leadership', label: t.about.tabs.leadership }
  ];

  return (
    <div className="pt-20 bg-white min-h-screen">
      <div className="container py-20">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
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
                      <p className="mb-6">{t.about.historyFirst}</p>
                      <p>{t.about.historySecond}</p>
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
                  <div className="relative rounded-[3rem] overflow-hidden mb-16 aspect-[21/9] group">
                    <img src={getAssetPath('leadership.png')} className="absolute inset-0 w-full h-full object-cover opacity-80" alt={t.about.leadershipImageAlt} />
                    <div className="absolute inset-0 bg-gradient-to-r from-teso-dark/70 to-transparent flex items-end p-16">
                      <h2 className="text-primary text-6xl font-bold font-outfit bg-white px-8 py-4 uppercase">{t.about.leadershipTitle}</h2>
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-8 mb-16">
                    <div className="rounded-[3rem] border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
                      <div className="w-16 h-1 bg-primary mb-4" />
                      <h3 className="text-3xl font-bold font-outfit uppercase tracking-tight mb-4">{t.about.executiveTeam}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        TEWOYEI is guided by founder members and a Board of Directors committed to accountable, community-centered leadership.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-4">
                      <div className="rounded-[2rem] bg-primary-light border border-primary/10 p-6">
                        <p className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-2">Founder members</p>
                        <p className="text-4xl font-bold font-outfit">{founderMembers.length}</p>
                      </div>
                      <div className="rounded-[2rem] bg-secondary-light border border-secondary/10 p-6">
                        <p className="text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-2">Board members</p>
                        <p className="text-4xl font-bold font-outfit">{boardOfDirectors.length}</p>
                      </div>
                      <div className="rounded-[2rem] bg-teso-light border border-gray-100 p-6">
                        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">Leadership focus</p>
                        <p className="text-lg font-semibold text-teso-dark">Faith, justice, integrity, and community service</p>
                      </div>
                    </div>
                  </div>

                  <section className="mb-20">
                    <div className="mb-8">
                      <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">Founder Members</span>
                      <h3 className="text-3xl md:text-4xl font-bold font-outfit">The people who started the mission</h3>
                      <p className="text-gray-600 mt-3 max-w-3xl">
                        The founder members continue to shape TEWOYEI through professional training, direct service, and hands-on leadership.
                      </p>
                    </div>

                    <div className="grid xl:grid-cols-2 gap-8">
                      {founderMembers.map((leader) => (
                        <div key={leader.name} className="overflow-hidden rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img src={getAssetPath(leader.image)} className="absolute inset-0 w-full h-full object-cover" alt={leader.imageAlt} />
                            <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/75 via-transparent to-transparent" />
                            <div className="absolute left-6 right-6 bottom-6">
                              <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                Founder member
                              </span>
                              <h4 className="mt-4 text-3xl font-bold font-outfit text-white">{leader.name}</h4>
                              <p className="text-secondary-light">{leader.title}</p>
                            </div>
                          </div>

                          <div className="p-8">
                            <div className="rounded-[2rem] bg-teso-light p-5 border border-gray-100">
                              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">Qualification</p>
                              <p className="text-lg font-semibold text-teso-dark">{leader.qualification}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="grid xl:grid-cols-[0.95fr_1.05fr] gap-8 items-start mb-20">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {leadershipPhotoStories.slice(0, 2).map((story) => (
                        <div key={story.title} className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] shadow-lg">
                          <img src={getAssetPath(story.image)} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/85 via-transparent to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-6">
                            <h4 className="text-2xl font-bold font-outfit text-white">{story.title}</h4>
                            <p className="text-sm text-secondary-light mt-2">{story.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[3rem] bg-white border border-gray-100 shadow-sm p-8 md:p-10">
                      <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">Board of Directors (BOD)</span>
                      <h3 className="text-3xl md:text-4xl font-bold font-outfit">Governance and stewardship</h3>
                      <p className="text-gray-600 mt-3 mb-8">
                        The Board of Directors provides oversight, accountability, and stewardship for TEWOYEI.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {boardOfDirectors.map((member, index) => (
                          <div key={member.name} className="rounded-[2rem] border border-gray-100 bg-teso-light p-5">
                            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white text-primary font-bold mb-4">
                              {index + 1}
                            </span>
                            <h4 className="text-xl font-bold font-outfit text-teso-dark">{member.name}</h4>
                            <p className="text-gray-500 mt-1">{member.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="mb-8">
                      <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">Leadership in Action</span>
                      <h3 className="text-3xl md:text-4xl font-bold font-outfit">Pictures that show the work</h3>
                      <p className="text-gray-600 mt-3 max-w-3xl">
                        These photos highlight the presence, listening, and community engagement behind TEWOYEI leadership.
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      {leadershipPhotoStories.map((story) => (
                        <div key={story.title} className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img src={getAssetPath(story.image)} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/70 via-transparent to-transparent" />
                          </div>
                          <div className="p-6">
                            <h4 className="text-2xl font-bold font-outfit">{story.title}</h4>
                            <p className="text-gray-600 mt-3 leading-relaxed">{story.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
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
