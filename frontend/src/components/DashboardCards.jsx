import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getVisitorStats, getVisitorTrend, getGitHubContributions } from '../services/api';
import { Activity, Award, TrendingUp, Users, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

const LEVEL_COLORS = {
  NONE: 'bg-white/10',
  FIRST_QUARTILE: 'bg-[#FD91CC]/40',
  SECOND_QUARTILE: 'bg-[#FD91CC]/70',
  THIRD_QUARTILE: 'bg-[#FD91CC]',
  FOURTH_QUARTILE: 'bg-[#de358e]',
};

export default function DashboardCards() {
  const { t } = useLanguage();

  // 1. GitHub state
  const [calendar, setCalendar] = useState(null);
  const [loadingGit, setLoadingGit] = useState(true);

  // 2. Visitor state & 7-day trend
  const [visitorStats, setVisitorStats] = useState({ total: 0, today: 0 });
  const [trend, setTrend] = useState([]);
  const [loadingVisitors, setLoadingVisitors] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const gitData = await getGitHubContributions();
        if (isMounted) setCalendar(gitData);
      } catch (e) {
        console.warn('GitHub dashboard card fallback:', e);
      } finally {
        if (isMounted) setLoadingGit(false);
      }

      try {
        const stats = await getVisitorStats();
        if (isMounted && stats) {
          setVisitorStats({ total: stats.total || 0, today: stats.today || 0 });
        }
        const trendData = await getVisitorTrend();
        if (isMounted && trendData) {
          setTrend(trendData);
        }
      } catch (e) {
        console.warn('Visitor trend notice:', e);
      } finally {
        if (isMounted) setLoadingVisitors(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute SVG coordinates for the 7-day trend line
  const trendPoints = () => {
    if (!trend || trend.length === 0) {
      return { path: 'M 0 45 L 200 45', fill: 'M 0 45 L 200 45 L 200 60 L 0 60 Z', points: [] };
    }

    const width = 200;
    const height = 45;
    const maxVal = Math.max(...trend.map((d) => d.count), 4);
    const stepX = width / (trend.length - 1 || 1);

    const coords = trend.map((d, i) => {
      const x = i * stepX;
      const y = height - (d.count / maxVal) * (height - 10) - 5;
      return { x, y, ...d };
    });

    const path = coords.map((c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `L ${c.x} ${c.y}`)).join(' ');
    const fill = `${path} L ${width} 55 L 0 55 Z`;

    return { path, fill, coords };
  };

  const { path: trendPath, fill: trendFill, coords: trendCoords } = trendPoints();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8 lg:mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
        
        {/* CARD 1 (Left): GitHub Contribution Mini Heatmap */}
        <div className="lg:col-span-4 bg-[#09318D]/75 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl shadow-[#09318D]/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#FD91CC]/60 group">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-[#FD91CC] border border-white/10">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white leading-tight">
                    {t.dashboard.githubTitle}
                  </h4>
                  <span className="text-[10px] font-semibold text-[#FD91CC]">
                    {t.dashboard.fri17da}
                  </span>
                </div>
              </div>
              <a
                href="https://github.com/fri17da"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Profil GitHub"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Total count badge */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-white">
                {loadingGit ? '...' : calendar?.totalContributions ?? 174}
              </span>
              <span className="text-xs text-white/80 font-medium">
                {t.dashboard.totalContr}
              </span>
            </div>
            <p className="text-[11px] text-white/70 mt-1">
              {t.dashboard.githubSub}
            </p>

            {/* Micro contribution grid (Recent 20 weeks) */}
            <div className="mt-4 overflow-x-auto custom-scrollbar pb-1">
              <div className="flex gap-1 min-w-fit">
                {loadingGit ? (
                  Array.from({ length: 20 }).map((_, w) => (
                    <div key={w} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, d) => (
                        <div key={d} className="w-2.5 h-2.5 rounded-xs bg-white/10 animate-pulse" />
                      ))}
                    </div>
                  ))
                ) : calendar?.weeks ? (
                  calendar.weeks.slice(-22).map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.contributionDays.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          title={`${day.date}: ${day.contributionCount} kontribusi`}
                          className={`w-2.5 h-2.5 rounded-xs transition-transform hover:scale-125 ${
                            LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE
                          }`}
                        />
                      ))}
                    </div>
                  ))
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60 font-medium">
            <span>Aktif berkolaborasi kode</span>
            <span className="text-[#FD91CC]">Terverifikasi</span>
          </div>
        </div>

        {/* CARD 2 (Center - Largest & Dominant): SUS Score / Key Metric Gauge */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#09318D]/90 via-[#0d3dae]/80 to-[#FD91CC]/25 backdrop-blur-2xl border-2 border-[#FD91CC]/50 rounded-3xl p-6 shadow-2xl shadow-[#FD91CC]/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FD91CC] relative overflow-hidden group">
          {/* Subtle glow highlight */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD91CC]/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#FD91CC] text-[#09318D] shadow-sm">
                Analyst Benchmark
              </span>
              <Award className="w-5 h-5 text-[#FD91CC]" />
            </div>

            {/* Circular Gauge / Ring */}
            <div className="my-4 flex items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="8"
                  />
                  {/* Progress Arc: 82.5% of circumference 251.2 = ~207 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#FD91CC"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="44"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Score in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-3xl font-black text-white leading-none">
                    82.5
                  </span>
                  <span className="text-[10px] font-bold text-[#FD91CC] uppercase tracking-wider mt-0.5">
                    Skor SUS
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-display text-sm font-bold text-white">
                {t.dashboard.gaugeTitle}
              </h4>
              <p className="text-[11px] font-semibold text-[#FD91CC]">
                {t.dashboard.gaugeGrade}
              </p>
              <p className="text-[11px] text-white/75 leading-relaxed pt-1">
                {t.dashboard.gaugeSub}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <span className="font-display font-black text-sm text-white">
                {t.dashboard.gaugeMetric2}
              </span>
              <p className="text-[10px] text-white/70 font-medium">
                {t.dashboard.gaugeMetric2Label}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <span className="font-display font-black text-sm text-[#FD91CC]">
                {t.dashboard.gaugeMetric3}
              </span>
              <p className="text-[10px] text-white/70 font-medium">
                {t.dashboard.gaugeMetric3Label}
              </p>
            </div>
          </div>
        </div>

        {/* CARD 3 (Right): Visitor Counter with 7-Day Mini Line Chart */}
        <div className="lg:col-span-4 bg-[#09318D]/75 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl shadow-[#09318D]/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#FD91CC]/60 group">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-[#FD91CC] border border-white/10">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white leading-tight">
                    {t.dashboard.trendTitle}
                  </h4>
                  <span className="text-[10px] text-white/70 font-medium">
                    {t.dashboard.trendSub}
                  </span>
                </div>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-[#FD91CC] ring-4 ring-[#FD91CC]/30 animate-pulse" />
            </div>

            {/* Counts */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-white/70 block">
                  {t.dashboard.todayVisitors}
                </span>
                <span className="font-display text-2xl font-black text-[#FD91CC]">
                  {loadingVisitors ? '...' : visitorStats.today}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-white/70 block">
                  {t.dashboard.totalVisitors}
                </span>
                <span className="font-display text-2xl font-black text-white">
                  {loadingVisitors ? '...' : visitorStats.total}
                </span>
              </div>
            </div>

            {/* Mini Line Chart SVG */}
            <div className="mt-4 pt-2">
              <div className="flex items-center justify-between text-[10px] text-white/60 mb-1">
                <span>7 Hari Terakhir</span>
                <span className="text-[#FD91CC] font-semibold">Trafik Kunjungan</span>
              </div>

              <div className="w-full h-16 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 55" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FD91CC" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FD91CC" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path d={trendFill} fill="url(#trendGradient)" />
                  {/* Trend line */}
                  <path d={trendPath} fill="none" stroke="#FD91CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Dots */}
                  {trendCoords?.map((pt, idx) => (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={pt.y}
                      r="3.5"
                      fill="#FFFFFF"
                      stroke="#FD91CC"
                      strokeWidth="2"
                      className="transition-transform hover:scale-150"
                    >
                      <title>{`${pt.date}: ${pt.count} kunjungan`}</title>
                    </circle>
                  ))}
                </svg>
              </div>

              {/* Day labels */}
              <div className="flex justify-between text-[9px] text-white/50 mt-1 font-mono">
                {trend && trend.length > 0 ? (
                  trend.map((d, i) => <span key={i}>{d.day}</span>)
                ) : (
                  <span>Senin - Minggu</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60 text-right">
            {t.dashboard.uniqueNotice}
          </div>
        </div>

      </div>
    </div>
  );
}
