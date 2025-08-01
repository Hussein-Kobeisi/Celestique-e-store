<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Daily_revenue extends Model
{
    /** @use HasFactory<\Database\Factories\DailyRevenueFactory> */
    use HasFactory;

    protected $fillable = [
        'date',
        'revenue'
    ];
}
