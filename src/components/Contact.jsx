import React from 'react';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

const CONTACT_EMAILS = ['dinahgraceabel@gmail.com'];
const CONTACT_MAILTO = CONTACT_EMAILS.join(',');
const CONTACT_NUMBERS = [
  { label: '0777 676 436', tel: '+256777676436', whatsapp: '256777676436' }
];

const PhoneOptions = ({ number }) => (
  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-3">
    <p className="font-semibold text-gray-700 mb-3">{number.label}</p>
    <div className="grid grid-cols-2 gap-2 mt-3">
      <a
        href={`https://wa.me/${number.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 text-white px-3 py-2 text-xs font-bold"
      >
        <MessageCircle size={14} /> WhatsApp
      </a>
      <a
        href={`tel:${number.tel}`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-white px-3 py-2 text-xs font-bold"
      >
        <Phone size={14} /> Phone
      </a>
    </div>
  </div>
);

const Contact = ({ t }) => {
  const handleContactSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString().trim() || 'Website visitor';
    const senderEmail = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    const body = [
      `Name: ${name}`,
      senderEmail ? `Email: ${senderEmail}` : null,
      '',
      message || ''
    ].filter(line => line !== null).join('\n');

    window.location.href = `mailto:${CONTACT_MAILTO}?subject=${encodeURIComponent(`Website message from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold font-outfit mb-8">{t.contact.title}</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{t.common.location}</h4>
                  <p className="text-gray-600">{t.contact.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{t.contact.call}</h4>
                  <div className="space-y-3">
                    {CONTACT_NUMBERS.map((number) => (
                      <PhoneOptions key={number.tel} number={number} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{t.contact.email}</h4>
                  <div className="space-y-1">
                    {CONTACT_EMAILS.map((email) => (
                      <a key={email} href={`mailto:${CONTACT_MAILTO}`} className="block text-gray-600 font-medium hover:text-primary hover:underline">{email}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-teso-light border border-gray-100">
               <h4 className="font-bold mb-2">{t.contact.person}</h4>
               <p className="text-sm text-gray-500 mb-4">{t.contact.coordinatorTitle}</p>
               <a href="mailto:dinahgraceabel@gmail.com" className="text-primary font-semibold hover:underline">dinahgraceabel@gmail.com</a>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white border border-gray-200 rounded-[3rem] p-10 shadow-xl">
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.name}</label>
                  <input name="name" type="text" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary transition-all" placeholder={t.contact.yourName} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.common.email}</label>
                  <input name="email" type="email" required className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary transition-all" placeholder={t.contact.yourEmail} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.message}</label>
                <textarea name="message" rows="4" required className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary transition-all" placeholder={t.contact.helpPlaceholder}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full py-5 text-lg">{t.common.sendMessage}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
