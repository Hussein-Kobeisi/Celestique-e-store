<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DailyRevenueService;

class DailyRevenueController extends Controller
{
    public function getToday()
    {
        $revenue = DailyRevenueService::getTodayRevenue();
        return $this->responseJSON($revenue, "success", 200);
    }

    public function addOrUpdate(Request $request)
    {

    }
}
