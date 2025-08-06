<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserService
{
    static function getUser(){
        return Auth::user();
    }

    static function find($id){
        return User::find($id);
    }

    static function getFillableData($request){
        $fillable = (new User)->getFillable();
        return $request->only($fillable);
    }

    static function fillUser($user, $data){
        $data = array_filter($data, fn($value) => $value !== null && $value !== '');
        $user->fill($data);
        return $user;
    }

    static function saveUser($user){
        return $user->save();
    }

    static function deleteUser($user){
        return $user->delete();
    }

    static function addUserTotalSpent($user, $amount){
        $user->total_money_spent += $amount;
        $user->save();
    }

    static function addUserItemsPurchased($user, $itemsCount){
        $user->total_orders += $itemsCount;
        $user->save();
    }

}