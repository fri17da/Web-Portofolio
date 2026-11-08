import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Play, Video, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';
import { parseMediaItem } from '../utils/media';

export default function ImageCarousel({
  images = [],
  media = [],
  projectTitle = '',
  projectInitials = 'PR',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const videoRefs = useRef({});

  // Support both explicit media items and legacy images array
  const rawMedia = media && media.length > 0 ? media : images;
  const mediaItems = rawMedia.map(parseMediaItem).filter(Boolean);
  const hasMedia = mediaItems.length > 0;

  // Pause all playing videos when changing slide
  const pauseAllVideos = () => {
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl && !videoEl.paused) {
        videoEl.pause();
      }
    });
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    pauseAllVideos();
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    pauseAllVideos();
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Only open lightbox on Space/Enter if not interacting with a video element
      if (e.target.tagName !== 'VIDEO') {
        e.preventDefault();
        if (hasMedia) {
          pauseAllVideos();
          setLightboxOpen(true);
        }
      }
    }
  };

  // Touch Swipe Handlers (ignored when touching inside video controls)
  const handleTouchStart = (e) => {
    if (e.target.tagName === 'VIDEO') return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (e.target.tagName === 'VIDEO') return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!hasMedia) {
    // Gradient placeholder with project initials
    return (
      <div className="w-full h-64 sm:h-84 rounded-2xl bg-gradient-to-br from-[#09318D] via-[#103eac] to-[#FD91CC]/30 border border-[#09318D]/20 flex flex-col items-center justify-center text-white p-6 shadow-inner select-none">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-black text-2xl text-[#FD91CC] mb-2 shadow-sm">
          {projectInitials}
        </div>
        <p className="font-display font-bold text-sm text-center text-white/90">
          {projectTitle}
        </p>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-white/60 mt-1">
          Dokumentasi Proyek
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative w-full h-64 sm:h-84 rounded-2xl overflow-hidden bg-black/90 border border-[#09318D]/20 group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label={`Galeri media ${projectTitle}, geser dengan panah kiri atau kanan`}
      >
        {/* Slides Track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mediaItems.map((item, idx) => {
            const isVideo = item.type === 'video';
            const isEmbed = item.type === 'embed';

            return (
              <div
                key={idx}
                className="w-full h-full shrink-0 relative bg-black flex items-center justify-center overflow-hidden"
              >
                {isVideo ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[idx] = el;
                      }}
                      src={item.src}
                      poster={item.poster || undefined}
                      preload="metadata"
                      controls
                      playsInline
                      className="w-full h-full object-contain bg-black"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Browser Anda tidak mendukung tag video.
                    </video>

                    {/* Badge: Video Demo */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#09318D]/85 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-md">
                        <Play className="w-2.5 h-2.5 text-[#FD91CC] fill-current" />
                        <span>Video Demo</span>
                      </span>
                    </div>

                    {/* Fullscreen modal trigger button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        pauseAllVideos();
                        setCurrentIndex(idx);
                        setLightboxOpen(true);
                      }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#09318D]/80 hover:bg-[#09318D] text-white backdrop-blur-md border border-white/20 shadow-md transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
                      title="Buka Video di Layar Penuh"
                      aria-label="Buka Video di Layar Penuh"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#FD91CC]" />
                    </button>
                  </div>
                ) : isEmbed ? (
                  <div className="relative w-full h-full bg-black">
                    <iframe
                      src={item.embedUrl}
                      title={item.title || `${projectTitle} - Video ${idx + 1}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#09318D]/85 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-md">
                        <Video className="w-3 h-3 text-[#FD91CC]" />
                        <span>Video Embed</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer bg-[#09318D]"
                    onClick={() => {
                      pauseAllVideos();
                      setCurrentIndex(idx);
                      setLightboxOpen(true);
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.title || `${projectTitle} - Tampilan ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Zoom hint overlay */}
                    <div className="absolute inset-0 bg-[#09318D]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#09318D]/85 backdrop-blur-md text-xs font-bold border border-white/20 text-[#FD91CC] shadow-lg">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Perbesar Foto</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Previous Button */}
        {mediaItems.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#09318D]/80 hover:bg-[#09318D] text-white shadow-md border border-white/20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
            aria-label="Media sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 text-[#FD91CC]" />
          </button>
        )}

        {/* Next Button */}
        {mediaItems.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#09318D]/80 hover:bg-[#09318D] text-white shadow-md border border-white/20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
            aria-label="Media berikutnya"
          >
            <ChevronRight className="w-4 h-4 text-[#FD91CC]" />
          </button>
        )}

        {/* Dots & Media Indicators */}
        {mediaItems.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto">
            {mediaItems.map((item, idx) => {
              const isVideo = item.type === 'video' || item.type === 'embed';
              const isActive = idx === currentIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    pauseAllVideos();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all flex items-center justify-center ${
                    isActive
                      ? isVideo
                        ? 'w-6 bg-[#FD91CC] text-[#09318D]'
                        : 'w-6 bg-[#FD91CC]'
                      : isVideo
                      ? 'w-3 bg-white/70 hover:bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Pindah ke slide ${idx + 1} (${isVideo ? 'Video' : 'Foto'})`}
                >
                  {isVideo && (
                    <Play className="w-1.5 h-1.5 fill-current" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Zoom / Fullscreen Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        media={mediaItems}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => {
          pauseAllVideos();
          setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
        }}
        onNext={() => {
          pauseAllVideos();
          setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
        }}
      />
    </>
  );
}
