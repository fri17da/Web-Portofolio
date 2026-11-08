import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Send, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Skills & Tools', href: '#skills', id: 'skills' },
  { name: 'Proyek', href: '#proyek', id: 'proyek' },
  { name: 'GitHub', href: '#github', id: 'github' },
  { name: 'Penghargaan', href: '#penghargaan', id: 'penghargaan' },
  { name: 'Sertifikasi', href: '#sertifikasi', id: 'sertifikasi' },
  { name: 'Organisasi', href: '#organisasi', id: 'organisasi' },
  { name: 'Soft Skills', href: '#non-teknis', id: 'non-teknis' },
  { name: 'Kontak', href: '#kontak', id: 'kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'proyek', 'github', 'penghargaan', 'sertifikasi', 'organisasi', 'non-teknis', 'kontak'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Floating Glassmorphic Pill */}
        <div className="w-full bg-[#09318D]/70 backdrop-blur-xl border border-white/20 rounded-full px-4 sm:px-6 py-2.5 shadow-xl shadow-[#09318D]/25 flex items-center justify-between gap-3 transition-all duration-300 hover:border-white/30">
          
          {/* Logo Brand: Logo Poltek & Logo JTI (Warna Asli + Glow) */}
          <a
            href="#hero"
            className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-[#FD91CC] rounded-full p-1"
            aria-label="Kembali ke atas"
          >
            <div className="flex items-center gap-2.5">
              <img
                src="/logos/logo-poltek.png"
                alt="Logo Politeknik Negeri Malang"
                loading="eager"
                className="h-8 sm:h-11 w-auto object-contain"
                title="Politeknik Negeri Malang"
              />
              <div className="w-px h-5 bg-white/25" aria-hidden="true" />
              <img
                src="/logos/logo-jti.png"
                alt="Logo Jurusan Teknologi Informasi"
                loading="eager"
                className="h-[26px] w-auto object-contain"
                title="Jurusan Teknologi Informasi Polinema"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Navigasi Utama">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#FD91CC] ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FD91CC] rounded-full shadow-sm shadow-[#FD91CC]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons: Outline Glass Contact & CV Download */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="#kontak"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white text-xs font-bold border border-white/30 backdrop-blur-md transition-all transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
            >
              <Send className="w-3.5 h-3.5 text-[#FD91CC]" aria-hidden="true" />
              <span>Hubungi Saya</span>
            </a>

            <a
              href="/cv-syafrida.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FD91CC] hover:bg-[#FD91CC]/90 text-[#09318D] text-xs font-bold shadow-md shadow-[#FD91CC]/25 transition-all transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Unduh CV</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {isOpen ? <X className="w-5 h-5 text-[#FD91CC]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="xl:hidden max-w-sm mx-auto mt-2 bg-[#09318D]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-2xl pointer-events-auto animate-in slide-in-from-top-3"
        >
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-white hover:text-[#FD91CC] hover:bg-white/10 rounded-xl transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </a>
            ))}
          </nav>

          <div className="pt-4 mt-3 border-t border-white/15 flex flex-col gap-2">
            <a
              href="/cv-syafrida.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl bg-white/10 text-white border border-white/20"
            >
              <FileText className="w-4 h-4 text-[#FD91CC]" />
              <span>Unduh CV (PDF)</span>
            </a>
            <a
              href="#kontak"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl bg-[#FD91CC] text-[#09318D]"
            >
              <Send className="w-4 h-4" />
              <span>Hubungi Saya</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
