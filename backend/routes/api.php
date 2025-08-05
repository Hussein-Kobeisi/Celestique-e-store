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

//AuditLog -> logs of admin changing order status
//Products    -> diaplay products, only added by admin

// Orders  -> ceated by user on Checkout
// Order_items -> created with order

//Notifications -> created by user and admin actions, no direct api for it (triggered by other apis)
//DailyRevenue -> triggered by order payment
// HourlyOrder   -> triggered by order payment

Route::group(['middleware' => 'auth:api'], function () {

    Route::group(['middleware' => 'isAdmin'], function () {
        Route::controller(ProductController::class)->group(function () {
            Route::post('/add_product', 'add');
            Route::post('/update_product', 'update');
        });

        Route::controller(OrderController::class)->group(function () {
            Route::get('/orders_all', 'all');
        });

        Route::controller(DailyRevenueController::class)->group(function () {
            Route::get('/revenue_today', 'getToday');
        });

        Route::controller(HourlyOrderController::class)->group(function () {
            Route::get('/hourly_orders_today', 'getToday');
        });

        Route::controller(OrderController::class)->group(function () {
            Route::post('/update_order', 'update');
        });
    });

    

    Route::controller(ProductController::class)->group(function () {
        Route::get('/filtered_products', 'getFilteredProducts');
    });

    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
    });

    Route::controller(UserController::class)->group(function () {
        Route::post('/update_user',         'update');
        Route::post('/delete_user',         'delete');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::post('/add_order', 'add');
        Route::get('/orders_user', 'getByUser');
    });

    Route::controller(NotificationController::class)->group(function () {
        Route::get('/notifications_user', 'getByUser');
    });
});

Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'all');
    });

Route::controller(ProductController::class)->group(function () {
        Route::get('/products/{id}', 'getProductById');
    });

Route::group(['prefix' => ''], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
    });
    

});
