import React, { useState } from 'react';
import { Mail, Copy, CheckCircle2, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('syafridaaulia455@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="bg-[#09318D] text-white pt-20 pb-12 border-t border-white/15 relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FD91CC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Contact Invitation Box */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FD91CC]">
              Mari Terhubung
            </span>
            <h2 id="contact-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Tertarik mendiskusikan peluang magang atau kolaborasi proyek analisis data?
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Saya terbuka untuk posisi magang maupun kerja di bidang Business Analysis dan Data Analysis. Silakan hubungi saya melalui kanal di bawah ini.
            </p>

            {/* Contact Action Buttons: Send Email, Copy Email, LinkedIn, GitHub */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="mailto:syafridaaulia455@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FD91CC] hover:bg-[#FD91CC]/90 text-[#09318D] font-black text-xs sm:text-sm shadow-lg shadow-[#FD91CC]/25 transition-all transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
              >
                <Mail className="w-4 h-4" />
                <span>Kirim Email Langsung</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
                aria-label="Salin alamat email"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#FD91CC]" />
                    <span>Email Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#FD91CC]" />
                    <span>Salin Email</span>
                  </>
                )}
              </button>

              <a
                href="https://linkedin.com/in/syafrida-ade-aulia-hakim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
              >
                <LinkedinIcon className="w-4 h-4 text-[#FD91CC]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/fri17da"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
              >
                <GithubIcon className="w-4 h-4 text-[#FD91CC]" />
                <span>GitHub: fri17da</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div>
            <p className="font-bold text-white">Syafrida Ade Aulia Hakim</p>
            <p className="text-[11px] text-white/75">
              D4 Sistem Informasi Bisnis · Jurusan Teknologi Informasi Polinema
            </p>
          </div>

          <p>© {new Date().getFullYear()} Syafrida Ade Aulia Hakim. Hak cipta dilindungi.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
            aria-label="Kembali ke atas"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FD91CC]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
