<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getByUser(Request $request)
    {
        // TODO:
        // return notifications by user
        // set all retrieved notifications as read
    }

    public function add(Request $request)
    {
        // TODO:
        // add new notification for user
        // send notification alert to user's notification listener
    }
}
