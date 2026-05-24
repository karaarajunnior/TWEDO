import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MessageCircle, Phone, MapPin, Heart } from 'lucide-react';

const CONTACT_EMAILS = ['dinahgraceabel@gmail.com'];
const CONTACT_MAILTO = CONTACT_EMAILS.join(',');
const CONTACT_NUMBERS = [
  { label: '0777 676 436', tel: '+256777676436', whatsapp: '256777676436' }
const PRIMARY_EMAIL = 'dinahgraceabel@gmail.com';
const CONTACT_EMAILS = [PRIMARY_EMAIL];
const CONTACT_MAILTO = PRIMARY_EMAIL;
const CONTACT_NUMBERS = [
  { label: '+256 777 676 436', tel: '+256777676436', whatsapp: '256777676436' }
];

const PhoneOptions = ({ number, iconColor }) => (
  <li className="flex items-start gap-3">
    <Phone size={16} className={`${iconColor} shrink-0 mt-2`} />
    <details className="group flex-1 rounded-xl bg-white/5 border border-white/10 p-2">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-3 text-secondary-light/80 hover:text-primary transition-colors">
        <span>{number.label}</span>
        <span className="text-[10px] uppercase tracking-widest text-primary">Options</span>
      </summary>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <a
          href={`https://wa.me/${number.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 rounded-full bg-green-500 text-white px-2 py-2 text-[11px] font-bold"
        >
          <MessageCircle size={12} /> WhatsApp
        </a>
        <a
          href={`tel:${number.tel}`}
          className="inline-flex items-center justify-center gap-1 rounded-full bg-secondary text-white px-2 py-2 text-[11px] font-bold"
        >
          <Phone size={12} /> Phone
        </a>
      </div>
    </details>
  </li>
);

const Footer = ({ t }) => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('newsletterEmail')?.toString().trim();
    const subject = 'Newsletter subscription';
    const body = `Hello TEWOYEI,\n\nPlease add ${email} to your newsletter mailing list.`;

    window.location.href = `mailto:${CONTACT_MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const quickLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/programs', label: t.common.ourPrograms },
    { to: '/events', label: t.nav.events },
    { to: '/gallery', label: t.gallery.pageTitle },
    { to: '/get-involved', label: t.nav.getInvolved },
  ];
  const socialLinks = [
    { href: 'https://www.facebook.com/search/top?q=TEWOYEI%20Uganda', label: 'Find TEWOYEI on Facebook', Icon: Facebook },
    { href: 'https://twitter.com/search?q=TEWOYEI%20Uganda', label: 'Find TEWOYEI on X', Icon: Twitter },
    { href: 'https://www.instagram.com/explore/search/keyword/?q=TEWOYEI%20Uganda', label: 'Find TEWOYEI on Instagram', Icon: Instagram },
    { href: 'https://www.youtube.com/results?search_query=TEWOYEI+Uganda', label: 'Find TEWOYEI on YouTube', Icon: Youtube },
  ];

  return (
    <footer className="text-secondary-light pt-20 pb-10" style={{ background: 'linear-gradient(160deg, #243b6b 0%, #31558f 60%, #1565C0 100%)' }}>
      <div className="container">

        {/* Top pink-blue gradient strip */}
        <div className="h-1 w-full rounded-full mb-16" style={{ background: 'linear-gradient(90deg, #e91e8c 0%, #ffffff 50%, #1565C0 100%)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <Link to="/" aria-label="TEWOYEI home" className="inline-flex bg-white rounded-2xl p-2 shadow-lg">
              <img src="/assets/tewoyei-logo.svg" alt="TEWOYEI logo" className="h-16 w-24 object-contain" />
            </Link>
            <p className="text-sm leading-relaxed text-secondary-light/80">{t.footer.description}</p>
            {/* Pillars legend */}
            <div className="flex flex-wrap gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 text-primary">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> {t.footer.women}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-secondary/30 text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span> {t.footer.justice}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 text-white">
                <span className="w-2 h-2 rounded-full bg-white inline-block"></span> {t.footer.integrity}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em]">{t.common.quickLinks}</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em]">{t.common.contactUs}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-light/80">{t.footer.address}</span>
              </li>
              {CONTACT_NUMBERS.map((number, i) => (
                <PhoneOptions key={number.tel} number={number} iconColor={i % 2 === 0 ? 'text-primary' : 'text-secondary'} />
              ))}
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <div className="space-y-1">
                  {CONTACT_EMAILS.map((email) => (
                    <a key={email} href={`mailto:${CONTACT_MAILTO}`} className="block text-secondary-light/80 hover:text-primary transition-colors">{email}</a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em]">{t.common.newsletter}</h4>
            <p className="text-sm text-secondary-light/80">{t.footer.newsletterText}</p>
            <form className="flex flex-col gap-3" onSubmit={handleNewsletterSubmit}>
              <input
                name="newsletterEmail"
                type="email"
                required
                placeholder={t.common.emailPlaceholder}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
              />
              <button type="submit" className="btn btn-primary text-sm py-3 w-full">
                {t.common.subscribe}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-secondary-light/70 text-center md:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} {t.footer.copyright}<br/>
            {t.footer.registration} <strong className="text-white">80034872646031</strong> | {t.footer.registered}
          </div>

          <div className="flex items-center gap-2 text-xs text-secondary-light/70">
            <Heart size={12} className="text-primary" />
            <span>{t.common.developedBy} <a href="tel:+256771331473" className="text-primary hover:underline">+256 771 331 473</a></span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, Icon }, i) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                style={{ background: i % 2 === 0 ? 'rgba(233,30,140,0.15)' : 'rgba(21,101,192,0.15)', color: i % 2 === 0 ? '#e91e8c' : '#1565C0' }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
