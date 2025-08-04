<?php

namespace App\Services;

use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use App\Services\ProductService;

class OrderItemService
{
    public static function add($data){
        $orderItem = (new OrderItem)->fill($data);
        $orderItem->save();
        return $orderItem;
    }

    public static function addItems($items, $orderId)
    {
        $orderItems = [];
        foreach ($items as $item) {
            $product_stock_decreased = ProductService::tryDecreaseStock($item['product_id'], $item['quantity']);
            if($product_stock_decreased)
                //if not enough stock item is not added
                $item['order_id'] = $orderId;
                $orderItems[] = OrderItemService::add($item);
        }
        return $orderItems;
    }
}