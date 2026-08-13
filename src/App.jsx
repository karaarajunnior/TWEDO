import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import GetInvolved from './pages/GetInvolved';
import Events from './pages/Events';
import Resources from './pages/Resources';
import ChatWidget from './components/ChatWidget';
import WhatsAppButton from './components/WhatsAppButton';
import en from './translations/en.json';
import at from './translations/at.json';

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(hash);
    if (target) {
      window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }
  }, [hash, pathname]);

  return null;
};

const App = () => {
  const [language, setLanguage] = useState('en');
  const t = language === 'en' ? en : at;

  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen flex flex-col">
        <Navbar t={t} language={language} setLanguage={setLanguage} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home t={t} />} />
            <Route path="/about" element={<About t={t} />} />
            <Route path="/programs" element={<Programs t={t} />} />
            <Route path="/gallery" element={<Gallery t={t} />} />
            <Route path="/events" element={<Events t={t} />} />
            <Route path="/get-involved" element={<GetInvolved t={t} />} />
            <Route path="/resources" element={<Resources t={t} />} />
            <Route path="/contact" element={<Contact t={t} />} />
          </Routes>
        </main>
        <Footer t={t} />
        <WhatsAppButton />
        <ChatWidget />
      </div>
    </Router>
  );
};

export default App;
