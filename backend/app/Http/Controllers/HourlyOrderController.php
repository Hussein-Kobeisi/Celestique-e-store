<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HourlyOrderController extends Controller
{
    public function getToday(Request $request)
    {
        // get today's hourly orders count (could use scopre for this)
    }

    public function addOrUpdate(Request $request)
    {
        // called by OrderController to add or update hourly order count
        // notify admin analytics listener
    }
}
