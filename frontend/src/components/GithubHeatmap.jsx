import React, { useEffect, useState, useRef } from 'react';
import { getGitHubContributions } from '../services/api';
import { ExternalLink, RefreshCw, AlertCircle, Flame, CalendarDays } from 'lucide-react';
import { GithubIcon } from './Icons';

const LEVEL_COLORS = {
  NONE: 'bg-[#09318D]/5 border-[#09318D]/10 hover:border-[#FD91CC]/60',
  FIRST_QUARTILE: 'bg-[#FD91CC]/35 border-[#FD91CC]/50 hover:border-[#FD91CC]',
  SECOND_QUARTILE: 'bg-[#FD91CC]/65 border-[#FD91CC]/70 hover:border-[#09318D]',
  THIRD_QUARTILE: 'bg-[#FD91CC] border-[#FD91CC] hover:scale-125 shadow-xs',
  FOURTH_QUARTILE: 'bg-[#de358e] border-[#de358e] hover:scale-125 shadow-xs',
};

export default function GithubHeatmap() {
  const [rawData, setRawData] = useState(null);
  const [activeTab, setActiveTab] = useState('last_year');
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [extraStat, setExtraStat] = useState({ mostActiveMonth: '', maxDayCount: 0 });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const availableTabs = [
    { id: 'last_year', label: '1 Tahun Terakhir' },
    { id: '2026', label: '2026' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
  ];

  const fetchContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGitHubContributions();
      setRawData(data);

      const defaultTabId = data.defaultTab || 'last_year';
      setActiveTab(defaultTabId);

      const initialCalendar = data.tabs?.[defaultTabId] || {
        totalContributions: data.totalContributions || 253,
        weeks: data.weeks || [],
        title: 'dalam 1 tahun terakhir',
      };

      setCalendar(initialCalendar);
      computeExtraStats(initialCalendar);
    } catch (err) {
      setError(err.message || 'Gagal memuat aktivitas kontribusi GitHub.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // Update kalender saat user memilih tab (1 Tahun Terakhir / 2026 / 2025 / 2024)
  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    if (rawData?.tabs?.[tabId]) {
      const tabCalendar = rawData.tabs[tabId];
      setCalendar(tabCalendar);
      computeExtraStats(tabCalendar);
    }
  };

  // Hitung bulan paling aktif & puncak kontribusi per hari
  const computeExtraStats = (data) => {
    if (!data?.weeks) return;
    const monthCounts = {};
    let maxCount = 0;

    data.weeks.forEach((w) => {
      w.contributionDays?.forEach((d) => {
        if (d.isInYear === false) return;
        if (d.contributionCount > maxCount) maxCount = d.contributionCount;
        if (d.date && d.contributionCount > 0) {
          const mKey = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(d.date));
          monthCounts[mKey] = (monthCounts[mKey] || 0) + d.contributionCount;
        }
      });
    });

    let topMonth = '';
    let topMonthCount = 0;
    Object.entries(monthCounts).forEach(([m, count]) => {
      if (count > topMonthCount) {
        topMonthCount = count;
        topMonth = m;
      }
    });

    setExtraStat({
      mostActiveMonth: topMonth ? `${topMonth} (${topMonthCount} kontribusi)` : 'Belum ada aktivitas',
      maxDayCount: maxCount || 0,
    });
  };

  // IntersectionObserver untuk trigger animasi masuk
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Animasi count-up untuk total kontribusi saat tab berganti
  useEffect(() => {
    if (!calendar?.totalContributions && calendar?.totalContributions !== 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isVisible) {
      setAnimatedTotal(calendar.totalContributions || 0);
      return;
    }

    let start = 0;
    const end = calendar.totalContributions;
    if (end === 0) {
      setAnimatedTotal(0);
      return;
    }

    const duration = 500;
    const increment = Math.max(1, Math.ceil(end / 20));
    const stepTime = Math.max(15, Math.floor(duration / (end / increment)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedTotal(end);
        clearInterval(timer);
      } else {
        setAnimatedTotal(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, calendar, activeTab]);

  // Scroll ke minggu kanan di mobile
  useEffect(() => {
    if (calendar && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [calendar]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  // Penempatan label bulan presisi per-kolom minggu
  const getWeekMonthLabel = (weeks, weekIdx) => {
    if (!weeks || !weeks[weekIdx]) return null;
    const currentWeek = weeks[weekIdx];
    const days = currentWeek.contributionDays || [];
    if (!days.length) return null;

    const validDays = days.filter((d) => d.isInYear !== false && d.date);
    if (!validDays.length) return null;

    const firstDate = new Date(validDays[0].date);
    const month = firstDate.getMonth();

    if (weekIdx === 0) {
      return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(firstDate);
    }

    const prevWeek = weeks[weekIdx - 1];
    const prevValidDays = (prevWeek?.contributionDays || []).filter((d) => d.isInYear !== false && d.date);
    if (!prevValidDays.length) {
      return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(firstDate);
    }

    const prevMonth = new Date(prevValidDays[0].date).getMonth();
    if (month !== prevMonth && weekIdx < weeks.length - 2) {
      return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(firstDate);
    }

    return null;
  };

  return (
    <section
      id="github"
      ref={containerRef}
      className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10"
      aria-labelledby="github-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            Aktivitas Kode Publik & Proyek
          </div>
          <h2 id="github-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            GitHub Contributions
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            Grafik komitmen kode dan kolaborasi repositori untuk profil{' '}
            <strong className="text-[#09318D]">@fri17da</strong>. Pilih tab <strong>1 Tahun Terakhir</strong> atau tab tahun <strong>2026</strong>, <strong>2025</strong>, dan <strong>2024</strong>.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white border border-[#09318D]/15 rounded-3xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-lg relative overflow-hidden">
          
          {/* Header Bar: Link, Big Counter, and Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-[#09318D]/10">
            <div>
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-[#09318D]" />
                <a
                  href="https://github.com/fri17da"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg sm:text-xl font-bold text-[#09318D] hover:underline flex items-center gap-1.5"
                >
                  <span>github.com/fri17da</span>
                  <ExternalLink className="w-4 h-4 text-[#FD91CC]" />
                </a>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-black text-[#09318D]">
                  {loading ? '...' : animatedTotal}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#09318D]/70">
                  kontribusi {calendar?.title || 'dalam 1 tahun terakhir'}
                </span>
              </div>
            </div>

            {/* Right: Year Tabs & Active Month Badge */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tabs: 1 Tahun Terakhir | 2026 | 2025 | 2024 */}
              <div className="inline-flex items-center p-1.5 bg-[#09318D]/5 border border-[#09318D]/15 rounded-2xl gap-1" role="tablist" aria-label="Filter kontribusi">
                <CalendarDays className="w-4 h-4 text-[#09318D]/60 ml-2 mr-1 shrink-0" />
                {availableTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleTabSelect(tab.id)}
                      className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#09318D] text-white shadow-sm scale-105'
                          : 'text-[#09318D]/75 hover:text-[#09318D] hover:bg-white/80'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Bulan Paling Aktif */}
              {extraStat.mostActiveMonth && !loading && (
                <div className="bg-[#09318D]/5 border border-[#09318D]/10 rounded-2xl px-3.5 py-2 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#09318D] text-[#FD91CC]">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#09318D]/60 block leading-tight">
                      Paling Aktif
                    </span>
                    <span className="text-xs font-bold text-[#09318D] leading-tight">
                      {extraStat.mostActiveMonth}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="py-10 space-y-4" role="status" aria-label="Memuat grafik kontribusi">
              <div className="h-4 w-40 bg-[#09318D]/10 rounded animate-pulse" />
              <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-hidden py-3">
                {Array.from({ length: 53 * 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-xs bg-[#09318D]/10 animate-pulse"
                    style={{ animationDelay: `${(i % 14) * 40}ms` }}
                  />
                ))}
              </div>
              <p className="text-xs text-[#09318D]/60 text-center animate-pulse">
                Memuat 253 kontribusi GitHub @fri17da...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="py-10 text-center space-y-3" role="alert">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#09318D]">Gagal Memuat Data Kontribusi</p>
              <p className="text-xs text-[#09318D]/70 max-w-sm mx-auto">{error}</p>
              <button
                type="button"
                onClick={fetchContributions}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#09318D] text-white text-xs font-bold hover:bg-[#09318D]/90 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>
            </div>
          )}

          {/* Heatmap Grid */}
          {!loading && !error && calendar && (
            <div className="mt-6 space-y-4">
              <div
                ref={scrollRef}
                className="overflow-x-auto pb-4 custom-scrollbar focus:outline-none"
                tabIndex={0}
                aria-label={`Heatmap kontribusi GitHub fri17da ${calendar?.title || ''}`}
              >
                <div className="min-w-fit flex flex-col pr-2">
                  
                  {/* Month labels row - sejajar presisi per-kolom minggu */}
                  <div className="flex items-center gap-2.5 mb-2 select-none h-4">
                    <div className="w-5 shrink-0" />
                    <div className="flex gap-1">
                      {calendar.weeks.map((week, weekIdx) => {
                        const monthLabel = getWeekMonthLabel(calendar.weeks, weekIdx);
                        return (
                          <div key={weekIdx} className="w-3.5 shrink-0 relative">
                            {monthLabel && (
                              <span className="absolute left-0 top-0 text-[11px] font-bold text-[#09318D] whitespace-nowrap">
                                {monthLabel}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Day Rows + Week Columns Grid */}
                  <div className="flex items-start gap-2.5">
                    {/* Day labels (Minggu=0, Sen=1, Rab=3, Jum=5) */}
                    <div className="flex flex-col gap-1 text-[10px] font-bold text-[#09318D]/60 justify-between py-0.5 select-none w-5 shrink-0">
                      <span className="h-3.5 leading-3.5 opacity-0">Min</span>
                      <span className="h-3.5 leading-3.5">Sen</span>
                      <span className="h-3.5 leading-3.5 opacity-0">Sel</span>
                      <span className="h-3.5 leading-3.5">Rab</span>
                      <span className="h-3.5 leading-3.5 opacity-0">Kam</span>
                      <span className="h-3.5 leading-3.5">Jum</span>
                      <span className="h-3.5 leading-3.5 opacity-0">Sab</span>
                    </div>

                    {/* Columns of weeks */}
                    <div className="flex gap-1">
                      {calendar.weeks.map((week, weekIdx) => {
                        const days = week.contributionDays || [];
                        const firstDayWeekday = days[0]?.weekday ?? 0;
                        
                        const spacers = weekIdx === 0 && firstDayWeekday > 0
                          ? Array.from({ length: firstDayWeekday })
                          : [];

                        const animationDelay = isVisible ? `${Math.min(weekIdx * 16, 900)}ms` : '0ms';

                        return (
                          <div key={weekIdx} className="flex flex-col gap-1">
                            {/* Empty spacer cells */}
                            {spacers.map((_, sIdx) => (
                              <div key={`spacer-${sIdx}`} className="w-3.5 h-3.5" />
                            ))}

                            {/* Actual day cells */}
                            {days.map((day, dayIdx) => {
                              if (day.isInYear === false) {
                                return (
                                  <div
                                    key={dayIdx}
                                    className="w-3.5 h-3.5 rounded-xs opacity-0 pointer-events-none"
                                    aria-hidden="true"
                                  />
                                );
                              }

                              const levelClass = LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE;
                              const count = day.contributionCount || 0;
                              const tooltipText = `${count} kontribusi pada ${formatDate(day.date)}`;

                              return (
                                <button
                                  key={dayIdx}
                                  type="button"
                                  tabIndex={0}
                                  aria-label={tooltipText}
                                  style={{ animationDelay }}
                                  onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setActiveTooltip({
                                      text: tooltipText,
                                      x: rect.left + rect.width / 2,
                                      y: rect.top,
                                    });
                                  }}
                                  onMouseLeave={() => setActiveTooltip(null)}
                                  onFocus={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setActiveTooltip({
                                      text: tooltipText,
                                      x: rect.left + rect.width / 2,
                                      y: rect.top,
                                    });
                                  }}
                                  onBlur={() => setActiveTooltip(null)}
                                  className={`w-3.5 h-3.5 rounded-xs border transition-all duration-150 ${levelClass} ${
                                    isVisible ? 'animate-in fade-in zoom-in-50' : 'opacity-0'
                                  }`}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Legend & Hint */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs text-[#09318D]/70 border-t border-[#09318D]/10">
                <span className="text-[11px] text-[#09318D]/60 hidden sm:inline">
                  Arahkan kursor pada kotak untuk melihat detail tanggal dan jumlah kontribusi
                </span>
                <span className="text-[11px] text-[#09318D]/60 sm:hidden">
                  Arahkan pada kotak untuk detail kontribusi
                </span>

                {/* 5-Level Pink Legend */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-[11px] font-bold text-[#09318D]/70">Sedikit</span>
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#09318D]/5 border border-[#09318D]/15" title="0 kontribusi (NONE)" />
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#FD91CC]/35 border border-[#FD91CC]/50" title="1-2 kontribusi (FIRST_QUARTILE)" />
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#FD91CC]/65 border border-[#FD91CC]/70" title="3-5 kontribusi (SECOND_QUARTILE)" />
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#FD91CC] border border-[#FD91CC]" title="6-9 kontribusi (THIRD_QUARTILE)" />
                  <div className="w-3.5 h-3.5 rounded-xs bg-[#de358e] border border-[#de358e]" title="10+ kontribusi (FOURTH_QUARTILE)" />
                  <span className="text-[11px] font-bold text-[#09318D]/70">Banyak</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Floating Tooltip */}
      {activeTooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 text-xs font-bold text-white bg-[#09318D] rounded-lg shadow-xl border border-[#FD91CC] -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap transition-opacity animate-in fade-in"
          style={{
            left: `${activeTooltip.x}px`,
            top: `${activeTooltip.y - 8}px`,
          }}
          role="tooltip"
        >
          {activeTooltip.text}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#09318D] border-b border-r border-[#FD91CC] rotate-45" />
        </div>
      )}
    </section>
  );
}
