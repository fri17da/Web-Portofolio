<?php

namespace Tests\Feature;

use App\Models\Visit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PortfolioApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_visitors_endpoint_returns_initial_zero_stats(): void
    {
        $response = $this->getJson('/api/visitors');

        $response->assertStatus(200)
            ->assertJson([
                'total' => 0,
                'today' => 0,
            ]);
    }

    public function test_visit_endpoint_records_unique_daily_visitor(): void
    {
        // First visit
        $res1 = $this->postJson('/api/visit');
        $res1->assertStatus(200)
            ->assertJson([
                'success' => true,
                'created' => true,
            ]);

        $this->assertDatabaseCount('visits', 1);

        // Same visitor repeating today
        $res2 = $this->postJson('/api/visit');
        $res2->assertStatus(200)
            ->assertJson([
                'success' => true,
                'created' => false,
            ]);

        // Total visits should still be 1 (counted once per day)
        $this->assertDatabaseCount('visits', 1);

        // Verify stats reflect 1
        $stats = $this->getJson('/api/visitors');
        $stats->assertStatus(200)
            ->assertJson([
                'total' => 1,
                'today' => 1,
            ]);
    }

    public function test_github_contributions_endpoint_returns_calendar_structure(): void
    {
        $response = $this->getJson('/api/github/contributions');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'username',
                'data' => [
                    'totalContributions',
                    'weeks',
                ],
            ]);
    }

    public function test_visitors_trend_endpoint_returns_7_day_array(): void
    {
        $this->postJson('/api/visit');

        $response = $this->getJson('/api/visitors/trend');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'trend' => [
                    '*' => ['date', 'day', 'count'],
                ],
            ]);

        $this->assertCount(7, $response->json('trend'));
    }
}
