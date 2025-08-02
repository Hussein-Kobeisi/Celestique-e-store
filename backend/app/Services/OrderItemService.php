<?php

namespace App\Services;

use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;

class OrderItemService
{
    public static function add($data){
        $orderItem = (new OrderItem)->fill($data);
        $orderItem->save();
        return $orderItem;
    }

    public static function addItems($items)
    {
        $orderItems = [];
        foreach ($data['order_items'] as $item) {
            $orderItems[] = OrderItemService::add($item);
        }
        return $orderItems;
    }
}