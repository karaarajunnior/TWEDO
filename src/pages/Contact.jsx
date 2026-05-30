import React from 'react';
import { Mail, MessageCircle, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactEmails, contactMailto, contactNumbers, contactPhotoHighlights, founderMembers } from '../data/organization';

const Contact = ({ t }) => {
  const getAssetPath = (image) => '/assets/' + image.split('/').map(encodeURIComponent).join('/');
  const primaryContact = founderMembers[0];
  const primaryNumber = contactNumbers[0];
  const primaryEmail = contactEmails[0];

  const handleContactSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName')?.toString().trim();
    const lastName = formData.get('lastName')?.toString().trim();
    const senderEmail = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Website visitor';
    const subject = `Website message from ${fullName}`;
    const body = [
      `Name: ${fullName}`,
      senderEmail ? `Email: ${senderEmail}` : null,
      '',
      message || ''
    ].filter((line) => line !== null).join('\n');

    window.location.href = `mailto:${contactMailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="pt-20">
      <section className="relative py-32 bg-teso-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-image.png" alt={t.contact.pageTitle} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/65 to-secondary-dark/45"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-outfit mb-6">{t.contact.pageTitle}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-teso-light relative">
        <div className="absolute top-0 w-full h-1/2 bg-primary"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-teso-dark text-white rounded-[3rem] p-12 shadow-2xl"
            >
              <div className="relative overflow-hidden rounded-[2rem] mb-8 aspect-[4/5] border border-white/10 bg-white/5">
                <img
                  src={getAssetPath(primaryContact.image)}
                  alt={primaryContact.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teso-dark via-teso-dark/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                  <span className="inline-flex items-center rounded-full bg-primary/90 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Primary contact
                  </span>
                  <h3 className="mt-4 text-3xl font-bold font-outfit">{primaryContact.name}</h3>
                  <p className="text-secondary-light">{primaryContact.title} | Founder Member</p>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b border-white/10">
                <h4 className="text-3xl font-bold font-outfit mb-4">{t.contact.title}</h4>
                <p className="text-gray-300 leading-relaxed">
                  Reach out directly for partnerships, field coordination, and questions about TEWOYEI's work.
                </p>
              </div>

              <div className="space-y-8 mb-10">
                <div className="flex gap-6">
                  <div className="mt-1 text-secondary"><MapPin size={28} /></div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-300">{t.contact.headquarters}</h5>
                    <p className="text-gray-400">{t.contact.address}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="mt-1 text-secondary"><Phone size={28} /></div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-300">Direct phone</h5>
                    <a href={`tel:${primaryNumber.tel}`} className="inline-flex items-center gap-2 text-xl text-white hover:text-secondary transition-colors">
                      {primaryNumber.national}
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="mt-1 text-secondary"><Mail size={28} /></div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-300">Direct email</h5>
                    <a href={`mailto:${contactMailto}`} className="block text-secondary break-all hover:underline">
                      {primaryEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-10">
                <a
                  href={`https://wa.me/${primaryNumber.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white hover:-translate-y-0.5 transition-transform"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={`tel:${primaryNumber.tel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-bold text-white hover:-translate-y-0.5 transition-transform"
                >
                  <Phone size={16} /> Call now
                </a>
                <a
                  href={`mailto:${contactMailto}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-teso-dark hover:-translate-y-0.5 transition-transform"
                >
                  <Mail size={16} /> Send email
                </a>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                <h5 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-4">Field moments</h5>
                <div className="grid gap-4">
                  {contactPhotoHighlights.map((photo) => (
                    <div key={photo.title} className="grid grid-cols-[6rem_1fr] gap-4 items-center rounded-[1.5rem] bg-white/5 p-3 border border-white/5">
                      <div className="relative h-24 rounded-2xl overflow-hidden">
                        <img src={getAssetPath(photo.image)} alt={photo.title} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div>
                        <h6 className="font-bold text-white">{photo.title}</h6>
                        <p className="text-sm text-gray-400 leading-relaxed">{photo.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100"
            >
              <h3 className="text-3xl font-bold font-outfit mb-8">{t.contact.sendMessageTitle}</h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 ml-2">{t.contact.firstName}</label>
                    <input name="firstName" type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder={t.contact.firstNamePlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 ml-2">{t.contact.lastName}</label>
                    <input name="lastName" type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder={t.contact.lastNamePlaceholder} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 ml-2">{t.contact.emailAddress}</label>
                  <input name="email" type="email" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder={t.contact.emailPlaceholder} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 ml-2">{t.contact.message}</label>
                  <textarea name="message" rows="5" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder={t.contact.messagePlaceholder}></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full py-4 text-lg flex justify-center items-center gap-2">
                  {t.common.sendMessage} <Send size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
