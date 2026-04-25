import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ t, language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const location = useLocation();

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
    <header className={`fixed top-0 w-full z-[1000] py-4 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b-2 border-primary/20' : 'bg-transparent'}`}>
      <div className="container flex justify-between items-center">

        {/* Logo — pink-to-blue gradient when scrolled, white when over hero */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-outfit">
          {isScrolled ? (
            <span style={{ background: 'linear-gradient(90deg, #e91e8c 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <i className="fas fa-venus-mars mr-2" style={{ color: '#e91e8c' }}></i>TEWOYEI
            </span>
          ) : (
            <span className="text-white">
              <i className="fas fa-venus-mars mr-2"></i>TEWOYEI
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          {['/', '/about', '/programs', '/get-involved', '/contact'].map((path, i) => {
            const labels = ['Home', 'About Us', 'Programs', 'Get Involved', 'Contact'];
            return (
              <Link
                key={path}
                to={path}
                className="hover:text-primary transition-colors font-semibold"
                style={{ color: isScrolled ? '#0f172a' : 'white' }}
              >
                {labels[i]}
              </Link>
            );
          })}

          {/* Media Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:text-primary transition-colors font-semibold"
              style={{ color: isScrolled ? '#0f172a' : 'white' }}
              onMouseEnter={() => setIsMediaOpen(true)}
              onMouseLeave={() => setIsMediaOpen(false)}
            >
              Media <ChevronDown size={16} className={`transition-transform duration-200 ${isMediaOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`absolute top-full -left-4 w-52 bg-white rounded-2xl shadow-2xl border border-primary/10 py-2 z-50 transition-all duration-200 ${isMediaOpen ? 'opacity-100 visible translate-y-2' : 'opacity-0 invisible translate-y-4'}`}
              onMouseEnter={() => setIsMediaOpen(true)}
              onMouseLeave={() => setIsMediaOpen(false)}
            >
              <Link to="/events" className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Events
              </Link>
              <Link to="/gallery" className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Gallery
              </Link>
              <Link to="/resources" className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span> Resources
              </Link>
              <span className="flex items-center gap-2 px-5 py-3 text-sm text-gray-300 font-semibold cursor-not-allowed">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 inline-block"></span> Press Release
              </span>
              <span className="flex items-center gap-2 px-5 py-3 text-sm text-gray-300 font-semibold cursor-not-allowed">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 inline-block"></span> Success Stories
              </span>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4 border-l pl-6 border-white/20">
            {/* Social icons */}
            <div className="flex items-center gap-3" style={{ color: isScrolled ? '#e91e8c' : 'rgba(255,255,255,0.8)' }}>
              <a href="#" className="hover:scale-125 hover:text-primary transition-all"><Facebook size={16} /></a>
              <a href="#" className="hover:scale-125 hover:text-primary transition-all"><Twitter size={16} /></a>
              <a href="#" className="hover:scale-125 hover:text-primary transition-all"><Instagram size={16} /></a>
              <a href="#" className="hover:scale-125 hover:text-primary transition-all"><Youtube size={16} /></a>
            </div>

            <button
              onClick={() => setLanguage(language === 'en' ? 'at' : 'en')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all"
              style={{ borderColor: isScrolled ? '#e91e8c' : 'rgba(255,255,255,0.5)', color: isScrolled ? '#e91e8c' : 'white' }}
            >
              <Globe size={12} /> {language === 'en' ? 'EN' : 'AT'}
            </button>

            <a
              href="https://wa.me/256777676436?text=Hello%20TEWOYEI,%20I%20would%20like%20to%20support%20your%20campaigns."
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary text-sm px-6 py-2.5"
            >
              Donate
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={() => setLanguage(language === 'en' ? 'at' : 'en')} className="p-2 rounded-full bg-primary/20 text-white">
            <Globe size={18} />
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-1 ${isScrolled ? 'text-primary' : 'text-white'}`}>
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl flex flex-col lg:hidden max-h-[85vh] overflow-y-auto border-t-4 border-primary">
            {/* Pink accent bar at top */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #e91e8c, #1565C0)' }} />
            <div className="p-6 flex flex-col gap-3">
              <Link to="/" className="text-lg font-bold text-gray-900 py-3 border-b border-gray-100 hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-lg font-bold text-gray-900 py-3 border-b border-gray-100 hover:text-primary transition-colors">About Us</Link>
              <Link to="/programs" className="text-lg font-bold text-gray-900 py-3 border-b border-gray-100 hover:text-primary transition-colors">Programs</Link>

              <div className="py-3 border-b border-gray-100">
                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-3 block">Media</span>
                <div className="flex flex-col gap-2 pl-4">
                  <Link to="/events" className="text-base font-semibold text-gray-700 hover:text-primary">Events</Link>
                  <Link to="/gallery" className="text-base font-semibold text-gray-700 hover:text-primary">Gallery</Link>
                  <Link to="/resources" className="text-base font-semibold text-gray-700 hover:text-secondary">Resources</Link>
                  <span className="text-base text-gray-300">Success Stories</span>
                </div>
              </div>

              <Link to="/get-involved" className="text-lg font-bold text-gray-900 py-3 border-b border-gray-100 hover:text-primary transition-colors">Get Involved</Link>
              <Link to="/contact" className="text-lg font-bold text-gray-900 py-3 border-b border-gray-100 hover:text-primary transition-colors">Contact</Link>

              <div className="flex items-center gap-5 py-4 text-primary">
                <a href="#"><Facebook size={22} /></a>
                <a href="#"><Twitter size={22} /></a>
                <a href="#"><Instagram size={22} /></a>
                <a href="#"><Youtube size={22} /></a>
              </div>

              <a href="https://wa.me/256777676436?text=Hello%20TEWOYEI,%20I%20would%20like%20to%20support%20your%20campaigns." target="_blank" rel="noopener noreferrer" className="btn btn-primary text-center w-full">Donate Now</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
