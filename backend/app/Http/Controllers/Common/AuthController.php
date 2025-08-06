<?php

namespace App\Http\Controllers\Common;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use  App\Services\Common\AuthService;

class AuthController extends Controller{

    public function login(Request $request){
        $user = AuthService::login($request);
        if($user)
            return $this->responseJSON($user);
        return $this->responseJSON(null, "error", 401);
    }

    public function register(Request $request){
        try{
            $user = AuthService::register($request);
        }catch(\Exception $e){
            return $this->errorJSON($e->getMessage(), 500);
        }

        return $this->responseJSON($user);
    }
}
