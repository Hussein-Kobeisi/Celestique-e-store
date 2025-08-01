<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DailyRevenueController extends Controller
{
    static function getToday(Request $request)
    {
        // get today's revenue (could use scopre for this)
    }

    static function addOrUpdate(Request $request)
    {
        // called by OrderController to add or update revenue for today
        // notify admin analytics listener
    }
}
