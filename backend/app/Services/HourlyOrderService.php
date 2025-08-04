<?php

namespace App\Services;

use App\Models\HourlyOrder;
use Carbon\Carbon;


class HourlyOrderService
{
    public static function getTodayHourlyOrders()
    {
        $startOfDay = Carbon::now()->startOfDay();
        $endOfDay = Carbon::now()->endOfDay();
        $todayOrders = HourlyOrder::whereBetween('date_time', [$startOfDay, $endOfDay])
                                    ->orderBy('date_time', 'asc')
                                    ->get();
        return $todayOrders;
    }

    public static function addOrUpdateHourlyOrder(int $amount)
    {
        $dateTime = Carbon::now()->startOfHour();
        $hourlyOrder = HourlyOrder::firstOrCreate(['date_time' => $dateTime], ['order_count' => 0]);

        if ($hourlyOrder)
            $hourlyOrder->increment('order_count', $amount);
        else
            $hourlyOrder = HourlyOrder::create(['order_count' => $amount]);

        return $hourlyOrder;
    }
}