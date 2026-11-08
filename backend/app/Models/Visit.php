<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $fillable = [
        'fingerprint',
        'visited_on',
    ];

    protected $casts = [
        'visited_on' => 'date',
    ];
}
