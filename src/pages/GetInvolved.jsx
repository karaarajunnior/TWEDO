import React from 'react';
import { Heart, Briefcase, Users, MessageCircle } from 'lucide-react';

const GetInvolved = ({ t }) => {
  const getAssetPath = (image) => '/assets/' + image.split('/').map(encodeURIComponent).join('/');
  const positionImages = [
    'info_gathering/WhatsApp Image 2026-05-11 at 19.30.23.jpeg',
    'tailoring-atiira.jpg',
    'others/other_1/WhatsApp Image 2026-05-11 at 19.29.02.jpeg'
  ];

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
          <div id="donate" className="scroll-mt-28 bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-gray-100 flex md:flex-row flex-col gap-10 items-center mb-16">
            <div className="relative w-full md:w-64 h-56 shrink-0 rounded-[2rem] overflow-hidden shadow-lg bg-primary/10">
              <img src="/assets/health.png" alt={t.getInvolved.donationTitle} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/70 to-transparent" />
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-lg">
                <Heart size={30} />
              </div>
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
            <div id="partner" className="scroll-mt-28 bg-teso-light rounded-[3rem] overflow-hidden border border-gray-100 text-center">
              <div className="relative h-56">
                <img src={getAssetPath('district_meeting/WhatsApp Image 2026-05-11 at 19.29.47.jpeg')} alt={t.getInvolved.partnerTitle} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/70 via-transparent to-transparent" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white flex items-center justify-center text-secondary-dark shadow-xl">
                  <Briefcase size={32} />
                </div>
              </div>
              <div className="p-10 pt-16">
              <h3 className="text-2xl font-bold font-outfit mb-4">{t.getInvolved.partnerTitle}</h3>
              <p className="text-gray-600 font-inter mb-8">{t.getInvolved.partnerText}</p>
              <a
                href="mailto:tewoyeiuganda@gmail.com?subject=Partnership%20Inquiry&body=Hello%20TEWOYEI,%0A%0AI%20would%20like%20to%20discuss%20a%20partnership."
                className="btn btn-outline w-full"
              >
                {t.getInvolved.partnerInquiry}
              </a>
              </div>
            </div>

            {/* Volunteer */}
            <div id="volunteer" className="scroll-mt-28 bg-teso-light rounded-[3rem] overflow-hidden border border-gray-100 text-center">
              <div className="relative h-56">
                <img src={getAssetPath('info_gathering/WhatsApp Image 2026-05-11 at 19.30.44.jpeg')} alt={t.getInvolved.volunteerTitle} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/70 via-transparent to-transparent" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white flex items-center justify-center text-primary shadow-xl">
                  <Users size={32} />
                </div>
              </div>
              <div className="p-10 pt-16">
              <h3 className="text-2xl font-bold font-outfit mb-4">{t.getInvolved.volunteerTitle}</h3>
              <p className="text-gray-600 font-inter mb-8">{t.getInvolved.volunteerText}</p>
              <a href="#volunteer-positions" className="btn btn-outline w-full">{t.getInvolved.applyVolunteer}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Positions Section */}
      <section id="volunteer-positions" className="section-padding scroll-mt-28 bg-gray-50 border-t border-gray-200">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
             <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{t.getInvolved.joinTeam}</span>
             <h2 className="text-4xl md:text-5xl font-bold font-outfit">{t.getInvolved.openPositions}</h2>
             <p className="text-gray-600 font-inter mt-4 max-w-2xl mx-auto">{t.getInvolved.positionsIntro}</p>
          </div>

          <div className="grid gap-6">
             {t.getInvolved.positions.map((position, i) => (
               <div key={position.title} className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/30 transition-colors">
                 <div className="relative w-full md:w-44 h-44 md:h-36 shrink-0 rounded-2xl overflow-hidden bg-teso-light">
                   <img src={getAssetPath(positionImages[i % positionImages.length])} alt={position.title} className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-teso-dark/55 to-transparent" />
                 </div>
                 <div className="flex-1">
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
