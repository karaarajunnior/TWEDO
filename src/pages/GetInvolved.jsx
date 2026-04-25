import React from 'react';
import { Heart, Briefcase, Users, MessageCircle } from 'lucide-react';

const GetInvolved = ({ t }) => {
  return (
    <div className="pt-20">
      <section className="relative py-32 bg-[#1a1a1a] text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/about-image.png" alt="Get Involved Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-black/30"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">Get Involved</h1>
          <p className="text-xl max-w-2xl text-gray-200 mx-auto font-medium">Join us in making a lasting impact in the Teso sub-region. Here's how you can be part of the change.</p>
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
               <h3 className="text-3xl font-bold font-outfit mb-4">Make a Donation</h3>
               <p className="text-gray-600 font-inter mb-6">Your financial support directly funds our vocational training, health outreach, and vulnerable children programs. Every contribution counts.</p>
               <a 
                  href="https://wa.me/256777676436?text=Hello%20TEWOYEI,%20I%20would%20like%20to%20donate%20to%20your%20campaign." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <MessageCircle size={20} /> Discuss Contribution via WhatsApp
                </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
             {/* Partner */}
            <div className="bg-teso-light rounded-[3rem] p-10 border border-gray-100 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary/20 flex items-center justify-center text-secondary-dark mb-6">
                <Briefcase size={32} />
              </div>
              <h3 className="text-2xl font-bold font-outfit mb-4">Become a Partner</h3>
              <p className="text-gray-600 font-inter mb-8">We collaborate with organizations, government bodies, and corporate sponsors to scale our impact.</p>
              <a href="/contact" className="btn btn-outline w-full">Partner Inquiry</a>
            </div>

            {/* Volunteer */}
            <div className="bg-teso-light rounded-[3rem] p-10 border border-gray-100 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold font-outfit mb-4">Volunteer</h3>
              <p className="text-gray-600 font-inter mb-8">Offer your skills in training, administration, or field work. We welcome passionate individuals to join our team on the ground.</p>
              <a href="/contact" className="btn btn-outline w-full">Apply to Volunteer</a>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Positions Section */}
      <section className="section-padding bg-gray-50 border-t border-gray-200">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
             <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Join Our Team</span>
             <h2 className="text-4xl md:text-5xl font-bold font-outfit">Open Volunteer Positions</h2>
             <p className="text-gray-600 font-inter mt-4 max-w-2xl mx-auto">We are actively looking for passionate people to support our various campaigns on the ground. Check out our open volunteer roles below.</p>
          </div>

          <div className="grid gap-6">
             {/* Position 1 */}
             <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/30 transition-colors">
               <div>
                  <h4 className="text-2xl font-bold font-outfit mb-2">Community Outreach Facilitator</h4>
                  <p className="text-gray-600 text-sm mb-4">Location: Kapelebyong & Amuria Districts | Commitment: Part-time</p>
                  <p className="text-sm text-gray-500 max-w-2xl">Assist in mobilizing local communities, organizing SRHR sensitizations, and monitoring the distribution of menstrual cups in schools.</p>
               </div>
               <a href="mailto:tewoyeiuganda@gmail.com?subject=Application:%20Community%20Outreach%20Facilitator" className="btn btn-outline shrink-0 w-full md:w-auto">Apply Now</a>
             </div>

             {/* Position 2 */}
             <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/30 transition-colors">
               <div>
                  <h4 className="text-2xl font-bold font-outfit mb-2">Vocational Skills Trainer</h4>
                  <p className="text-gray-600 text-sm mb-4">Location: Varied | Commitment: Project-based</p>
                  <p className="text-sm text-gray-500 max-w-2xl">Seeking experts in tailoring, bakery, bricklaying, or hairdressing to lead short-term skill workshops for vulnerable youth and women.</p>
               </div>
               <a href="mailto:tewoyeiuganda@gmail.com?subject=Application:%20Vocational%20Skills%20Trainer" className="btn btn-outline shrink-0 w-full md:w-auto">Apply Now</a>
             </div>

             {/* Position 3 */}
             <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/30 transition-colors">
               <div>
                  <h4 className="text-2xl font-bold font-outfit mb-2">Psychosocial Counselor</h4>
                  <p className="text-gray-600 text-sm mb-4">Location: Regional | Commitment: Part-time / On-call</p>
                  <p className="text-sm text-gray-500 max-w-2xl">Provide trauma counseling and psychosocial support to victims of Gender-Based Violence (GBV) and Orphans/Vulnerable Children (OVCs).</p>
               </div>
               <a href="mailto:tewoyeiuganda@gmail.com?subject=Application:%20Psychosocial%20Counselor" className="btn btn-outline shrink-0 w-full md:w-auto">Apply Now</a>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
