import { supabase } from './supabase';

/**
 * Registrasi kunjungan pengunjung menggunakan Supabase RPC
 * Mengembalikan objek { total, today }
 */
export async function registerVisit() {
  if (!supabase) {
    return null;
  }

  let visitorId = null;
  try {
    visitorId = localStorage.getItem('portfolio_visitor_id');
    if (!visitorId) {
      visitorId = typeof crypto?.randomUUID === 'function'
        ? crypto.randomUUID()
        : 'v-' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('portfolio_visitor_id', visitorId);
    }
  } catch {
    visitorId = 'anon-' + Math.random().toString(36).substring(2, 15);
  }

  const { data, error } = await supabase.rpc('register_visit', { p_visitor_id: visitorId });
  if (error) {
    throw error;
  }
  return data;
}

/**
 * Ambil data kontribusi GitHub dari Vercel Serverless Function (/api/github)
 * Mengembalikan objek contributionCalendar:
 * { totalContributions, weeks: [{ contributionDays: [{ date, contributionCount, contributionLevel }] }] }
 */
export async function getGitHubContributions() {
  const res = await fetch('/api/github', {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `Gagal mengambil data GitHub (${res.status})`);
  }

  const calendarData = await res.json();
  return calendarData;
}
