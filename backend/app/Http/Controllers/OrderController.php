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


    public function add(AddOrderRequest $request)
    {
        die("hello");
        $request = $request->validated();
        $user = auth()->user();

        $order = OrderService::addOrder($request['total_amount'], $user->id);
        $orderItems = OrderItemService::addItems($request['order_items']);
        $notification = NotificationService::createCheckoutNotification($order);
        $hourlyOrder = HourlyOrderService::addOrUpdateHourlyOrder(count($orderItems));
        $dailyRevenue = DailyRevenueService::addOrUpdateDailyRevenue($order->total_amount);
        $auditLog = AuditLogService::createOrderAuditLog($order);


        return $this->responseJson([
            'order' => $order,
            'order_items' => $orderItems,
            'notification' => $notification,
            'hourly_order' => $hourlyOrder,
            'daily_revenue' => $dailyRevenue,
            'audit_log' => $auditLog
        ], "Order created successfully", 201);
        // TODO: 
        // - live add to admin dashboard
        // - user sees live update of order status
    }
}
