import React from 'react';
import { Heart, Briefcase, Users, MessageCircle } from 'lucide-react';

const GetInvolved = ({ t }) => {
  return (
    <div className="pt-20">
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/about-image.png" alt={t.getInvolved.pageTitle} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/70 to-secondary-dark/50"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">{t.getInvolved.pageTitle}</h1>
          <p className="text-xl max-w-2xl text-secondary-light mx-auto font-medium">{t.getInvolved.subtitle}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-5xl">
          {/* Donate */}
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-gray-100 flex md:flex-row flex-col gap-10 items-center mb-16">
            <div className="w-24 h-24 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Heart size={40} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-3xl font-bold font-outfit mb-4">{t.getInvolved.donationTitle}</h3>
               <p className="text-gray-600 font-inter mb-6">{t.getInvolved.donationText}</p>
               <a 
                  href="https://wa.me/256777676436?text=Hello%20TEWOYEI,%20I%20would%20like%20to%20donate%20to%20your%20campaign." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <MessageCircle size={20} /> {t.getInvolved.whatsappDonate}
                </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
             {/* Partner */}
            <div className="bg-teso-light rounded-[3rem] p-10 border border-gray-100 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary/20 flex items-center justify-center text-secondary-dark mb-6">
                <Briefcase size={32} />
              </div>
              <h3 className="text-2xl font-bold font-outfit mb-4">{t.getInvolved.partnerTitle}</h3>
              <p className="text-gray-600 font-inter mb-8">{t.getInvolved.partnerText}</p>
              <a href="/contact" className="btn btn-outline w-full">{t.getInvolved.partnerInquiry}</a>
            </div>

            {/* Volunteer */}
            <div className="bg-teso-light rounded-[3rem] p-10 border border-gray-100 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold font-outfit mb-4">{t.getInvolved.volunteerTitle}</h3>
              <p className="text-gray-600 font-inter mb-8">{t.getInvolved.volunteerText}</p>
              <a href="/contact" className="btn btn-outline w-full">{t.getInvolved.applyVolunteer}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Positions Section */}
      <section className="section-padding bg-gray-50 border-t border-gray-200">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
             <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.getInvolved.joinTeam}</span>
             <h2 className="text-4xl md:text-5xl font-bold font-outfit">{t.getInvolved.openPositions}</h2>
             <p className="text-gray-600 font-inter mt-4 max-w-2xl mx-auto">{t.getInvolved.positionsIntro}</p>
          </div>

          <div className="grid gap-6">
             {t.getInvolved.positions.map((position) => (
               <div key={position.title} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/30 transition-colors">
                 <div>
                    <h4 className="text-2xl font-bold font-outfit mb-2">{position.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{position.meta}</p>
                    <p className="text-sm text-gray-500 max-w-2xl">{position.description}</p>
                 </div>
                 <a href={`mailto:tewoyeiuganda@gmail.com?subject=${encodeURIComponent(position.subject)}`} className="btn btn-outline shrink-0 w-full md:w-auto">{t.common.applyNow}</a>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
