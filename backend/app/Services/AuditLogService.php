<?php

namespace App\Services;

use App\Models\AuditLog;

class AuditLogService
{
    public static function createOrderAuditLog($order)
    {
        $auditLog = (new AuditLog())->fill([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'new_status' => 'pending',
        ]);
        $auditLog->save();

        return $auditLog;
    }
}