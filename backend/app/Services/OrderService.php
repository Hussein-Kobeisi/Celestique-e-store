<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use App\Services\OrderItemService;

class OrderService
{
    public function getAllOrders()
    {
        return Order::orderBy('created_at', 'desc')->get();
    }

    public function getOrdersByAuthenticatedUser()
    {
        $user = Auth::user();

        return Order::where('user_id', $user->id)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function updateOrderStatus($orderId, $status)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return null;
        }

        $order->status = $status;
        $order->save();

        return $order;
    }

    public static function addOrder($total_amount, $userId)
    {
        $order = new Order;
        $order->total_amount = $total_amount;
        $order->user_id = $userId;
        $order->status = 'pending';
        $order->save();
        return $order;
    }
}
