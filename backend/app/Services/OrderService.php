<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;

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
}
