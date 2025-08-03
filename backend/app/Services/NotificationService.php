<?php

namespace App\Services;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationService
{
    public static function createCheckoutNotification($order){
        $notification = new Notification();
        $notification->user_id = $order->user_id;
        $notification->message = "Your order #{$order->id} has been placed successfully. For total amount: {$order->total_amount}$.";
        $notification->is_read = false;
        $notification->type = 'SMS';
        $notification->save();

        // TODO: notify Notification listener

        return $notification;
    }
}