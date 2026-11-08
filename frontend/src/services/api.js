const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Catat kunjungan pengunjung saat ini ke backend
 */
export async function recordVisit() {
  try {
    const res = await fetch(`${API_BASE_URL}/visit`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      console.warn('Gagal mencatat kunjungan:', res.statusText);
    }
    return await res.json().catch(() => null);
  } catch (error) {
    console.warn('Error saat mencatat kunjungan:', error);
    return null;
  }
}

/**
 * Ambil statistik pengunjung (total & hari ini)
 */
export async function getVisitorStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/visitors`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error saat mengambil statistik pengunjung:', error);
    throw error;
  }
}

/**
 * Ambil tren pengunjung 7 hari terakhir untuk mini line chart
 */
export async function getVisitorTrend() {
  try {
    const res = await fetch(`${API_BASE_URL}/visitors/trend`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const json = await res.json();
    return json.trend || [];
  } catch (error) {
    console.warn('Gagal memuat tren pengunjung:', error);
    return [];
  }
}

/**
 * Ambil kalender kontribusi GitHub dari backend proxy
 */
export async function getGitHubContributions() {
  try {
    const res = await fetch(`${API_BASE_URL}/github/contributions`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || `Gagal memuat kontribusi (${res.status})`);
    }
    return json.data;
  } catch (error) {
    console.error('Error saat mengambil kontribusi GitHub:', error);
    throw error;
  }
}
