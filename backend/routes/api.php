<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DailyRevenueController;
use App\Http\Controllers\HourlyOrderController;
// use App\Http\Controllers\AIController;
// use App\Http\Controllers\ProductSearchController;
use App\Http\Controllers\ProductSearchController; // Import your ProductSearchController


use App\Events\NewNotificationEvent;

Broadcast::routes(['middleware' => ['auth:api']]);


Route::group(['middleware' => 'auth:api'], function () {

    Route::get('/test-notification', function () {
        $user = auth()->user();

        $notificationData = [
            'title' => 'Test Notification',
            'body' => 'This is a test notification from API',
            'timestamp' => now()->toDateTimeString(),
        ];

        event(new NewNotificationEvent($notificationData, 1));

        return response()->json(['message' => 'Notification event fired', 'userId' => $user->id]);
    });



    Route::group(['middleware' => 'isAdmin'], function () {
        Route::controller(ProductController::class)->group(function () {
            Route::post('/add_product', 'add');
            Route::post('/update_product', 'update');
        });

        Route::controller(OrderController::class)->group(function () {
            Route::get('/orders_all', 'all');
            Route::post('/update_order', 'update');
        });

        Route::controller(DailyRevenueController::class)->group(function () {
            Route::get('/revenue_today', 'getToday');
        });

        Route::controller(HourlyOrderController::class)->group(function () {
            Route::get('/hourly_orders_today', 'getToday');
        });


        Route::controller(UserController::class)->group(function () {
            Route::post('/update_user',         'update');
            Route::post('/delete_user',         'delete');
            Route::post('/user/{id}',         'getUserById');
        });
    });

    Route::controller(OrderController::class)->group(function () {
        Route::post('/add_order', 'add');
        Route::get('/orders_user', 'getByUser');
    });

    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
    });

    Route::controller(NotificationController::class)->group(function () {
        Route::get('/notifications_user', 'getByUser');
    });
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'all');
    Route::get('/products/{id}', 'getProductById');
});

Route::group(['prefix' => ''], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        
    });

Route::post('/products/search', [ProductSearchController::class, 'search']);

    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'all');
        Route::get('/filtered_products', 'getFilteredProducts');
    });

});

Route::get('/test', function () {
    return response()->json(['status' => 'API is working']);
});
