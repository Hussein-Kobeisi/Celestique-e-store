<?php

namespace App\Services\Common;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService{
   
    static function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return null;
        }

        $user = Auth::user();
        $user->token = $token;
        return $user;
    }

    static function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'mobile' => 'string|max:15',
            'role' => 'integer|in:0,1',
        ]);
        $user = (new User)->fill($request->all());
        $user->save();
        $token = Auth::login($user);

        $user->token = $token;
        return $user;
    }
}