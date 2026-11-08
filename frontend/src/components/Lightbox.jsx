import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Video, Image as ImageIcon } from 'lucide-react';
import { parseMediaItem } from '../utils/media';

export default function Lightbox({ isOpen, images = [], media = [], currentIndex = 0, onClose, onPrev, onNext }) {
  const videoRef = useRef(null);

  // Support both `media` prop and legacy `images` prop
  const mediaItems = (media && media.length > 0 ? media : images).map(parseMediaItem).filter(Boolean);
  const currentItem = mediaItems[currentIndex] || null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  // Pause video when navigating away or closing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentIndex, isOpen]);

  if (!isOpen || mediaItems.length === 0 || !currentItem) return null;

  const isVideo = currentItem.type === 'video';
  const isEmbed = currentItem.type === 'embed';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#09318D]/92 backdrop-blur-md animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Tampilan perbesaran media proyek"
    >
      {/* Top Bar: Media Type Badge & Close button */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-50 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
          {isVideo || isEmbed ? (
            <>
              <Video className="w-3.5 h-3.5 text-[#FD91CC]" />
              <span>Video Pemutar</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-[#FD91CC]" />
              <span>Galeri Foto</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
          aria-label="Tutup perbesaran media"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev button */}
      {mediaItems.length > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
          aria-label="Media sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Content Area */}
      <div className="w-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center pointer-events-auto">
        {isVideo ? (
          <div className="w-full flex flex-col items-center">
            <video
              ref={videoRef}
              src={currentItem.src}
              poster={currentItem.poster || undefined}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl border border-white/20 bg-black outline-none"
            >
              Browser Anda tidak mendukung pemutar video HTML5.
            </video>
          </div>
        ) : isEmbed ? (
          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black">
            <iframe
              src={currentItem.embedUrl}
              title={currentItem.title || "Video Pemutar"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <img
            src={currentItem.src}
            alt={currentItem.title || `Pratinjau detail proyek ${currentIndex + 1}`}
            className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/20"
          />
        )}

        {/* Caption & Indicator Footer */}
        <div className="mt-4 text-xs font-semibold text-white/80 flex items-center gap-2">
          <span>{currentIndex + 1} dari {mediaItems.length}</span>
          <span>•</span>
          <span className="text-[#FD91CC]">Gunakan panah kiri/kanan keyboard</span>
          {currentItem.title && (
            <>
              <span>•</span>
              <span className="text-white font-medium">{currentItem.title}</span>
            </>
          )}
        </div>
      </div>

      {/* Next button */}
      {mediaItems.length > 1 && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
          aria-label="Media berikutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
