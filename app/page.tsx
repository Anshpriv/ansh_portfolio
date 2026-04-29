'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from "@/components/footer";
import { Grid } from "@/components/grid";
import { FloatingNav } from "@/components/ui/floating-nav";
import { RecentProjects } from "@/components/recent-projects";
import { navItems, certificates } from "@/data";
import dynamic from 'next/dynamic';
const App = dynamic(() => import('@/components/band/App'), { ssr: false });
import CardSection from "@/components/card/CardSection";

function useTypingEffect(roles: string[]) {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
        setCharIndex(c => c + 1);
      } else {
        setText(current.substring(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex(r => (r + 1) % roles.length);
          setCharIndex(0);
          return;
        }
        setCharIndex(c => c - 1);
      }
    }, isDeleting ? 50 : 150);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  return text;
}

// ── Certificate Modal ─────────────────────────────────────────────
function CertModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-indigo-400 transition"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative w-full aspect-[1.414] bg-white/5 rounded-xl overflow-hidden border border-white/10">
          <Image src={src} alt="Certificate" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}

const MainPage = () => {
  const typedText = useTypingEffect([
    'AI & Data Science Student',
    'Full Stack Developer',
    'National-Level Hackathon Achiever',
    'National Basketball Player',
  ]);

  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [showCertificates, setShowCertificates] = useState(false);

  // Automatically show certificates if the user navigated to #certificates (e.g. from the navbar)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#certificates') {
        setShowCertificates(true);
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Force GSAP/Lenis to recalculate scroll boundaries when certificates expand
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, [showCertificates]);

  return (
    
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-clip bg-black-100 px-5 sm:px-10">
      <FloatingNav navItems={navItems} />
  
      <div style={{ minHeight: "100vh", width: "100vw", backgroundColor: "black", position: "relative" }}>
        <App />
        
        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center z-10"
          style={{ top: '10%' }}>
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            Ansh <span className="text-indigo-400">Thakare</span>
          </h1>
          <h2 className="text-xl md:text-3xl text-indigo-300 mt-3 h-10 flex items-center gap-1 justify-center">
            <span>{typedText}</span>
            <span className="inline-block w-0.5 h-7 bg-indigo-400 animate-pulse ml-0.5" />
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 max-w-xl">
            Aspiring AI &amp; Data Science professional · National-Level Hackathon Achiever · National-level basketball player
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4 pointer-events-auto justify-center">
            <a
              href="#contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full md:w-auto text-center"
            >
              Get in Touch
            </a>
            <a
              href="/ansh/Ansh_Thakare_Resume.pdf"
              target="_blank"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg backdrop-blur-sm border border-white/10 transition duration-300 w-full md:w-auto text-center"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>  

      <div className="w-full max-w-7xl z-10 bg-black-100 pt-10">
        <Grid/> 
        <CardSection />
        <RecentProjects />
        
        {/* ── CERTIFICATES SECTION ───────────────────────────────────── */}
        <section id="certificates" className="py-20 relative z-50 border-t border-white/10 mt-20">
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold">
              My <span className="text-indigo-400">Certificates</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-6 rounded-full mb-10" />

            <button 
              onClick={() => setShowCertificates(!showCertificates)}
              className="px-8 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/50 text-indigo-400 font-semibold hover:bg-indigo-500/20 transition-colors"
            >
              {showCertificates ? 'Hide Certificates' : 'View My Certificates'}
            </button>
          </div>
          
          {showCertificates && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => (
              <div
                key={cert.path}
                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer aspect-[1.414]"
                onClick={() => setModalSrc(cert.path)}
              >
                <Image
                  src={cert.path}
                  alt={cert.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-indigo-400 text-sm mt-2">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </section>

        <Footer />
      </div>
      
      {/* Modals */}
      {modalSrc && <CertModal src={modalSrc} onClose={() => setModalSrc(null)} />}
    </main>
  );
};

export default MainPage;
