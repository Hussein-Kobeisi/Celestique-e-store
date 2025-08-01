<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

//Audit_logs -> logs of admin changing order status
//Products    -> diaplay products, only added by admin

// Orders  -> ceated by user on Checkout
// Order_items -> created with order

//Notifications -> created by user and admin actions, no direct api for it (triggered by other apis)
//Daily_Revenues -> triggered by order payment
// Hourly_Orders   -> triggered by order payment

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['middleware' => 'isAdmin'], function(){
        Route::controller(AuditLogController::class)->group(function () {
            Route::post('/add_log', 'addOrUpdate');
        });

        Route::controller(ProductController::class)->group(function () {
            Route::post('/add_product', 'addOrUpdate');
        });

        Route::controller(OrderController::class)->group(function () {
            Route::get('/orders_all', 'all');
        });

        Route::controller(RevenueController::class)->group(function () {
            Route::get('/revenue_today', 'getToday');
        });

        Route::controller(HourlyOrderController::class)->group(function () {
            Route::get('/hourly_orders_today', 'getToday');
        });
    });

    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
    });

    Route::controller(UserController::class)->group(function () {
        Route::post('/add_update_user',     'addOrUpdate');
        Route::post('/delete_user',         'delete');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::post('/add_order', 'addOrUpdate');
        Route::get('/orders_user', 'getByUser');
    });

    Route::controller(NotificationController::class)->group(function () {
        Route::get('/notifications_user', 'getByUser');
    });

});

Route::group(['prefix' => ''], function(){
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'all');
    });
});