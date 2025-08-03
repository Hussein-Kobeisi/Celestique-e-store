<?php

namespace App\Services;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationService
{
    public static function getByUser($userId)
    {
        return Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public static function mapNotificationsCopy($notifications)
    {
        return $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'message' => $notification->message,
                'is_read' => $notification->is_read,
                'created_at' => $notification->created_at->format('Y-m-d H:i:s'),
                'type' => $notification->type,
            ];
        });
    }

    public static function markAsRead($notifications)
    {
        foreach ($notifications as $notification) {
            if (!$notification->is_read) {
                $notification->is_read = true;
                $notification->save();
            }
        }
    }

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