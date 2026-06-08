import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, ChevronUp } from 'lucide-react';
import { boardOfDirectors, founderMembers, leadershipPhotoStories } from '../data/organization';

const About = ({ t }) => {
  const [activeSubSection, setActiveSubSection] = useState('leadership');
  const getAssetPath = (image) => '/assets/' + image.split('/').map(encodeURIComponent).join('/');
import { Award, Eye, Heart, User, ChevronUp } from 'lucide-react';
import { Award, ChevronUp, Eye, Heart, Users } from 'lucide-react';
import { Eye, Heart, ChevronUp } from 'lucide-react';
import { boardOfDirectors, founderMembers, leadershipPhotoStories } from '../data/organization';
import { founders, boardOfDirectors } from '../data/leadership';
import { Eye, Heart, ChevronUp, GraduationCap, Quote, Camera } from 'lucide-react';
import { imageAssets } from '../data/siteAssets';

const getAssetPath = (image) =>
  '/assets/' + image.split('/').map(encodeURIComponent).join('/');

const FALLBACK_LEADER_IMAGES = [
  'leadership/grace.png',
  'info_gathering/WhatsApp Image 2026-05-11 at 19.30.26.jpeg',
  'district_meeting/WhatsApp Image 2026-05-11 at 19.29.41.jpeg',
  'hero-image.png',
  'leadership.png'
];

const getInitials = (name = '') =>
  name
    .replace(/\(.*?\)|Rev\.?|Fr\.?/gi, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

const colorForName = (name = '') => {
  const palette = [
    'from-primary to-pink-500',
    'from-secondary to-indigo-500',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-fuchsia-600',
    'from-sky-500 to-blue-600'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return palette[hash % palette.length];
};

  const founderImages = ['leadership/grace.png', 'leadership.png'];
  const boardImages = [
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.45.jpeg',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.23.jpeg',
    'hospital/hospital-visit-1.jpg',
    'others/other_1/WhatsApp Image 2026-05-11 at 19.29.02.jpeg',
    'hero-image.png'
  ];

  const leaders = (t.about.founders || t.about.team || []).map((leader, i) => ({
    ...leader,
    image: getAssetPath(founderImages[i % founderImages.length]),
    fallbackImage: getAssetPath('leadership.png')
  }));
  const boardMembers = (t.about.boardMembers || []).map((member, i) => ({
    ...member,
    image: getAssetPath(boardImages[i % boardImages.length])
const getPersonImage = (name) => {
  if (/dinah|grace/i.test(name)) {
    return getAssetPath('leadership/grace.png');
  }
  return null;
};

const Avatar = ({ name, image, ringClass = '' }) => {
  const initials = getInitials(name) || 'TW';
  const gradient = colorForName(name);
  const [errored, setErrored] = useState(false);

  if (image && !errored) {
    return (
      <img
        src={image}
        onError={() => setErrored(true)}
        alt={name}
        className={`w-full h-full object-cover ${ringClass}`}
      />
    );
  }

  const fallbackLeaderImages = [
    'leadership/grace.png',
    'district_meeting/WhatsApp Image 2026-05-11 at 19.29.41.jpeg',
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.26.jpeg'
  ];
  const getLeaderImage = (leader, index) => {
    if (/dinah|grace/i.test(leader.name)) {
      return getAssetPath('leadership/grace.png');
    }
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-outfit font-extrabold tracking-wide ${ringClass}`}
    >
      <span className="text-4xl md:text-5xl">{initials}</span>
    </div>
  );
};

const About = ({ t }) => {
  const [activeSubSection, setActiveSubSection] = useState('leadership');

  const founders = (t.about.founders || []).map((leader) => ({
    ...leader,
    image: getPersonImage(leader.name)
  }));
  const boardMembers = t.about.boardMembers || [];

  const board = t.about.boardOfDirectors || [];

  const gallerySpotlight = useMemo(() => {
    const folders = ['district_meeting/', 'info_gathering/', 'hospital/', 'others/'];
    const seen = new Set();
    const picks = [];
    folders.forEach((folder) => {
      const folderAssets = imageAssets.filter((asset) => asset.path.startsWith(folder));
      folderAssets.slice(0, 3).forEach((asset) => {
        if (!seen.has(asset.path)) {
          seen.add(asset.path);
          picks.push(asset);
        }
      });
    });
    return picks.slice(0, 12);
  }, []);

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
                                   <User size={14} /> {leader.title}
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
                    <img src="/assets/skilling.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt={t.about.leadershipImageAlt} />
                    <div className="absolute inset-0 bg-gradient-to-r from-teso-dark/70 to-transparent flex items-end p-8 md:p-16">
                      <h2 className="text-primary text-3xl sm:text-5xl md:text-6xl font-bold font-outfit bg-white px-4 sm:px-8 py-2 sm:py-4 uppercase">{t.about.leadershipTitle}</h2>
                    </div>
                  </div>

                  <div className="mb-10">
                     <div className="w-16 h-1 bg-primary mb-4" />
                     <h3 className="text-3xl font-bold font-outfit uppercase tracking-tight">{t.about.foundersTitle || t.about.executiveTeam}</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-20">
                     {leaders.map((leader, i) => (
                       <motion.article
                         key={leader.name}
                         whileHover={{ y: -6 }}
                         className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100"
                       >
                         <div className="relative aspect-[4/5] bg-teso-light">
                            <img
                              src={leader.image}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = leader.fallbackImage;
                              }}
                              className="absolute inset-0 w-full h-full object-cover"
                              alt={leader.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/85 via-teso-dark/10 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3 ${i === 0 ? 'bg-primary' : 'bg-secondary text-teso-dark'}`}>
                                <Award size={14} /> {leader.title}
                              </span>
                              <h4 className="text-3xl font-bold font-outfit uppercase leading-tight">{leader.name}</h4>
                            </div>
                         </div>
                         <div className="p-8">
                            <p className="text-gray-600 text-base leading-relaxed font-inter">
                               {leader.bio}
                            </p>
                         </div>
                       </motion.article>
                     ))}
                     <h3 className="text-3xl font-bold font-outfit uppercase tracking-tight">Founder Members</h3>
                     <p className="text-gray-500 mt-2 max-w-2xl">
                       Our founders and board provide strategic leadership for TEWOYEI through community service, accountability, and practical action.
                     </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10 mb-20">
                    {founders.map((leader) => (
                      <article key={leader.name} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={leader.image} className="w-full h-full object-cover" alt={leader.name} />
                        </div>
                        <div className="p-7">
                          <h4 className="text-2xl font-bold font-outfit uppercase">{leader.name}</h4>
                          <p className="text-primary font-semibold uppercase tracking-wider text-sm mt-1">{leader.role}</p>
                          <p className="text-gray-600 mt-4">{leader.qualification}</p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mb-8">
                    <div className="w-16 h-1 bg-primary mb-4" />
                    <h3 className="text-3xl font-bold font-outfit uppercase tracking-tight">Board of Directors (BOD)</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {boardOfDirectors.map((leader) => (
                      <article key={`${leader.name}-${leader.role}`} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm group">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={leader.image}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={leader.name}
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-bold font-outfit uppercase">{leader.name}</h4>
                          <p className="text-gray-500 font-medium mt-1">{leader.role}</p>
                        </div>
                      </article>
                    ))}
                  {/* Founders */}
                  <div className="mb-12">
                    <div className="w-16 h-1 bg-primary mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold font-outfit uppercase tracking-tight">{t.about.foundersTitle}</h3>
                    <p className="text-gray-500 mt-3 max-w-3xl">{t.about.foundersSubtitle}</p>
                  </div>

                  <div className="space-y-16 mb-24">
                    {founders.map((leader, i) => (
                      <article
                        key={`${leader.name}-${i}`}
                        className="grid md:grid-cols-5 gap-8 md:gap-12 items-start bg-teso-light/60 border border-gray-100 rounded-[2.5rem] p-6 md:p-10"
                      >
                        <div className="md:col-span-2">
                          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl border-4 border-white bg-gray-100">
                            <Avatar name={leader.name} image={leader.image} />
                          </div>
                        </div>
                        <div className="md:col-span-3 space-y-5">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                            {leader.title}
                          </span>
                          <h4 className="text-3xl md:text-4xl font-bold font-outfit text-teso-dark leading-tight">
                            {leader.name}
                          </h4>
                          {leader.qualification && (
                            <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                              <GraduationCap size={22} className="text-secondary shrink-0 mt-1" />
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                  {t.about.qualificationLabel}
                                </p>
                                <p className="text-gray-700 font-semibold">{leader.qualification}</p>
                              </div>
                            </div>
                          )}
                          {leader.bio && (
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-inter">
                              {leader.bio}
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Board of Directors */}
                  <div className="mb-10">
                    <div className="w-16 h-1 bg-secondary mb-4" />
                    <h3 className="text-3xl md:text-4xl font-bold font-outfit uppercase tracking-tight">{t.about.bodTitle}</h3>
                    <p className="text-gray-500 mt-3 max-w-3xl">{t.about.bodSubtitle}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {board.map((member, i) => (
                      <div
                        key={`${member.name}-${i}`}
                        className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                      >
                        <div className="aspect-square overflow-hidden bg-gray-100 relative">
                          <Avatar
                            name={member.name}
                            image={getPersonImage(member.name)}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-widest text-teso-dark shadow">
                            {member.title}
                          </span>
                        </div>
                        <div className="p-5">
                          <h5 className="font-bold font-outfit text-lg text-teso-dark leading-tight">
                            {member.name}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pictures Speak Gallery */}
                  <div className="rounded-[2.5rem] bg-teso-dark text-white p-8 md:p-12 overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                      <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs mb-3">
                          <Camera size={16} /> {t.about.pictureGalleryTitle}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold font-outfit leading-tight">
                          {t.about.pictureGalleryTitle}
                        </h3>
                        <p className="text-gray-300 mt-3">{t.about.pictureGallerySubtitle}</p>
                      </div>
                      <Quote className="text-white/10 hidden md:block" size={80} />
                    </div>

                    {gallerySpotlight.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {gallerySpotlight.map((asset, i) => (
                          <div
                            key={asset.path}
                            className={`relative overflow-hidden rounded-2xl group ${
                              i % 5 === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-square' : 'aspect-square'
                            }`}
                          >
                            <img
                              src={asset.src}
                              alt={asset.title}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {FALLBACK_LEADER_IMAGES.slice(0, 6).map((path) => (
                          <div key={path} className="aspect-square rounded-2xl overflow-hidden">
                            <img src={getAssetPath(path)} alt="TEWOYEI field work" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-teso-light rounded-[3rem] p-8 md:p-10 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                      <div>
                        <div className="w-16 h-1 bg-secondary mb-4" />
                        <h3 className="text-3xl font-bold font-outfit uppercase tracking-tight">{t.about.boardTitle}</h3>
                      </div>
                      <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                        <Users size={18} /> BOD
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {boardMembers.map((member) => (
                        <article key={`${member.name}-${member.title}`} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
                          <div className="relative h-40 bg-teso-dark">
                            <img src={member.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/80 to-transparent" />
                            <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 text-teso-dark text-[10px] font-bold uppercase tracking-widest">
                              {member.title}
                            </span>
                          </div>
                          <div className="p-6">
                            <h4 className="text-xl font-bold font-outfit uppercase text-teso-dark">{member.name}</h4>
                          </div>
                        </article>
                      ))}
                    </div>
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
