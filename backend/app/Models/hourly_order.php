<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hourly_order extends Model
{
    /** @use HasFactory<\Database\Factories\HourlyOrderFactory> */
    use HasFactory;

    protected $fillable = [
        'date_time',
        'order_count'
    ];
}
