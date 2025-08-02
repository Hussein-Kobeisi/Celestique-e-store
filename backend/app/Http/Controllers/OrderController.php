<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;

class OrderController extends Controller
{

    protected OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function all()
    {
        $orders = $this->orderService->getAllOrders();
        return $this->responseJson($orders, "success", 200);
    }

    public function getByUser(Request $request)
    {
        $orders = $this->orderService->getOrdersByAuthenticatedUser();
        return $this->responseJson($orders, "success", 200);
    }

    public function update(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required|in:pending,paid,packed,shipped',
        ]);

        $order = $this->orderService->updateOrderStatus(
            $request->order_id,
            $request->status
        );

        if (!$order) {
            return $this->responseJson(null, "Order not found", 404);
        }

        return $this->responseJson($order, "Order updated successfully", 200);
    }


    public function add(Request $request)
    {
        // TODO: Implement full order creation with:
        // - order items
        // - notifications (SMS)
        // - daily/hourly metrics update
        // - audit log
        // - stock update
        // - admin broadcast

        // Once implemented, delegate to $this->orderService->createOrder($request->all())
    }
}
