<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DailyRevenueController extends Controller
{
    public function getToday(Request $request)
    {
        // get today's revenue (could use scopre for this)
    }

    public function addOrUpdate(Request $request)
    {
        // called by OrderController to add or update revenue for today
        // notify admin analytics listener
    }
}
