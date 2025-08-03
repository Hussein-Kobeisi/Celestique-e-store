<?php

namespace App\Services;

use App\Models\HourlyOrder;

class HourlyOrderService
{
    public static function getTodayHourlyOrders()
    {
        $today = now()->format('Y-m-d');
        $todayOrders = HourlyOrder::where(['date_time' >= $today . ' 00:00:00'])
                                    ->orderBy('date_time', 'asc')
                                    ->get();
        return $todayOrders;
    }

    public static function addOrUpdateHourlyOrder(int $amount)
    {
        $hourlyOrder = HourlyOrder::where('created_at', '>=', now()->subHour())
                                    ->first();

        if ($hourlyOrder)
            $hourlyOrder->increment('order_count', $amount);
        else
            $hourlyOrder = HourlyOrder::create(['order_count' => $amount]);

        return $hourlyOrder;
    }
}