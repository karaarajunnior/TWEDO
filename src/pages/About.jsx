import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Heart, Users, ChevronRight, ChevronUp } from 'lucide-react';

const About = ({ t }) => {
  const [activeSubSection, setActiveSubSection] = useState('leadership');

  const leaders = [
    {
      name: "Angela Ahrendts",
      title: "Board Chair",
      image: "/assets/hero-image.png",
      bio: "Angela Ahrendts DBE was most recently Senior Vice President, Apple Retail based in Cupertino, CA. During her five years with Apple, she integrated the company's physical and digital businesses to create a seamless customer journey for over a billion visitors a year. Under her leadership, she redesigned the stores, recrafted the roles for 70,000 employees globally, and reimagined the retail experience. Before Apple, Angela was Chief Executive Officer of Burberry Group plc for nearly nine years, where she led the 150-year-old British fashion house through a period of phenomenal global growth."
    },
    {
      name: "Among Dinah Grace",
      title: "Project Coordinator",
      image: "/assets/hero-image.png",
      bio: "A dedicated leader in community transformation, Dinah Grace oversees the strategic implementation of TEWOYEI's field operations. With years of experience in grass-roots mobilization in the Teso sub-region, she ensures that every intervention—from SRHR sensitizations to vocational skilling—reaches the most vulnerable women and youth."
    }
  ];

  const subSections = [
    { id: 'about', label: 'ABOUT US' },
    { id: 'history', label: 'OUR HISTORY' },
    { id: 'leadership', label: 'OUR LEADERSHIP' }
  ];

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Sidebar Layout */}
      <div className="container py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-0 border-b border-gray-200 pb-4">
                <h2 className="text-4xl font-bold font-outfit uppercase tracking-tighter text-gray-800">Who We Are</h2>
                <ChevronUp className="text-primary stroke-[3]" size={24} />
              </div>
              <nav className="flex flex-col border-t-2 border-primary">
                {subSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSubSection(section.id)}
                    className={`text-left py-6 px-8 text-2xl font-bold font-outfit transition-all border-b border-gray-200 relative ${
                      activeSubSection === section.id 
                      ? 'bg-gray-50 text-gray-900 border-l-[6px] border-l-primary' 
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
                  <div className="bg-teso-light rounded-[3rem] p-12 border border-gray-100">
                    <h3 className="text-4xl font-bold font-outfit mb-8">About Us</h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-inter mb-8">
                      TEWOYEI stands on three pillars of faith, justice and integrity with a major objective of fronting the needs of the less privileged in the society for social, economic and political transformation.
                    </p>
                    <p className="text-lg text-gray-500 leading-relaxed font-inter">
                      We are a women-led organization dedicated to empowering communities through charitable and community-based interventions focusing on women and youths for sustainable development.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                       <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                         <Eye size={28} className="text-primary" /> Vision
                       </h4>
                       <p className="text-gray-600">A community free from injustice.</p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                       <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                         <Heart size={28} className="text-primary" /> Mission
                       </h4>
                       <p className="text-gray-600">To provide charitable and community-based interventions focusing on women and youths for sustainable development.</p>
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
                  <h3 className="text-4xl font-bold font-outfit mb-8 border-l-4 border-primary pl-6 uppercase">Our History</h3>
                  <div className="prose prose-xl text-gray-600 font-inter">
                    <p className="mb-6">
                      Founded in 2018, TEWOYEI started as a collective of women organized in savings groups in the Teso sub-region of Uganda. 
                    </p>
                    <p>
                      Recognizing that their challenges—family neglect, domestic violence, and lack of essential resources—needed a structural solution, they transformed their initiative into a Community Based Organization to front the needs of the less privileged.
                    </p>
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
                    <img src="/assets/skilling.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Leadership" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-end p-16">
                       <h2 className="text-white text-6xl font-bold font-outfit bg-white px-8 py-4 text-black uppercase">Our Leadership</h2>
                    </div>
                  </div>

                  <div className="mb-20">
                     <div className="w-16 h-1 bg-primary mb-4" />
                     <h3 className="text-3xl font-bold font-outfit uppercase tracking-tight">Our Executive Team</h3>
                  </div>

                  <div className="space-y-24">
                     {leaders.map((leader, i) => (
                       <div key={i} className="grid md:grid-cols-3 gap-12 items-start">
                         <div className="md:col-span-1">
                            <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 shadow-lg border border-gray-100">
                               <img src={leader.image} className="w-full h-full object-cover" alt={leader.name} />
                            </div>
                            <h4 className="text-2xl font-bold font-outfit uppercase">{leader.name}</h4>
                            <p className="text-gray-500 font-medium">{leader.title}</p>
                         </div>
                         <div className="md:col-span-2">
                            <p className="text-gray-600 text-lg leading-relaxed font-inter">
                               {leader.bio}
                            </p>
                         </div>
                       </div>
                     ))}
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
