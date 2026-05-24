import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { buildWhatsappUrl } from '../data/contactDetails';

const Navbar = ({ t, language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/programs', label: t.nav.programs },
    { to: '/get-involved', label: t.nav.getInvolved },
    { to: '/contact', label: t.nav.contact },
  ];
  const mediaLinks = [
    { to: '/events', label: t.nav.events, color: 'bg-primary' },
    { to: '/gallery', label: t.nav.gallery, color: 'bg-primary' },
    { to: '/resources', label: t.nav.resources, color: 'bg-secondary' },
    { to: '/resources#press-release', label: t.nav.pressRelease, color: 'bg-secondary' },
    { to: '/resources#success-stories', label: t.nav.successStories, color: 'bg-primary' },
  ];
  const socialLinks = [
    { href: 'https://www.facebook.com/search/top?q=TEWOYEI%20Uganda', label: 'Find TEWOYEI on Facebook', Icon: Facebook },
    { href: 'https://twitter.com/search?q=TEWOYEI%20Uganda', label: 'Find TEWOYEI on X', Icon: Twitter },
    { href: 'https://www.instagram.com/explore/search/keyword/?q=TEWOYEI%20Uganda', label: 'Find TEWOYEI on Instagram', Icon: Instagram },
    { href: 'https://www.youtube.com/results?search_query=TEWOYEI+Uganda', label: 'Find TEWOYEI on YouTube', Icon: Youtube },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMediaOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 w-full z-[1000] py-3 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-md border-b-2 border-primary/20' : 'bg-transparent'}`}>
      <div className="container flex justify-between items-center">

        <Link to="/" className="flex items-center gap-3 font-bold font-outfit" aria-label="TEWOYEI home">
          <span className="bg-white rounded-2xl p-1.5 shadow-sm">
            <img src="/assets/tewoyei-logo.svg" alt="TEWOYEI logo" className="h-12 w-16 md:h-14 md:w-20 object-contain" />
          </span>
          <span
            className="text-xl md:text-2xl"
            style={isScrolled || isMenuOpen
              ? { background: 'linear-gradient(90deg, #e91e8c 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
              : { color: 'white' }}
          >
            TEWOYEI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-primary transition-colors font-semibold"
                style={{ color: isScrolled ? '#243b6b' : 'white' }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Media Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-primary transition-colors font-semibold"
              style={{ color: isScrolled ? '#243b6b' : 'white' }}
              onMouseEnter={() => setIsMediaOpen(true)}
              onMouseLeave={() => setIsMediaOpen(false)}
              onClick={() => setIsMediaOpen(prev => !prev)}
              aria-expanded={isMediaOpen}
            >
              {t.nav.media} <ChevronDown size={16} className={`transition-transform duration-200 ${isMediaOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`absolute top-full -left-4 w-52 bg-white rounded-2xl shadow-2xl border border-primary/10 py-2 z-50 transition-all duration-200 ${isMediaOpen ? 'opacity-100 visible translate-y-2' : 'opacity-0 invisible translate-y-4'}`}
              onMouseEnter={() => setIsMediaOpen(true)}
              onMouseLeave={() => setIsMediaOpen(false)}
            >
              {mediaLinks.map((link) => (
                <Link key={link.to} to={link.to} className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-semibold">
                  <span className={`w-1.5 h-1.5 rounded-full ${link.color} inline-block`}></span> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4 border-l pl-6 border-white/20">
            {/* Social icons */}
            <div className="flex items-center gap-3" style={{ color: isScrolled ? '#e91e8c' : 'rgba(255,255,255,0.8)' }}>
              {socialLinks.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:scale-125 hover:text-primary transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'at' : 'en')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all"
              style={{ borderColor: isScrolled ? '#e91e8c' : 'rgba(255,255,255,0.5)', color: isScrolled ? '#e91e8c' : 'white' }}
            >
              <Globe size={12} /> {language === 'en' ? 'EN' : 'AT'}
            </button>

            <a
              href={buildWhatsappUrl('Hello TEWOYEI, I would like to support your campaigns.')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary text-sm px-6 py-2.5"
            >
              {t.nav.donate}
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'at' : 'en')}
            className={`p-2 rounded-full transition-colors ${isScrolled || isMenuOpen ? 'bg-primary/10 text-primary' : 'bg-primary/20 text-white'}`}
            aria-label="Toggle language"
          >
            <Globe size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors ${isScrolled || isMenuOpen ? 'text-primary bg-primary/10' : 'text-white bg-white/10'}`}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-4 left-4 sm:left-auto sm:w-[min(92vw,28rem)] bg-white shadow-2xl lg:hidden max-h-[72vh] overflow-y-auto rounded-3xl border border-primary/10">
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #e91e8c, #1565C0)' }} />
            <div className="p-4">
              <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="px-4 py-2 rounded-full bg-teso-light text-sm font-bold text-teso-dark hover:bg-primary hover:text-white transition-colors">{link.label}</Link>
                ))}
              </div>

              <div className="py-4 border-b border-gray-100">
                <span className="text-xs font-extrabold text-primary uppercase tracking-[0.2em] mb-3 block">{t.nav.media}</span>
                <div className="flex flex-wrap gap-2">
                  {mediaLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary">{link.label}</Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 py-4 text-primary">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon size={22} />
                  </a>
                ))}
              </div>

              <a href={buildWhatsappUrl('Hello TEWOYEI, I would like to support your campaigns.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-center w-full">{t.nav.donateNow}</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
