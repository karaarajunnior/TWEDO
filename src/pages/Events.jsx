import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Events = ({ t }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('upcoming');
  const itemsPerPage = 3;

  const eventsData = {
    upcoming: [
      { id: 1, title: 'Annual Women Skilling Workshop', date: 'Oct 15, 2026', time: '09:00 AM', location: 'Amuria District', type: 'Training' },
      { id: 2, title: 'Community SRHR Sensitization', date: 'Nov 02, 2026', time: '10:00 AM', location: 'Kapelebyong', type: 'Community' },
      { id: 3, title: 'Menstrual Hygiene Day Celebrations', date: 'May 28, 2027', time: '08:00 AM', location: 'Okungur Subcounty', type: 'Campaign' }
    ],
    latest: [
      { id: 4, title: 'Youth Entrepreneurship Pitch', date: 'Apr 10, 2026', time: '10:00 AM', location: 'Teso Region', type: 'Workshop' },
      { id: 5, title: 'GBV Awareness Drive', date: 'Mar 25, 2026', time: '09:00 AM', location: 'Orungo', type: 'Advocacy' }
    ],
    completed: [
      { id: 6, title: 'Malaria Prevention Sensitization', date: 'Aug 2023 - Sep 2023', time: 'Various', location: 'Agonga & Airabet', type: 'Health' },
      { id: 7, title: 'Menstrual Cup Distribution', date: 'March 2023 - Sep 2023', time: 'Various', location: '4 Schools in Kapelebyong', type: 'Distribution' },
      { id: 8, title: '16 Days of Activism Campaign', date: 'Dec 2022', time: 'All Day', location: 'Regional', type: 'Campaign' },
      { id: 9, title: 'COVID-19 Impact on GBV Radio Dramas', date: '2021', time: 'Weekly', location: 'Radio Stations', type: 'Media' },
      { id: 10, title: 'Bread Baking & Knitting Training', date: '2020 - 2021', time: 'Routine', location: 'Amuria', type: 'Training' }
    ]
  };

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
      <section className="relative py-32 bg-[#1a1a1a] text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-image.png" alt="Events Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-black/30"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">Events & Campaigns</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium">Stay updated with our ongoing, upcoming, and past community interventions across the Teso sub-region.</p>
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
                Upcoming Events
                {activeTab === 'upcoming' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-xl" />}
             </button>
             <button 
                onClick={() => handleTabChange('latest')}
                className={`py-4 text-xl font-bold font-outfit transition-colors relative ${activeTab === 'latest' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
                Latest Activities
                {activeTab === 'latest' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-xl" />}
             </button>
             <button 
                onClick={() => handleTabChange('completed')}
                className={`py-4 text-xl font-bold font-outfit transition-colors relative ${activeTab === 'completed' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
                Completed projects
                {activeTab === 'completed' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-xl" />}
             </button>
          </div>

          {/* Event List */}
          <div className="space-y-6 mb-12">
            {paginatedEvents.length > 0 ? (
               paginatedEvents.map(event => (
                 <div key={event.id} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-teso-light rounded-2xl flex flex-col items-center justify-center text-primary">
                       <Calendar size={32} className="mb-2" />
                       <span className="text-xs font-bold uppercase tracking-wider">{event.type}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold font-outfit mb-3">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-inter">
                        <span className="flex items-center gap-1"><Calendar size={16}/> {event.date}</span>
                        <span className="flex items-center gap-1"><Clock size={16}/> {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={16}/> {event.location}</span>
                      </div>
                    </div>
                    <button className="btn btn-outline shrink-0">View Details</button>
                 </div>
               ))
            ) : (
              <div className="text-center py-20 text-gray-400 font-medium text-lg">
                 No {activeTab} events found.
               </div>
            )}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
             <div className="flex justify-center border-t border-gray-200 pt-8 mt-12">
               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
             </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Events;
