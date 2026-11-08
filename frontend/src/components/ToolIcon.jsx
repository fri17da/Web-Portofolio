import React from 'react';
import {
  SiPython,
  SiDart,
  SiJavascript,
  SiPhp,
  SiLaravel,
  SiReact,
  SiFlutter,
  SiBootstrap,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiXampp,
  SiLaragon,
  SiGooglecolab,
  SiFigma,
  SiCisco,
  SiGit,
  SiNotion,
  SiChartdotjs,
  SiPhpmyadmin,
  SiHtml5,
  SiCss,
  SiVite,
  SiOdoo,
} from 'react-icons/si';
import { FaJava, FaNetworkWired, FaFileExcel, FaFileWord, FaAws } from 'react-icons/fa';

// Monogram fallback for tools without an official Simple Icons entry
function MonogramIcon({ text, className }) {
  return (
    <div
      className={`inline-flex items-center justify-center font-display font-black text-[9px] leading-none rounded-md bg-[#09318D] text-[#FD91CC] border border-[#FD91CC]/60 select-none ${className || 'w-6 h-6'}`}
      title={text}
      aria-hidden="true"
    >
      {text.slice(0, 3).toUpperCase()}
    </div>
  );
}

const TOOL_MAP = {
  // ── Pemrograman & Web ──────────────────────────────────────────
  'java':              { icon: FaJava,        color: '#f89820' },
  'python':            { icon: SiPython,      color: '#3776AB' },
  'dart':              { icon: SiDart,        color: '#0175C2' },
  'javascript':        { icon: SiJavascript,  color: '#F7DF1E' },
  'php':               { icon: SiPhp,         color: '#777BB4' },
  'laravel':           { icon: SiLaravel,     color: '#FF2D20' },
  'laravel 13':        { icon: SiLaravel,     color: '#FF2D20' },
  'react':             { icon: SiReact,       color: '#61DAFB' },
  'flutter':           { icon: SiFlutter,     color: '#02569B' },
  'bootstrap':         { icon: SiBootstrap,   color: '#7952B3' },
  'html':              { icon: SiHtml5,       color: '#E34F26' },
  'css':               { icon: SiCss,         color: '#1572B6' },
  'blade':             { monogram: 'BLD' },
  'chart.js':          { icon: SiChartdotjs,  color: '#FF6384' },
  'phpunit':           { monogram: 'PHU' },
  'vite':              { icon: SiVite,        color: '#646CFF' },

  // ── Database ──────────────────────────────────────────────────
  'mysql':             { icon: SiMysql,       color: '#4479A1' },
  'postgresql':        { icon: SiPostgresql,  color: '#4169E1' },
  'supabase':          { icon: SiSupabase,    color: '#3ECF8E' },
  'sybase powerdesigner': { monogram: 'SPD' },
  'powerdesigner':     { monogram: 'SPD' },
  'laragon':           { icon: SiLaragon,     color: '#49A44A' },
  'xampp':             { icon: SiXampp,       color: '#FB7A24' },
  'sql':               { icon: SiMysql,       color: '#4479A1' },
  'phpmyadmin':        { icon: SiPhpmyadmin,  color: '#6C78AF' },

  // ── Data ──────────────────────────────────────────────────────
  'pentaho data integration': { monogram: 'PDI' },
  'pentaho':           { monogram: 'PDI' },
  'altair ai studio':  { monogram: 'AAI' },
  'altair':            { monogram: 'AAI' },
  'google colab':      { icon: SiGooglecolab, color: '#F9AB00' },
  'colab':             { icon: SiGooglecolab, color: '#F9AB00' },
  'power bi':          { monogram: 'PBI' },     // SiPowerbi not in this react-icons version
  'powerbi':           { monogram: 'PBI' },
  'excel':             { icon: FaFileExcel,   color: '#217346' },
  'microsoft excel':   { icon: FaFileExcel,   color: '#217346' },

  // ── Bisnis ───────────────────────────────────────────────────
  'odoo':              { icon: SiOdoo,        color: '#714B67' },
  'business model canvas': { monogram: 'BMC' },
  'bmc':               { monogram: 'BMC' },
  'value proposition canvas': { monogram: 'VPC' },
  'vpc':               { monogram: 'VPC' },

  // ── Desain & Editing ─────────────────────────────────────────
  'figma':             { icon: SiFigma,       color: '#F24E1E' },
  'canva':             { monogram: 'CNV' },   // SiCanva not in this react-icons version
  'capcut':            { monogram: 'CCT' },
  'ibispaint x':       { monogram: 'IPX' },
  'ibispaint':         { monogram: 'IPX' },

  // ── Jaringan, API, Versi kontrol ─────────────────────────────
  'cisco packet tracer': { icon: SiCisco,     color: '#1BA0D7' },
  'cisco':             { icon: SiCisco,       color: '#1BA0D7' },
  'gns3':              { monogram: 'GNS' },
  'rest api':          { icon: FaNetworkWired, color: '#09318D' },
  'api':               { icon: FaNetworkWired, color: '#09318D' },
  'git':               { icon: SiGit,         color: '#F05032' },
  'aws vpc':           { icon: FaAws,         color: '#FF9900' },
  'aws':               { icon: FaAws,         color: '#FF9900' },
  'duckdns':           { monogram: 'DNS' },
  'midtrans':          { monogram: 'MDT' },
  'biteship':          { monogram: 'BTS' },

  // ── Produktivitas ────────────────────────────────────────────
  'notion':            { icon: SiNotion,      color: '#000000' },
  'microsoft word':    { icon: FaFileWord,    color: '#2B579A' },
  'word':              { icon: FaFileWord,    color: '#2B579A' },
};

export default function ToolIcon({ name, size = 'md', className = '' }) {
  const cleanName = (name || '').trim().toLowerCase();
  const entry = TOOL_MAP[cleanName] || null;

  const sizeClass =
    size === 'sm' ? 'w-4 h-4 text-sm' :
    size === 'lg' ? 'w-8 h-8 text-xl' :
                    'w-6 h-6 text-base';

  if (!entry) {
    // Auto-generate initials from the name
    const initials = cleanName
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
    return <MonogramIcon text={initials || 'TL'} className={sizeClass} />;
  }

  if (entry.monogram) {
    return <MonogramIcon text={entry.monogram} className={sizeClass} />;
  }

  const IconComp = entry.icon;
  if (!IconComp) {
    return <MonogramIcon text={cleanName.slice(0, 3).toUpperCase()} className={sizeClass} />;
  }

  return (
    <IconComp
      className={`${sizeClass} ${className} shrink-0`}
      style={entry.color ? { color: entry.color } : undefined}
      aria-hidden="true"
    />
  );
}
