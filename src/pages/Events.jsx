import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import { Calendar, MapPin, Clock, PlayCircle } from 'lucide-react';

const Events = ({ t }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('upcoming');
  const itemsPerPage = 3;

  const eventsData = t.events.data;

  const currentList = eventsData[activeTab];
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  
  // Pagination slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = currentList.slice(startIndex, startIndex + itemsPerPage);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset pagination on tab change
  };

  return (
    <div className="pt-20">
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

      <section className="section-padding min-h-[60vh] bg-gray-50">
        <div className="container max-w-5xl">
           
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 mb-10 gap-8">
             <button 
                onClick={() => handleTabChange('upcoming')}
                className={`py-4 text-xl font-bold font-outfit transition-colors relative ${activeTab === 'upcoming' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
                {t.events.tabs.upcoming}
                {activeTab === 'upcoming' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-xl" />}
             </button>
             <button 
                onClick={() => handleTabChange('latest')}
                className={`py-4 text-xl font-bold font-outfit transition-colors relative ${activeTab === 'latest' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
                {t.events.tabs.latest}
                {activeTab === 'latest' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-xl" />}
             </button>
             <button 
                onClick={() => handleTabChange('completed')}
                className={`py-4 text-xl font-bold font-outfit transition-colors relative ${activeTab === 'completed' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
                {t.events.tabs.completed}
                {activeTab === 'completed' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-xl" />}
             </button>
          </div>

          {/* Event List */}
          <div className="space-y-6 mb-12">
            {paginatedEvents.length > 0 ? (
               paginatedEvents.map(event => (
                 <div key={`${event.title}-${event.date}`} className="bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="relative w-full md:w-44 h-52 md:h-36 shrink-0 bg-teso-light rounded-2xl overflow-hidden text-white">
                       <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/85 via-teso-dark/20 to-transparent" />
                       <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider bg-primary px-3 py-1 rounded-full">{event.type}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold font-outfit mb-3">{event.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-inter">
                        <span className="flex items-center gap-1"><Calendar size={16}/> {event.date}</span>
                        <span className="flex items-center gap-1"><Clock size={16}/> {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={16}/> {event.location}</span>
                      </div>
                      {event.videoId && (
                        <a href={`https://youtu.be/${event.videoId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-4">
                          <PlayCircle size={18} /> {t.events.watchCampaign}
                        </a>
                      )}
                    </div>
                    <a href={`mailto:tewoyeiuganda@gmail.com?subject=${encodeURIComponent(event.title)}`} className="btn btn-outline shrink-0 text-center">{t.common.viewDetails}</a>
                 </div>
               ))
            ) : (
              <div className="text-center py-20 text-gray-400 font-medium text-lg">
                 {t.events.noEventsPrefix} {t.events.tabs[activeTab].toLowerCase()} {t.events.noEventsSuffix}
               </div>
            )}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
             <div className="flex justify-center border-t border-gray-200 pt-8 mt-12">
               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} lastLabel={t.events.last} />
             </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Events;
