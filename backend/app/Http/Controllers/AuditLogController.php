<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuditLogController extends Controller
{
    public function addOrUpdate(Request $request)
    {
        // TODO:
        // called on by OrderController when admin changes order status
        // add a log that admin changed order status
        // alert user listener that order status was changed (to live update orders page)
    }
}
