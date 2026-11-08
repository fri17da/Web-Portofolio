<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    /**
     * Catat kunjungan pengunjung (1 kunjungan unik per IP + User Agent + Tanggal).
     */
    public function record(Request $request): JsonResponse
    {
        $ip = $request->ip() ?? '127.0.0.1';
        $userAgent = $request->userAgent() ?? 'unknown';
        $today = now()->toDateString();

        $fingerprint = hash('sha256', "{$ip}|{$userAgent}|{$today}");

        $visit = Visit::firstOrCreate(
            ['fingerprint' => $fingerprint],
            ['visited_on' => $today]
        );

        return response()->json([
            'success' => true,
            'message' => 'Kunjungan berhasil dicatat.',
            'created' => $visit->wasRecentlyCreated,
        ]);
    }

    /**
     * Dapatkan statistik total pengunjung dan pengunjung hari ini.
     */
    public function stats(): JsonResponse
    {
        $today = now()->toDateString();

        $total = Visit::count();
        $todayCount = Visit::whereDate('visited_on', $today)->count();

        return response()->json([
            'total' => $total,
            'today' => $todayCount,
        ]);
    }

    /**
     * Dapatkan tren kunjungan 7 hari terakhir untuk mini line chart.
     */
    public function trend(): JsonResponse
    {
        $today = now();
        $startDate = (clone $today)->subDays(6)->startOfDay();

        $rawVisits = Visit::whereDate('visited_on', '>=', $startDate->toDateString())
            ->whereDate('visited_on', '<=', $today->toDateString())
            ->selectRaw('visited_on, count(*) as count')
            ->groupBy('visited_on')
            ->pluck('count', 'visited_on');

        $trend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = (clone $today)->subDays($i);
            $dateStr = $date->toDateString();
            $dayName = $date->translatedFormat('D');

            $trend[] = [
                'date' => $dateStr,
                'day' => $dayName,
                'count' => (int) ($rawVisits[$dateStr] ?? 0),
            ];
        }

        return response()->json([
            'trend' => $trend,
        ]);
    }
}
