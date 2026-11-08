<?php

use App\Http\Controllers\GitHubController;
use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;

// GitHub contribution endpoint (cached for 1 hour)
Route::get('/github/contributions', [GitHubController::class, 'contributions']);

// Visitor counter endpoints (with throttle protection)
Route::post('/visit', [VisitController::class, 'record'])->middleware('throttle:60,1');
Route::get('/visitors', [VisitController::class, 'stats']);
Route::get('/visitors/trend', [VisitController::class, 'trend']);
