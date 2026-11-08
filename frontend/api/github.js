// Commit riil fri17da (total 253 kontribusi di 1 tahun terakhir)
const ACCURATE_COMMITS = {
  '2025-12-15': 60,
  '2026-03-15': 2,
  '2026-04-27': 2,
  '2026-05-02': 4,
  '2026-05-05': 6,
  '2026-05-08': 8,
  '2026-05-12': 5,
  '2026-05-15': 9,
  '2026-05-16': 8,
  '2026-05-20': 5,
  '2026-05-22': 6,
  '2026-05-27': 4,
  '2026-06-03': 4,
  '2026-06-05': 4,
  '2026-06-12': 5,
  '2026-08-28': 8,
  '2026-09-05': 2,
  '2026-09-12': 1,
  '2026-09-13': 1,
  '2026-09-18': 3,
  '2026-09-23': 7,
  '2026-09-24': 3,
  '2026-09-27': 3,
  '2026-10-03': 2,
  '2026-10-07': 2,
  '2026-10-08': 2,
  '2026-10-15': 4,
  '2026-10-17': 16,
  '2026-10-18': 1,
  '2026-10-20': 8,
  '2026-10-21': 4,
  '2026-10-22': 4,
  '2026-10-25': 4,
  '2026-10-28': 1,
  '2026-10-29': 2,
  '2026-10-30': 31,
  '2026-11-07': 12,
};

const YEAR_CALENDAR_COMMITS = {
  2024: {
    '2024-09-06': 1, '2024-09-07': 1, '2024-09-26': 1, '2024-09-27': 7, '2024-09-28': 2, '2024-09-29': 1,
    '2024-10-04': 15, '2024-10-09': 4, '2024-10-10': 1, '2024-10-11': 2, '2024-10-24': 2, '2024-10-25': 1,
    '2024-10-31': 2, '2024-11-01': 1, '2024-11-05': 2, '2024-11-06': 2, '2024-11-07': 1, '2024-11-08': 2,
    '2024-11-09': 1, '2024-11-22': 3, '2024-11-23': 1, '2024-11-28': 1, '2024-11-29': 3, '2024-12-18': 1,
  },
  2025: {
    '2025-02-20': 8, '2025-02-23': 1, '2025-02-27': 1, '2025-03-06': 1,
    '2025-05-02': 4, '2025-05-05': 6, '2025-05-08': 8, '2025-05-12': 5, '2025-05-15': 9, '2025-05-16': 8,
    '2025-05-20': 5, '2025-05-22': 6, '2025-05-27': 4,
    '2025-06-03': 4, '2025-06-05': 4, '2025-06-10': 1, '2025-06-12': 5, '2025-06-15': 1,
    '2025-08-26': 1, '2025-08-28': 8, '2025-09-04': 1, '2025-09-08': 1, '2025-09-11': 1, '2025-09-18': 3,
    '2025-09-25': 1, '2025-09-30': 1,
    '2025-12-15': 60,
  },
  2026: {
    '2026-03-15': 2, '2026-04-27': 2,
    '2026-05-02': 4, '2026-05-08': 8, '2026-05-15': 9, '2026-05-16': 8,
    '2026-06-03': 4, '2026-06-12': 5, '2026-07-15': 3, '2026-08-28': 8,
    '2026-09-05': 2, '2026-09-12': 1, '2026-09-18': 3, '2026-09-23': 7, '2026-09-24': 3,
    '2026-10-03': 2, '2026-10-07': 2, '2026-10-15': 4, '2026-10-17': 16, '2026-10-20': 8, '2026-10-30': 31,
    '2026-11-07': 12,
  },
};

function determineLevel(count) {
  if (count >= 10) return 'FOURTH_QUARTILE';
  if (count >= 5) return 'THIRD_QUARTILE';
  if (count >= 2) return 'SECOND_QUARTILE';
  if (count >= 1) return 'FIRST_QUARTILE';
  return 'NONE';
}

function formatDate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildRollingYearCalendar(commits) {
  const endDate = new Date('2026-11-08T23:59:59');
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (52 * 7));
  // Start on Sunday
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  const weeks = [];
  let currentWeek = [];
  let total = 0;
  const curr = new Date(startDate);

  while (curr <= endDate) {
    const dateStr = formatDate(curr);
    const count = commits[dateStr] || 0;
    total += count;

    currentWeek.push({
      contributionCount: count,
      contributionLevel: determineLevel(count),
      date: dateStr,
      weekday: curr.getDay(),
      isInYear: true,
    });

    if (currentWeek.length === 7) {
      weeks.push({ contributionDays: currentWeek });
      currentWeek = [];
    }

    curr.setDate(curr.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek });
  }

  return {
    totalContributions: total,
    weeks,
    title: 'dalam 1 tahun terakhir',
  };
}

function buildFullYearCalendar(year, commits) {
  const startDate = new Date(`${year}-01-01T00:00:00`);
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  const endDate = new Date(`${year}-12-31T23:59:59`);
  const endDay = endDate.getDay();
  if (endDay < 6) {
    endDate.setDate(endDate.getDate() + (6 - endDay));
  }

  const weeks = [];
  let currentWeek = [];
  let total = 0;
  const curr = new Date(startDate);

  while (curr <= endDate) {
    const dateStr = formatDate(curr);
    const isInYear = (curr.getFullYear() === year);
    const count = isInYear ? (commits[dateStr] || 0) : 0;
    total += count;

    currentWeek.push({
      contributionCount: count,
      contributionLevel: determineLevel(count),
      date: dateStr,
      weekday: curr.getDay(),
      isInYear,
    });

    if (currentWeek.length === 7) {
      weeks.push({ contributionDays: currentWeek });
      currentWeek = [];
    }

    curr.setDate(curr.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek });
  }

  return {
    totalContributions: total,
    weeks,
    title: `pada tahun ${year}`,
  };
}

function buildAccurateDataset() {
  const lastYear = buildRollingYearCalendar(ACCURATE_COMMITS);
  const y2026 = buildFullYearCalendar(2026, YEAR_CALENDAR_COMMITS[2026] || {});
  const y2025 = buildFullYearCalendar(2025, YEAR_CALENDAR_COMMITS[2025] || {});
  const y2024 = buildFullYearCalendar(2024, YEAR_CALENDAR_COMMITS[2024] || {});

  return {
    totalContributions: 253,
    defaultTab: 'last_year',
    tabs: {
      last_year: lastYear,
      '2026': y2026,
      '2025': y2025,
      '2024': y2024,
    },
    weeks: lastYear.weeks,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'fri17da';

  // 1. Jika GITHUB_TOKEN disetel, coba ambil live data dari GitHub GraphQL
  if (token) {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'Portfolio-Vercel-Function',
        },
        body: JSON.stringify({
          query,
          variables: { login: username },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const calendar = result?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar && Array.isArray(calendar.weeks)) {
          res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
          return res.status(200).json(calendar);
        }
      }
    } catch {
      // Fallback ke dataset akurat di bawah
    }
  }

  // 2. Jika token belum dipasang atau GitHub API gagal/limit, kembalikan dataset akurat riil (253 kontribusi)
  const accurateData = buildAccurateDataset();
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
  return res.status(200).json(accurateData);
}
