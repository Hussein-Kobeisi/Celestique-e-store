<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Services\OrderItemService;
use App\Services\NotificationService;
use App\Services\HourlyOrderService;
use App\Services\DailyRevenueService;
use App\Services\AuditLogService;
use App\Http\Requests\AddOrderRequest;
use App\Services\UserService;
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
        $notification = NotificationService::createCheckoutNotification($order);
        $hourlyOrder = HourlyOrderService::addOrUpdateHourlyOrder(count($orderItems));
        $dailyRevenue = DailyRevenueService::addOrUpdateDailyRevenue($order->total_amount);
        $auditLog = AuditLogService::createOrderAuditLog($order);
        OrderService::sendConfirmationEmail($order);
        UserService::addUserTotalSpent($user, $order->total_amount);
        UserService::addUserItemsPurchased($user, count($orderItems));

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
