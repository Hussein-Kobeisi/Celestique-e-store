<?php

namespace App\Services;

use App\Models\DailyRevenue;
use carbon\Carbon;

class DailyRevenueService
{
    public static function getTodayRevenue(): DailyRevenue
    {
        $today = Carbon::now()->startofDay();
        $dailyRevenue = DailyRevenue::firstOrCreate(['date_time' => $today], ['revenue' => 0]);

        return $dailyRevenue;
    }
    public static function addOrUpdateDailyRevenue(float $amount): DailyRevenue
    {
        $today = Carbon::now()->startofDay();
        $dailyRevenue = DailyRevenue::firstOrCreate(['date_time' => $today],['revenue' => 0]);

        $dailyRevenue->increment('revenue', $amount);
        $dailyRevenue->refresh();

        return $dailyRevenue;
    }
}