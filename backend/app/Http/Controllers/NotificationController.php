<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getByUser()
    {
        $user = Auth::user();
        $notifications = NotificationService::getByUser($user->id);
        $reponseNotifications = NotificationService::mapNotificationsCopy($notifications);
        NotificationService::markAsRead($notifications);
        return $this->responseJSON($reponseNotifications, "success", 200);
    }

    public function add(Request $request)
    {
        // TODO:
        // add new notification for user
        // send notification alert to user's notification listener
    }
}
