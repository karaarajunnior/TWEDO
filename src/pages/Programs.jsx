import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Hammer, HeartPulse, GraduationCap, CheckCircle, Target as TargetIcon, ArrowRight, AlertTriangle, ListChecks } from 'lucide-react';

const Programs = ({ t }) => {
  const objectives = [
    "To enhance good governance through lobbying for quality public policies and effective service delivery",
    "To empower communities to end Gender Based Violence and child marriage",
    "To empower women and encourage them to engage in active leadership at different capacities in the society",
    "To promote fundamental human rights",
    "Support victims of war, gender-based violence, human torture, natural calamities, Orphans and Vulnerable Children among others (OVCs)",
    "To popularize the national sexuality education frame work in schools and various communities",
    "To establish child health clubs for advocacy and raising the voice of the marginalized adolescent girls",
    "To partner with other organizations and government in promoting the rights of the girl child."
  ];

  const thematicAreas = [
    "Women and youth empowerment on livelihood and sustainability.",
    "Advocacy and Human rights",
    "Cross cutting issues (GBV, Health, OVCs, PLWDS, Climate and Environment, PLWHIV/AIDS, Widows).",
    "Psychosocial support.",
    "Sexual Reproductive Health and Rights."
  ];

  const currentActivities = [
    "Community engagements and sensitization on GBV",
    "Community and school engagements on Menstrual cups and SRHR",
    "District engagement on CLM in Kapelebyong district in 8 Health facilities.",
    "Skilling of the youth and vulnerable women (tailoring, building and concrete practice, sweater making, knitting, hairdressing, beading, bakery)",
    "Trainings on mind set change for both youth and parents",
    "Guidance and counseling",
    "Support to the OVCs",
    "Sexual Reproductive health training",
    "Business planning and entrepreneurship training",
    "Radio dramas (focusing on sensitization of the community on the impact of Covid 19 especially how it has contributed to gender base violence)",
    "Training on how to make reusable pads for girls and vulnerable women",
    "Sensitizing communities on malaria prevalence, prevention and treatment care services in Okungur Sub County in Kapelebyong district in the parishes of Agonga and Airabet."
  ];

  const plannedActivities = [
    "Continue on the menstrual cup training and distribution",
    "Complete the skilling project in Amuria and Kapelebyong district.",
    "Continue on CLM implementation.",
    "Continue on community sensitizations on GBV awareness and its impacts.",
    "Conduct SRHR trainings and sensitizations in the community and schools."
  ];

  const achievements = [
    "Successfully implemented on a Menstrual cup project in Okungur subcounty and Obalanga Town council (300 cups distributed) supported by Rotary Club of Kyanja Metro & Could You cup.",
    "Conducted a mapping exercise and mobilization of 40 CBO’s for Lango region under KAL Consortium Africa.",
    "Currently implementing a 2 yr CLM project funded by Global Fund under TASO through CDFU in Kapelebyong District.",
    "Successfully implemented malaria project in Kapelebyong district, Okungur Subcounty supported by TASO Uganda through CDFU funded by GLOBAL FUND (Aug-Sept 2023, June-Dec 2022).",
    "Successfully implemented menstrual health project in 4 schools from Kapelebyong district, supported by USAID through East West Management Institute (March-Sept 2023).",
    "Trained 1,361 youths in Amuria (787) and Kapelebyong (574) districts. Included 1,010 females and 351 males.",
    "Supported 10 highly vulnerable youths (5 female, 5 male) from Akeriau, Ogongora, and Okungur to acquire skills.",
    "Included PWDs (dumb and deaf) who are successfully coping with the training.",
    "Sensitized communities on the impact of COVID-19 on GBV, producing 8 radio dramas.",
    "Trained 05 girls and women in brick laying and concrete practice.",
    "Participated in the 16 Days of Activism campaign to end teenage pregnancy and fight GBV.",
    "Trained 80 women on baking bread and knitting (2020/2021).",
    "Sensitized over 1500 people on malaria prevalence in Airabet and Agonga."
  ];

  const challenges = [
    "Limited funds to facilitate the activities within the sub counties of operation.",
    "Negative attitude towards contributing for trainings by the community whereby they need everything to be given to them to aid the trainings e.g. materials, machines etc.",
    "Few staff members yet they need to help in the monitoring of the projects activities.",
    "Lack of office equipment like computer and other office accessories like printer, photocopying machine among others."
  ];

  return (
    <div className="pt-20">
      <section className="relative py-32 bg-[#1a1a1a] text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/skilling.png" alt="Programs Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-black/30"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">Our Interventions</h1>
            <p className="text-xl text-gray-200 leading-relaxed font-inter">
              We provide charitable and community-based interventions focusing on women and youth for sustainable socio-economic development, driven by our core objectives and thematic areas.
            </p>
          </div>
        </div>
      </section>

      {/* Core Objectives & Thematic Areas */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
               <h3 className="text-3xl font-bold font-outfit mb-8 flex items-center gap-3">
                 <TargetIcon className="text-primary" size={32} /> TEWOYEI'S Core Objectives
               </h3>
               <ul className="space-y-4">
                 {objectives.map((obj, i) => (
                   <li key={i} className="flex gap-3 text-gray-700">
                     <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">{i+1}</span>
                     <span>{obj}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <div className="bg-teso-dark p-10 rounded-[3rem] shadow-xl text-white">
               <h3 className="text-3xl font-bold font-outfit mb-8 flex items-center gap-3 text-secondary">
                 <ListChecks size={32} /> Thematic Areas
               </h3>
               <ul className="space-y-4">
                 {thematicAreas.map((area, i) => (
                   <li key={i} className="flex gap-3 items-center text-gray-300">
                     <CheckCircle className="text-secondary shrink-0" size={20} />
                     <span className="text-lg">{area}</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-padding bg-teso-light border-y border-gray-200">
        <div className="container">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-outfit">Project Activities</h2>
           </div>
           <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <div className="bg-white rounded-3xl p-8 border border-gray-200">
                <h4 className="text-2xl font-bold text-primary mb-6">Current Activities</h4>
                <ul className="space-y-3">
                  {currentActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 border-b border-gray-50 pb-2">
                       <ArrowRight size={16} className="text-primary shrink-0 mt-1" />
                       <span>{act}</span>
                    </li>
                  ))}
                </ul>
             </div>
             
             <div className="bg-white rounded-3xl p-8 border border-gray-200">
                <h4 className="text-2xl font-bold text-secondary-dark mb-6">Planned Activities</h4>
                <ul className="space-y-3">
                  {plannedActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 border-b border-gray-50 pb-2">
                       <ArrowRight size={16} className="text-secondary-dark shrink-0 mt-1" />
                       <span>{act}</span>
                    </li>
                  ))}
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Achievements and Challenges */}
      <section className="section-padding">
        <div className="container">
           <div className="grid lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8">
                <h3 className="text-3xl font-bold font-outfit mb-8">Successfully Implemented</h3>
                <div className="space-y-6">
                  {achievements.map((ach, i) => (
                    <div key={i} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl">
                      <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                      <p className="text-gray-700">{ach}</p>
                    </div>
                  ))}
                </div>
             </div>

             <div className="lg:col-span-4">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 sticky top-24">
                  <h3 className="text-2xl font-bold font-outfit mb-6 text-red-900 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" /> Challenges Met
                  </h3>
                  <ul className="space-y-4">
                    {challenges.map((chal, i) => (
                      <li key={i} className="text-sm text-red-800 leading-relaxed border-l-2 border-red-300 pl-3">
                        {chal}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-primary text-white text-center">
        <div className="container">
           <h2 className="text-4xl font-bold font-outfit mb-8">Want to support our programs?</h2>
           <a href="/contact" className="btn btn-primary bg-secondary text-teso-dark hover:scale-105">Partner With Us</a>
        </div>
      </section>
    </div>
  );
};

export default Programs;
