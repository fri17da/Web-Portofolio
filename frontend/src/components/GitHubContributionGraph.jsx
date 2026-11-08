import React, { useEffect, useState, useRef } from 'react';
import { getGitHubContributions } from '../services/api';
import { ExternalLink, RefreshCw, AlertCircle, Calendar } from 'lucide-react';

const LEVEL_COLORS = {
  NONE: 'bg-white/10 hover:border-white/40',
  FIRST_QUARTILE: 'bg-[#FD91CC]/35 hover:border-white/60',
  SECOND_QUARTILE: 'bg-[#FD91CC]/65 hover:border-white/80',
  THIRD_QUARTILE: 'bg-[#FD91CC] hover:ring-2 hover:ring-white',
  FOURTH_QUARTILE: 'bg-[#de358e] hover:ring-2 hover:ring-white',
};

const DAY_LABELS = [
  { index: 1, label: 'Sen' },
  { index: 3, label: 'Rab' },
  { index: 5, label: 'Jum' },
];

export default function GitHubContributionGraph() {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const scrollContainerRef = useRef(null);

  const fetchCalendar = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGitHubContributions();
      setCalendar(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat aktivitas kontribusi GitHub.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  // Otomatis scroll ke minggu terbaru di mobile/desktop
  useEffect(() => {
    if (calendar && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [calendar]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const getMonthLabels = (weeks) => {
    if (!weeks || weeks.length === 0) return [];
    const months = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays?.[0];
      if (firstDay?.date) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth && weekIndex < weeks.length - 1) {
          const monthName = new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(firstDay.date));
          months.push({ weekIndex, name: monthName });
          lastMonth = month;
        }
      }
    });
    return months;
  };

  return (
    <div className="w-full bg-[#09318D]/60 backdrop-blur-md border border-white/15 rounded-2xl p-5 md:p-6 shadow-2xl transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FD91CC]/20 text-[#FD91CC] border border-[#FD91CC]/30">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Aktivitas Kontribusi GitHub
              <span className="text-xs px-2.5 py-0.5 rounded-full font-sans font-medium bg-[#FD91CC] text-[#09318D]">
                @fri17da
              </span>
            </h3>
            <p className="text-xs md:text-sm text-white/80">
              {loading ? (
                'Memuat data kontribusi dari GitHub...'
              ) : calendar ? (
                <span>
                  <strong className="text-[#FD91CC] font-semibold">{calendar.totalContributions}</strong> kontribusi dalam setahun terakhir
                </span>
              ) : (
                'Riwayat kontribusi kode dan proyek publik'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <a
            href="https://github.com/fri17da"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
            aria-label="Kunjungi profil GitHub fri17da"
          >
            <span>Buka GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FD91CC]" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Main content: Loading, Error, or Calendar */}
      <div className="mt-5 relative">
        {loading && (
          <div className="w-full py-8 space-y-3" role="status" aria-label="Memuat grafik kontribusi">
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-hidden py-2">
              {Array.from({ length: 53 * 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-xs bg-white/10 animate-pulse"
                  style={{ animationDelay: `${(i % 14) * 50}ms` }}
                />
              ))}
            </div>
            <p className="text-center text-xs text-white/70 animate-pulse">Menghubungkan ke GitHub API...</p>
          </div>
        )}

        {!loading && error && (
          <div
            className="py-8 px-4 rounded-xl bg-red-900/20 border border-[#FD91CC]/30 text-center space-y-3"
            role="alert"
          >
            <div className="flex justify-center text-[#FD91CC]">
              <AlertCircle className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="max-w-md mx-auto">
              <p className="text-sm font-semibold text-white">Gagal Memuat Data Kontribusi</p>
              <p className="text-xs text-white/80 mt-1">{error}</p>
            </div>
            <button
              onClick={fetchCalendar}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#FD91CC] text-[#09318D] hover:bg-[#FD91CC]/90 transition-all focus-visible:ring-2 focus-visible:ring-white"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {!loading && !error && calendar && (
          <div className="space-y-3">
            {/* Heatmap with horizontal scroll support */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto pb-3 custom-scrollbar focus:outline-none"
              tabIndex={0}
              aria-label="Tabel heatmap kontribusi GitHub, gulir horizontal untuk navigasi tanggal"
            >
              <div className="min-w-fit flex flex-col pr-2">
                {/* Month labels header */}
                <div className="flex text-[11px] font-medium text-white/70 mb-2 pl-7 relative h-4">
                  {getMonthLabels(calendar.weeks).map((month, idx) => (
                    <span
                      key={idx}
                      className="absolute"
                      style={{
                        left: `${month.weekIndex * 15 + 28}px`,
                      }}
                    >
                      {month.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-start gap-2">
                  {/* Day labels (Mon, Wed, Fri) */}
                  <div className="flex flex-col gap-1 text-[10px] font-medium text-white/70 justify-between py-0.5 select-none w-5">
                    <span className="h-3 md:h-3.5 leading-3">Min</span>
                    <span className="h-3 md:h-3.5 leading-3">Sen</span>
                    <span className="h-3 md:h-3.5 leading-3">Sel</span>
                    <span className="h-3 md:h-3.5 leading-3">Rab</span>
                    <span className="h-3 md:h-3.5 leading-3">Kam</span>
                    <span className="h-3 md:h-3.5 leading-3">Jum</span>
                    <span className="h-3 md:h-3.5 leading-3">Sab</span>
                  </div>

                  {/* 53 Columns of Weeks */}
                  <div className="flex gap-1">
                    {calendar.weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-1">
                        {week.contributionDays.map((day, dayIdx) => {
                          const levelClass = LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE;
                          const count = day.contributionCount || 0;
                          const dayLabel = `${formatDate(day.date)}: ${count} kontribusi`;

                          return (
                            <button
                              key={dayIdx}
                              type="button"
                              tabIndex={0}
                              aria-label={dayLabel}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setActiveTooltip({
                                  text: dayLabel,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                });
                              }}
                              onMouseLeave={() => setActiveTooltip(null)}
                              onFocus={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setActiveTooltip({
                                  text: dayLabel,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                });
                              }}
                              onBlur={() => setActiveTooltip(null)}
                              className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-xs border border-transparent transition-transform hover:scale-125 focus-visible:scale-125 ${levelClass}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap Footer: Legend & Mobile Hint */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-white/75 border-t border-white/10">
              <span className="text-[11px] text-white/60 hidden sm:inline">
                Arahkan kursor atau fokus pada kotak untuk detail kontribusi
              </span>
              <span className="text-[11px] text-white/60 sm:hidden">
                Geser ke kanan/kiri untuk melihat seluruh minggu
              </span>

              {/* Legend with graded pink */}
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-[11px] text-white/70">Sedikit</span>
                <div className="w-3 h-3 rounded-xs bg-white/10" title="Tidak ada kontribusi" />
                <div className="w-3 h-3 rounded-xs bg-[#FD91CC]/35" title="Tingkat 1 (1–3 kontribusi)" />
                <div className="w-3 h-3 rounded-xs bg-[#FD91CC]/65" title="Tingkat 2 (4–6 kontribusi)" />
                <div className="w-3 h-3 rounded-xs bg-[#FD91CC]" title="Tingkat 3 (7–9 kontribusi)" />
                <div className="w-3 h-3 rounded-xs bg-[#de358e]" title="Tingkat 4 (10+ kontribusi)" />
                <span className="text-[11px] text-white/70">Banyak</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Tooltip */}
      {activeTooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 text-xs font-medium text-[#09318D] bg-white rounded-md shadow-xl border border-[#FD91CC] -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap transition-opacity animate-in fade-in"
          style={{
            left: `${activeTooltip.x}px`,
            top: `${activeTooltip.y - 8}px`,
          }}
          role="tooltip"
        >
          {activeTooltip.text}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-[#FD91CC] rotate-45" />
        </div>
      )}
    </div>
  );
}
