<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Services\OrderItemService;
use App\Http\Requests\AddOrderRequest;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{


    public function all()
    {
        $orders = OrderService::getAllOrders();
        return $this->responseJson($orders, "success", 200);
    }

    public function getByUser()
    {
        $orders = OrderService::getOrdersByAuthenticatedUser();
        return $this->responseJson($orders, "success", 200);
    }

    public function update(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required|in:pending,paid,packed,shipped',
        ]);

        $order = OrderService::updateOrderStatus(
            $request->order_id,
            $request->status
        );
        OrderService::sendUpdateStatusEmail($order);

        return $this->responseJson($order, "Order updated successfully", 200);
    }


    public function add(AddOrderRequest $request)
    {
        $request = $request->validated();
        $user = Auth::user();

        $order = OrderService::addOrder($request['total_amount'], $user->id);
        $orderItems = OrderItemService::addItems($request['order_items'], $order->id);

        OrderService::handlePostOrderCreation($order, $user, $orderItems);

        return $this->responseJson([
            'order' => $order,
            'order_items' => $orderItems,
        ], "Order created successfully", 201);

        // TODO: 
        // - live add to admin dashboard
        // - user sees live update of order status
    }
}
