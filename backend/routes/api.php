<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['middleware' => 'isAdmin'], function(){
        
    });

    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
    });

    Route::controller(UserController::class)->group(function () {
        // Route::get('/users/{id?}',           'findById');
        Route::post('/add_update_user',     'addOrUpdate');
        Route::post('/delete_user',         'delete');
    });


});

Route::group(['prefix' => ''], function(){
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('/users',                 'getPublicData');
    });


});