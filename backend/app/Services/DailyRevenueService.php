<?php

namespace App\Services;

use App\Models\DailyRevenue;

class DailyRevenueService
{
    
    public static function addOrUpdateDailyRevenue(float $amount): DailyRevenue
    {
        $today = now()->format('Y-m-d');
        $dailyRevenue = DailyRevenue::firstOrCreate(['date' => $today],['total' => 0]);

        $dailyRevenue->increment('total', $amount);
        $dailyRevenue->refresh();

        return $dailyRevenue;
    }
}