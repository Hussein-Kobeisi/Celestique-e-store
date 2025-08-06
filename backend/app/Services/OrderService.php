<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmationMail;
use App\Mail\UpdateOrderStatusMail;
use App\Jobs\CreateCheckoutNotification;
use App\Jobs\LogAudit;
use App\Jobs\UpdateHourlyOrderAnalytics;
use App\Jobs\UpdateDailyRevenueAnalytics;
use App\Jobs\UpdateUserStats;
use App\Jobs\SendOrderConfirmationEmail;

class OrderService
{
    static function getAllOrders()
    {
        $orders = Order::orderBy('created_at', 'desc')->get();
        return $orders;
    }

    static function getOrdersByAuthenticatedUser()
    {
        $user = Auth::user();

        return Order::where('user_id', $user->id)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    static function updateOrderStatus($orderId, $status)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return null;
        }

        $order->status = $status;
        $order->save();

        return $order;
    }

    static function addOrder($total_amount, $userId)
    {
        $order = new Order;
        $order->total_amount = $total_amount;
        $order->user_id = $userId;
        $order->status = 'pending';
        $order->save();
        return $order;
    }

    public static function handlePostOrderCreation($order, $user, $itemCount)
    {
        SendOrderConfirmationEmail::dispatch($order);
        LogAudit::dispatch($order);
        CreateCheckoutNotification::dispatch($order);
        UpdateHourlyOrderAnalytics::dispatch($itemCount);
        UpdateDailyRevenueAnalytics::dispatch($order->total_amount);
        UpdateUserStats::dispatch($user, $order->total_amount, $itemCount);
    }


    static function sendConfirmationEmail($order)
    {
        Mail::to($order->user->email)->send(new OrderConfirmationMail($order));
    }

    static function sendUpdateStatusEmail($order)
    {
        Mail::to($order->user->email)->send(new UpdateOrderStatusMail($order));
    }
}
