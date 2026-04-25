import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = ({ t }) => {
  return (
    <footer className="text-gray-300 pt-20 pb-10" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1a1f35 60%, #0d1a2e 100%)' }}>
      <div className="container">

        {/* Top pink-blue gradient strip */}
        <div className="h-1 w-full rounded-full mb-16" style={{ background: 'linear-gradient(90deg, #e91e8c 0%, #ffffff 50%, #1565C0 100%)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <div className="text-3xl font-bold font-outfit" style={{ background: 'linear-gradient(90deg, #e91e8c, #1565C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TEWOYEI
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering women, adolescent girls, and youth in Teso for sustainable socio-economic and political transformation — rooted in Faith, Justice &amp; Integrity.
            </p>
            {/* Pillars legend */}
            <div className="flex flex-wrap gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 text-primary">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Women (Pink)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-secondary/30 text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span> Justice (Blue)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 text-white">
                <span className="w-2 h-2 rounded-full bg-white inline-block"></span> Integrity (White)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/programs', label: 'Our Programs' },
                { to: '/events', label: 'Events' },
                { to: '/gallery', label: 'Field Gallery' },
                { to: '/get-involved', label: 'Get Involved' },
              ].map(link => (
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
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">Amuria / Kapelebyong District<br/>Teso Sub-Region, Uganda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <span className="text-gray-400">+256 777 676 436</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-secondary shrink-0" />
                <span className="text-gray-400">+256 789 789 806</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:tewoyeiuganda@gmail.com" className="text-gray-400 hover:text-primary transition-colors">tewoyeiuganda@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Newsletter</h4>
            <p className="text-sm text-gray-400">Join our mailing list for field updates and impact stories from Teso.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
              />
              <button className="btn btn-primary text-sm py-3 w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-500 text-center md:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} TEWOYEI — Teso Women Empowerment &amp; Youth Initiatives.<br/>
            Reg No: <strong className="text-gray-400">80034872646031</strong> | Registered CBO in Uganda.
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Heart size={12} className="text-primary" />
            <span>Developed by <a href="tel:+256771331473" className="text-primary hover:underline">+256 771 331 473</a></span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
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
