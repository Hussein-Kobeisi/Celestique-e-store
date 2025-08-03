<?php

namespace App\Services;

use App\Models\HourlyOrder;

class HourlyOrderService
{
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