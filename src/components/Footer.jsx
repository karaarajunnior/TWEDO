import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Youtube, Mail, Phone, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { contactEmails, contactMailto, contactNumbers } from '../data/organization';

const Footer = ({ t }) => {
  const [subscribeStatus, setSubscribeStatus] = useState('idle');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('newsletterEmail')?.toString().trim();
    
    if (email) {
      const subject = 'Newsletter subscription';
      const body = `Hello TEWOYEI,\n\nPlease add ${email} to your newsletter mailing list.`;
      
      setSubscribeStatus('success');
      
      setTimeout(() => {
        window.location.href = `mailto:${contactMailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSubscribeStatus('idle');
      }, 1500);
      
      e.currentTarget.reset();
    }
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
    { href: 'https://x.com/tewedo_t', label: 'Find TEWOYEI on X', Icon: Twitter },
    { href: 'https://www.youtube.com/@DINAHGRACEAMONG', label: 'Find TEWOYEI on YouTube', Icon: Youtube },
  ];

  return (
    <footer className="text-secondary-light/90 pt-10 md:pt-16 bg-[#182C51] relative z-40" style={{ background: 'linear-gradient(160deg, #182C51 0%, #154580 60%, #0D47A1 100%)' }}>
      
      {/* Top Gradient Divider */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #e91e8c 0%, #1565C0 100%)' }} />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 w-full">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr] gap-10 md:gap-8 lg:gap-8 pb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" aria-label="TEWOYEI home" className="inline-block bg-white rounded-2xl p-3 shadow-lg hover:-translate-y-1 transition-transform duration-200">
              <img src="/assets/icons and logo/tewoyei-logo.svg" alt="TEWOYEI logo" className="h-16 w-24 object-contain" />
            </Link>
            <p className="text-sm leading-relaxed text-secondary-light/80 line-clamp-3 lg:line-clamp-none">
              {t.footer.description}
            </p>
            {/* 
              If the client later requests the pillars (Faith · Justice · Integrity) as text:
              <p className="text-xs font-semibold text-white/90">Our Pillars: Faith &middot; Justice &middot; Integrity</p>
            */}
            
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label} 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:scale-105 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="space-y-6" aria-label="Footer Quick Links">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">{t.common.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="flex items-center gap-2 text-sm text-secondary-light/80 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                  >
                    <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="-ml-5 group-hover:ml-0 transition-all duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact Us */}
          <address className="space-y-6 not-italic">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">{t.common.contactUs}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-1" />
                <span className="text-sm text-secondary-light/80 leading-relaxed">{t.footer.address}</span>
              </li>
              {contactNumbers.slice(0, 2).map((number) => (
                <li key={number.tel} className="flex items-center gap-3">
                  <Phone size={16} className="text-primary shrink-0" />
                  <a 
                    href={`tel:${number.tel}`} 
                    className="text-sm text-secondary-light/80 hover:text-white hover:underline transition-colors duration-200"
                  >
                    {number.label}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-primary shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  {contactEmails.map((email) => (
                    <a 
                      key={email} 
                      href={`mailto:${email}`} 
                      className="text-sm text-secondary-light/80 hover:text-white hover:underline transition-colors duration-200 break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </address>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">{t.common.newsletter}</h4>
            <p className="text-sm text-secondary-light/80 leading-relaxed">
              {t.footer.newsletterText || "Join our mailing list for field updates and impact stories from Teso."}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <label htmlFor="newsletterEmail" className="sr-only">{t.common.emailPlaceholder || "Your email address"}</label>
                <input
                  id="newsletterEmail"
                  name="newsletterEmail"
                  type="email"
                  required
                  placeholder={t.common.emailPlaceholder || "Your email address"}
                  className="w-full bg-white/10 border border-white/20 sm:border-r-0 rounded-xl sm:rounded-r-none sm:rounded-l-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white/15 transition-all text-white placeholder-white/50"
                />
                <button 
                  type="submit" 
                  disabled={subscribeStatus === 'success'}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-xl sm:rounded-l-none sm:rounded-r-xl transition-colors duration-200 shrink-0 flex items-center justify-center whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {subscribeStatus === 'success' ? (
                    <>
                      <CheckCircle2 size={16} className="mr-2" /> 
                      Sent!
                    </>
                  ) : (
                    t.common.subscribe || "Subscribe"
                  )}
                </button>
              </div>
              <p className="text-[11px] text-white/50 mt-1">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-light/60">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} TEWOYEI. All rights reserved.<br className="md:hidden" />
            <span className="hidden md:inline"> | </span>Registered CBO: 80034872646031
          </div>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors duration-200">Terms of Use</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
