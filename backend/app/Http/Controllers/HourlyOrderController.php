<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\HourlyOrderService;

class HourlyOrderController extends Controller
{
    public function getToday()
    {
        $todayOrders = HourlyOrderService::getTodayHourlyOrders();
        return $this->responseJSON($todayOrders, "success", 200);
    }

    public function addOrUpdate(Request $request)
    {
        // TODO:
        // called by OrderController to add or update hourly order count
        // notify admin analytics listener
    }
}
